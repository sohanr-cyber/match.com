import React from 'react'
import styles from '@/styles/Profile/Update/Basic.module.css'
import { useRouter } from 'next/router'

const routes = [
  { name: 'Basic', query: 'basic' },
  {
    name: 'Education & Career',
    query: 'education'
  },
  {
    name: 'Physical',
    query: 'physical'
  },
  {
    name: 'Personal & Religion',
    query: 'religion'
  },
  { name: 'Address & Contact', query: 'address' },
  {
    name: 'Family ',
    query: 'family'
  },
  { name: 'Expectation ', query: 'expectation' },
  {
    name: 'Others',
    query: 'others'
  }
]

const Routes = () => {
  const router = useRouter()
  return (
    <div className={styles.wrapper} style={{ paddingTop: '60px' }}>
      <div className={styles.routers}>
        {routes.map((i, index) => (
          <span
            key={index}
            style={
              router.query[i.query] == 'true'
                ? { background: 'black', color: 'white' }
                : {}
            }
            onClick={() =>
              router.push(`/profile/update/${router.query.id}?${i.query}=true`)
            }
          >
            {i.name}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Routes
