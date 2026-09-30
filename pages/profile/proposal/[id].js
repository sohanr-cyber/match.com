export default function LegacyProposalPage () { return null }

export function getServerSideProps ({ locale, defaultLocale }) {
  const prefix = locale && locale !== defaultLocale ? '/' + locale : ''
  return { redirect: { destination: prefix + '/proposal', permanent: false } }
}