import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '@/redux/userSlice'
import { mail } from '@/const'
import Logo from './utils/Logo'
import Activate from '@/components/Profile/Update/Activate'
import styles from '@/styles/Navbar.module.css'

function MenuIcon ({ open }) {
  return <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' aria-hidden='true'>
    {open ? <path d='m6 6 12 12M6 18 18 6' /> : <path d='M4 6h16M4 12h16M4 18h16' />}
  </svg>
}

export default function Navbar () {
  const router = useRouter()
  const dispatch = useDispatch()
  const userInfo = useSelector(state => state.user.userInfo)
  const [mounted, setMounted] = useState(false)
  const [panel, setPanel] = useState('')
  const headerRef = useRef(null)
  const accountRef = useRef(null)
  const menuRef = useRef(null)
  const bn = router.locale === 'bn'
  const user = mounted ? userInfo : null
  const admin = user?.role === 'admin'
  const text = (en, bangla) => bn ? bangla : en

  useEffect(() => { setMounted(true) }, [])
  useEffect(() => {
    const close = () => setPanel('')
    router.events.on('routeChangeStart', close)
    return () => router.events.off('routeChangeStart', close)
  }, [router.events])
  useEffect(() => {
    if (!panel) return
    const clickOutside = event => { if (!headerRef.current?.contains(event.target)) setPanel('') }
    const escape = event => {
      if (event.key === 'Escape') {
        setPanel('')
        ;(panel === 'account' ? accountRef : menuRef).current?.focus()
      }
    }
    document.addEventListener('pointerdown', clickOutside)
    document.addEventListener('keydown', escape)
    return () => {
      document.removeEventListener('pointerdown', clickOutside)
      document.removeEventListener('keydown', escape)
    }
  }, [panel])

  const links = [
    { href: '/', label: text('Home', 'হোম'), active: router.pathname === '/' },
    { href: '/profile', label: text('Find a match', 'সঙ্গী খুঁজুন'), active: router.pathname === '/profile' },
    { href: '/plans', label: text('Plans', 'প্ল্যান'), active: router.pathname === '/plans' },
    { href: 'mailto:' + mail, label: text('Contact', 'যোগাযোগ'), active: false }
  ]
  const accountLinks = user ? [
    { href: admin ? '/admin' : '/profile/dashboard/' + user.id, label: text(admin ? 'Admin overview' : 'Dashboard', admin ? 'অ্যাডমিন' : 'ড্যাশবোর্ড') },
    ...(admin ? [{ href: '/admin/user', label: text('Members', 'সদস্য') }] : []),
    { href: admin ? '/admin/proposal' : '/proposal', label: text('Proposals', 'প্রস্তাব') },
    { href: '/profile/' + user.profileId, label: text('My profile', 'আমার প্রোফাইল') },
    { href: '/profile/update/' + user.profileId, label: text('Edit profile', 'প্রোফাইল সম্পাদনা') },
    { href: '/profile/liked/' + user.id, label: text('Saved profiles', 'সংরক্ষিত প্রোফাইল') }
  ] : []
  const switchLanguage = () => router.push({ pathname: router.pathname, query: router.query }, router.asPath, { locale: bn ? 'en-US' : 'bn' })
  const handleLogout = () => { setPanel(''); dispatch(logout()); router.push('/login') }
  const renderLink = item => <Link key={item.href} href={item.href} onClick={() => setPanel('')} className={item.active ? styles.activeLink : styles.navLink} aria-current={item.active ? 'page' : undefined}>{item.label}</Link>

  return <header className={styles.wrapper} ref={headerRef} onBlur={event => {
    if (!event.currentTarget.contains(event.relatedTarget)) setPanel('')
  }}>
    <div className={styles.bar}>
      <Logo />
      <nav className={styles.desktopNav} aria-label={text('Main navigation', 'মূল নেভিগেশন')}>{links.map(renderLink)}</nav>
      <div className={styles.controls}>
        <button type='button' className={styles.language} onClick={switchLanguage} aria-label={bn ? 'Switch to English' : 'বাংলায় পরিবর্তন করুন'}>{bn ? 'EN' : 'বাংলা'}</button>
        {user && !admin && <Activate profile={{ user }} />}
        {user ? <button type='button' ref={accountRef} className={styles.accountButton} aria-expanded={panel === 'account'} aria-controls='account-navigation' onClick={() => setPanel(panel === 'account' ? '' : 'account')}>
          <span className={styles.avatar} aria-hidden='true'>{user.name?.trim()?.[0]?.toUpperCase() || 'M'}</span>
          <span className={styles.accountLabel}>{text('My account', 'আমার অ্যাকাউন্ট')}</span>
          <svg viewBox='0 0 16 16' fill='none' stroke='currentColor' aria-hidden='true'><path d='m4 6 4 4 4-4' /></svg>
        </button> : <Link href='/login' className={styles.signIn}>{text('Sign in', 'লগইন')}</Link>}
        <button type='button' ref={menuRef} className={styles.menuButton} aria-label={panel === 'mobile' ? text('Close navigation', 'মেনু বন্ধ করুন') : text('Open navigation', 'মেনু খুলুন')} aria-expanded={panel === 'mobile'} aria-controls='mobile-navigation' onClick={() => setPanel(panel === 'mobile' ? '' : 'mobile')}><MenuIcon open={panel === 'mobile'} /></button>
      </div>
    </div>
    {panel === 'account' && user && <div id='account-navigation' className={styles.accountPanel}>
      <div className={styles.accountHeading}><strong>{user.name || text('Your account', 'আপনার অ্যাকাউন্ট')}</strong><span>{text(admin ? 'Administrator' : 'Member', admin ? 'অ্যাডমিন' : 'সদস্য')}</span></div>
      <nav aria-label={text('Account navigation', 'অ্যাকাউন্ট নেভিগেশন')}>{accountLinks.map(renderLink)}</nav>
      <button type='button' className={styles.logout} onClick={handleLogout}>{text('Sign out', 'লগআউট')}</button>
    </div>}
    {panel === 'mobile' && <nav id='mobile-navigation' className={styles.mobileNav} aria-label={text('Mobile navigation', 'মোবাইল নেভিগেশন')}>
      {links.map(renderLink)}
      {!user && <Link href='/register' className={styles.join} onClick={() => setPanel('')}>{text('Create an account', 'অ্যাকাউন্ট তৈরি করুন')} ↗</Link>}
    </nav>}
  </header>
}