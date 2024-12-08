'use client'

import { Provider } from 'react-redux'
import { store } from '../redux/store'

import LoginApp from './Login.js';

const Login = () => {
  return (
    <Provider store={store}>
      <LoginApp />
    </Provider>
  );
}

export default Login;