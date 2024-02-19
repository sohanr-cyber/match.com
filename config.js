let BASE_URL

if (process.env.NODE_ENV !== 'production') {
  BASE_URL = 'http://localhost:3000'
} else {
  BASE_URL = 'https://match-com.vercel.app'
}

const APP_SECRET = process.env.APP_SECRET
export default BASE_URL
export { APP_SECRET }
