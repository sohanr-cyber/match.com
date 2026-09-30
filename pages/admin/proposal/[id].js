import React, { useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { proposalStatuses, proposalStages } from '@/utility/proposal-timeline'
import timelineStyles from '@/styles/ProposalTimeline.module.css'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useAdminData from '@/components/Admin/useAdminData'
import styles from '@/styles/Dashboard.module.css'

const date = value => value ? new Date(value).toLocaleString() : '—'

function Member ({ title, member }) {
  return <section className={styles.panel}>
    <div className={styles.panelHeader}><h2>{title}</h2></div>
    <p>{member?.name || 'Deleted member'}</p>
    {member?.profileId && <Link className={styles.action} href={'/profile/' + member.profileId}>View profile #{member.profileId} ↗</Link>}
  </section>
}

export default function AdminProposalDetails () {
  const router = useRouter()
  const id = typeof router.query.id === 'string' ? router.query.id : ''
  const { data, loading, error, retry } = useAdminData(id ? '/api/admin/proposal/' + encodeURIComponent(id) : null)
  const proposal = data?.proposal
  const userInfo = useSelector(state => state.user.userInfo)
  const [status, setStatus] = useState('')
  const [note, setNote] = useState('')
  const [saving, setSaving] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [updateError, setUpdateError] = useState('')
  const updateStatus = async event => {
    event.preventDefault()
    if (saving || !status || !proposal) return
    setSaving(true); setFeedback(''); setUpdateError('')
    try {
      await axios.patch('/api/admin/proposal/' + encodeURIComponent(id), {
        status, note, expectedUpdatedAt: proposal.updatedAt
      }, { headers: { Authorization: 'Bearer ' + userInfo.token } })
      setStatus(''); setNote(''); setFeedback('Status updated.'); retry()
    } catch (error) {
      setUpdateError(error.response?.data?.error || 'Could not update status.')
      if (error.response?.status === 409) retry()
    } finally { setSaving(false) }
  }
  const timeline = proposal?.timeline?.length ? proposal.timeline : proposal ? [{
    type: 'snapshot', status: proposal.status, at: proposal.updatedAt || proposal.createdAt,
    note: 'Status recorded before timeline tracking began.'
  }] : []
  return <main className={styles.page}><Head><title>Proposal details | Admin</title><meta name='robots' content='noindex, nofollow' /></Head>
    <div className={styles.inner}>
      <header className={styles.hero}>
        <div className={styles.heroCopy}><span className={styles.kicker}>PROPOSAL MANAGEMENT</span><h1>Proposal details</h1><p>Review the participants, message, status, and activity.</p></div>
        <Link href='/admin/proposal' className={styles.heroAction}>← All proposals</Link>
      </header>
      {loading && <p className={styles.notice} role='status'>Loading proposal…</p>}
      {error && <div className={styles.notice} role='alert'>{error}<div className={styles.pager}><button type='button' onClick={retry}>Try again</button></div></div>}
      {feedback && <p className={styles.notice} role='status'>{feedback}</p>}
      {updateError && <p className={styles.notice} role='alert'>{updateError}</p>}
      {proposal && <>
        <div className={styles.stats}>
          <div className={styles.stat}><span>Status</span><p className={styles.badge}>{proposal.status}</p></div>
          <div className={styles.stat}><span>Sent</span><p>{date(proposal.createdAt)}</p></div>
          <div className={styles.stat}><span>Resolved</span><p>{date(proposal.resolvedAt)}</p></div>
          <div className={styles.stat}><span>Reminders sent</span><strong>{proposal.pokeCount || 0}</strong></div>
        </div>
        <section className={styles.panel} style={{ marginBottom: 20 }} aria-label='Proposal stages'>
          <div className={styles.panelHeader}><h2>Proposal progress</h2></div>
          <ol className={timelineStyles.stages}>
            {proposalStages.map(stage => <li key={stage} className={stage === proposal.status ? timelineStyles.currentStage : ''} aria-current={stage === proposal.status ? 'step' : undefined}>
              {stage === 'pending' ? 'Pending' : stage}
            </li>)}
          </ol>
        </section>
        <div className={styles.grid}>
          <section className={styles.panel}>
            <div className={styles.panelHeader}><h2>Update status</h2></div>
            <form className={timelineStyles.form} onSubmit={updateStatus}>
              <label htmlFor='new-status'>New status</label>
              <select id='new-status' required value={status} disabled={saving} onChange={event => setStatus(event.target.value)}>
                <option value=''>Choose status</option>
                {proposalStatuses.filter(value => value !== proposal.status).map(value => <option key={value} value={value}>{value === 'pending' ? 'Pending' : value}</option>)}
              </select>
              <label htmlFor='status-note'>Admin note (optional)</label>
              <textarea id='status-note' maxLength={1000} rows={4} value={note} disabled={saving} onChange={event => setNote(event.target.value)} placeholder='Explain this status change' />
              <button type='submit' disabled={saving || !status || status === proposal.status}>{saving ? 'Saving…' : 'Update status'}</button>
            </form>
          </section>
          <section className={styles.panel}>
            <div className={styles.panelHeader}><h2>Status timeline</h2></div>
            <ol className={timelineStyles.timeline}>
              {[...timeline].reverse().map((entry, index) => <li key={entry._id || index}>
                <strong>{entry.type === 'created' ? 'Proposal sent' : entry.type === 'reminder' ? 'Reminder sent' : entry.type === 'snapshot' ? 'Previous status' : 'Status updated'} · {entry.status}</strong>
                <time dateTime={entry.at}>{date(entry.at)}</time>
                {entry.actor && <span>{entry.actor.name || 'Deleted member'}{entry.actorRole === 'admin' ? ' (Admin)' : ''}</span>}
                {entry.note && <p>{entry.note}</p>}
              </li>)}
            </ol>
          </section>
          <Member title='Sender' member={proposal.sender} /><Member title='Recipient' member={proposal.reciever} />
          <section className={styles.panel}><div className={styles.panelHeader}><h2>Message</h2></div><p style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>{proposal.message || 'No message included.'}</p></section>
          <section className={styles.panel}><div className={styles.panelHeader}><h2>Activity</h2></div>
            <dl style={{ overflowWrap: 'anywhere' }}><dt>Proposal ID</dt><dd>{proposal._id}</dd><dt>Last updated</dt><dd>{date(proposal.updatedAt)}</dd><dt>Last reminder</dt><dd>{date(proposal.pockedAt)}</dd></dl>
          </section>
        </div>
      </>}
    </div>
  </main>
}