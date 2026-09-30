import React, { useEffect, useRef, useState } from 'react'
import { showMissingRequiredFields } from '@/utility/profile-required-fields'
import styles from '@/styles/Profile/Update/Basic.module.css'
import {
  professions,
  skinColors,
  bodyTypes,
  educationTypes,
  educationalStatus,
  institutes,
  sessions,
  maritalStatuses,
  categoriesBackFront
} from '@/pages/api/auth/data'
import InfoIcon from '@mui/icons-material/Info'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { finishLoading, startLoading } from '@/redux/stateSlice'

import Moment from 'react-moment'
import { getText } from '@/Translation/profile'
import Ln from '@/components/utils/Ln'
import { showSnackBar } from '@/redux/notistackSlice'
import { routes } from '@/utility/data'

const excludedProfessionChoices = new Set(['BA', 'BSC', 'Fazel', 'Hafiz', 'MA', 'MSC', 'Other'])
const occupationChoices = professions.filter(item => !excludedProfessionChoices.has(item))
const popularOccupations = ['Student', 'Govt. Service Holder', 'Private Service Holder', 'Business', 'Teacher', 'Homemaker']

const Basic = ({ profile, setProfile, locationData, ln }) => {
  const router = useRouter()
  const userInfo = useSelector(state => state.user.userInfo)
  const [error, setError] = useState('')
  const formRef = useRef(null)
  const [districts, setDistricts] = useState([])
  const dispatch = useDispatch()

  const update = async () => {
    if (showMissingRequiredFields(formRef.current, [
    {label:getText('name', ln),value:profile.name},{label:getText('brithdate', ln),value:profile.bornAt},
    {label:getText('ocupation', ln),value:profile.profession},{label:getText('education', ln),value:profile.education},
    {label:getText('educationType', ln),value:profile.educationType},{label:getText('color', ln),value:profile.skinColor},
    {label:getText('city', ln),value:profile.city},{label:getText('district', ln),value:profile.district},
    {label:getText('upazilla', ln),value:profile.upazilla},{label:getText('maritalStatus', ln),value:profile.maritalStatus},
    {label:getText('height', ln),value:profile.heightFeet && profile.heightInches}
], ln)) return

    if (
      !profile.name ||
      !profile.bornAt ||
      !profile.profession ||
      !profile.education ||
      !profile.educationType ||
      !profile.skinColor ||
      // !profile.bodyType ||
      !profile.city ||
      !profile.district ||
      !profile.upazilla ||
      !profile.maritalStatus ||
      !profile.heightFeet ||
      !profile.heightInches
    ) {

            dispatch(
        showSnackBar({
          message: 'Fill All The Required Field !',
          option: {
            variant: 'error'
          }
        })
      )
      return
    }
    try {
      dispatch(startLoading())
      const { data } = await axios.put(
        '/api/auth/register',
        {
          ...profile,
          targetUserId: profile._id,
          height:
            parseInt(parseInt(profile.heightFeet) * 12) +
            parseInt(profile.heightInches)
        },
        {
          headers: {
            Authorization: 'Bearer ' + userInfo.token
          }
        }
      )

      setProfile({
        ...data,
        heightFeet: parseInt(data.height / 12),
        heightInches: data.height % 12
      })
      dispatch(
        showSnackBar({
          message: 'Updated Successfully '
        })
      )

      dispatch(finishLoading())
      const index = routes.findIndex(i => i.query == router.query.update)
      index + 1 >= routes.length
        ? router.push(`/profile/${router.query.id}`)
        : router.push(
            `/profile/update/${router.query.id}?update=${
              routes[index + 1]?.query
            }`
          )
    } catch (error) {
      dispatch(
        showSnackBar({
          message: 'Something Went Wrong !',
          option: {
            variant: 'error'
          }
        })
      )
      dispatch(finishLoading())
      console.log(error)
    }
  }

  const fetchDistrict = async city => {
    if (!city) return
    if (!city) return
    try {
      const { data } = await axios.get(
        `/api/location/division/${encodeURIComponent(city)}`
      )
      console.log(data)
      setDistricts(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchDistrict(profile.city || locationData?.[0]?.division)
  }, [profile.city])

  return (
    <>
      <div className={styles.wrapper}>
        {/* <h2 style={{ marginBottom: '10px' }}>Update Your Profile</h2> */}

        <div className={styles.heading}>
          <div className={styles.left}>
            <span>1</span>
            <div className={styles.title}>Basic Information</div>
          </div>
          {profile.updatedAt && (
            <div className={styles.right}>
              Updated <Moment fromNow>{profile.updatedAt}</Moment>
            </div>
          )}
        </div>

        <div className={styles.container}>
          <p>
            <InfoIcon /> <span>{getText('hidden', ln)}</span>
          </p>{' '}
        </div>
        <form ref={formRef} className={styles.formContainer} onSubmit={e => { e.preventDefault(); update() }}>
          <div className={styles.field}>
            <label>{getText('name', ln)}</label>
            <input
              type='text'
              value={profile?.name}
              onChange={e => setProfile({ ...profile, name: e.target.value })}
            />
          </div>
          <div className={styles.field}>
            <label>{getText('brithdate', ln)}</label>
            <input
              type='date'
              value={
                profile.bornAt &&
                new Date(profile.bornAt).toISOString().split('T')[0]
              }
              onChange={e => setProfile({ ...profile, bornAt: e.target.value })}
            />
          </div>
          <div className={styles.field}>
            <label>{getText('height', ln)}</label>
            <div className={styles.flex}>
              <input
                type='number'
                value={profile?.heightFeet}
                onChange={e =>
                  setProfile({ ...profile, heightFeet: e.target.value })
                }
              />
              <span> {getText('feet', ln)}</span>
              <input
                type='number'
                value={profile?.heightInches}
                onChange={e =>
                  setProfile({ ...profile, heightInches: e.target.value })
                }
              />
              <span>{getText('inches', ln)}</span>
            </div>
          </div>
          <div className={styles.field}>
            <label>{getText('educationType', ln)}</label>

            <div className={styles.options}>
              {' '}
              {educationTypes.map((item, index) => (
                <span
                  data-selected={Boolean(profile.educationType == item)}
                  onClick={() =>
                    setProfile({ ...profile, educationType: profile.educationType === item ? '' : item })
                  }
                  key={index}
                >
                  <Ln item={item} />
                </span>
              ))}
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor='profile-profession'>{getText('ocupation', ln)} ({getText('required', ln)})</label>
            <div className={styles.quickChoices} role='group' aria-label={ln === 'bn' ? 'জনপ্রিয় পেশা' : 'Popular professions'}>
              {popularOccupations.map(item => <button
                type='button'
                key={item}
                data-selected={profile.profession === item}
                aria-pressed={profile.profession === item}
                onClick={() => setProfile({ ...profile, profession: item })}
              ><Ln item={item} /></button>)}
            </div>
            <input
              id='profile-profession'
              type='text'
              list='profile-profession-options'
              value={profile.profession || ''}
              onChange={event => setProfile({ ...profile, profession: event.target.value })}
              placeholder={ln === 'bn' ? 'পেশা খুঁজুন বা লিখুন' : 'Search or type a profession'}
              aria-describedby='profile-profession-help'
              autoComplete='off'
              required
            />
            <datalist id='profile-profession-options'>
              {occupationChoices.map(item => <option value={item} key={item} />)}
            </datalist>
            <small id='profile-profession-help' className={styles.professionHelp}>
              {ln === 'bn' ? 'তালিকা থেকে বেছে নিন অথবা নিজের পেশা লিখুন।' : 'Choose a suggestion or type your own profession.'}
            </small>
          </div>
          <div className={styles.field}>
            <label>{getText('education', ln)}</label>
            <div className={styles.options}>
              {educationalStatus.map((item, index) => (
                <span
                  data-selected={Boolean(profile.education == item)}
                  onClick={() => setProfile({ ...profile, education: profile.education === item ? '' : item })}
                  key={index}
                >
                  <Ln item={item} />
                </span>
              ))}
            </div>
          </div>
          <div className={styles.field}>
            <label>{getText('color', ln)}</label>
            <div className={styles.options}>
              {skinColors.map((item, index) => (
                <span
                  data-selected={Boolean(profile.skinColor == item)}
                  onClick={() => setProfile({ ...profile, skinColor: profile.skinColor === item ? '' : item })}
                  key={index}
                >
                  <Ln item={item} />
                </span>
              ))}
            </div>
          </div>
          {/* <div className={styles.field}>
            <label>{getText('bodyType', ln)}</label>
            <div className={styles.options}>
              {[...bodyTypes].map((item, index) => (
                <span
                  data-selected={Boolean(profile.bodyType == item)}
                  onClick={() => setProfile({ ...profile, bodyType: item })}
                  key={index}
                >
                  {item}
                </span>
              ))}
            </div>
          </div> */}

          {/* <div className={styles.field}>
            <label>Gender</label>
            <div className={styles.options}>
              {['Male', 'Female'].map((item, index) => (
                <span
                  data-selected={Boolean(profile.gender == item)}
                  onClick={() => setProfile({ ...profile, gender: item })}
                  key={index}
                >
                  {item}
                </span>
              ))}
            </div>
          </div> */}
          <div className={styles.field}>
            <label>{getText('maritalStatus', ln)}</label>
            <div className={styles.options}>
              {[...maritalStatuses].map((item, index) => (
                <span
                  data-selected={Boolean(profile.maritalStatus == item)}
                  onClick={() =>
                    setProfile({ ...profile, maritalStatus: profile.maritalStatus === item ? '' : item })
                  }
                  key={index}
                >
                  <Ln item={item} />{' '}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.field}>
            <label>
              {getText('uni', ln)} ({getText('optional', ln)})
            </label>
            <select
              onChange={e =>
                setProfile({ ...profile, institute: e.target.value })
              }
            >
              {['Not Selected', ...institutes].map((item, index) => (
                <option
                  value={item}
                  key={index}
                  selected={item == profile.institute ? true : false}
                >
                  {item}
                </option>
              ))}
            </select>
          </div>
          {/* <div className={styles.field}>
            <label>University</label>
            <SearchSelector options={institutes} />
          </div> */}
          <div className={styles.field}>
            <label>
              {getText('session', ln)} ({getText('optional', ln)})
            </label>{' '}
            <select
              onChange={e =>
                setProfile({ ...profile, session: e.target.value })
              }
            >
              {['Not Selected', ...sessions].map((item, index) => (
                <option
                  value={item}
                  key={index}
                  selected={item == profile.session ? true : false}
                >
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.field}>
            <label>{getText('city', ln)} </label>
            <select
              className={styles.value}
              onChange={e => setProfile({ ...profile, city: e.target.value })}
            >
              {[
                {
                  division: 'Not Selected'
                },
                ...locationData
              ].map((item, index) => (
                <option
                  key={index}
                  value={item.division}
                  selected={profile.city == item.division ? true : false}
                >
                  <Ln item={item.division} />
                </option>
              ))}
            </select>
          </div>
          <div className={styles.field}>
            <label>{getText('district', ln)}</label>
            <select
              className={styles.value}
              onChange={e =>
                setProfile({ ...profile, district: e.target.value })
              }
            >
              {[{ district: 'Not Selected' }, ...districts].map(
                (item, index) => (
                  <option
                    key={index}
                    value={item.district}
                    selected={item.district == profile.district ? true : false}
                  >
                    <Ln item={item.district} />
                  </option>
                )
              )}
            </select>
          </div>
          <div className={styles.field}>
            <label>{getText('upazilla', ln)} </label>
            <select
              className={styles.value}
              onChange={e =>
                setProfile({
                  ...profile,
                  upazilla: e.target.value
                })
              }
            >
              <option>
                <Ln item={'Not Selected'} />
              </option>
              {districts
                .find(i => i.district == profile.district)
                ?.upazilla.map((item, index) => (
                  <option
                    key={index}
                    value={item}
                    selected={item == profile.upazilla ? true : false}
                  >
                    <Ln item={item} />
                  </option>
                ))}
            </select>
          </div>
        </form>
        {error && <p style={{ color: 'red', fontSize: '90%' }}>{error}</p>}
        <button type="button" className={styles.save} onClick={() => update()}>
          {getText('save', ln)}
        </button>
      </div>
    </>
  )
}

export default Basic
