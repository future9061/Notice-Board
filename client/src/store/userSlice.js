import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    userLogin: (state, action) => {
      return action.payload
    }
  },
})

export const { userLogin } = userSlice.actions

export default userSlice