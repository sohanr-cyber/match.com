import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { routes } from '@/utility/data'
import styles from '@/styles/Profile/Update/Page.module.css'

const Routes = ({ activeStep, completion, locale }) => {
  const router = useRouter()
  const bn = locale === 'bn'
  return <nav className={styles.steps} aria-label={bn ? 'প্রোফাইলের অংশসমূহ' : 'Profile sections'}>
    <div className={styles.stepsHeading}>
      <span>{bn ? 'প্রোফাইলের অংশসমূহ' : 'PROFILE SECTIONS'}</span>
    </div>
    <div className={styles.stepsList}>
      {routes.map((item, index) => {
        const active = item.query === activeStep
        const progress = completion.sections[item.query]
        const status = progress.optional
          ? (bn ? 'ঐচ্ছিক' : 'Optional')
          : progress.complete
            ? (bn ? 'সম্পূর্ণ' : 'Complete')
            : progress.completed
              ? (bn ? `${progress.percent}% সম্পূর্ণ` : `${progress.percent}% done`)
              : (bn ? 'শুরু হয়নি' : 'Not started')
        return <Link
          key={item.query}
          href={{ pathname: '/profile/update/[id]', query: { id: router.query.id, update: item.query } }}
          className={active ? styles.stepActive : styles.step}
          aria-current={active ? 'step' : undefined}
          aria-label={`${bn ? item.nameBn || item.name.trim() : item.name.trim()}: ${status}`}
        >
          <span className={progress.complete ? styles.stepComplete : styles.stepNumber} aria-hidden='true'>
            {progress.complete ? '✓' : progress.optional ? '·' : String(index + 1).padStart(2, '0')}
          </span>
          <span className={styles.stepInfo}>
            <span className={styles.stepTop}><span className={styles.stepLabel}>{bn ? item.nameBn || item.name.trim() : item.name.trim()}</span><span className={styles.stepStatus}>{progress.optional ? '○' : progress.complete ? '✓' : `${progress.percent}%`}</span></span>
            {!progress.optional && <span className={styles.stepTrack} aria-hidden='true'><span style={{ width: progress.percent + '%' }} /></span>}
            <span className={styles.stepCaption}>{status}</span>
          </span>
          <span className={styles.stepArrow} aria-hidden='true'>↗</span>
        </Link>
      })}
    </div>
  </nav>
}

export default Routes