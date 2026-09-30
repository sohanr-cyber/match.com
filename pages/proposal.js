import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import Proposal from '@/components/Activity/Proposal'
import styles from '@/styles/Profile/Proposal.module.css'

export default function ProposalPage () {
  const router = useRouter()
  const userInfo = useSelector(state => state.user.userInfo)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])
  useEffect(() => {
    if (router.isReady && !userInfo?.token) router.replace('/login')
  }, [router, router.isReady, userInfo?.token])

  return <main className={styles.page}>
    <Head>
      <title>{router.locale === 'bn' ? 'প্রস্তাবসমূহ' : 'Your proposals'} | Muslim Match Maker</title>
      <meta name='robots' content='noindex, nofollow' />
    </Head>
    <div className={styles.container}>
      {mounted && userInfo?.token ? <Proposal /> :
        <p className={styles.empty} role='status'>{router.locale === 'bn' ? 'লোড হচ্ছে…' : 'Loading…'}</p>}
    </div>
  </main>
}