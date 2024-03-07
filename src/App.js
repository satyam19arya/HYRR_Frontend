import React from 'react';
import { useEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import RequireUser from './components/RequireUser';
import RequireLogin from './components/RequireLogin';
import toast, { Toaster } from 'react-hot-toast';
import LoadingBar from 'react-top-loading-bar'
import { useSelector } from 'react-redux';

import Login from './pages/Login'
import Signup from './pages/Signup'
import Otp from './pages/Otp'
import Home from './pages/Home'
import Feed from './components/Feed'
import Profile from './components/Profile'
import UpdateProfile from './components/UpdateProfile.jsx'

export const TOAST_SUCCESS = "toast_success";
export const TOAST_FAILURE = "toast_failure";

function App() {
  const loadingRef = useRef(null);
  const isLoading = useSelector( state => state.appConfigReducer.isLoading);
  const toastData = useSelector((state) => state.appConfigReducer.toastData);

  useEffect(() => {
    if(isLoading){
      loadingRef.current?.continuousStart();   
    }else{
      loadingRef.current?.complete();
    }
  }, [isLoading]);

  useEffect(() => {
    switch (toastData.type) {
        case TOAST_SUCCESS:
            toast.success(toastData.message);
            break;
        case TOAST_FAILURE:
            toast.error(toastData.message);
            break;
        default:
    }
  }, [toastData]);

  return (
    <div>
      <LoadingBar color='#5f9fff' ref={loadingRef} />
      <div><Toaster/></div>
      <Routes>
        <Route element={<RequireUser/>}>
            <Route element={<Home/>}>
               <Route path='/' element = {<Feed/>}/>
               <Route path='/profile/:userId' element = {<Profile/>}/>
               <Route path='/updateProfile' element = {<UpdateProfile/>}/>
            </Route>
        </Route>
        <Route element={<RequireLogin/>}>
            <Route path="/otp" element={<Otp/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;