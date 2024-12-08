import { createSlice } from '@reduxjs/toolkit';

// This slice controls wether the application is in dark or light mode
export const modeSlice = createSlice({
  name: 'mode',
  initialState: {
    dark: false,
  },
  reducers: {
    darkModeToggled: (state) => {
      !state.dark;
    },
  },
});

export const { darkModeToggled } = modeSlice.actions;
export default modeSlice.reducer;
