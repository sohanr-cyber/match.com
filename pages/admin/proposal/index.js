import { proposalStatuses } from '@/utility/proposal-timeline'
import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import useAdminData from '@/components/Admin/useAdminData'
import styles from '@/styles/Dashboard.module.css'

export default function AdminProposals () {
  const [status, setStatus] = useState('all')
  const [page, setPage] = useState(1)
  const { data, loading, error, retry } = useAdminData('/api/admin/proposal?page=' + page + '&status=' + encodeURIComponent(status))
  return <main className={styles.page}><Head><title>Proposals | Admin</title><meta name='robots' content='noindex, nofollow' /></Head>
    <div className={styles.inner}>
      <header className={styles.hero}>
        <div className={styles.heroCopy}><span className={styles.kicker}>PROPOSAL MANAGEMENT</span><h1>Proposals</h1><p>Review proposals across the community and open their details.</p></div>
        <Link href='/admin' className={styles.heroAction}>← Overview</Link>
      </header>
      <div className={styles.toolbar}>
        <label htmlFor='proposal-status'>Status</label>
        <select id='proposal-status' value={status} onChange={event => { setStatus(event.target.value); setPage(1) }}>
          <option value='all'>All proposals</option>{proposalStatuses.map(value => <option key={value} value={value}>{value === 'pending' ? 'Pending' : value}</option>)}
        </select>
      </div>
      {error && <div className={styles.notice} role='alert'>{error}<div className={styles.pager}><button onClick={retry} type='button'>Try again</button></div></div>}
      <section className={styles.panel} aria-busy={loading}>
        <div className={styles.panelHeader}><h2>All proposals</h2><span className={styles.muted}>{loading ? 'Loading…' : (data?.total || 0) + ' proposals'}</span></div>
        {loading ? <p role='status'>Loading proposals…</p> : !error && <>
          <div className={styles.tableWrap}><table className={styles.table}>
            <thead><tr><th>Sender</th><th>Recipient</th><th>Status</th><th>Sent</th><th>Details</th></tr></thead>
            <tbody>{data?.proposals.map(item => <tr key={item._id}>
              <td>{item.sender?.name || 'Deleted member'}<div className={styles.muted}>{item.sender?.profileId ? '#' + item.sender.profileId : '—'}</div></td>
              <td>{item.reciever?.name || 'Deleted member'}<div className={styles.muted}>{item.reciever?.profileId ? '#' + item.reciever.profileId : '—'}</div></td>
              <td><span className={styles.badge + (item.status === 'pending' ? ' ' + styles.pending : '')}>{item.status}</span></td>
              <td>{new Date(item.createdAt).toLocaleDateString()}</td>
              <td><Link href={'/admin/proposal/' + item._id} aria-label={'View proposal from ' + (item.sender?.name || 'deleted member')}>View details ↗</Link></td>
            </tr>)}</tbody>
          </table></div>
          {!data?.proposals.length && <p className={styles.muted}>No proposals match this filter.</p>}
          <div className={styles.pager}>
            <button type='button' disabled={page <= 1} onClick={() => setPage(value => value - 1)}>Previous</button>
            <span>Page {page} of {data?.pages || 1}</span>
            <button type='button' disabled={page >= (data?.pages || 1)} onClick={() => setPage(value => value + 1)}>Next</button>
          </div>
        </>}
      </section>
    </div>
  </main>
}