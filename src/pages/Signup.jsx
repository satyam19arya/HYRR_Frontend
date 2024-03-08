import React, { useState } from 'react';
import { axiosClient } from "../utils/axiosClient";
import { Link, useNavigate } from 'react-router-dom';
import { TEInput } from "tw-elements-react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if(password !== confirmPassword) {
        alert("Password and Confirm Password do not match!");
        return;
      }
      if(!document.getElementById('checkboxDefault').checked) {
        alert("Please agree to the terms and conditions!");
        return;
      }
      await axiosClient.post("/api/auth/signup", {
        name,
        email,
        password,
        confirmPassword,
        otp
      });
      e.target.reset();
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <section className="lg:mt-20 flex justify-center">
      <div className="container h-full px-6 py-8 lg:py-18">
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-center">
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="w-full"
              alt="signup"
            />
          </div>

          <div className="md:w-8/12 lg:ml-6 lg:w-5/12 relative">
            <form onSubmit={handleSubmit}>
              <TEInput
                type="name"
                label="Full name"
                size="lg"
                className="mb-6"
                id='name'
                required
                onChange={(e) => setName(e.target.value)}
              ></TEInput>

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
                  type='button'
                  className="absolute right-[15px] top-[36.7%] transform -translate-y-1/2 focus:outline-none"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              <TEInput
                type={showConfirmPassword ? "text" : "password"}
                label="Confirm password"
                className="mb-6"
                size="lg"
                id='confirmPassword'
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></TEInput>

              <button
                type='button'
                className="absolute right-[15px] top-[52.5%] transform -translate-y-1/2 focus:outline-none"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>

              <TEInput
                type="text"
                label="OTP"
                className="mb-3"
                size="lg"
                id='otp'
                required
                onChange={(e) => setOtp(e.target.value)}
              ></TEInput>

              <div className="mb-[8px] block min-h-[1.5rem] pl-[1.5rem]">
                <input
                  className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                  type="checkbox"
                  value=""
                  id="checkboxDefault" />
                <label
                  className="inline-block text-stone-700 pl-[0.15rem] hover:cursor-pointer"
                  htmlFor="checkboxDefault">
                  I agree to terms and conditions
                </label>
              </div>

              <input 
                type="submit"
                value="Sign Up" 
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
  );
}

export default Signup;