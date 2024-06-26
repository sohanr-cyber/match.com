import React from 'react'
import styles from '../../styles/Profile/SideNavbar.module.css'
import DashboardIcon from '@mui/icons-material/Dashboard'
import EditNoteIcon from '@mui/icons-material/EditNote'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import LogoutIcon from '@mui/icons-material/Logout'
import SettingsIcon from '@mui/icons-material/Settings'
import EmailIcon from '@mui/icons-material/Email'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Logo from '../utils/Logo'
import { getText } from '@/Translation/sideNavbar'

const SideNavbar = ({ handleLogout, setOpen }) => {
  const userInfo = useSelector(state => state.user.userInfo)
  const router = useRouter()
  const locale = router.locale
  const { pathname, asPath, query } = router

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.back}
        onClick={() => {
          setOpen(false)
        }}
      >
        X
      </div>
      <div className={styles.profile}>
        <Logo />
        <div className={styles.image}>
          <div className={styles.pic}>
            {userInfo.active ? (
              <span style={{ background: 'green' }}></span>
            ) : (
              <span style={{ background: 'red' }}></span>
            )}
            F
          </div>
        </div>
        <div className={styles.name}>{userInfo.name}</div>
        {/* <div
          className={styles.btn}
          onClick={() => router.push(`/profile/${userInfo.id}`)}
        >
          My profile
        </div> */}
      </div>
      <div className={styles.items}>
        <div
          className={styles.item}
          onClick={() => router.push(`/profile/${userInfo.profileId}`)}
        >
          <div className={styles.icon}>
            <DashboardIcon />
          </div>
          <div className={styles.title}>{getText('mProfile', locale)}</div>
        </div>
        <div
          className={styles.item}
          onClick={() => router.push(`/profile/update/${userInfo.profileId}`)}
        >
          <div className={styles.icon}>
            <EditNoteIcon />
          </div>
          <div className={styles.title}>{getText('eProfile', locale)}</div>
        </div>
        <div
          className={styles.item}
          onClick={() => router.push(`/profile/proposal/${userInfo.id}`)}
        >
          <div className={styles.icon}>
            <EmailIcon />
          </div>
          <div className={styles.title}>{getText('proposal', locale)}</div>
        </div>
        <div
          className={styles.item}
          onClick={() => router.push(`/profile/liked/${userInfo.id}`)}
        >
          <div className={styles.icon}>
            <FavoriteIcon />
          </div>
          <div className={styles.title}>{getText('liked', locale)}</div>
        </div>
        {/* <div
          className={styles.item}
          onClick={() => router.push(`/profile/disliked/${userInfo.id}`)}
        >
          <div className={styles.icon}>
            <ThumbDownIcon />
          </div>
          <div className={styles.title}>Disliked</div>
        </div> */}
        <div className={styles.item}>
          <div className={styles.icon}>
            <LogoutIcon />
          </div>
          <div className={styles.title} onClick={() => handleLogout()}>
            {getText('logout', locale)}
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.icon}>
            <SettingsIcon />
          </div>
          <div className={styles.title}>{getText('setting', locale)}</div>
        </div>
      </div>
    </div>
  )
}

export default SideNavbar
