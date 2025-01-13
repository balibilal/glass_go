import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
    user: null,
    token: null
 }

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserinfo(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    clearUserinfo(state) {
      state.user = null;
      state.token = null;
    },
    deleteUserinfo(state, action) {
      state.splice(action.payload)
    }
    
  },
})

export const { setUserinfo, clearUserinfo, deleteUserinfo } = authSlice.actions
export default authSlice.reducer