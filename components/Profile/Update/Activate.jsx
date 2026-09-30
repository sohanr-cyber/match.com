import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useRouter } from 'next/router'
import { login } from '@/redux/userSlice'
import { finishLoading, startLoading } from '@/redux/stateSlice'
import { showSnackBar } from '@/redux/notistackSlice'
import { getText } from '@/Translation/profile'
import styles from '@/styles/Profile/Activation.module.css'

const Activate = ({ profile }) => {
  const [confirming, setConfirming] = useState(false)
  const [saving, setSaving] = useState(false)
  const router = useRouter()
  const userInfo = useSelector(state => state.user.userInfo)
  const dispatch = useDispatch()
  const active = Boolean(profile.user.active)
  const eligible = Boolean(profile.user.isVerified)
  const targetActive = !active
  const verb = targetActive ? getText('activate', router.locale) : getText('deactivate', router.locale)

  const update = async () => {
    if (saving || (targetActive && !eligible)) return
    setSaving(true)
    dispatch(startLoading())
    try {
      const { data } = await axios.put('/api/auth/register', {
        ...profile.user, active: targetActive
      }, { headers: { Authorization: 'Bearer ' + userInfo.token } })
      dispatch(login({ ...userInfo, active: Boolean(data.active) }))
      dispatch(showSnackBar({ message: data.active ? 'Your profile is now active.' : 'Your profile is now inactive.' }))
      setConfirming(false)
      router.reload()
    } catch (error) {
      dispatch(showSnackBar({ message: 'Could not update profile status.', option: { variant: 'error' } }))
    } finally {
      dispatch(finishLoading())
      setSaving(false)
    }
  }

  return <>
    <div className={styles.navControl}>
      <button type='button' role='switch'
        className={active ? styles.navSwitchActive : styles.navSwitchInactive}
        aria-checked={active} aria-label='Profile active status'
        title={active ? 'Profile active' : 'Profile inactive'}
        onClick={() => setConfirming(true)} disabled={saving || (!active && !eligible)}>
        <span className={active ? styles.activeDot : styles.inactiveDot} aria-hidden='true' />
        <span>{active ? 'Active' : 'Inactive'}</span>
        <span className={styles.navThumb} aria-hidden='true' />
      </button>
    </div>
    {confirming && <div className={styles.backdrop}
      onMouseDown={event => { if (event.target === event.currentTarget) setConfirming(false) }}>
      <section className={styles.dialog} role='alertdialog' aria-modal='true'
        aria-labelledby='visibility-confirm-title' aria-describedby='visibility-confirm-description'>
        <span className={styles.dialogIcon} aria-hidden='true'>{targetActive ? '✓' : '◌'}</span>
        <h2 id='visibility-confirm-title'>Are you sure you want to {verb.toLowerCase()} your profile?</h2>
        <p id='visibility-confirm-description'>{targetActive
          ? 'Your profile will become visible to other members.'
          : 'Your profile will be hidden from other members.'}</p>
        <div className={styles.dialogActions}>
          <button type='button' className={styles.cancel} onClick={() => setConfirming(false)} disabled={saving}>{getText('cancel', router.locale)}</button>
          <button type='button' className={targetActive ? styles.confirm : styles.confirmOff} onClick={update} disabled={saving}>
            {saving ? 'Saving…' : 'Yes, ' + verb.toLowerCase()}
          </button>
        </div>
      </section>
    </div>}
  </>
}

export default Activate
