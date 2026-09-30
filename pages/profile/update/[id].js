import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { parse } from 'cookie'
import jwt from 'jsonwebtoken'
import { APP_SECRET } from '@/config'
import db from '@/database/connection'
import User from '@/database/model/User'
import AddressModel from '@/database/model/Address'
import ReligionModel from '@/database/model/Religion'
import PhysicalModel from '@/database/model/Physical'
import EducationModel from '@/database/model/Education'
import FamilyModel from '@/database/model/Family'
import ExpectationModel from '@/database/model/Expectation'
import { isValidObjectId } from '@/utility/helper'
import { routes } from '@/utility/data'
import { calculateProfileCompletion } from '@/utility/profile-completion'
import { divisions } from '@/utility/divisions'
import Routes from '@/components/Profile/Update/Routes'
import Basic from '@/components/Profile/Update/BasicUpdate'
import Education from '@/components/Profile/Update/EducationUpdate'
import Physical from '@/components/Profile/Update/PhysicalUpdate'
import Religion from '@/components/Profile/Update/ReligionUpdate'
import Address from '@/components/Profile/Update/AddressUpdate'
import Family from '@/components/Profile/Update/FamilyUpdate'
import Expectation from '@/components/Profile/Update/ExpectationUpdate'
import OthersUpdate from '@/components/Profile/Update/OthersUpdate'
import styles from '@/styles/Profile/Update/Page.module.css'

const Update = ({ user, address, religion, physical, education, expectation, family, locationData, locale }) => {
  const router = useRouter()
  const step = routes.find(item => item.query === router.query.update) || routes[0]
  const [profile, setProfile] = useState({
    ...user,
    heightFeet: user.height ? Math.floor(user.height / 12) : '',
    heightInches: user.height ? user.height % 12 : ''
  })
  const bn = locale === 'bn'
  const [sectionDrafts, setSectionDrafts] = useState({ address, religion, physical, education, expectation, family })
  const sectionChanges = useMemo(() => Object.fromEntries(
    ['address', 'religion', 'physical', 'education', 'expectation', 'family'].map(section => [
      section, draft => setSectionDrafts(previous => previous[section] === draft
        ? previous
        : { ...previous, [section]: draft })
    ])
  ), [])
  const completion = calculateProfileCompletion({ user: profile, ...sectionDrafts })
  const requiredSteps = routes.filter(item => !completion.sections[item.query].optional).length
  const finishedSteps = Object.values(completion.sections).filter(section => section.complete).length
  const form = step.query === 'education'
    ? <Education education={sectionDrafts.education} onChange={sectionChanges.education} profile={profile} ln={locale} />
    : step.query === 'religion'
      ? <Religion religion={sectionDrafts.religion} onChange={sectionChanges.religion} ln={locale} user={user} />
      : step.query === 'physical'
        ? <Physical physical={sectionDrafts.physical} onChange={sectionChanges.physical} ln={locale} />
        : step.query === 'expectation'
          ? <Expectation expectation={sectionDrafts.expectation} onChange={sectionChanges.expectation} ln={locale} />
          : step.query === 'address'
            ? <Address address={sectionDrafts.address} onChange={sectionChanges.address} locationData={locationData} ln={locale} />
            : step.query === 'family'
              ? <Family family={sectionDrafts.family} onChange={sectionChanges.family} ln={locale} />
              : step.query === 'others'
                ? <OthersUpdate profile={profile} setProfile={setProfile} ln={locale} />
                : <Basic profile={profile} setProfile={setProfile} locationData={locationData} ln={locale} />

  return <main className={styles.page}>
    <div className={styles.container}>
      <div className={styles.breadcrumb}><Link href={'/profile/' + user.profileId}>{bn ? 'আমার প্রোফাইল' : 'My profile'}</Link><span>/</span><span>{bn ? 'প্রোফাইল সম্পাদনা' : 'Edit profile'}</span></div>
      <header className={styles.hero}>
        <div className={styles.heroText}>
          <span className={styles.eyebrow}>{bn ? 'আপনার পরিচয়' : 'YOUR STORY'}</span>
          <h1>{bn ? 'আপনার প্রোফাইল গুছিয়ে নিন' : 'Make your profile yours'}</h1>
          <p>{bn ? 'একটি সুন্দর পরিচয়ের জন্য প্রতিটি অংশ যত্ন নিয়ে পূরণ করুন।' : 'Share the details that help a meaningful connection begin.'}</p>
        </div>
        <Link className={styles.viewProfile} href={'/profile/' + user.profileId}>{bn ? 'প্রোফাইল দেখুন' : 'View profile'} <span aria-hidden='true'>↗</span></Link>
      </header>
      <div className={styles.progressRow}>
        <span>{bn ? `আপনার প্রোফাইল ${completion.percent}% সম্পূর্ণ` : `Profile ${completion.percent}% complete`}</span>
        <span>{bn ? `${finishedSteps}/${requiredSteps}টি আবশ্যিক অংশ সম্পূর্ণ` : `${finishedSteps}/${requiredSteps} required sections complete`}</span>
      </div>
      <div className={styles.progress} role='progressbar' aria-label={bn ? 'প্রোফাইল সম্পূর্ণতা' : 'Profile completion'} aria-valuenow={completion.percent} aria-valuemin='0' aria-valuemax='100' aria-valuetext={`${completion.percent}%`}>
        <span style={{ width: completion.percent + '%' }} />
      </div>
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <Routes activeStep={step.query} completion={completion} locale={locale} />
          <div className={styles.tip}>
            <span className={styles.tipIcon}>✦</span>
            <strong>{bn ? 'একটু সময় নিন' : 'A little care goes a long way'}</strong>
            <p>{bn ? 'সঠিক তথ্য আপনাকে উপযুক্ত মানুষের কাছে পৌঁছাতে সাহায্য করবে।' : 'Thoughtful, accurate details help the right people understand who you are.'}</p>
          </div>
        </aside>
        <div className={styles.content}>
          {form}
          <p className={styles.footnote}>{bn ? 'আপনার তথ্য সংরক্ষণ করতে “Save” চাপুন।' : 'Save this section before moving to another step.'}</p>
        </div>
      </div>
    </div>
  </main>
}

export async function getServerSideProps (context) {
  const { id, update } = context.query
  const { req, locale } = context
  let token
  try {
    token = JSON.parse(parse(req.headers.cookie || '').userInfo || '{}').token
  } catch {
    token = null
  }

  let viewer
  try {
    viewer = jwt.verify(token, APP_SECRET)
  } catch {
    return { redirect: { destination: '/login', permanent: false } }
  }

  await db.connect()
  const query = isValidObjectId(id) ? { _id: id } : { profileId: id }
  const user = await User.findOne(query)
    .select('-password -salt -verificationCode -verificationAttempts -expirationTime -lastVerificationSentAt')
    .lean()
  if (!user) return { notFound: true }
  const viewerUser = await User.findById(viewer._id).select('role').lean()
  if (!viewerUser) return { redirect: { destination: '/login', permanent: false } }
  if (String(user._id) !== String(viewer._id) && viewerUser.role !== 'admin') {
    return { redirect: { destination: '/profile/update/' + viewer._id + '?update=basic', permanent: false } }
  }

  const section = routes.some(item => item.query === update) ? update : 'basic'
  const sectionModels = {
    education: EducationModel,
    religion: ReligionModel,
    physical: PhysicalModel,
    expectation: ExpectationModel,
    address: AddressModel,
    family: FamilyModel
  }
  const [sectionRecords, locationData] = await Promise.all([
    Promise.all(Object.entries(sectionModels).map(async ([key, sectionModel]) => [
      key, await sectionModel.findOne({ user: user._id }).lean()
    ])),
    Promise.resolve(section === 'basic' || section === 'address' ? divisions.data : [])
  ])
  const sections = Object.fromEntries(sectionRecords.map(([key, value]) => [key, value || {}]))

  return {
    props: JSON.parse(JSON.stringify({ user, ...sections, locationData, locale }))
  }
}

export default Update
