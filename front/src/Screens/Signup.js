import React from 'react';
import logo from "../Images/logo.jpg";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useCookies} from "react-cookie";
import { makeUnauthenticatedPOSTRequest } from "../utils/ServerHelper";
import Textfield from "../Components/Textfield";
import Passwordfield from "../Components/Passwordfield";


const Signup = () => {

    //useStates
    const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  //function
  const signUp = async () => {
    const data = {
      name,
      email,
      location,
      password
    };
    const response = await makeUnauthenticatedPOSTRequest(
      "/auth/register",
      data
    );
    if (response && !response.err) {
      const token = response.token;
      const date = new Date();
      date.setDate(date.getDate() + 30);
      setCookie("token", token, {path: "/", expires: date});
      alert("Success");
      navigate("/home");
    } else {
      alert("Failure");
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-900 to-black animate-gradient'>
      <div className='py-8 bg-black flex w-1/2 bg-opacity-20 rounded-lg px-6 border border-yellow-500 p-3 border-2 sm:px-8 md:px-10 lg:px-12 xl:px-16'>

        {/* Logo */}
        <div className='w-1/2 flex justify-center items-center hover:rotate-12 hover:scale-110 hover:opacity-100 opacity-75 transition-transform duration-300'>
          <img src={logo} alt="logo" className="w-full rounded-full border p-2 border-8 border-yellow-400 transform hover:rotate-0 hover:scale-100 transition-transform"></img>
        </div>

        {/* Login Form */}
        <div className="w-1/2 ml-8 transition-transform transform hover:scale-105"> {/* Added margin for spacing */}
          <h1 className='text-yellow-500 text-3xl font-bold mb-6 sm:mb-8'>Welcome to Munchify!</h1>
          <div>
          <Textfield
            label={"Name"}
            placeholder={"Enter your Full Name"}
            value={name}
            setValue={setName}
          />
          </div>

          <div>
          <Textfield
            label={"E-mail address"}
            placeholder={"Enter your E-mail here"}
            value={email}
            setValue={setEmail}
          />
          </div>

          <div className="mb-2">
          <Textfield
            label={"Location"}
            placeholder={"Enter your present Address"}
            value={location}
            setValue={setLocation}
          />
          </div>

          <div className="mb-2">
          <Passwordfield
            label={"Password"}
            placeholder={"Enter your Password"}
            value={password}
            setValue={setPassword}
          />
          </div>

          <div className='flex justify-end mb-4 font-bold'>
            <button type='submit' className='bg-yellow-500 px-6 py-3 border border-yellow-500 hover:text-yellow-500 rounded-md hover:bg-transparent transition-all duration-300'>
              <Link to="/login">LOG IN</Link>
            </button>
            <button type='submit' className='bg-yellow-500 ml-4 px-6 border border-yellow-500 hover:text-yellow-500 rounded-md py-3 hover:bg-transparent transition-all duration-300'
             onClick={(e) => {
                e.preventDefault();
                signUp();
              }}
            >
              SIGN UP
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Signup;
