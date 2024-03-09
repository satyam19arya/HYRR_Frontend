import React, { useEffect, useState } from 'react';
import './UpdateProfile.scss';
import img from './user.png';
import { useSelector, useDispatch } from 'react-redux';
import { updateMyProfile } from '../redux/slices/appConfigSlice';
import { KEY_ACCESS_TOKEN, removeItem } from "../utils/localStorageManager";
import {useNavigate} from 'react-router-dom';
import { axiosClient } from "../utils/axiosClient";
import {
    TERipple,
    TEModal,
    TEModalDialog,
    TEModalContent,
    TEModalHeader,
    TEModalBody,
    TEModalFooter,
  } from "tw-elements-react";

const UpdateProfile = () => {
    const myProfile = useSelector(state => state.appConfigReducer.myProfile);
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [userImg, setUserImg] = useState('');
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setName(myProfile?.name || '');
        setBio(myProfile?.bio || '');
        setUserImg(myProfile?.avatar?.url);
    }, [myProfile]);

    function handleImageChange(e){
        const file = e.target.files[0]; 
        if(file.size > 2 * 1024 * 1024) return alert('Image size is too large (max: 2MB)');
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            if(fileReader.readyState === fileReader.DONE){
                setUserImg(fileReader.result)
            }
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(updateMyProfile({
            name,
            bio,
            userImg
        }))
    };

    const handleDelete = async() => {
        try {
            await axiosClient.delete('/api/user/delete', {
                userId: myProfile?._id
            });
        } catch (error) {
            console.log('error', error);
        } finally {
            removeItem(KEY_ACCESS_TOKEN);
            navigate('/login')
        }
    }

  return (
    <div className="UpdateProfile">
        <div className="containerd">
            <div className="left-part">
                <div className="input-user-img">
                    <label htmlFor="inputImg" className="labelImg">
                        <img src={userImg ? userImg : img} alt={name} />
                    </label>
                    <input className='inputImg' id="inputImg" type="file" accept="image/*" onChange={handleImageChange}/>
                </div>
            </div>
            <div className="right-part">
                <form onSubmit={handleSubmit}>
                    <div>
                        <input value={name} type="text" placeholder="Your Name" onChange={(e) => setName(e.target.value)}/>
                        <input value={bio} type="text" placeholder="Your Bio" onChange={(e) => setBio(e.target.value)}/>
                    </div>
                    <button 
                        type="submit" 
                        className="mt-3 inline-block rounded bg-neutral-100 px-[54px] pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)]" 
                        onClick={handleSubmit}
                    >
                        Update
                    </button>
                </form>

                <div className="delete mt-3">
                    <button 
                        type="button"
                        className="inline-block rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]" 
                        onClick={() => setShowModal(true)}
                    >
                        Delete Account
                    </button>
                </div>
            </div>
        </div>

        {/* <!-- Modal --> */}
        <TEModal show={showModal} setShow={setShowModal} staticBackdrop>
            <TEModalDialog>
            <TEModalContent>
                <TEModalHeader>
                <button
                    type="button"
                    className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                    aria-label="Close"
                >
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                    </svg>
                </button>
                </TEModalHeader>
                <TEModalBody>Are you sure you want to delete your account?</TEModalBody>
                <TEModalFooter>
                <TERipple rippleColor="light">
                    <button
                    type="button"
                    className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                    onClick={() => setShowModal(false)}
                    >
                    Close
                    </button>
                </TERipple>
                <TERipple rippleColor="light">
                    <button
                    type="button"
                    onClick={handleDelete}
                    className="ml-1 inline-block rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]"
                    >
                    Delete Account
                    </button>
                </TERipple>
                </TEModalFooter>
            </TEModalContent>
            </TEModalDialog>
        </TEModal>
    </div>
  )
}

export default UpdateProfile;