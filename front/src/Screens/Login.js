import React from "react";
import logo from "../Images/logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { makeUnauthenticatedPOSTRequest } from "../utils/ServerHelper";
import Textfield from "../Components/Textfield";
import Passwordfield from "../Components/Passwordfield";

const Login = () => {
  //useStates
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const login = async () => {
    try {
      const data = {
        email,
        password,
      };
      const response = await makeUnauthenticatedPOSTRequest("/auth/login",
        data
      );
      if (response.error) {
        if (response.error === "Invalid Credentials") {
          alert("Invalid email or password");
        } else {
          alert("Login failed. Please try again.");
        }
      } else {
        console.log(response);
        const token = response.token;
        const date = new Date();
        date.setDate(date.getDate() + 30);
        setCookie("token", token, { path: "/", expires: date });
        alert("Success");
        navigate("/home");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-900 to-black animate-gradient">
      <div className="py-8 bg-black flex w-1/2 bg-opacity-20 rounded-lg px-6 border border-yellow-500 p-3 border-2 sm:px-8 md:px-10 lg:px-12 xl:px-16">
        {/* Logo */}
        <div className="w-1/2 flex justify-center items-center hover:rotate-12 hover:scale-110 hover:opacity-100 opacity-75 transition-transform duration-300">
          <img
            src={logo}
            alt="logo"
            className="w-full rounded-full border p-2 border-8 border-yellow-400 transform hover:rotate-0 hover:scale-100 transition-transform"
          ></img>
        </div>

        {/* Login Form */}
        <div className="w-1/2 ml-8 transition-transform transform hover:scale-105">
          {" "}
          {/* Added margin for spacing */}
          <h1 className="text-yellow-500 text-3xl font-bold mb-6 sm:mb-8">
            Welcome to Munchify!
          </h1>
          <div>
          <Textfield
            label={"E-mail address"}
            placeholder={"Enter your E-mail here"}
            value={email}
            setValue={setEmail}
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
          <button
            type="submit"
            className="bg-yellow-500 font-bold flex justify-end mb-4 ml-2 px-6 border border-yellow-500 hover:text-yellow-500 rounded-md py-3 hover:bg-transparent transition-all duration-300"
            onClick={(e) => {
              e.preventDefault();
              login();
            console.log(email);
            console.log(password);
            }}
          >
            LOG IN
          </button>
          <div className="text-white hover:text-yellow-500 hover:underline p-3">
            Don't have an Account?
          </div>
          <div className="flex justify-end mb-4">
            <button
              type="submit"
              className="bg-yellow-500 px-6 py-3 border border-yellow-500 hover:text-yellow-500 rounded-md hover:bg-transparent transition-all duration-300"
            >
              <Link to="/signup">Signup Instead!</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
