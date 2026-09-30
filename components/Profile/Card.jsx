import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { calculateAge, englishToBangla, heightToFeet } from '@/utils'
import { getText } from '@/Translation/profile'
import Ln from '../utils/Ln'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded'
import styles from '@/styles/Profile/Card.module.css'

function ProfileSymbol () {
  return <svg viewBox='0 0 80 80' fill='none' aria-hidden='true' focusable='false'>
    <circle cx='40' cy='40' r='32' stroke='currentColor' strokeOpacity='.18' />
    <circle cx='40' cy='30' r='10' stroke='currentColor' strokeWidth='2.4' />
    <path d='M22 59c0-10 8-17 18-17s18 7 18 17' stroke='currentColor' strokeWidth='2.4' strokeLinecap='round' />
    <path d='m63 12 1.5 4.5L69 18l-4.5 1.5L63 24l-1.5-4.5L57 18l4.5-1.5L63 12Z' fill='currentColor' />
    <circle cx='15' cy='59' r='2.5' fill='currentColor' fillOpacity='.45' />
  </svg>
}

export default function Card ({ user, handleLike, variant }) {
  const router = useRouter()
  const userInfo = useSelector(state => state.user.userInfo)
  const ln = router.locale
  const bn = ln === 'bn'
  const saved = user?.saverIds?.some(id => String(id) === String(userInfo?.id))
  const count = value => bn ? englishToBangla(String(value || 0), ln) : value || 0
  const profileHref = '/profile/' + (user?.profileId || user?._id)
  const fields = [
    { label: getText('age', ln), value: user?.bornAt ? calculateAge(user.bornAt, ln) : '—' },
    { label: getText('height', ln), value: user?.height ? heightToFeet(user.height, ln) : '—' },
    { label: getText('color', ln), value: <Ln item={user?.skinColor || '—'} /> },
    { label: bn ? 'অবস্থান' : 'Location', value: user?.city || '—' },
    { label: getText('ocupation', ln), value: <Ln item={user?.profession || '—'} /> }
  ]
  return <article className={styles.container + (variant === 'glass' ? ' ' + styles.glassCard : '')}>
    <Link href={profileHref} className={styles.profileLink} aria-label={(bn ? 'প্রোফাইল দেখুন ' : 'View profile ') + (user?.profileId || '')}>
      <div className={styles.heading}>
        <div className={styles.symbol + (user?.gender === 'Female' ? ' ' + styles.warm : '')}><ProfileSymbol /></div>
        <div className={styles.identity}>
          <span className={styles.eyebrow}>{bn ? 'সদস্য প্রোফাইল' : 'MEMBER PROFILE'}</span>
          <h3 className={styles.profileId}>#{user?.profileId || '—'}</h3>
          <span className={styles.gender}><Ln item={user?.gender || '—'} /></span>
        </div>
        {user?.isVerified && <span className={styles.verified} title={bn ? 'যাচাইকৃত' : 'Verified'}><VerifiedRoundedIcon /><span className={styles.srOnly}>{bn ? 'যাচাইকৃত' : 'Verified'}</span></span>}
      </div>
      <dl className={styles.details}>
        {fields.map(field => <div key={field.label} className={styles.fact}><dt>{field.label}</dt><dd>{field.value}</dd></div>)}
      </dl>
      <span className={styles.viewProfile}>{bn ? 'প্রোফাইল দেখুন' : 'View profile'}<span aria-hidden='true'>↗</span></span>
    </Link>
    <div className={styles.interactions}>
      {handleLike ? <button type='button' className={styles.save + (saved ? ' ' + styles.saved : '')} onClick={() => handleLike()} aria-pressed={Boolean(saved)} aria-label={bn ? (saved ? 'সংরক্ষণ সরান' : 'প্রোফাইল সংরক্ষণ করুন') : (saved ? 'Unsave profile' : 'Save profile')}>
        {saved ? <FavoriteIcon /> : <FavoriteBorderIcon />}<span>{count(user?.saverIds?.length)}</span><span>{bn ? 'সংরক্ষিত' : 'Saved'}</span>
      </button> : <span className={styles.metric}><FavoriteBorderIcon /><span>{count(user?.saverIds?.length)}</span><span>{bn ? 'সংরক্ষিত' : 'Saved'}</span></span>}
      <span className={styles.metric}><RemoveRedEyeIcon /><span>{count(user?.click)}</span><span>{bn ? 'দেখেছেন' : 'Views'}</span></span>
    </div>
  </article>
}