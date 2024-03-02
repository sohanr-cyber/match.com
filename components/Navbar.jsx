import React, { useEffect, useState } from 'react'
import styles from './../styles/Navbar.module.css'
import Logo from './utils/Logo'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '@/redux/userSlice'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SideNavbar from './Profile/SideNavbar'
import CancelIcon from '@mui/icons-material/Cancel'
import { getText } from '@/Translation/footer'
import { getText as trans } from '@/Translation/account'

const Navbar = () => {
  const router = useRouter()
  const [phone, setPhone] = useState()
  const userInfo = useSelector(state => state.user.userInfo)
  const [isClient, setIsClient] = useState(false)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const { pathname, locale, query, asPath } = router
  const ln = locale
  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleLogout = () => {
    dispatch(logout)
    setOpen(false)
    router.push('/login')
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.menu}>
        <MenuIcon onClick={() => setPhone(true)} />
      </div>
      {open && <SideNavbar handleLogout={handleLogout} />}
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.items}>
        <div className={styles.item} onClick={() => router.push('/')}>
          {getText('home', ln)}
        </div>
        <div
          className={styles.item}
          onClick={() =>
            router.push(
              '/profile?gender=All&maritalStatuses=All&city=All&district=All&upazilla=All&feetFrom=4&inchesFrom=5&feetTo=6&inchesTo=5&page=1'
            )
          }
        >
          {getText('search', ln)}
        </div>
        <div
          className={styles.item}
          onClick={() =>
            router.push({ pathname, query }, asPath, {
              locale: router.locale == 'bn' ? 'en-US' : 'bn'
            })
          }
        >
          {locale == 'en-US' ? (
            <span
              style={{
                color: 'red',
                backgroundColor: 'yellow',
                padding: '3px 5px'
              }}
            >
              বাংলা
            </span>
          ) : (
            <span
              style={{
                color: 'white',
                backgroundColor: 'red',
                padding: '3px 5px'
              }}
            >
              English
            </span>
          )}
        </div>

        <div className={styles.item}>Contact Us</div>
        {isClient && userInfo && (
          <div
            className={styles.item}
            onClick={() => router.push(`/profile/${userInfo.id}`)}
          >
            Profile
          </div>
        )}
      </div>

      <div className={styles.right}>
        {isClient && userInfo ? (
          <div className={styles.icon}>
            {open ? (
              <CancelIcon
                onClick={() => {
                  setOpen(prev => !prev)
                  setPhone(false)
                }}
                style={{ color: 'red' }}
              />
            ) : (
              <AccountCircleIcon
                onClick={() => {
                  setOpen(prev => !prev)
                  setPhone(false)
                }}
              />
            )}
          </div>
        ) : (
          <div className={styles.item} onClick={() => router.push('/login')}>
            {trans('login', ln)}
          </div>
        )}
      </div>

      {phone && (
        <div className={styles.mobile__nav}>
          <div className={styles.menu}>
            <CloseIcon onClick={() => setPhone(false)} />
          </div>
          <div className={styles.items}>
            <div className={styles.item} onClick={() => router.push('/')}>
              {' '}
              {getText('home', ln)}
            </div>
            <div
              className={styles.item}
              onClick={() =>
                router.push(
                  '/profile?gender=All&maritalStatuses=All&city=All&district=All&upazilla=All&feetFrom=4&inchesFrom=5&feetTo=6&inchesTo=5&page=1'
                )
              }
            >
              {' '}
              {getText('search', ln)}
            </div>
            <div className={styles.item} onClick={() => router.push('/plans')}>
              {' '}
              {getText('plans', ln)}
            </div>
            <div className={styles.item}> {getText('h2', ln)}</div>
            <div
              className={styles.item}
              onClick={() =>
                router.push({ pathname, query }, asPath, {
                  locale: router.locale == 'bn' ? 'en-US' : 'bn'
                })
              }
            >
              {locale == 'en-US' ? (
                <span
                  style={{
                    color: 'red',
                    backgroundColor: 'yellow',
                    padding: '3px 5px'
                  }}
                >
                  বাংলা
                </span>
              ) : (
                <span
                  style={{
                    color: 'white',
                    backgroundColor: 'red',
                    padding: '3px 5px'
                  }}
                >
                  English
                </span>
              )}
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.item}> {trans('login', ln)}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
