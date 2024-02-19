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
const SideNavbar = ({ handleLogout }) => {
  const userInfo = useSelector(state => state.user.userInfo)
  const router = useRouter()
  return (
    <div className={styles.wrapper}>
      <div className={styles.profile}>
        <Logo />
        <div className={styles.image}>
          <div className={styles.pic}>
            {' '}
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
          onClick={() => router.push(`/profile/dashboard/${userInfo.id}`)}
        >
          <div className={styles.icon}>
            <DashboardIcon />
          </div>
          <div className={styles.title}>My Profile</div>
        </div>
        <div
          className={styles.item}
          onClick={() => router.push(`/profile/update/${userInfo.id}`)}
        >
          <div className={styles.icon}>
            <EditNoteIcon />
          </div>
          <div className={styles.title}>Edit Profile</div>
        </div>
        <div
          className={styles.item}
          onClick={() => router.push(`/profile/proposal/${userInfo.id}`)}
        >
          <div className={styles.icon}>
            <EmailIcon />
          </div>
          <div className={styles.title}>Proposal</div>
        </div>
        <div
          className={styles.item}
          onClick={() => router.push(`/profile/liked/${userInfo.id}`)}
        >
          <div className={styles.icon}>
            <FavoriteIcon />
          </div>
          <div className={styles.title}>Liked</div>
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
            Logout
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.icon}>
            <SettingsIcon />
          </div>
          <div className={styles.title}>Setting</div>
        </div>
      </div>
    </div>
  )
}

export default SideNavbar
