import React from 'react'
import styles from '../../styles/Profile/Table.module.css'
import Proposal from '../Activity/Proposal'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { getText } from '@/Translation/profile'
import Ln from '../utils/Ln'
const Table = ({ proposals, acceptProposal, withdraw, decline, poke }) => {
  const userInfo = useSelector(state => state.user.userInfo)
  const router = useRouter()
  const ln = router.locale
  
  return (
    <div className={styles.wrapper}>
      <table>
        <tr>
          <th>{getText('id', ln)}</th>
          <th>{getText('location', ln)}</th>
          {/* <th>Birth Date</th> */}
          <th>{getText('ocupation', ln)}</th>
          <th>Status</th>
        </tr>
        {proposals.map((item, index) => (
          <tr key={index}>
            <td
              style={{ color: 'green', cursor: 'pointer' }}
              onClick={() =>
                router.push(
                  `/profile/${
                    router.query.id == item.sender._id
                      ? item.reciever._id
                      : item.sender._id
                  }`
                )
              }
            >
              {router.query.id == item.sender._id
                ? item.reciever._id
                : item.sender._id}
            </td>
            <td>
              {router.query.id == item.sender._id ? (
                <ln item={item.reciever.city} />
              ) : (
                <Ln item={item.sender.city} />
              )}{' '}
              -
              {router.query.id == item.sender.district ? (
                <Ln item={item.reciever.district} />
              ) : (
                <Ln item={item.sender.district} />
              )}
              -
              {router.query.id == item.sender.upazilla ? (
                <Ln item={item.reciever.upazilla} />
              ) : (
                <Ln item={item.sender.upazilla} />
              )}
            </td>
            <td>
              {' '}
              {router.query.id == item.sender._id ? (
                <Ln item={item.reciever.profession} />
              ) : (
                <Ln item={item.sender.profession} />
              )}{' '}
            </td>
            <td>
              {' '}
              {userInfo.id == item.sender._id ? (
                <>
                  <div className={styles.action}>
                    <div className={styles.left}>
                      {item.status == 'Declined' ? (
                        <div className={styles.btn}>Declined</div>
                      ) : item.status == 'Accepted' ? (
                        <div className={styles.btn}>Accepted</div>
                      ) : item.status == 'Withdrawn' ? (
                        <div
                          className={styles.btn}
                          style={{
                            background: 'lightgrey',
                            cursor: 'not-allowed'
                          }}
                        >
                          Poke
                        </div>
                      ) : item.pokeCount < 3 ? (
                        <div
                          className={styles.btn}
                          onClick={() =>
                            poke({
                              Id: item._id,
                              sender: item.sender._id,
                              reciever: item.reciever._id
                            })
                          }
                        >
                          {item.pokeCount < 0 ? (
                            <>poke</>
                          ) : (
                            <>
                              poked({item.pokeCount}/{3})
                            </>
                          )}
                        </div>
                      ) : (
                        <div className={styles.btn}>
                          Poked({item.pokeCount}/{3})
                        </div>
                      )}
                    </div>
                    <div className={styles.right}>
                      {item.status == 'Withdrawn' ? (
                        <div
                          className={styles.btn}
                          style={{
                            background: 'lightgrey',
                            cursor: 'not-allowed'
                          }}
                        >
                          Withdrawn
                        </div>
                      ) : item.status == 'Accepted' ? (
                        <div
                          className={styles.btn}
                          style={{
                            background: 'lightgrey',
                            cursor: 'not-allowed'
                          }}
                        >
                          Withdraw
                        </div>
                      ) : (
                        <div
                          className={styles.btn}
                          onClick={() =>
                            withdraw({
                              Id: item._id,
                              reciever: item.reciever._id,
                              sender: item.sender._id
                            })
                          }
                        >
                          Withdraw
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.action}>
                    <div className={styles.left}>
                      {item.status == 'Accepted' ? (
                        <div className={styles.btn}>Accepted</div>
                      ) : item.status == 'Declined' ? (
                        <div
                          className={styles.btn}
                          style={{
                            background: 'lightgrey',
                            cursor: 'not-allowed'
                          }}
                        >
                          Accept
                        </div>
                      ) : item.status == 'Withdrawn' ? (
                        <div
                          className={styles.btn}
                          style={{
                            background: 'lightgrey',
                            cursor: 'not-allowed'
                          }}
                        >
                          Accept
                        </div>
                      ) : (
                        <div
                          className={styles.btn}
                          onClick={() =>
                            acceptProposal({
                              Id: item._id,
                              acceptor: item.reciever._id,
                              sender: item.sender._id
                            })
                          }
                        >
                          Accept
                        </div>
                      )}
                    </div>
                    <div className={styles.right}>
                      {item.status == 'Withdrawn' ? (
                        <div
                          className={styles.btn}
                          style={{
                            background: 'lightgrey',
                            cursor: 'not-allowed'
                          }}
                        >
                          Withdrawn
                        </div>
                      ) : item.status == 'Declined' ? (
                        <div
                          className={styles.btn}
                          style={{
                            background: 'lightgrey',
                            cursor: 'not-allowed'
                          }}
                        >
                          Declined
                        </div>
                      ) : item.status == 'Accepted' ? (
                        <div
                          className={styles.btn}
                          style={{
                            background: 'lightgrey',
                            cursor: 'not-allowed'
                          }}
                        >
                          Decline
                        </div>
                      ) : (
                        <div
                          className={styles.btn}
                          onClick={() =>
                            decline({
                              Id: item._id,
                              reciever: item.reciever._id,
                              sender: item.sender._id
                            })
                          }
                        >
                          Decline
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </td>
          </tr>
        ))}
      </table>
    </div>
  )
}

export default Table
