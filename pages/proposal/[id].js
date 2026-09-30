import React, { useCallback, useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { connectedProposalStatuses, proposalStages } from '@/utility/proposal-timeline'
import styles from '@/styles/Profile/ProposalDetail.module.css'

const date = (value, locale) => value ? new Date(value).toLocaleString(locale === 'bn' ? 'bn-BD' : 'en-US', { dateStyle: 'medium', timeStyle: 'short' }) : '—'
const label = status => status === 'pending' ? 'Pending' : status

export default function ProposalDetailsPage () {
  const router = useRouter()
  const userInfo = useSelector(state => state.user.userInfo)
  const id = typeof router.query.id === 'string' ? router.query.id : ''
  const [proposal, setProposal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [working, setWorking] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [confirmAccept, setConfirmAccept] = useState(false)
  const load = useCallback(async () => {
    if (!userInfo?.token || !id) return
    setLoading(true); setError('')
    try {
      const { data } = await axios.get('/api/proposal/' + encodeURIComponent(id), { headers: { Authorization: 'Bearer ' + userInfo.token } })
      setProposal(data.proposal)
    } catch (requestError) { setError(requestError.response?.data?.error || 'Could not load proposal details.') }
    finally { setLoading(false) }
  }, [id, userInfo?.token])
  useEffect(() => { if (router.isReady && !userInfo?.token) router.replace('/login') }, [router, router.isReady, userInfo?.token])
  useEffect(() => { load() }, [load])

  const act = async action => {
    if (!proposal || working) return
    setWorking(true); setError(''); setNotice('')
    const endpoint = action === 'decline' || action === 'remind' ? '/api/proposal/status' : '/api/proposal'
    const method = { accept: 'put', decline: 'put', withdraw: 'patch', remind: 'post' }[action]
    try {
      const { data } = await axios({ url: endpoint, method, data: { Id: proposal._id }, headers: { Authorization: 'Bearer ' + userInfo.token } })
      if (data?.error) setError(`${data.error} · Profile ID ${member?.profileId || 'unknown'}`)
      else {
        if (action === 'remind') {
          const nextTime = data.nextReminderAt ? date(data.nextReminderAt, router.locale === 'bn' ? 'bn' : 'en') : ''
          const reminderNotice = data.remindersRemaining > 0
            ? (router.locale === 'bn'
                ? `প্রোফাইল ID ${member?.profileId || '—'}-এ রিমাইন্ডার পাঠানো হয়েছে। পরবর্তী রিমাইন্ডার পাঠাতে পারবেন ${nextTime} এর পরে।`
                : `Reminder sent to profile ID ${member?.profileId || '—'}. You can send the next reminder after ${nextTime}.`)
            : (router.locale === 'bn'
                ? `প্রোফাইল ID ${member?.profileId || '—'}-এ রিমাইন্ডার পাঠানো হয়েছে। আপনি সর্বোচ্চ ৩টি রিমাইন্ডার পাঠিয়েছেন।`
                : `Reminder sent to profile ID ${member?.profileId || '—'}. You have reached the limit of 3 reminders.`)
          setNotice(reminderNotice)
        } else {
          setNotice(action === 'accept'
            ? `Proposal from profile ID ${member?.profileId || '—'} accepted.`
            : action === 'decline'
              ? `Proposal from profile ID ${member?.profileId || '—'} declined.`
              : `Proposal to profile ID ${member?.profileId || '—'} withdrawn.`)
        }
        await load()
      }
    } catch (requestError) { setError(requestError.response?.data?.error || 'Could not update this proposal.') }
    finally { setWorking(false) }
  }

  const received = Boolean(proposal && userInfo?.id && String(proposal.reciever?._id) === String(userInfo.id))
  const member = received ? proposal?.sender : proposal?.reciever
  const pending = proposal?.status === 'pending'
  const canRemind = !received && pending && (proposal?.pokeCount || 0) < 3 && (!proposal?.pockedAt || Date.now() - new Date(proposal.pockedAt).getTime() >= 86400000)
  const timeline = proposal?.timeline?.length ? proposal.timeline : proposal ? [{ type: 'snapshot', status: proposal.status, at: proposal.updatedAt || proposal.createdAt }] : []
  const bn = router.locale === 'bn'

  return <main className={styles.page}>
    <Head><title>{bn ? 'প্রস্তাবের বিবরণ' : 'Proposal details'} | Muslim Match Maker</title><meta name='robots' content='noindex, nofollow' /></Head>
    <div className={styles.container}>
      <Link href='/proposal' className={styles.back}>← {bn ? 'সব প্রস্তাব' : 'All proposals'}</Link>
      <header className={styles.hero}><span className={styles.kicker}>{received ? 'RECEIVED PROPOSAL' : 'SENT PROPOSAL'}</span><h1>{bn ? 'প্রস্তাবের বিবরণ' : 'Proposal details'}</h1><p>{bn ? 'প্রস্তাবের অবস্থা এবং অগ্রগতি দেখুন।' : 'View the proposal message, current status, and timeline.'}</p></header>
      {loading && <p className={styles.notice} role='status'>{bn ? 'লোড হচ্ছে…' : 'Loading proposal…'}</p>}
      {error && <p className={styles.error} role='alert'>{error}<button type='button' onClick={load}>{bn ? 'আবার চেষ্টা করুন' : 'Try again'}</button></p>}
      {notice && <p className={styles.notice} role='status'>{notice}</p>}
      {proposal && <>
        <section className={styles.summary}>
          <div className={styles.member}><span className={styles.avatar} aria-hidden='true'>{member?.name?.trim()?.[0]?.toUpperCase() || 'M'}</span><div><span className={styles.memberLabel}>{received ? 'PROPOSAL FROM' : 'PROPOSAL TO'}</span><h2>{member?.name || 'Member'}</h2><p>Profile ID {member?.profileId || '—'}{[member?.profession, member?.city].filter(Boolean).length ? ` · ${[member?.profession, member?.city].filter(Boolean).join(' · ')}` : ''}</p></div></div>
          <span className={connectedProposalStatuses.includes(proposal.status) ? styles.accepted : pending ? styles.pending : styles.status}>{label(proposal.status)}</span>
        </section>
        {connectedProposalStatuses.includes(proposal.status) && member?.profileId
          ? <section className={styles.connectedNotice} role='status'>
              <span className={styles.connectedIcon} aria-hidden='true'>✓</span>
              <div className={styles.connectedCopy}>
                <strong>{bn ? 'প্রস্তাব গ্রহণ করা হয়েছে' : 'Proposal accepted'}</strong>
                <p>{bn
                  ? `প্রোফাইল ID ${member.profileId}-এর সম্পূর্ণ প্রোফাইল এখন দেখতে পারবেন।`
                  : `You can now view the full profile for profile ID ${member.profileId}.`}</p>
              </div>
              <Link href={'/profile/' + member.profileId} className={styles.connectedLink}>{bn ? 'সম্পূর্ণ প্রোফাইল দেখুন' : 'View full profile'} <span aria-hidden='true'>↗</span></Link>
            </section>
          : member?.profileId && <Link href={'/profile/' + member.profileId} className={styles.profileLink}>{bn ? 'প্রোফাইল দেখুন' : 'View profile'} ↗</Link>}
        <section className={styles.panel}><div className={styles.panelHeading}><span className={styles.panelIcon} aria-hidden='true'>✉</span><div><span className={styles.kickerLight}>{bn ? 'বার্তা' : 'YOUR MESSAGE'}</span><h2>{bn ? 'প্রস্তাবের বার্তা' : 'Proposal message'}</h2></div></div><p className={styles.message}>{proposal.message || (bn ? 'কোনো বার্তা যোগ করা হয়নি।' : 'No message was included with this proposal.')}</p></section>
        <section className={styles.panel}><div className={styles.panelHeading}><span className={styles.panelIcon} aria-hidden='true'>✦</span><div><span className={styles.kickerLight}>{bn ? 'অগ্রগতি' : 'THE JOURNEY'}</span><h2>{bn ? 'প্রস্তাবের অগ্রগতি' : 'Proposal timeline'}</h2></div></div>
          <ol className={styles.stages} aria-label='Proposal stages'>{proposalStages.map(stage => <li key={stage} className={stage === proposal.status ? styles.currentStage : proposalStages.indexOf(proposal.status) > proposalStages.indexOf(stage) ? styles.pastStage : ''} aria-current={stage === proposal.status ? 'step' : undefined}>{label(stage)}</li>)}</ol>
          <ol className={styles.timeline}>{[...timeline].reverse().map((event,index) => <li key={event._id || index}><span className={styles.eventDot} aria-hidden='true'/><div><strong>{event.type === 'created' ? 'Proposal sent' : event.type === 'reminder' ? 'Reminder sent' : event.type === 'snapshot' ? 'Previous status' : 'Status updated'} · {label(event.status)}</strong><time dateTime={event.at}>{date(event.at,bn?'bn':'en')}</time>{event.actor && <span className={styles.actor}>{event.actor.name || 'Member'}{event.actorRole === 'admin' ? ' · Admin' : ''}</span>}{event.note && <p>{event.note}</p>}</div></li>)}</ol>
        </section>
        <div className={styles.facts}><div><span>Sent</span><strong>{date(proposal.createdAt,bn?'bn':'en')}</strong></div><div><span>Last updated</span><strong>{date(proposal.updatedAt,bn?'bn':'en')}</strong></div><div><span>Reminders</span><strong>{proposal.pokeCount || 0}</strong></div></div>
        {pending && <div className={styles.actions}>{received && <><button type='button' className={styles.accept} disabled={working} onClick={() => setConfirmAccept(true)}>{working ? 'Updating…' : 'Accept proposal'}</button><button type='button' className={styles.secondary} disabled={working} onClick={() => act('decline')}>Decline</button></>}{!received && <>{canRemind && <button type='button' className={styles.secondary} disabled={working} onClick={() => act('remind')}>Send reminder</button>}<button type='button' className={styles.secondary} disabled={working} onClick={() => act('withdraw')}>Withdraw proposal</button></>}</div>}
      </>}
    </div>
    {confirmAccept && <div className={styles.confirmOverlay} role='presentation' onMouseDown={event => { if (event.target === event.currentTarget) setConfirmAccept(false) }}>
      <section className={styles.confirmDialog} role='dialog' aria-modal='true' aria-labelledby='accept-proposal-title' aria-describedby='accept-proposal-description'>
        <span className={styles.confirmIcon} aria-hidden='true'>↔</span>
        <span className={styles.confirmEyebrow}>{bn ? 'আপনার তথ্য শেয়ার হবে' : 'PLEASE REVIEW BEFORE CONTINUING'}</span>
        <h2 id='accept-proposal-title'>{bn ? 'প্রস্তাব গ্রহণ করবেন?' : 'Accept this proposal?'}</h2>
        <p id='accept-proposal-description'>{bn
          ? `প্রস্তাব গ্রহণ করলে ${member?.name || 'এই সদস্য'} (প্রোফাইল ID ${member?.profileId || '—'}) আপনার প্রোফাইলের ঠিকানা অংশে দেওয়া ফোন নম্বর, ইমেইল ও অবস্থান দেখতে পারবেন এবং ফোনে যোগাযোগ করতে পারেন। এসব তথ্য শেয়ার করতে সম্মত হলেই এগিয়ে যান।`
          : `If you accept, ${member?.name || 'this member'} (profile ID ${member?.profileId || '—'}) will be able to see the phone numbers, email, and location you added to your profile’s Address section. They may contact you by phone. Continue only if you’re comfortable sharing those details.`}</p>
        <div className={styles.confirmActions}>
          <button type='button' className={styles.confirmCancel} onClick={() => setConfirmAccept(false)}>{bn ? 'এখন নয়' : 'Go back'}</button>
          <button type='button' className={styles.confirmAccept} disabled={working} onClick={() => { setConfirmAccept(false); act('accept') }}>{working ? (bn ? 'আপডেট হচ্ছে…' : 'Updating…') : (bn ? 'তথ্য শেয়ার করে গ্রহণ করুন' : 'Accept and share details')}</button>
        </div>
      </section>
    </div>}
  </main>
}
