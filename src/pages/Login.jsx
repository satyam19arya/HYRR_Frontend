import React, { useState }  from 'react';
import { Link, useNavigate} from 'react-router-dom';
import {axiosClient} from '../utils/axiosClient';
import { KEY_ACCESS_TOKEN, setItem } from "../utils/localStorageManager";
import { TEInput } from "tw-elements-react";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e){
      e.preventDefault();
      try{
        const response = await axiosClient.post('/api/auth/login', {
          email,
          password
        });
        setItem(KEY_ACCESS_TOKEN, response.result.accessToken);
        navigate('/');
      }catch(error){
        console.log(error);
      }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="mt-10 flex justify-center">
      <div className="container h-full px-6 py-24">
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-center">
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="w-full"
              alt="Login"
            />
          </div>

          <div className="md:w-8/12 lg:ml-6 lg:w-5/12 relative">
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

              <TEInput
                type={showPassword ? "text" : "password"}
                label="Password"
                className="mb-6"
                size="lg"
                id='password'
                required
                onChange={(e) => setPassword(e.target.value)}
              ></TEInput>

                <button
                  className="absolute right-[16px] top-[44%] transform -translate-y-1/2 focus:outline-none"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              <input 
                type="submit"
                value="Login" 
                className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
              />

              <div className="mt-2 text-stone-500">
                Don't have an account? <Link className='text-blue-400' to="/otp">Sign Up</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login;