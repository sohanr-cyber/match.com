import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import Loading from './utils/Loading'
import { useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import Chat from './Chat'

const Layout = ({ children }) => {
  const loading = useSelector(state => state.state.loading)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const notistack = useSelector(state => state.notistack.notistack)
  useEffect(() => {
    if (notistack) {
      enqueueSnackbar(notistack.message, notistack.option || 'default')
    }
  }, [notistack])
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
      <Chat />
      {loading && <Loading />}
    </div>
  )
}

export default Layout
