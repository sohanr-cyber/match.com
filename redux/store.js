import { configureStore } from '@reduxjs/toolkit'
import user from './userSlice'
import state from './stateSlice'
import notistack from './notistackSlice'

export const store = configureStore({
  reducer: {
    user,
    state,
    notistack
  }
})
