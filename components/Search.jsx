import React, { useEffect, useState } from 'react'
import styles from '../styles/Search.module.css'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import {
  professions,
  maritalStatuses,
  institutes,
  educationTypes,
  educationalStatus,
  categoryFront
} from '@/pages/api/auth/data'
import { ageToDateOfBirth } from '@/utils'

import { useRouter } from 'next/router'
import { ImportExport } from '@mui/icons-material'
import axios from 'axios'
const Search = ({ setOpenFilter, locationData }) => {
  const router = useRouter()
  const [filters, setFilters] = useState([
    'location',
    'gender',
    'age',
    'height',
    'meritalStatus'
  ])
  const [age, setAge] = useState({
    min: router.query.minAge || 15,
    max: router.query.maxAge || 50
  })

  const [locations, setLocations] = useState({
    cities: [{ division: 'All' }, ...locationData],
    districts: [{ district: 'All' }],
    upazillas: ['All']
  })

  const [location, setLocation] = useState({
    city: router.query.city,
    district: router.query.district,
    upazilla: router.query.upazilla
  })

  const fetchDistricts = async city => {
    if (city == 'All') {
      setLocations({
        ...locations,
        districts: [{ district: 'All' }],
        upazillas: ['All']
      })

      return
    }
    try {
      const { data } = await axios.get(
        `https://bdapis.com/api/v1.1/division/${city}`
      )
      setLocations({
        ...locations,
        districts: [{ district: 'All' }, ...data.data]
      })

      setLocation({
        city,
        district: 'All',
        upazilla: 'All'
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchDistricts(location.city)
  }, [location.city])

  useEffect(() => {
    if (location.district == 'All') {
      setLocation({ ...location, upazilla: 'All' })
      setLocations({ ...locations, upazillas: ['All'] })

      return
    }
    let upazillasHere = locations.districts.find(
      i => i.district == location.district
    )?.upazilla
    upazillasHere = upazillasHere || []

    setLocations({ ...locations, upazillas: ['All', ...upazillasHere] })
  }, [location.district, locations.districts])

  const [height, setHeight] = useState({
    feetFrom: router.query.feetFrom || 4,
    feetTo: router.query.feetTo || 6,
    inchesFrom: router.inchesFrom || 5,
    inchesTo: router.query.inchesTo || 12
  })

  const updateRoute = data => {
    console.log({ data })
    const queryParams = { ...router.query, ...data, page: 1 }
    router.push({
      pathname: '/profile',
      query: queryParams
    })
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <dic>Filter Serach</dic>
        <div className={styles.close} onClick={() => setOpenFilter(false)}>
          X
        </div>
      </div>
      {/* Allow Chose Location */}
      <div className={styles.heading}>
        <div className={styles.title}>Location</div>
        <div
          className={styles.togle}
          onClick={() =>
            filters.find(i => i == 'location')
              ? setFilters(filters.filter(i => i != 'location'))
              : setFilters([...filters, 'location'])
          }
        >
          {filters.find(i => i == 'location') ? '-' : '+'}
        </div>
      </div>
      {filters.find(i => i == 'location') && (
        <div className={`${styles.options} ${styles.location}`}>
          <div className={styles.flex}>
            <div className={styles.icon}>City</div>
            <select
              className={styles.value}
              onChange={e => setLocation({ ...location, city: e.target.value })}
            >
              {[...locations.cities.map(item => item.division)].map(
                (item, index) => (
                  <option
                    key={index}
                    value={item.division}
                    selected={item == router.query.city ? true : false}
                  >
                    {item}
                  </option>
                )
              )}
            </select>
          </div>
          <div className={styles.flex}>
            <div className={styles.icon}>District</div>
            <select
              className={styles.value}
              onChange={e =>
                setLocation({ ...location, district: e.target.value })
              }
            >
              {locations.districts.map((item, index) => (
                <option
                  key={index}
                  value={item.district}
                  selected={item.district == location.district ? true : false}
                >
                  {item.district}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.flex}>
            <div className={styles.icon}>Upazilla</div>
            <select
              className={styles.value}
              onChange={e =>
                setLocation({
                  ...location,
                  upazilla: e.target.value
                })
              }
            >
              {locations.upazillas.map((item, index) => (
                <option
                  key={index}
                  value={item}
                  selected={item == location.upazilla ? true : false}
                >
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div
            className={styles.apply}
            onClick={() =>
              updateRoute({
                ...location
              })
            }
          >
            Apply
          </div>
        </div>
      )}

      {/* Allow Chose Gender */}
      <div className={styles.heading}>
        <div className={styles.title}>Gender</div>
        <div
          className={styles.togle}
          onClick={() =>
            filters.find(i => i == 'gender')
              ? setFilters(filters.filter(i => i != 'gender'))
              : setFilters([...filters, 'gender'])
          }
        >
          {filters.find(i => i == 'gender') ? '-' : '+'}
        </div>
      </div>
      {filters.find(i => i == 'gender') && (
        <div className={styles.options}>
          <div className={styles.flex}>
            <div className={styles.icon}>
              {router.query.gender == 'All' || router.query.gender == 'Male' ? (
                <CheckBoxIcon
                  onClick={() =>
                    updateRoute({
                      gender: `${
                        router.query.gender == 'All' ? 'Female' : 'Female'
                      }`
                    })
                  }
                />
              ) : (
                <CheckBoxOutlineBlankIcon
                  onClick={() =>
                    updateRoute({
                      gender: `${
                        router.query.gender == 'Female' ? 'All' : 'Male'
                      }`
                    })
                  }
                />
              )}
            </div>
            <div className={styles.value}>Male</div>
          </div>
          <div className={styles.flex}>
            {router.query.gender == 'All' || router.query.gender == 'Female' ? (
              <CheckBoxIcon
                onClick={() =>
                  updateRoute({
                    gender: `${router.query.gender == 'All' ? 'Male' : 'Male'}`
                  })
                }
              />
            ) : (
              <CheckBoxOutlineBlankIcon
                onClick={() =>
                  updateRoute({
                    gender: `${
                      router.query.gender == 'Male' ? 'All' : 'Female'
                    }`
                  })
                }
              />
            )}
            <div className={styles.value}>Female</div>
          </div>
        </div>
      )}

      {/* Allow Chose Age */}
      <div className={styles.heading}>
        <div className={styles.title}>Age</div>
        <div
          className={styles.togle}
          onClick={() =>
            filters.find(i => i == 'age')
              ? setFilters(filters.filter(i => i != 'age'))
              : setFilters([...filters, 'age'])
          }
        >
          {filters.find(i => i == 'age') ? '-' : '+'}
        </div>
      </div>
      {filters.find(i => i == 'age') && (
        <div className={styles.options}>
          <div
            className={styles.flex}
            style={{
              justifyContent: 'space-between',
              gap: '10px',
              alignItems: 'center'
            }}
          >
            <label>Minimum </label>{' '}
            <input
              type='number'
              value={age.min}
              onChange={e => setAge({ ...age, min: e.target.value })}
            />{' '}
            year
          </div>
          <div
            className={styles.flex}
            style={{
              justifyContent: 'space-between',
              gap: '10px',
              alignItems: 'center'
            }}
          >
            <label>Maximum</label>
            <input
              type='number'
              value={age.max}
              onChange={e => setAge({ ...age, max: e.target.value })}
            />{' '}
            year
          </div>
          <div
            className={styles.apply}
            onClick={() =>
              updateRoute({
                bornAtTo: ageToDateOfBirth(age.min),
                bornAtFrom: ageToDateOfBirth(age.max)
              })
            }
          >
            Apply
          </div>
        </div>
      )}

      {/* Allow chose Height */}
      <div className={styles.heading}>
        <div className={styles.title}>Height</div>
        <div
          className={styles.togle}
          onClick={() =>
            filters.find(i => i == 'height')
              ? setFilters(filters.filter(i => i != 'height'))
              : setFilters([...filters, 'height'])
          }
        >
          {filters.find(i => i == 'height') ? '-' : '+'}
        </div>
      </div>
      {filters.find(i => i == 'height') && (
        <div className={styles.options}>
          <label>From </label>{' '}
          <div
            className={styles.flex}
            style={{
              justifyContent: 'space-between',
              gap: '10px',
              alignItems: 'center'
            }}
          >
            <input
              type='number'
              style={{ width: '60px' }}
              value={height.feetFrom}
              onChange={e => setHeight({ ...height, feetFrom: e.target.value })}
            />{' '}
            feet
            <input
              type='number'
              style={{ width: '60px' }}
              value={height.inchesFrom}
              onChange={e =>
                setHeight({ ...height, inchesFrom: e.target.value })
              }
            />
            inches
          </div>
          <label>To</label>{' '}
          <div
            className={styles.flex}
            style={{
              justifyContent: 'space-between',
              gap: '10px',
              alignItems: 'center'
            }}
          >
            <input
              type='number'
              style={{ width: '60px' }}
              value={height.feetTo}
              onChange={e => setHeight({ ...height, feetTo: e.target.value })}
            />
            feet{' '}
            <input
              type='number'
              style={{ width: '60px' }}
              value={height.inchesTo}
              onChange={e => setHeight({ ...height, inchesTo: e.target.value })}
            />
            inches
          </div>
          <div className={styles.apply} onClick={() => updateRoute(height)}>
            Apply
          </div>
        </div>
      )}

      {/* Allow chose Merital Status */}
      <div className={styles.heading}>
        <div className={styles.title}>Marital Status</div>
        <div
          className={styles.togle}
          onClick={() =>
            filters.find(i => i == 'maritalStatus')
              ? setFilters(filters.filter(i => i != 'maritalStatus'))
              : setFilters([...filters, 'maritalStatus'])
          }
        >
          {filters.find(i => i == 'maritalStatus') ? '-' : '+'}
        </div>{' '}
      </div>
      {filters.find(i => i == 'maritalStatus') && (
        <div className={styles.options}>
          {maritalStatuses?.map((item, index) => (
            <div className={styles.flex} key={index}>
              <div className={styles.icon}>
                {router.query.maritalStatuses
                  ?.split(',')
                  .find(each => each == item) ? (
                  <CheckBoxIcon
                    onClick={() =>
                      updateRoute({
                        maritalStatuses: router.query.maritalStatuses
                          ?.split(',')
                          .filter(i => i != item)
                          .join(',')
                      })
                    }
                  />
                ) : (
                  <CheckBoxOutlineBlankIcon
                    onClick={() =>
                      updateRoute({
                        maritalStatuses: router.query.maritalStatuses
                          ? [
                              ...router.query.maritalStatuses.split(','),
                              item
                            ].join(',')
                          : [item].join(',')
                      })
                    }
                  />
                )}{' '}
              </div>
              <div className={styles.value}>{item}</div>
            </div>
          ))}
        </div>
      )}

      {/* Allow Chose Professional Status */}
      <div className={styles.heading}>
        <div className={styles.title}>Profession</div>
        <div
          className={styles.togle}
          onClick={() =>
            filters.find(i => i == 'profession')
              ? setFilters(filters.filter(i => i != 'profession'))
              : setFilters([...filters, 'profession'])
          }
        >
          {filters.find(i => i == 'profession') ? '-' : '+'}
        </div>
      </div>
      {filters.find(i => i == 'profession') && (
        <div
          className={styles.options}
          style={{ maxHeight: '30vh', overflow: 'scroll' }}
        >
          {professions.map((item, index) => (
            <div className={styles.flex} key={index}>
              <div className={styles.icon}>
                {router.query.professions
                  ?.split(',')
                  .find(each => each == item) ? (
                  <CheckBoxIcon
                    onClick={() =>
                      updateRoute({
                        professions: router.query.professions
                          ?.split(',')
                          .filter(i => i != item)
                          .join(',')
                      })
                    }
                  />
                ) : (
                  <CheckBoxOutlineBlankIcon
                    onClick={() =>
                      updateRoute({
                        professions: router.query.professions
                          ? [...router.query.professions.split(','), item].join(
                              ','
                            )
                          : [item].join(',')
                      })
                    }
                  />
                )}
              </div>
              <div className={styles.value}>{item}</div>
            </div>
          ))}
        </div>
      )}

      {/* Allow Chose Educational Type */}
      <div className={styles.heading}>
        <div className={styles.title}>Education Type</div>
        <div
          className={styles.togle}
          onClick={() =>
            filters.find(i => i == 'educationType')
              ? setFilters(filters.filter(i => i != 'educationType'))
              : setFilters([...filters, 'educationType'])
          }
        >
          {filters.find(i => i == 'educationType') ? '-' : '+'}
        </div>
      </div>
      {filters.find(i => i == 'educationType') && (
        <div
          className={styles.options}
          style={{ maxHeight: '30vh', overflow: 'scroll' }}
        >
          {educationTypes.map((item, index) => (
            <div className={styles.flex} key={index}>
              <div className={styles.icon}>
                {router.query.educationTypes
                  ?.split(',')
                  .find(each => each == item) ? (
                  <CheckBoxIcon
                    onClick={() =>
                      updateRoute({
                        educationTypes: router.query.educationTypes
                          ?.split(',')
                          .filter(i => i != item)
                          .join(',')
                      })
                    }
                  />
                ) : (
                  <CheckBoxOutlineBlankIcon
                    onClick={() =>
                      updateRoute({
                        educationTypes: router.query.educationTypes
                          ? [
                              ...router.query.educationTypes.split(','),
                              item
                            ].join(',')
                          : [item].join(',')
                      })
                    }
                  />
                )}
              </div>
              <div className={styles.value}>{item}</div>
            </div>
          ))}
        </div>
      )}

      {/* Allow Chose Educational Status */}
      <div className={styles.heading}>
        <div className={styles.title}>Education</div>
        <div
          className={styles.togle}
          onClick={() =>
            filters.find(i => i == 'education')
              ? setFilters(filters.filter(i => i != 'education'))
              : setFilters([...filters, 'education'])
          }
        >
          {filters.find(i => i == 'education') ? '-' : '+'}
        </div>
      </div>
      {filters.find(i => i == 'education') && (
        <div
          className={styles.options}
          style={{ maxHeight: '30vh', overflow: 'scroll' }}
        >
          {educationalStatus.map((item, index) => (
            <div className={styles.flex} key={index}>
              <div className={styles.icon}>
                {router.query.educationalStatuses
                  ?.split(',')
                  .find(each => each == item) ? (
                  <CheckBoxIcon
                    onClick={() =>
                      updateRoute({
                        educationalStatuses: router.query.educationalStatuses
                          ?.split(',')
                          .filter(i => i != item)
                          .join(',')
                      })
                    }
                  />
                ) : (
                  <CheckBoxOutlineBlankIcon
                    onClick={() =>
                      updateRoute({
                        educationalStatuses: router.query.educationalStatuses
                          ? [
                              ...router.query.educationalStatuses.split(','),
                              item
                            ].join(',')
                          : [item].join(',')
                      })
                    }
                  />
                )}
              </div>
              <div className={styles.value}>{item}</div>
            </div>
          ))}
        </div>
      )}

      {/* Allow Chose University Status */}
      <div className={styles.heading}>
        <div className={styles.title}>College/University</div>
        <div
          className={styles.togle}
          onClick={() =>
            filters.find(i => i == 'uni')
              ? setFilters(filters.filter(i => i != 'uni'))
              : setFilters([...filters, 'uni'])
          }
        >
          {filters.find(i => i == 'uni') ? '-' : '+'}
        </div>{' '}
      </div>
      {filters.find(i => i == 'uni') && (
        <div
          className={styles.options}
          style={{ maxHeight: '30vh', overflow: 'scroll' }}
        >
          {institutes.map((item, index) => (
            <div className={styles.flex} key={index}>
              <div className={styles.icon}>
                {router.query.universityNames
                  ?.split(',')
                  .find(each => each == item) ? (
                  <CheckBoxIcon
                    onClick={() =>
                      updateRoute({
                        universityNames: router.query.universityNames
                          ?.split(',')
                          .filter(i => i != item)
                          .join(',')
                      })
                    }
                  />
                ) : (
                  <CheckBoxOutlineBlankIcon
                    onClick={() =>
                      updateRoute({
                        universityNames: router.query.universityNames
                          ? [
                              ...router.query.universityNames.split(','),
                              item
                            ].join(',')
                          : [item].join(',')
                      })
                    }
                  />
                )}
              </div>
              <div className={styles.value}>{item}</div>
            </div>
          ))}
        </div>
      )}

      {/* Allow Chose Category */}
      <div className={styles.heading}>
        <div className={styles.title}>Category</div>
        <div
          className={styles.togle}
          onClick={() =>
            filters.find(i => i == 'category')
              ? setFilters(filters.filter(i => i != 'category'))
              : setFilters([...filters, 'category'])
          }
        >
          {filters.find(i => i == 'category') ? '-' : '+'}
        </div>{' '}
      </div>
      {filters.find(i => i == 'category') && (
        <div
          className={styles.options}
          style={{ maxHeight: '30vh', overflow: 'scroll' }}
        >
          {categoryFront.map((item, index) => (
            <div className={styles.flex} key={index}>
              <div className={styles.icon}>
                {router.query.universityNames
                  ?.split(',')
                  .find(each => each == item) ? (
                  <CheckBoxIcon
                    onClick={() =>
                      updateRoute({
                        universityNames: router.query.universityNames
                          ?.split(',')
                          .filter(i => i != item)
                          .join(',')
                      })
                    }
                  />
                ) : (
                  <CheckBoxOutlineBlankIcon
                    onClick={() =>
                      updateRoute({
                        universityNames: router.query.universityNames
                          ? [
                              ...router.query.universityNames.split(','),
                              item
                            ].join(',')
                          : [item].join(',')
                      })
                    }
                  />
                )}
              </div>
              <div className={styles.value}>{item}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Search
