import React from 'react'
import styles from '@/styles/Profile/Update/Basic.module.css'
import { useRouter } from 'next/router'
import { routes } from '@/utility/data'

const Routes = () => {
  const router = useRouter()
  return (
    <div className={styles.wrapper} style={{ paddingTop: '60px' }}>
      <div className={styles.routers}>
        {routes.map((i, index) => (
          <span
            key={index}
            style={
              router.query.update == i.query
                ? { background: 'black', color: 'white' }
                : {}
            }
            onClick={() =>
              router.push(
                `/profile/update/${router.query.id}?update=${i.query}`
              )
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
