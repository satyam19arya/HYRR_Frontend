import React from 'react';
import './Navbar.scss';
import {useNavigate} from 'react-router-dom';
import Avatar from './Avatar';
import {AiOutlineHome} from 'react-icons/ai';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const navigate = useNavigate();
  const myProfile = useSelector(state => state.appConfigReducer.myProfile);

  return (
    <div className="Navbar">
      <div className="containerd">
          <h2 className="banner cursor-pointer font-extrabold text-primary-800" onClick={() => navigate('/')}>Fun-Tastic</h2>
          <div className="right-side">
            <div className="md:w-96">
                <div className="relative flex w-full flex-wrap items-stretch">
                  <input
                      type="search"
                      className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                      placeholder="Search"
                      aria-label="Search"
                      aria-describedby="button-addon1" 
                  />
                  <span
                    className="cursor-pointer input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
                    id="basic-addon2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5">
                        <path
                            fillRule="evenodd"
                            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                            clipRule="evenodd" />
                    </svg>
                  </span>
                </div>
            </div>
            <div className="profile cursor-pointer" onClick={() => navigate('/')}>
              <AiOutlineHome style={{fontSize: "28px", color: "rgb(66, 66, 115)"}}/>
            </div>
            <div className="profile cursor-pointer" onClick={() => navigate(`/profile/${myProfile?._id}`)}>
              <Avatar src={myProfile?.avatar?.url}/>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Navbar