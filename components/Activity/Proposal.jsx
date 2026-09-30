import { connectedProposalStatuses } from '@/utility/proposal-timeline'
import React, { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import styles from '@/styles/Profile/Proposal.module.css'

const statusLabel = {
  pending: 'Awaiting response',
  Accepted: 'Accepted',
  Declined: 'Declined',
  Withdrawn: 'Withdrawn'
}

const Proposal = () => {
  const router = useRouter()
  const userInfo = useSelector(state => state.user.userInfo)
  const [proposals, setProposals] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [working, setWorking] = useState('')
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  const fetchProposals = useCallback(async () => {
    if (!userInfo?.token) return
    try {
      const { data } = await axios.get('/api/proposal', {
        headers: { Authorization: 'Bearer ' + userInfo.token }
      })
      setProposals(Array.isArray(data) ? data : [])
      setError('')
    } catch (requestError) {
      setError('Could not load your proposals. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [userInfo?.token])

  useEffect(() => { fetchProposals() }, [fetchProposals])

  const act = async (item, action) => {
    if (working) return
    setWorking(String(item._id))
    setError('')
    setNotice('')
    const endpoint = action === 'remind' || action === 'decline' ? '/api/proposal/status' : '/api/proposal'
    const method = { remind: 'post', accept: 'put', decline: 'put', withdraw: 'patch' }[action]
    try {
      const { data } = await axios({
        url: endpoint,
        method,
        data: { Id: item._id },
        headers: { Authorization: 'Bearer ' + userInfo.token }
      })
      if (data?.error) {
        setError(data.error)
      } else {
        const received = String(item.reciever?._id) === String(userInfo?.id)
        const member = received ? item.sender : item.reciever
        const profileId = member?.profileId || 'unknown'
        const actionMessages = {
          remind: `Reminder sent to profile ID ${profileId}.`,
          accept: `Proposal from profile ID ${profileId} accepted.`,
          decline: `Proposal from profile ID ${profileId} declined.`,
          withdraw: `Proposal to profile ID ${profileId} withdrawn.`
        }
        setNotice(actionMessages[action])
        await fetchProposals()
      }
    } catch (requestError) {
      setError(requestError.response?.data?.error || 'Could not update this proposal.')
    } finally {
      setWorking('')
    }
  }

  const visible = proposals.filter(item => {
    if (filter === 'all') return true
    if (filter === 'received') return String(item.reciever?._id) === String(userInfo?.id)
    return String(item.sender?._id) === String(userInfo?.id)
  })

  return <>
    <header className={styles.hero}>
      <span className={styles.kicker}>YOUR CONNECTIONS</span>
      <h1>{router.locale === 'bn' ? 'প্রস্তাবসমূহ' : 'Your proposals'}</h1>
      <p>Review requests and take the next step when you are ready.</p>
    </header>
    <div className={styles.toolbar}>
      <div className={styles.tabs} role='group' aria-label='Filter proposals'>
        {['all', 'received', 'sent'].map(value =>
          <button key={value} type='button' className={filter === value ? styles.selected : ''} onClick={() => setFilter(value)}>
            {value === 'all' ? 'All' : value === 'received' ? 'Received' : 'Sent'}
          </button>
        )}
      </div>
      <span>{visible.length} {visible.length === 1 ? 'proposal' : 'proposals'}</span>
    </div>
    {error && <p className={styles.error} role='alert'>{error}</p>}
    {notice && <p className={styles.notice} role='status'>{notice}</p>}
    {loading ? <p className={styles.empty}>Loading proposals…</p> : visible.length === 0 ?
      <div className={styles.empty}>
        <h2>No proposals here yet</h2>
        <p>Explore profiles to discover someone you would like to get to know.</p>
        <Link href='/profile'>Explore members ↗</Link>
      </div> :
      <div className={styles.list}>
        {visible.map(item => {
          const received = String(item.reciever?._id) === String(userInfo?.id)
          const member = received ? item.sender : item.reciever
          const pending = item.status === 'pending'
          const disabled = working === String(item._id)
          const canRemind = !received && pending && (item.pokeCount || 0) < 3 &&
            (!item.pockedAt || Date.now() - new Date(item.pockedAt).getTime() >= 24 * 60 * 60 * 1000)
          return <article className={styles.card} key={item._id}>
            <div className={styles.cardTop}>
              <span className={styles.direction}>{received ? 'RECEIVED' : 'SENT'}</span>
              <span className={connectedProposalStatuses.includes(item.status) ? styles.accepted : item.status === 'pending' ? styles.pending : styles.status}>{statusLabel[item.status] || item.status}</span>
            </div>
            <div className={styles.member}>
              <div className={styles.avatar} aria-hidden='true'>{member?.name?.trim()?.[0]?.toUpperCase() || 'M'}</div>
              <div>
                <h2>{member?.name || 'Member'}</h2>
                <p>Profile ID {member?.profileId || '—'}{[member?.profession, member?.city || member?.district].filter(Boolean).length ? ` · ${[member?.profession, member?.city || member?.district].filter(Boolean).join(' · ')}` : ''}</p>
              </div>
            </div>
            {item.message && <p className={styles.message}>{item.message}</p>}
            <div className={styles.cardBottom}>
              <span>{new Date(item.createdAt).toLocaleDateString()}</span>
              <div className={styles.actions}>
                <Link href={'/proposal/' + item._id}>Proposal details ↗</Link>
                {member?.profileId && <Link href={'/profile/' + member.profileId}>View profile</Link>}
                {received && pending && <>
                  <button type='button' disabled={disabled} className={styles.primary} onClick={() => act(item, 'accept')}>Accept</button>
                  <button type='button' disabled={disabled} onClick={() => act(item, 'decline')}>Decline</button>
                </>}
                {!received && pending && <>
                  {canRemind && <button type='button' disabled={disabled} onClick={() => act(item, 'remind')}>Send reminder</button>}
                  <button type='button' disabled={disabled} onClick={() => act(item, 'withdraw')}>Withdraw</button>
                </>}
              </div>
            </div>
          </article>
        })}
      </div>}
  </>
}

export default Proposal
