import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  riders: {}, // Or an appropriate default structure
};

const riderSlice = createSlice({
  name: 'riderUpdate',
  initialState,
  reducers: {
    riderUpdateinfo(state, action) {
      // Update the state with the payload
      const { rider, prodId } = action.payload;
      state.riders[prodId] = rider; // Assuming riders are stored by `prodId`
    },
  },
});

export const { riderUpdateinfo } = riderSlice.actions;
export default riderSlice.reducer;
