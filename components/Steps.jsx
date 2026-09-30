import React from 'react'
import styles from '../styles/Steps.module.css'
import { useRouter } from 'next/router'
import { getText } from '@/Translation/steps'
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded'
import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded'
import HandshakeRoundedIcon from '@mui/icons-material/HandshakeRounded'

const Steps = () => {
  const router = useRouter()
  const ln = router.locale
  const steps = [
    { title: getText('c1h', ln), description: getText('c1p', ln), icon: <PersonAddAlt1RoundedIcon /> },
    { title: getText('c2h', ln), description: getText('c2p', ln), icon: <ManageSearchRoundedIcon /> },
    { title: getText('c3h', ln), description: getText('c3p', ln), icon: <HandshakeRoundedIcon /> }
  ]

  return (
    <section className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles.intro}>
          <span className={styles.kicker}>{ln === 'bn' ? 'কীভাবে শুরু করবেন' : 'A SIMPLE, THOUGHTFUL PROCESS'}</span>
          <h2>{getText('h1', ln)}</h2>
          <p>{getText('p', ln)}</p>
        </div>
        <div className={styles.flex}>
          {steps.map((item, index) => (
            <article className={styles.item} key={item.title}>
              <div className={styles.stepTop}>
                <div className={styles.image__container}>{item.icon}</div>
                <span className={styles.number}>0{index + 1}</span>
              </div>
              <div className={styles.rightItem}>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.description}>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Steps