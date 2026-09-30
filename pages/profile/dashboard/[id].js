import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import axios from 'axios'
import styles from '@/styles/Dashboard.module.css'

const MemberDashboard = () => {
  const router = useRouter()
  const userInfo = useSelector(state => state.user.userInfo)
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const bn = router.locale === 'bn'

  useEffect(() => {
    if (!router.isReady) return
    if (!userInfo?.token) {
      router.replace('/login')
      return
    }
    if (router.query.id !== userInfo.id && router.query.id !== String(userInfo.profileId)) {
      router.replace('/profile/dashboard/' + userInfo.id)
      return
    }
    let cancelled = false
    axios.get('/api/dashboard/me', { headers: { Authorization: 'Bearer ' + userInfo.token } })
      .then(({ data }) => { if (!cancelled) setData(data) })
      .catch(() => { if (!cancelled) setError('We could not load your dashboard. Please refresh the page.') })
    return () => { cancelled = true }
  }, [router, router.isReady, router.query.id, userInfo?.id, userInfo?.profileId, userInfo?.token])

  const stats = data?.stats || {}
  const items = [
    [bn ? 'প্রাপ্ত প্রস্তাব' : 'Proposals received', stats.incoming || 0],
    [bn ? 'পাঠানো প্রস্তাব' : 'Proposals sent', stats.outgoing || 0],
    [bn ? 'অপেক্ষমাণ' : 'Awaiting your reply', stats.pending || 0],
    [bn ? 'সংযোগ' : 'Connections', stats.accepted || 0]
  ]
  const profilePath = '/profile/' + (data?.user?.profileId || userInfo?.profileId || '')
  const proposalPath = '/proposal'

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.kicker}>{bn ? 'আপনার জায়গা' : 'YOUR SPACE'}</span>
            <h1>{bn ? 'স্বাগতম' : 'Welcome back'}, {data?.user?.name || userInfo?.name || (bn ? 'সদস্য' : 'member')}</h1>
            <p>{bn ? 'আপনার যাত্রা, প্রস্তাব এবং নতুন সংযোগ এক জায়গায় দেখুন।' : 'A calm space to follow your journey, proposals, and meaningful connections.'}</p>
          </div>
          <Link href='/profile' className={styles.heroAction}>{bn ? 'মানুষ খুঁজুন' : 'Explore members'} ↗</Link>
        </header>
        {error && <div className={styles.notice} role='alert'>{error}</div>}
        <div className={styles.stats}>
          {items.map(([label, value]) => <div className={styles.stat} key={label}><span>{label}</span><strong>{value}</strong><small>Muslim Match Maker</small></div>)}
        </div>
        <div className={styles.grid}>
          <section className={styles.panel}>
            <div className={styles.panelHeader}><h2>{bn ? 'সাম্প্রতিক প্রস্তাব' : 'Recent proposals'}</h2><Link href={proposalPath}>{bn ? 'সব দেখুন' : 'View all'}</Link></div>
            {data?.recent?.length ? <div className={styles.list}>
              {data.recent.map(item => <div className={styles.row} key={item.id}>
                <div className={styles.rowMain}><strong>{item.name}</strong><span>{item.direction} · {new Date(item.updatedAt).toLocaleDateString()}</span></div>
                <span className={item.status === 'pending' ? styles.badge + ' ' + styles.pending : styles.badge}>{item.status}</span>
              </div>)}
            </div> : <p className={styles.muted}>{bn ? 'এখনো কোনো প্রস্তাব নেই। নতুন মানুষ খুঁজে শুরু করুন।' : 'No proposals yet. Explore members to get started.'}</p>}
          </section>
          <section className={styles.panel}>
            <div className={styles.panelHeader}><h2>{bn ? 'পরবর্তী পদক্ষেপ' : 'Your next steps'}</h2></div>
            <div className={styles.actions}>
              <Link className={styles.action} href={profilePath}><span>{bn ? 'আমার প্রোফাইল' : 'View my profile'}</span><span>↗</span></Link>
              <Link className={styles.action} href={'/profile/update/' + (userInfo?.profileId || '')}><span>{bn ? 'প্রোফাইল সম্পাদনা' : 'Complete my profile'}</span><span>↗</span></Link>
              <Link className={styles.action} href={proposalPath}><span>{bn ? 'প্রস্তাব দেখুন' : 'Review proposals'}</span><span>↗</span></Link>
              <Link className={styles.action} href={'/profile/liked/' + (userInfo?.id || '')}><span>{bn ? 'সংরক্ষিত প্রোফাইল' : 'Saved profiles'}</span><span>↗</span></Link>
            </div>
            <div className={styles.progress}><span style={{ width: data?.user?.active ? '100%' : data?.user?.isVerified ? '65%' : '30%' }} /></div>
            <p className={styles.muted}>{data?.user?.active ? (bn ? 'আপনার প্রোফাইল সক্রিয়।' : 'Your profile is active and discoverable.') : (bn ? 'প্রোফাইল সম্পূর্ণ করে সক্রিয় করুন।' : 'Complete and activate your profile to be discoverable.')}</p>
          </section>
        </div>
      </div>
    </main>
  )
}

export default MemberDashboard
