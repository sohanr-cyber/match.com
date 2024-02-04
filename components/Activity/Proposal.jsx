import React, { useEffect, useState } from 'react'
import styles from '../../styles/Profile/Proposal.module.css'
import BASE_URL from '@/config'
import axios from 'axios'
import Card from '../Profile/Card'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { finishLoading, startLoading } from '@/redux/stateSlice'

const Proposal = () => {
  const [proposals, setProposals] = useState([])
  const [open, setOpen] = useState(false)
  const userInfo = useSelector(state => state.user.userInfo)
  const router = useRouter()
  const dispatch = useDispatch()
  const fethProposals = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/proposal?userId=${userInfo.id}`
      )
      console.log(data)
      setProposals(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fethProposals()
  }, [])

  const acceptProposal = async payload => {
    try {
      dispatch(startLoading())
      const { data } = await axios.put(
        '/api/proposal',
        {
          ...payload
        },
        {
          headers: {
            Authorization: 'Bearer ' + userInfo.token
          }
        }
      )
      fethProposals()
      dispatch(finishLoading())
    } catch (error) {
      console.log(error)
      dispatch(finishLoading())
    }
  }

  const withdraw = async payload => {
    try {
      dispatch(startLoading())
      const { data } = await axios.patch(
        '/api/proposal',
        {
          ...payload
        },
        {
          headers: {
            Authorization: 'Bearer ' + userInfo.token
          }
        }
      )
      fethProposals()
      dispatch(finishLoading())
    } catch (error) {
      console.log(error)
      dispatch(finishLoading())
    }
  }

  const decline = async payload => {
    try {
      dispatch(startLoading())
      const { data } = await axios.put(
        '/api/proposal/status',
        {
          ...payload
        },
        {
          headers: {
            Authorization: 'Bearer ' + userInfo.token
          }
        }
      )
      fethProposals()
      dispatch(finishLoading())
    } catch (error) {
      console.log(error)
      dispatch(finishLoading())
    }
  }
  const poke = async payload => {
    try {
      dispatch(startLoading())
      const { data } = await axios.post(
        '/api/proposal/status',
        {
          ...payload
        },
        {
          headers: {
            Authorization: 'Bearer ' + userInfo.token
          }
        }
      )
      fethProposals()
      dispatch(finishLoading())
    } catch (error) {
      console.log(error)
      dispatch(finishLoading())
    }
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <div className={styles.title}>
          Proposals (0{proposals.length || '0'})
        </div>
        <div className={styles.toggle} onClick={() => setOpen(prev => !prev)}>
          {open ? '-' : '+'}
        </div>
      </div>
      {open && (
        <div className={styles.flex}>
          {proposals?.map((item, index) => (
            <>
              <div className={styles.item}>
                <Card
                  user={
                    router.query.id == item.sender._id
                      ? item.reciever
                      : item.sender
                  }
                  index={index}
                />

                {/* {userInfo.id == router.query.id && (
                  <div className={styles.action}>
                    {item.sender._id == userInfo.id ? (
                      item.status == 'Accepted' ? (
                        <div className={styles.accept}>Accepted</div>
                      ) : item.status == 'Withdrawn' ? (
                        <div
                          className={styles.accept}
                          style={{
                            background: 'grey',
                            color: 'lightgrey',
                            cursor: 'not-allowed'
                          }}
                        >
                          Poke
                        </div>
                      ) : (
                        <div className={styles.accept}>Poke</div>
                      )
                    ) : item.status == 'Accepted' ? (
                      <div className={styles.accept}>Accepted</div>
                    ) : item.status == 'Withdrawn' ? (
                      <div
                        className={styles.accept}
                        style={{
                          background: 'grey',
                          color: 'lightgrey',
                          cursor: 'not-allowed'
                        }}
                      >
                        Accept
                      </div>
                    ) : (
                      <div
                        className={styles.accept}
                        onClick={() =>
                          acceptProposal({
                            Id: item._id,
                            acceptor: item.reciever,
                            sender: item.sender
                          })
                        }
                      >
                        Accept
                      </div>
                    )}
                    {item.status == 'Declined' ? (
                      <div className={styles.decline}>Declined</div>
                    ) : item.sender != userInfo.id ? (
                      <div
                        className={styles.decline}
                        onClick={() =>
                          declineProposal({
                            Id: item._id,
                            acceptor: item.reciever,
                            sender: item.sender
                          })
                        }
                      >
                        Decline
                      </div>
                    ) : item.status == 'Withdrawn' ? (
                      <div
                        className={styles.decline}
                        style={{
                          background: 'grey',
                          color: 'lightgrey',
                          cursor: 'not-allowed'
                        }}
                      >
                        withdrawn
                      </div>
                    ) : (
                      <div
                        className={styles.decline}
                        onClick={() =>
                          withdraw({
                            Id: item._id,
                            reciever: item.reciever._id,
                            sender: item.sender._id
                          })
                        }
                      >
                        withdraw
                      </div>
                    )}
                  </div>
                )} */}

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
              </div>
            </>
          ))}
        </div>
      )}
    </div>
  )
}

export default Proposal
