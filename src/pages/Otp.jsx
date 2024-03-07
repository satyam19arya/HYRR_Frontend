import React, { useState }  from 'react';
import { useNavigate} from 'react-router-dom';
import {axiosClient} from '../utils/axiosClient';
import { TEInput } from "tw-elements-react";
import { Link } from 'react-router-dom';

const Otp = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e){
      e.preventDefault();
      try{ // eslint-disable-next-line
        const response = await axiosClient.post('/api/auth/sendotp', {
          email,
        }); 
        e.target.reset();
        navigate('/signup');
      }catch(error){
        console.log(error);
      }
  }

  return (
    <section className="mt-10">
      <div className="container h-full px-6 py-24">
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="w-full"
              alt="Login"
            />
          </div>

          <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
            <form onSubmit={handleSubmit}>
              <TEInput
                type="email"
                label="Email address"
                size="lg"
                className="mb-6"
                id='email'
                required
                onChange={(e) => setEmail(e.target.value)}
              ></TEInput>

              <input 
                type="submit"
                value="Send OTP" 
                className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
              />

              <div className="mt-2 text-stone-500">
                    Already have an account? <Link className='text-blue-400' to="/login">Log In</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Otp;