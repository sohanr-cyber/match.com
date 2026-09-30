import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import axios from 'axios'

export default function useAdminData (url) {
  const router = useRouter()
  const userInfo = useSelector(state => state.user.userInfo)
  const [state, setState] = useState({ data: null, loading: true, error: '' })
  const [attempt, setAttempt] = useState(0)
  useEffect(() => {
    if (!router.isReady) return
    if (!userInfo?.token) { router.replace('/login'); return }
    if (userInfo.role !== 'admin') {
      setState({ data: null, loading: false, error: 'Admin access required.' })
      return
    }
    if (!url) return
    let cancelled = false
    setState({ data: null, loading: true, error: '' })
    axios.get(url, { headers: { Authorization: 'Bearer ' + userInfo.token } })
      .then(({ data }) => { if (!cancelled) setState({ data, loading: false, error: '' }) })
      .catch(error => {
        if (!cancelled) setState({ data: null, loading: false, error: error.response?.data?.error || 'Could not load proposals. Please try again.' })
      })
    return () => { cancelled = true }
  }, [router, router.isReady, userInfo?.token, userInfo?.role, url, attempt])
  return { ...state, retry: () => setAttempt(value => value + 1) }
}