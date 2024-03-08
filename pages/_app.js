import Layout from '@/components/Layout'
import BASE_URL from '@/config'
import { store } from '@/redux/store'
import '@/styles/globals.css'
import { DefaultSeo } from 'next-seo'
import NextNProgress from 'nextjs-progressbar'
import { Provider } from 'react-redux'

const site = BASE_URL
const title =
  'Find Your Perfect Match on Muslim Match Maker - Islamic Matrimony Site'
const description =
  "Welcome to Muslim Match Maker, your trusted platform for Islamic matrimony. Finding a life partner who shares your faith, values, and cultural background is now easier than ever. Our platform is designed to connect Muslim singles worldwide, facilitating meaningful connections that lead to lifelong companionship and happiness. Whether you're looking for love, companionship, or marriage, Muslim Match Maker is here to help you find your perfect match."
const imageUrl = '/images/match2.png'
export default function App ({ Component, pageProps }) {
  return (
    <>
      <link
        rel='apple-touch-icon'
        sizes='180x180'
        href='/apple-touch-icon.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='32x32'
        href='/favicon-32x32.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='16x16'
        href='/favicon-16x16.png'
      />
      <link rel='manifest' href='/site.webmanifest' />
      <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
      <meta name='msapplication-TileColor' content='#da532c' />
      <meta name='theme-color' content='#ffffff'></meta>
      <DefaultSeo
        title={title}
        description={description}
        openGraph={{
          type: 'website',
          url: site,
          title: title,
          description: description,
          images: [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: 'MuslimMatchMaker'
            }
          ]
        }}
        twitter={{
          handle: '@MuslimMatchMaker',
          site: '@MuslimMatchMaker',
          cardType: 'summary_large_image',
          title: title,
          description: description,
          image: imageUrl
        }}
      />
      <Provider store={store}>
        <Layout>
          <>
            <NextNProgress />
            <Component {...pageProps} />
          </>
        </Layout>
      </Provider>
    </>
  )
}
