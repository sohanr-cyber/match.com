import React from 'react'
import Link from 'next/link'
import styles from '@/styles/Signin.module.css'
import { getText } from '@/Translation/account'

const AuthFrame = ({ mode, locale, children }) => {
  const bn = locale === 'bn'
  const isLogin = mode === 'login'

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <aside className={styles.story}>
          <div className={styles.storyContent}>
            <span className={styles.eyebrow}>{isLogin ? (bn ? 'বিশ্বাসের সাথে শুরু' : 'A meaningful beginning') : (bn ? 'একটি অর্থপূর্ণ শুরু' : 'Begin with intention')}</span>
            <h1>{isLogin ? (bn ? 'আপনার গল্পের পরবর্তী অধ্যায় এখানে শুরু হোক।' : 'A beautiful story starts with the right connection.') : (bn ? 'আপনার ভবিষ্যতের পথে প্রথম পদক্ষেপ নিন।' : 'The next chapter of your life begins here.')}</h1>
            <p>{isLogin ? (bn ? 'বিশ্বাস, মূল্যবোধ ও ভবিষ্যতের স্বপ্নকে গুরুত্ব দিয়ে আপনার উপযুক্ত সঙ্গী খুঁজুন।' : 'Find someone who shares your values, your faith, and your vision for the future.') : (bn ? 'মূল্যবোধ ও বিশ্বাসে মিল আছে এমন একজন মানুষকে খোঁজার যাত্রা শুরু করুন।' : 'Create your profile and make space for a connection built on shared values.')}</p>
            <div className={styles.storyRule} />
            <span className={styles.storySignature}>Muslim Match Maker</span>
          </div>
          <div className={styles.orbit} aria-hidden='true'><span /><span /><span /></div>
        </aside>
        <section className={styles.formSide} aria-labelledby='auth-title'>
          <div className={styles.formInner}>
            <Link href='/' className={styles.brandMark}><span className={styles.brandIcon}>✦</span> Muslim Match Maker</Link>
            <nav className={styles.tabs} aria-label={bn ? 'অ্যাকাউন্ট' : 'Account'}>
              {isLogin ? <span className={styles.activeTab} aria-current='page'>{getText('login', locale)}</span> : <Link href='/login' className={styles.tab}>{getText('login', locale)}</Link>}
              {isLogin ? <Link href='/register' className={styles.tab}>{getText('signup', locale)}</Link> : <span className={styles.activeTab} aria-current='page'>{getText('signup', locale)}</span>}
            </nav>
            {children}
          </div>
        </section>
      </div>
    </main>
  )
}

export default AuthFrame
