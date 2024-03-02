import React, { use } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/Pagination.module.css'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { englishToBangla } from '@/utils'

const Pages = ({ totalPages, currentPage }) => {
  const router = useRouter()
  const updateRoute = data => {
    console.log({ data })
    const queryParams = { ...router.query, ...data }
    router.push({
      pathname: '/profile',
      query: queryParams
    })
  }
  const ln = router.locale

  const renderPageNumbers = () => {
    const pageNumbers = []
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i)
    }
    return pageNumbers
  }

  return (
    <div className={styles.flex}>
      <Stack spacing={2}>
        <Pagination
          count={parseInt(totalPages)}
          shape='rounded'
          color='primary'
          page={parseInt(router.query.page)}
          onChange={(event, newPage) => updateRoute({ page: newPage })}
        />
      </Stack>
    </div>
  )
}

export default Pages
