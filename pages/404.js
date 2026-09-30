import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '@/styles/Plans.module.css'

export default function Custom404 () {
  const router = useRouter()
  const bn = router.locale === 'bn'
  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <span className={styles.kicker}>404 · {bn ? 'পাওয়া যায়নি' : 'PAGE NOT FOUND'}</span>
        <h1>{bn ? 'এই পথটি খুঁজে পাওয়া যায়নি।' : 'This page is not here.'}</h1>
        <p className={styles.lead}>{bn ? 'চলুন আবার শুরু করি এবং আপনার জন্য ঠিক মানুষটিকে খুঁজি।' : 'Let’s get you back to a meaningful place.'}</p>
        <Link href='/' className={styles.button} style={{ maxWidth: 220, margin: '32px auto 0' }}>{bn ? 'হোমে ফিরুন' : 'Back to home'} →</Link>
      </div>
    </main>
  )
}
