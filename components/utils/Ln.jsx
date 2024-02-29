import React from 'react'
import dict from '@/dictionary'
import { useRouter } from 'next/router'
const Ln = ({ item }) => {
  const router = useRouter()
  return <>{router.locale == 'bn' ? dict[item] : item}</>
}

export default Ln
