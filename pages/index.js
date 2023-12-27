import Head from 'next/head'
import Image from 'next/image'
import { Inter } from "next/font/google"
import styles from '@/styles/Home.module.css'
import Navbar from '@/components/Navbar'
import Header from '@/components/Header'
import Steps from '@/components/Steps'
import Recent from '@/components/Recent'
import Footer from '@/components/Footer'
import RegisterBanner from '@/components/RegisterBanner'
import axios from 'axios'
import BASE_URL from '@/config'
const inter = Inter({ subsets: ['latin'] })

export default function Home ({ data, recent }) {
  return (
    <>
      <Navbar />
      <Header data={data} />
      <Steps />
      <RegisterBanner />
      <Recent recent={recent} />
      <Footer />
      {/* <Search /> */}
    </>
  )
}

const fetchData = async () => {
  try {
    const { data } = await axios.get('https://bdapis.com/api/v1.1/divisions')
    return data
  } catch (error) {
    console.log(error)
  }
}
const recentUsers = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/auth/recent`)
    return data
  } catch (error) {
    console.log(error)
  }
}
export async function getServerSideProps () {
  try {
    const data = await fetchData()
    const recent = await recentUsers()
    return {
      props: { data, recent }
    }
  } catch (error) {
    console.log(error)
  }
}
