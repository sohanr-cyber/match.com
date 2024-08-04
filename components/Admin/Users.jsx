import React, { useEffect, useState } from 'react'
import styles from '../../styles/Admin/Users.module.css'
import SearchIcon from '@mui/icons-material/Search'
import { useRouter } from 'next/router'
import { finishLoading, startLoading } from '@/redux/stateSlice'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import MailBox from '../utils/MailBox'

const Users = ({ title, dashboard, users }) => {
  const [filteredUsers, setFilteredUsers] = useState(users)
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState(router.query.query)
  const dispatch = useDispatch()
  const [sendMail, setSendMail] = useState(null)

  useEffect(() => {
    setFilteredUsers(users)
  }, [users])

  const updateRoute = data => {
    const queryParams = { ...router.query, ...data }
    router.push({
      pathname: router.pathname,
      query: queryParams,
      shallow: false
    })
  }

  const remove = async userId => {
    try {
      dispatch(startLoading())
      const { data } = await axios.delete(`/api/user/${userId}`)
      setFilteredUsers(filteredUsers.filter(item => item._id != userId))
      dispatch(finishLoading())
    } catch (error) {
      dispatch(finishLoading())
      console.log(error)
    }
  }

  return (
    <>
      {!dashboard && <h2>{title}</h2>}
      {sendMail && <MailBox recipents={sendMail} close={setSendMail} />}

      <div className={styles.wrapper}>
        {dashboard && <h2>{title}</h2>}
        {!dashboard && (
          <div className={styles.flex}>
            <div className={styles.left}>
              <input
                type='text'
                placeholder=''
                onChange={e => setSearchQuery(e.target.value)}
                value={searchQuery}
              />
              <span onClick={() => updateRoute({ query: searchQuery })}>
                <SearchIcon />
              </span>
            </div>
            <div
              className={styles.right}
              style={{ display: 'flex', gap: '10px' }}
            >
              <select>
                {[
                  // 'Select Order Status',
                  'All',
                  'Female',
                  'Male'
                ].map((item, index) => (
                  <option key={index}>{item}</option>
                ))}
              </select>
            </div>
          </div>
        )}
        <div className={styles.table__wrapper}>
          <table>
            <thead>
              <tr>
                <th>User Id</th>
                <th>Joined</th>
                <th style={{ minWidth: '100px' }}> Name</th>
                <th>City</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>Action</th>
                {/* Add more table headers as needed */}
              </tr>
            </thead>
            <tbody>
              {[...filteredUsers]?.map((user, index) => (
                <tr key={index}>
                  <td
                    onClick={() => router.push(`/profile/${user._id}`)}
                    style={
                      user.active == true
                        ? { color: 'lightgreen' }
                        : { color: 'red' }
                    }
                  >
                    {user.profileId}
                  </td>
                  <td>
                    {new Date(user.createdAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </td>
                  <td>{user.name}</td>

                  <td>{user.city}</td>
                  <td
                    style={
                      user.isVerified == true
                        ? { background: 'lightgreen' }
                        : { background: 'red' }
                    }
                  >
                    {user.email}
                  </td>
                  <td>{user.phone}</td>
                  <td
                    style={
                      user.gender == 'Male'
                        ? { background: 'lightgreen' }
                        : { background: 'skyblue' }
                    }
                  >
                    {user.gender}
                  </td>
                  <td className={styles.action}>
                    <span onDoubleClick={() => remove(user._id)}>Delete</span>
                    <span onClick={() => router.push(`/profile/${user._id}`)}>
                      {' '}
                      View
                    </span>
                    <span onClick={() => setSendMail([user])}>Mail</span>
                  </td>
                  {/* Add more table cells as needed */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Users
