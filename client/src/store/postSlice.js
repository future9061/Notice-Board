import { createSlice } from '@reduxjs/toolkit'

const postSlice = createSlice({
  name: 'post',
  initialState: [],
  reducers: {
    getPost: (state, action) => {
      return action.payload
    }
  },
})

export const { getPost } = postSlice.actions

export default postSlice