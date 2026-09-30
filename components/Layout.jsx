import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import Loading from './utils/Loading'
import { useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import Chat from './Chat'
import BottomNav from './BottomNav'
import { useRouter } from 'next/router'

const Layout = ({ children }) => {
  const loading = useSelector(state => state.state.loading)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const notistack = useSelector(state => state.notistack.notistack)
  const router = useRouter()
  useEffect(() => {
    if (notistack) {
      enqueueSnackbar(notistack.message, notistack.option || 'default')
    }
  }, [notistack, enqueueSnackbar])



  return (
    <div>
      <Navbar />
      {children}
      <Footer />
      <Chat />
      <BottomNav />
      {loading && <Loading />}
    </div>
  )
}

export default Layout
