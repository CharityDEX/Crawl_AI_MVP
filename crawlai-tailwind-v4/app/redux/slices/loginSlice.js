import { createSlice } from '@reduxjs/toolkit';

// This slice controls the heights of the input area and chat area
export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    loggedIn: false
  },
  reducers: {
    login: state => {
      state.loggedIn = true;
    },
    logout: state => {
      state.loggedIn = false;
    }
  }
})

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;