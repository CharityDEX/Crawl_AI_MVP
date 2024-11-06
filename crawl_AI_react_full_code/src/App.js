import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import OneAssisstant from './main_page/one_assisstant/OneAssisstant';
import TwoAssisstant from './main_page/two_assisstants/TwoAssisstants';
import MainPage from './main_page/MainPage';
import LoginPage from './login_page/LoginPage';
import Subscribe from './main_page/subscriptions/Subscriptions';

function App() {
  return (
    <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/twoAssisstants" element={<TwoAssisstant />} />
        <Route path="/oneAssisstant" element={<OneAssisstant />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/subscribe" element={<Subscribe />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
  );
}

export default App;