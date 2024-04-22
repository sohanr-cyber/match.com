import Layout from '@/components/Layout'
import BASE_URL from '@/config'
import { store } from '@/redux/store'
import '@/styles/globals.css'
import { DefaultSeo } from 'next-seo'
import NextNProgress from 'nextjs-progressbar'
import { Provider } from 'react-redux'
import Script from 'next/script'
import { getText } from '@/Translation/seo'
import { useRouter } from 'next/router'
import { SnackbarProvider } from 'notistack'

const site = BASE_URL

export default function App ({ Component, pageProps }) {
  const router = useRouter()
  const ln = router.locale
  const title = getText('title', ln)
  const description = getText('desc', ln)
  const imageUrl = '/images/match2.png'

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
      <Script
        async
        src='https://www.googletagmanager.com/gtag/js?id=G-WXSGJYN6W5'
      ></Script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-WXSGJYN6W5');
              `
        }}
      />
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
        <SnackbarProvider>
          {' '}
          <Layout>
            <>
              <NextNProgress />
              <Component {...pageProps} />
            </>
          </Layout>
        </SnackbarProvider>
      </Provider>
    </>
  )
}
