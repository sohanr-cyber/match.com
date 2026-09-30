import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import axios from 'axios'
import styles from '@/styles/Dashboard.module.css'

const AdminUsers = () => {
  const router = useRouter()
  const userInfo = useSelector(state => state.user.userInfo)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [page, setPage] = useState(1)
  const [result, setResult] = useState({ users: [], total: 0, pages: 1 })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userInfo?.token) {
      router.replace('/login')
      return
    }
    let cancelled = false
    const timer = setTimeout(() => {
      setLoading(true)
      axios.get('/api/auth/users', {
        params: { page, search, status },
        headers: { Authorization: 'Bearer ' + userInfo.token }
      }).then(({ data }) => {
        if (!cancelled) { setResult(data); setError(''); setLoading(false) }
      }).catch(error => {
        if (!cancelled) {
          setError(error.response?.status === 403 ? 'Admin access required.' : 'Could not load members.')
          setLoading(false)
        }
      })
    }, 250)
    return () => { cancelled = true; clearTimeout(timer) }
  }, [userInfo?.token, page, search, status, router])

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.kicker}>MEMBER MANAGEMENT</span>
            <h1>Members</h1>
            <p>Find accounts, review verification status, and open member profiles.</p>
          </div>
          <Link href='/admin' className={styles.heroAction}>← Overview</Link>
        </header>
        <div className={styles.toolbar}>
          <input aria-label='Search members' placeholder='Search name, email, phone, or profile ID' value={search} onChange={event => { setSearch(event.target.value); setPage(1) }} />
          <select aria-label='Filter members' value={status} onChange={event => { setStatus(event.target.value); setPage(1) }}>
            <option value='all'>All members</option>
            <option value='active'>Active profiles</option>
            <option value='pending'>Pending verification</option>
          </select>
        </div>
        {error && <div className={styles.notice} role='alert'>{error}</div>}
        <section className={styles.panel}>
          <div className={styles.panelHeader}><h2>Directory</h2><span className={styles.muted}>{loading ? 'Loading…' : result.total + ' members'}</span></div>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead><tr><th>Member</th><th>Contact</th><th>Joined</th><th>Verification</th><th>Profile</th><th>Actions</th></tr></thead>
              <tbody>
                {result.users.map(user => <tr key={user._id}>
                  <td>{user.name}<div className={styles.muted}>#{user.profileId}</div></td>
                  <td>{user.phone || user.email || '—'}</td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td><span className={user.isVerified ? styles.badge : styles.badge + ' ' + styles.pending}>{user.isVerified ? 'Verified' : 'Pending'}</span></td>
                  <td><Link href={'/profile/' + user.profileId}>View ↗</Link></td>
                  <td><Link className={styles.updateAction} href={'/profile/update/' + user._id}>Update profile <span aria-hidden='true'>↗</span></Link></td>
                </tr>)}
              </tbody>
            </table>
          </div>
          {!loading && result.users.length === 0 && <p className={styles.muted}>No members match your filters.</p>}
          <div className={styles.pager}>
            <button type='button' disabled={page <= 1 || loading} onClick={() => setPage(page - 1)}>Previous</button>
            <span>Page {page} of {result.pages}</span>
            <button type='button' disabled={page >= result.pages || loading} onClick={() => setPage(page + 1)}>Next</button>
          </div>
        </section>
      </div>
    </main>
  )
}

export default AdminUsers
