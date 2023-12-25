import React from 'react'
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

const Update = () => {
  return (
    <>
      <Navbar />
      <Basic />
      <Personal />
      <Education />
      <Physical />

      <Religion />
      <Address />
      <Family />
      <Expectation />
      <Footer />
    </>
  )
}

export default Update
