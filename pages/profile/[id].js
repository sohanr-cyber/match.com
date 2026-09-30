import React, { useEffect, useState } from 'react'
import styles from './../../styles/Profile/Details.module.css'
import Introduction from '@/components/Profile/Introduction'
import Physical from '@/components/Profile/Physical'
import Education from '@/components/Profile/Education'
import Family from '@/components/Profile/Family'
import Address from '@/components/Profile/Address'
import Expectation from '@/components/Profile/Expectation'
import Piety from '@/components/Profile/Piety'
import BASE_URL from '@/config'
import Action from '@/components/Activity/Action'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { parse } from 'cookie'
import jwt from 'jsonwebtoken'
import { APP_SECRET } from '@/config'
import { readProfile } from '@/services/profile-read-service'
import Others from '@/components/Profile/Others'
import { NextSeo } from 'next-seo'

const ProfileDetails = ({
  user,
  address,
  religion,
  physical,
  education,
  expectation,
  family,
  locale
}) => {
  const userInfo = useSelector(state => state.user.userInfo)
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const imageUrl =
    user.gender == 'Male' ? '/images/muslimboy.png' : '/images/muslimgirl.png'

  const myProfile = isClient && Boolean(
    userInfo && (
      String(userInfo.id) === String(user?._id) ||
      String(userInfo.profileId) === String(user?.profileId)
    )
  )

  return (
    <>
      <NextSeo
        title={`Profile ${user?.profileId} - Muslim Match Maker`}
        openGraph={{
          type: 'website',
          url: BASE_URL,
          title: `Profile ${user?.profileId} - Muslim Match Maker`,
          description: `Profile ${user?.profileId} - Muslim Match Maker`,
          images: [
            {
              url: imageUrl,

              width: 1200,
              height: 630,
              alt: 'MuslimMatchMaker'
            }
          ]
        }}
      />

      <div className={`${styles.wrapper} ${styles.profileDetails}`}>
        <div className={styles.detailsContent}>
          <Introduction data={user} ln={locale} />
          <Physical physical={physical} ln={locale} myProfile={myProfile} />
          <Education
            education={education}
            ln={locale}
            profile={user}
            myProfile={myProfile}
          />
          <Piety
            religion={religion}
            ln={locale}
            user={user}
            myProfile={myProfile}
          />
          <Address address={address} ln={locale} myProfile={myProfile} />
          <Family family={family} ln={locale} myProfile={myProfile} />
          <Expectation
            expectation={expectation}
            ln={locale}
            myProfile={myProfile}
          />
          <Others data={user} ln={locale} myProfile={myProfile} />
          {isClient && !myProfile && <Action user={user} ln={locale} />}
        </div>
      </div>
    </>
  )
}

export default ProfileDetails
export async function getServerSideProps (context) {
  const { id } = context.query
  const { locale, req } = context
  let viewerId
  try {
    const cookie = parse(req.headers.cookie || '').userInfo
    const token = JSON.parse(cookie || '{}').token
    viewerId = jwt.verify(token, APP_SECRET)._id
  } catch {
    viewerId = null
  }

  const data = await readProfile({ id, viewerId })
  if (!data) return { notFound: true }
  const { existingUser, ...sections } = data
  return { props: JSON.parse(JSON.stringify({ user: existingUser, ...sections, locale })) }
}
