import { createSlice } from '@reduxjs/toolkit'

const initialState = [];

const delSlice = createSlice({
  name: 'del',
  initialState,
  reducers: {
    
    deleteUserinfo(state, action) {
      state.splice(action.payload)
    }
    
  },
})

export const {deleteUserinfo } = delSlice.actions
export default delSlice.reducer