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
const Navbar = () => {
  const router = useRouter()
  const [phone, setPhone] = useState()
  const userInfo = useSelector(state => state.user.userInfo)
  const [isClient, setIsClient] = useState(false)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)

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
          Home
        </div>
        <div className={styles.item}>Search</div>
        <div className={styles.item}>Plans</div>
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
            Sign In
          </div>
        )}
      </div>

      {phone && (
        <div className={styles.mobile__nav}>
          <div className={styles.menu}>
            <CloseIcon onClick={() => setPhone(false)} />
          </div>
          <div className={styles.items}>
            <div className={styles.item}>Home</div>
            <div className={styles.item}>Search</div>
            <div className={styles.item}>Plans</div>
            <div className={styles.item}>Contact Us</div>
          </div>
          <div className={styles.right}>
            <div className={styles.item}>Sign In</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
