import { createSlice } from '@reduxjs/toolkit';

// This slice controls the heights of the input area and chat area
export const heightSlice = createSlice({
  name: 'height',
  initialState: {
    height: 60
  },
  reducers: {
    updateHeight: (state, action) => {
      state.height = action.payload;
    }
  }
})

export const { updateHeight } = heightSlice.actions;
export default heightSlice.reducer;