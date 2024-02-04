import React, { useState } from 'react'
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

const Update = ({
  user,
  address,
  religion,
  physical,
  education,
  expectation,
  personal,
  family,
  locationData
}) => {
  const [profile, setProfile] = useState({
    ...user,
    heightFeet: parseInt(user.height / 12),
    heightInches: user.height % 12
  })
  return (
    <>
      <Basic
        profile={profile}
        setProfile={setProfile}
        locationData={locationData}
      />
      <Personal
        personal={{
          ...personal
        }}
      />
      <Education education={{ ...education }} />
      <Physical physical={{ ...physical }} />
      <Religion religion={religion} />
      <Address address={address} />
      <Family family={family} />
      <Expectation expectation={expectation} />
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

export async function getServerSideProps ({ query }) {
  const { id } = query

  try {
    const { data } = await axios.get(`${BASE_URL}/api/auth/${id}`)
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
        locationData
      }
    }
  } catch (error) {
    console.log(error)
    return {
      props: {} // Return an empty props object or handle errors accordingly
    }
  }
}

export default Update
