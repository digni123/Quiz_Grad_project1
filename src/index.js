import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router'
import LogIn_SignIn_Page from './components/LogIn_SignIn_Page'
import Quiz__Page from './components/Quiz__Page'
import FavoriteTopic from './components/FavoriteTopic';
import Score__Screening from './components/Score__Screening';
import SignUpPage from './components/SignUpPage'
import UserProfile from './components/UserProfile'
// import {} from '@fortawesome/free-solid-svg-icons'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/login' element={<LogIn_SignIn_Page />} />
        <Route path='/quiz' element={<Quiz__Page />} />
        <Route path='/favoritetopic' element={<FavoriteTopic />} />
        <Route path='/screenscore' element={<Score__Screening />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/userprofile' element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
