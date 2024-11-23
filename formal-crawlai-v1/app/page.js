'use client';

import './globalStyles.css';

import { useEffect } from 'react';
import { Provider } from 'react-redux'
import { store } from './redux/store'

import Nav from './components/nav/Nav.js'
import Chat from './components/chat/Chat.js';
import AssisstantEditor from './components/assisstantEditor/AssisstantEditor.js'

const App = () => {
  /*
  Once someone logs in, add a useEffect call with an empty dependencies array
  This useEffect call should run an async HTTP request with axios/swr
  to the Python API, and get the following:
    1. last active chat's human chat history
    2. last active chat's ai chat history
    3. last active chat's assisstant name
    4. full assisstants list
  
  The useEffect call should then dispatch actions to update:
    1. currentAssisstant
    2. humanChat
    3. aiChat
    4. asstList
  */

  return (
    <div>
      <Provider store={store}>
        <Chat />
        <Nav />
        <AssisstantEditor />
      </Provider>
    </div>
  );
}

export default App;