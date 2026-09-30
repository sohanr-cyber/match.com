import React from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/Pagination.module.css'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

const Pages = ({ totalPages, currentPage }) => {
  const router = useRouter()
  const updateRoute = page => {
    router.push({ pathname: '/profile', query: { ...router.query, page } })
  }

  return (
    <div className={styles.flex}>
      <Stack spacing={2}>
        <Pagination
          count={Math.max(1, Number(totalPages) || 1)}
          shape='rounded'
          color='primary'
          page={Math.max(1, Number(router.query.page || currentPage) || 1)}
          onChange={(event, newPage) => updateRoute(newPage)}
          aria-label='Profile result pages'
        />
      </Stack>
    </div>
  )
}

export default Pages