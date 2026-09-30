import Header from '@/components/Header'
import Steps from '@/components/Steps'
import Recent from '@/components/Recent'
import RegisterBanner from '@/components/RegisterBanner'
import db from '@/database/connection'
import User from '@/database/model/User'
import { divisions } from '@/utility/divisions'

export default function Home ({ data, recent }) {
  return (
    <>
      <Header data={data} />
      <Steps />
      <RegisterBanner />
      <Recent recent={recent} />
      {/* <Search /> */}
    </>
  )
}

const fetchData = async () => divisions

const recentUsers = async () => {
  try {
    await db.connect()
    const users = await User.find({ active: true })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('profileId gender bornAt height skinColor city profession isVerified saverIds')
      .lean()
    return JSON.parse(JSON.stringify(users))
  } catch (error) {
    console.error('Could not load recent profiles:', error.message)
    return []
  }
}

export async function getStaticProps() {
  try {
    const data = await fetchData();
    const recent = await recentUsers();
    return {
      props: {
        data,
        recent
      },
      revalidate: 600
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        data: [],
        recent: []
      }
    };
  }
}
