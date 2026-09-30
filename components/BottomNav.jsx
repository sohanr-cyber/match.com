import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import styles from '@/styles/BottomNav.module.css'

const paths = {
  home: 'M3 10.5 12 3l9 7.5V21h-6v-6H9v6H3z',
  explore: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm4.5 5.5-3 6-6 3 3-6z',
  dashboard: 'M3 3h8v8H3zm10 0h8v5h-8zm0 7h8v11h-8zM3 13h8v8H3z',
  members: 'M16 11a4 4 0 1 0-3.9-4.9A5 5 0 0 1 12 8c0 1.2-.4 2.3-1.1 3.2A4 4 0 0 0 16 11zM8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-3.3 0-6 1.7-6 3.8V21h12v-3.2C14 15.7 11.3 14 8 14zm8 0c-.5 0-1 0-1.5.1 1 .9 1.5 2 1.5 3.4V21h6v-3.2c0-2.1-2.7-3.8-6-3.8z',
  proposals: 'M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11z',
  profile: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-8 9a8 8 0 0 1 16 0z'
}

const BottomNav = () => {
  const router = useRouter()
  const userInfo = useSelector(state => state.user.userInfo)
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  const bn = router.locale === 'bn'

  if (!mounted) return null

  const items = userInfo?.role === 'admin'
    ? [
        { key: 'home', label: bn ? 'হোম' : 'Home', href: '/' },
        { key: 'dashboard', label: bn ? 'অ্যাডমিন' : 'Overview', href: '/admin' },
        { key: 'members', label: bn ? 'সদস্য' : 'Members', href: '/admin/user' },
        { key: 'proposals', label: bn ? 'প্রস্তাব' : 'Proposals', href: '/admin/proposal' },
        { key: 'profile', label: bn ? 'প্রোফাইল' : 'Profile', href: '/profile/' + userInfo.profileId }
      ]
    : userInfo
      ? [
          { key: 'home', label: bn ? 'হোম' : 'Home', href: '/' },
          { key: 'explore', label: bn ? 'খুঁজুন' : 'Explore', href: '/profile' },
          { key: 'dashboard', label: bn ? 'ড্যাশবোর্ড' : 'Dashboard', href: '/profile/dashboard/' + userInfo.id },
          { key: 'proposals', label: bn ? 'প্রস্তাব' : 'Proposals', href: '/proposal' },
          { key: 'profile', label: bn ? 'প্রোফাইল' : 'Profile', href: '/profile/' + userInfo.profileId }
        ]
      : [
          { key: 'home', label: bn ? 'হোম' : 'Home', href: '/' },
          { key: 'explore', label: bn ? 'খুঁজুন' : 'Explore', href: '/profile' },
          { key: 'proposals', label: bn ? 'পরিকল্পনা' : 'Plans', href: '/plans' },
          { key: 'profile', label: bn ? 'লগইন' : 'Sign in', href: '/login' }
        ]

  const isActive = key => {
    if (key === 'home') return router.pathname === '/'
    if (key === 'explore') return router.pathname === '/profile'
    if (key === 'dashboard') return userInfo?.role === 'admin'
      ? router.pathname === '/admin'
      : router.pathname === '/profile/dashboard/[id]'
    if (key === 'members') return router.pathname.startsWith('/admin/user')
    if (key === 'proposals') return router.pathname.startsWith('/admin/proposal') || router.pathname === '/proposal' || router.pathname === '/profile/proposal/[id]' || router.pathname === '/plans'
    if (key === 'profile') {
      if (!userInfo) return router.pathname === '/login'
      return router.query.id === String(userInfo.profileId) &&
        (router.pathname === '/profile/[id]' || router.pathname === '/profile/update/[id]')
    }
    return false
  }

  const navLabel = userInfo?.role === 'admin'
    ? (bn ? 'অ্যাডমিন নেভিগেশন' : 'Admin navigation')
    : userInfo
      ? (bn ? 'সদস্য নেভিগেশন' : 'Member navigation')
      : (bn ? 'মোবাইল নেভিগেশন' : 'Mobile navigation')

  return (
    <nav className={styles.nav} aria-label={navLabel}>
      {items.map(item => {
        const active = isActive(item.key)
        return <Link key={item.key} href={item.href} className={active ? styles.active : styles.item} aria-current={active ? 'page' : undefined}>
          <svg viewBox='0 0 24 24' aria-hidden='true'><path d={paths[item.key]} /></svg>
          <span>{item.label}</span>
        </Link>
      })}
    </nav>
  )
}

export default BottomNav
