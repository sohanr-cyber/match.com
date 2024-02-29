import React from 'react'
import styles from '../styles/Steps.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { getText } from '@/Translation/steps'

const Steps = () => {
  const router = useRouter()
  const ln = router.locale

  const steps = [
    {
      title: `${getText('c1h', ln)}`,
      description: getText('c1p', ln),
      image: 'https://cdn-icons-png.flaticon.com/128/1057/1057240.png'
    },
    {
      title: getText('c2h', ln),
      description: getText('c2p', ln),
      image: 'https://cdn-icons-png.flaticon.com/128/9800/9800545.png'
    },
    {
      title: getText('c3p', ln),
      description: getText('c3p', ln),
      image: 'https://cdn-icons-png.flaticon.com/128/1653/1653630.png'
    }
  ]
  return (
    <div className={styles.wrapper}>
      <h1>How You can coneect with us</h1>
      <p>{getText('p', ln)}</p>
      <div className={styles.flex}>
        {steps.map((item, index) => (
          <div className={styles.item} key={index}>
            <div className={styles.image__container}>
              <Image src={item.image} width={'70'} height={'70'} alt='' />
            </div>
            <div className={styles.rightItem}>
              {' '}
              <div className={styles.title}>{item.title}</div>
              <div className={styles.description}>{item.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Steps
