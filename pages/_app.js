import Layout from '@/components/Layout'
import { store } from '@/redux/store'
import '@/styles/globals.css'
import NextNProgress from 'nextjs-progressbar'
import { Provider } from 'react-redux'

export default function App ({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <>
      
          <NextNProgress />
          <Component {...pageProps} />
        </>
      </Layout>
    </Provider>
  )
}
