import Image from 'next/image'
import React from 'react'
import styles from '../styles/Chat.module.css'
import { useRouter } from 'next/router'

const Chat = () => {
  const router = useRouter()


  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.chat__link}>
          <div
            className={styles.icon}
            onClick={() => router.push('http://Wa.me/+8801744329811')}
          >
            <Image
              src='https://cdn-icons-png.flaticon.com/128/3670/3670051.png'
              width='35'
              height='35'
              alt='inst'
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Chat
