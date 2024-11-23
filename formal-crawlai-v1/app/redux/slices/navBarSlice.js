import { createSlice } from '@reduxjs/toolkit';

// This slice controls wether the menu bar is open or closed
export const navBarSlice = createSlice({
  name: 'navBar',
  initialState: {
    openNav: false,
  },
  reducers: {
    buttonPressed: (state) => {
      state.openNav = !state.openNav;
    },
  },
});

export const { buttonPressed } = navBarSlice.actions;
export default navBarSlice.reducer;
