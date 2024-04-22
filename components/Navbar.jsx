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
import Logo2 from './utils/Logo2'
import Image from 'next/image'
import { mail } from '@/const'

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
    dispatch(logout())
    setOpen(false)
    router.push('/login')
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.menu}>
        <MenuIcon onClick={() => setPhone(true)} />
      </div>
      {open && <SideNavbar handleLogout={handleLogout} setOpen={setOpen} />}
      <div className={styles.logo}>
        <Logo />
        {/* <Logo2 /> */}
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
          onClick={() => router.push(`mailto:${mail}`)}
        >
          {getText('h2', ln)}
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
            <Image
              src='https://cdn-icons-png.flaticon.com/128/3371/3371885.png'
              width={35}
              height={35}
              alt=''
            />
          ) : (
            <Image
              src='https://cdn-icons-png.flaticon.com/128/555/555417.png'
              width={30}
              height={30}
              alt=''
            />
          )}
        </div>
      </div>

      <div className={styles.right}>
        {isClient && userInfo ? (
          <div
            className={styles.icon}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              border: '1px solid blue',
              padding: '3px 5px',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
            onClick={() => {
              setOpen(prev => !prev)
              setPhone(false)
            }}
          >
            <>
              <span>{getText('profile', ln)}</span>{' '}
              {open ? (
                <CancelIcon style={{ color: 'red' }} />
              ) : (
                <AccountCircleIcon />
              )}
            </>
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
                <Image
                  src='https://cdn-icons-png.flaticon.com/128/3371/3371885.png'
                  width={35}
                  height={35}
                  alt=''
                />
              ) : (
                <Image
                  src='https://cdn-icons-png.flaticon.com/128/555/555417.png'
                  width={30}
                  height={30}
                  alt=''
                />
              )}
            </div>
          </div>

          <div className={styles.right}>
            {userInfo ? (
              <div
                className={styles.item}
                style={{
                  background: 'red',
                  color: 'white'
                }}
                onClick={() => dispatch(logout())}
              >
                {trans('logout', ln)}
              </div>
            ) : (
              <div className={styles.item}> {trans('login', ln)}</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
