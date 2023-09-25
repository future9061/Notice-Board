import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice.js'
import postSlice from './postSlice.js'

export default configureStore({
  reducer: {
    user: userSlice.reducer,
    post: postSlice.reducer
  },
})