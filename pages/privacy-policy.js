import React from 'react'
import { privacyPolicy } from '@/data'
import styles from '../styles/TermsAndConditions.module.css'
import { NextSeo } from 'next-seo'

const TermsAndConditions = () => {
  return (
    <>
      {' '}
      <NextSeo
        title={`Privacy Policy - Muslim Match Maker`}
        robotsProps={{
          index: false, // Do not index this page
          follow: true // Allow search engines to follow links on this page
        }}
      />
      <div className={styles.wrapper}>
        <h2>Privacy Policy - Muslim Match Maker</h2>
        <div className={styles.items}>
          <div className={styles.item}>
            <div className={styles.title}>
              Effective Date :{privacyPolicy.effectiveDate}
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.title}>1. Information We Collect:</div>
            <div className={styles.details}>
              {privacyPolicy.informationCollection.map((item, index) => (
                <div style={{ margin: '5px 0' }} key={index}>
                  <span
                    style={{ fontWeight: 'bold' }}
                    className={styles.heading}
                  >
                    {item.split(':')[0]}:
                  </span>
                  <span className={styles.details}>{item.split(':')[1]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.item}>
            <div className={styles.title}>2. How we use your information:</div>
            <p className={styles.details}>
              {privacyPolicy.howWeUseInformation.map((item, index) => (
                <div style={{ margin: '5px 0' }} key={index}>
                  <span
                    style={{ fontWeight: 'bold' }}
                    className={styles.heading}
                  >
                    {item.split(':')[0]}:
                  </span>
                  <span className={styles.details}>{item.split(':')[1]}</span>
                </div>
              ))}
            </p>
          </div>

          <div className={styles.item}>
            <div className={styles.title}>
              3. Information Sharing and Disclosure:
            </div>
            <p className={styles.details}>
              {privacyPolicy.informationSharingAndDisclosure}
            </p>
          </div>
          <div className={styles.item}>
            <div className={styles.title}>4. Security: </div>
            <p className={styles.details}>{privacyPolicy.security}</p>
          </div>

          <div className={styles.item}>
            <div className={styles.title}>5. Your Choices:</div>
            <p className={styles.details}>{privacyPolicy.yourChoices}</p>
          </div>

          <div className={styles.item}>
            <div className={styles.title}>6. Cookies and Tracking:</div>
            <p className={styles.details}>{privacyPolicy.thirdPartyLinks}</p>
          </div>

          <div className={styles.item}>
            <div className={styles.title}>7. Third-Party Links:</div>
            <p className={styles.details}>
              {privacyPolicy.howWeUseInformation.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </p>
          </div>

          <div className={styles.item}>
            <div className={styles.title}>
              8. Changes to This Privacy Policy:
            </div>
            <p className={styles.details}>
              {privacyPolicy.changesToPrivacyPolicy}
            </p>
          </div>

          <div className={styles.item}>
            <div className={styles.title}>9. Contact Us:</div>
            <p className={styles.details}>{privacyPolicy.contactUs}</p>
          </div>
        </div>
      </div>{' '}
    </>
  )
}

export default TermsAndConditions
