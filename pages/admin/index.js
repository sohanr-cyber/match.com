import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import axios from 'axios'
import styles from '@/styles/Dashboard.module.css'

const AdminDashboard = () => {
  const router = useRouter()
  const userInfo = useSelector(state => state.user.userInfo)
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const bn = router.locale === 'bn'

  useEffect(() => {
    if (!userInfo?.token) {
      router.replace('/login')
      return
    }
    let cancelled = false
    axios.get('/api/dashboard/admin', { headers: { Authorization: 'Bearer ' + userInfo.token } })
      .then(({ data }) => { if (!cancelled) setData(data) })
      .catch(error => { if (!cancelled) setError(error.response?.status === 403 ? 'Admin access required.' : 'Could not load the admin dashboard.') })
    return () => { cancelled = true }
  }, [userInfo?.token, router])

  const stats = data?.stats || {}
  const cards = [
    ['Total members', stats.totalUsers || 0],
    ['Active profiles', stats.activeUsers || 0],
    ['Verified accounts', stats.verifiedUsers || 0],
    ['Pending proposals', stats.pendingProposals || 0]
  ]
  const chart = useMemo(() => {
    const byDate = new Map((data?.signups || []).map(item => [item._id, item.count]))
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date()
      date.setDate(date.getDate() - (6 - index))
      const key = date.toISOString().slice(0, 10)
      return { day: date.toLocaleDateString('en', { weekday: 'short' }), count: byDate.get(key) || 0 }
    })
  }, [data?.signups])
  const max = Math.max(1, ...chart.map(item => item.count))

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.kicker}>ADMIN OVERVIEW</span>
            <h1>{bn ? 'কমিউনিটির অবস্থা' : 'Community overview'}</h1>
            <p>{bn ? 'সদস্য, যাচাই এবং প্রস্তাবের সাম্প্রতিক তথ্য।' : 'A clear view of membership, verification, and proposal activity.'}</p>
          </div>
          <Link href='/admin/user' className={styles.heroAction}>Manage members ↗</Link>
        </header>
        {error && <div className={styles.notice} role='alert'>{error}</div>}
        <div className={styles.stats}>{cards.map(([label, value]) => <div className={styles.stat} key={label}><span>{label}</span><strong>{value}</strong><small>{label === 'Total members' ? (stats.newUsers || 0) + ' joined this week' : 'Live database total'}</small></div>)}</div>
        <div className={styles.grid}>
          <section className={styles.panel}>
            <div className={styles.panelHeader}><h2>New members this week</h2><span className={styles.muted}>{stats.newUsers || 0} signups</span></div>
            <div className={styles.chart}>{chart.map(item => <div className={styles.barGroup} key={item.day}><div className={styles.bar} title={item.count + ' signups'} style={{ height: Math.max(4, item.count / max * 115) }} /><span>{item.day}</span></div>)}</div>
          </section>
          <section className={styles.panel}>
            <div className={styles.panelHeader}><h2>Proposal health</h2></div>
            <div className={styles.stats} style={{ gridTemplateColumns: '1fr 1fr', margin: 0 }}>
              <div className={styles.stat}><span>Total</span><strong>{stats.totalProposals || 0}</strong></div>
              <div className={styles.stat}><span>Accepted</span><strong>{stats.acceptedProposals || 0}</strong></div>
            </div>
            <p className={styles.muted}>Monitor pending requests and help members stay engaged.</p>
          </section>
          <section className={styles.panel}>
            <div className={styles.panelHeader}><h2>Recent members</h2><Link href='/admin/user'>View all</Link></div>
            <div className={styles.list}>{data?.recentUsers?.map(user => <div className={styles.row} key={user._id}><div className={styles.rowMain}><strong>{user.name}</strong><span>#{user.profileId} · {new Date(user.createdAt).toLocaleDateString()}</span></div><span className={user.isVerified ? styles.badge : styles.badge + ' ' + styles.pending}>{user.isVerified ? 'Verified' : 'Pending'}</span></div>)}</div>
          </section>
          <section className={styles.panel}>
            <div className={styles.panelHeader}><h2>Recent proposals</h2><Link href='/admin/proposal'>View all</Link></div>
            <div className={styles.list}>{data?.recentProposals?.map(item => <div className={styles.row} key={item.id}><div className={styles.rowMain}><strong><Link href={'/admin/proposal/' + item.id}>{item.sender} → {item.reciever}</Link></strong><span>{new Date(item.createdAt).toLocaleDateString()}</span></div><span className={item.status === 'pending' ? styles.badge + ' ' + styles.pending : styles.badge}>{item.status}</span></div>)}</div>
          </section>
        </div>
      </div>
    </main>
  )
}

export default AdminDashboard
