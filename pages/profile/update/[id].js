import React, { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Personal from '@/components/Profile/Update/PersonalUpdate'
import Education from '@/components/Profile/Update/EducationUpdate'
import Physical from '@/components/Profile/Update/PhysicalUpdate'
import Religion from '@/components/Profile/Update/ReligionUpdate'
import Address from '@/components/Profile/Update/AddressUpdate'
import Basic from '@/components/Profile/Update/BasicUpdate'
import Family from '@/components/Profile/Update/FamilyUpdate'
import Expectation from '@/components/Profile/Update/ExpectationUpdate'
import axios from 'axios'
import BASE_URL from '@/config'
import { parse } from 'cookie'
import Activate from '@/components/Profile/Update/Activate'
import OthersUpdate from '@/components/Profile/Update/OthersUpdate'
import { useRouter } from 'next/router'
import Routes from '@/components/Profile/Update/Routes'

const Update = ({
  user,
  address,
  religion,
  physical,
  education,
  expectation,
  personal,
  family,
  locationData,
  locale
}) => {
  const [profile, setProfile] = useState({
    ...user,
    heightFeet: parseInt(user.height / 12),
    heightInches: user.height % 12
  })
  const router = useRouter()
  console.log({ router })

  return (
    <>
      <Routes />
      {router.query.basic == 'true' ? (
        <Basic
          profile={profile}
          setProfile={setProfile}
          locationData={locationData}
          ln={locale}
        />
      ) : router.query.update == 'education' ? (
        <Education education={{ ...education }} profile={profile} ln={locale} />
      ) : router.query.update == 'religion' ? (
        <Religion religion={religion} ln={locale} user={user} />
      ) : router.query.update == 'physical' ? (
        <Physical physical={{ ...physical }} ln={locale} />
      ) : router.query.update == 'expectation' ? (
        <Expectation expectation={expectation} ln={locale} />
      ) : router.query.update == 'address' ? (
        <Address address={address} locationData={locationData} ln={locale} />
      ) : router.query.update == 'family' ? (
        <Family family={family} ln={locale} />
      ) : router.query.update == 'others' ? (
        <OthersUpdate profile={profile} setProfile={setProfile} ln={locale} />
      ) : (
        <Basic
          profile={profile}
          setProfile={setProfile}
          locationData={locationData}
          ln={locale}
        />
      )}
    </>
  )
}

const fetchData = async () => {
  try {
    const { data } = await axios.get('https://bdapis.com/api/v1.1/divisions')
    return data.data
  } catch (error) {
    console.log(error)
  }
}

export async function getServerSideProps (context) {
  const { id } = context.query
  const { req, locale } = context
  const cookies = parse(req.headers.cookie || '')
  console.log({ cookies })
  const userInfo = cookies['userInfo']

  try {
    const { data } = await axios.get(`${BASE_URL}/api/auth/${id}`, {
      headers: {
        Authorization: 'Bearer ' + JSON.parse(userInfo).token
      }
    })
    const {
      existingUser,
      address,
      religion,
      physical,
      education,
      expectation,
      personal,
      family
    } = data

    const locationData = await fetchData()

    return {
      props: {
        user: existingUser,
        address,
        religion,
        physical,
        education,
        expectation,
        personal,
        family,
        locationData,
        locale
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
        personal: {},
        family: {},
        locationData: {},
        locale
      } // Return an empty props object or handle errors accordingly
    }
  }
}

export default Update
