let BASE_URL, GMAIL, PASSWORD

// Use one MongoDB URI in both environments so profile reads and writes share
// the configured database. MONGODB_URI_PRODUCTION remains as a legacy fallback.
const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGODB_URI_PRODUCTION

if (process.env.NODE_ENV !== 'production') {
  BASE_URL = 'http://localhost:3000'
  GMAIL = process.env.GMAIL_USER_DEV
  PASSWORD = process.env.GMAIL_PASS_DEV
} else {
  // BASE_URL = 'https://main.dsxlpz487o1xu.amplifyapp.com'
  // BASE_URL = 'https://www.muslimmatchmaker.xyz'
  BASE_URL = 'https://www.muslimmatchmaker.life'
  GMAIL = process.env.GMAIL_USER
  PASSWORD = process.env.GMAIL_PASS
}

const APP_SECRET = process.env.APP_SECRET
export default BASE_URL
export { APP_SECRET, MONGODB_URI, GMAIL, PASSWORD }