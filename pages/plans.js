import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '@/styles/Plans.module.css'

const Plans = () => {
  const router = useRouter()
  const bn = router.locale === 'bn'
  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <span className={styles.kicker}>{bn ? 'সহজভাবে শুরু করুন' : 'SIMPLE BY DESIGN'}</span>
        <h1>{bn ? 'অর্থপূর্ণ সম্পর্কের যাত্রা সবার জন্য।' : 'A meaningful beginning, open to everyone.'}</h1>
        <p className={styles.lead}>{bn ? 'এখন মুসলিম ম্যাচ মেকারের মূল সুবিধাগুলো বিনামূল্যে ব্যবহার করুন।' : 'Our core matchmaking experience is currently free for every member.'}</p>
        <div className={styles.card}>
          <div className={styles.cardTop}><span>{bn ? 'বর্তমান পরিকল্পনা' : 'CURRENT PLAN'}</span><strong>{bn ? 'বিনামূল্যে' : 'Free'}</strong></div>
          <div className={styles.price}>৳0 <small>{bn ? '/ এখন' : '/ now'}</small></div>
          <p>{bn ? 'বিশ্বাস, মূল্যবোধ এবং সম্মানকে সামনে রেখে পরিচিত হন।' : 'Meet with intention, guided by shared values and respect.'}</p>
          <ul>
            <li>{bn ? 'প্রোফাইল তৈরি ও সম্পাদনা' : 'Create and refine your profile'}</li>
            <li>{bn ? 'পছন্দের সদস্য খুঁজুন' : 'Search and explore members'}</li>
            <li>{bn ? 'প্রস্তাব পাঠান ও পর্যালোচনা করুন' : 'Send and review proposals'}</li>
            <li>{bn ? 'মোবাইলে গুরুত্বপূর্ণ বিজ্ঞপ্তি পান' : 'SMS alerts for verified phone accounts'}</li>
          </ul>
          <Link href='/register' className={styles.button}>{bn ? 'শুরু করুন' : 'Get started'} <span>→</span></Link>
        </div>
        <p className={styles.note}>{bn ? 'ভবিষ্যতে নতুন পরিকল্পনা এলে এখানে জানানো হবে।' : 'If plans change in the future, we will show the details here.'}</p>
      </div>
    </main>
  )
}

export default Plans
