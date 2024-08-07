import Personal from '@/components/Profile/Personal'
import React, { useEffect, useState } from 'react'
import styles from './../../styles/Profile/Details.module.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Introduction from '@/components/Profile/Introduction'
import Physical from '@/components/Profile/Physical'
import Education from '@/components/Profile/Education'
import Family from '@/components/Profile/Family'
import Address from '@/components/Profile/Address'
import Expectation from '@/components/Profile/Expectation'
import Piety from '@/components/Profile/Piety'
import Similar from '@/components/Profile/Similar'
import axios from 'axios'
import BASE_URL from '@/config'
import Proposal from '@/components/Activity/Proposal'
import Action from '@/components/Activity/Action'
import Saved from '@/components/Activity/Saved'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { parse } from 'cookie'
import Activate from '@/components/Profile/Update/Activate'
import SideNavbar from '@/components/Profile/SideNavbar'
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
  locale,
  startTime,
  endTime
}) => {
  const userInfo = useSelector(state => state.user.userInfo)
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

  console.log(`page loading time ${new Date() - startTime}ms`)
  useEffect(() => {
    setIsClient(true)
  }, [])

  const myProfile =
    (isClient && userInfo?.id == router.query.id) ||
    userInfo?.profileId == router.query.id

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
              url:
                user.gender == 'Male'
                  ? './images/muslimboy.png'
                  : './images/muslimgirl.png',
              width: 1200,
              height: 630,
              alt: 'MuslimMatchMaker'
            }
          ]
        }}
      />

      <div className={styles.wrapper} style={{ minHeight: '100vh' }}>
        <div className={styles.left}>
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
          {!myProfile && <Action user={user} ln={locale} />}
          {myProfile && (
            <Activate
              profile={{
                user,
                address,
                religion,
                physical,
                education,
                expectation,
                family
              }}
              ln={locale}
              myProfile={myProfile}
            />
          )}
        </div>
        <div className={styles.right}>
          {/* <Similar similar={similar} /> */}
        </div>
      </div>
    </>
  )
}

export default ProfileDetails
export async function getServerSideProps (context) {
  const { id } = context.query
  const { locale, req } = context
  const cookies = parse(req.headers.cookie || '')
  const userInfo = cookies['userInfo']

  try {
    const startTime = Date.now()
    console.log({ startTime })
    const { data } = await axios.get(`${BASE_URL}/api/auth/${id}`, {
      headers: userInfo
        ? { Authorization: `Bearer ${JSON.parse(userInfo)?.token}` }
        : undefined
    })

    const endTime = Date.now()
    console.log(
      `Data fetching time in getServerSideProps: ${endTime - startTime}ms`
    )

    const {
      existingUser,
      address,
      religion,
      physical,
      education,
      expectation,
      family
    } = data

    return {
      props: {
        user: existingUser,
        address,
        religion,
        physical,
        education,
        expectation,
        family,
        locale,
        startTime,
        endTime
      }
    }
  } catch (error) {
    console.log(error)
    return {
      props: {
        user: {},
        address: {},
        religion: {},
        physical: {},
        education: {},
        expectation: {},
        family: {},
        locale
      }
    }
  }
}
