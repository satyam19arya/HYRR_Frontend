import React, { useEffect } from "react";
import Navbar from '../components/Navbar';
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getMyInfo } from "../redux/slices/appConfigSlice";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyInfo());
    // eslint-disable-next-line
  }, [])
  
  return (
    <>
      <Navbar />
      <div className="mt-16">
        <Outlet />
      </div>
    </>
  )
}

export default Home;