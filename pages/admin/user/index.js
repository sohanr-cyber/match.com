import React from 'react'
import styles from '../../../styles/Admin/Home.module.css'
import BASE_URL from '@/config'
import axios from 'axios'
import Users from '@/components/Admin/Users'

const index = ({ users }) => {
  return (
    <div className={styles.wrapper}>
      <Users
        title={'User List'}
        users={users}
        // totalPages={totalPages}
        // currentPage={currentPage}
      />
    </div>
  )
}

export default index

export async function getServerSideProps (context) {
  try {
    const { page, query } = context.query
    const response = await axios.get(`${BASE_URL}/api/auth/users`)
    const data = response.data
    return {
      props: {
        users: data
      }
    }
  } catch (error) {
    console.error('Error fetching products:', error)
    return {
      props: {
        users: []
      }
    }
  }
}
