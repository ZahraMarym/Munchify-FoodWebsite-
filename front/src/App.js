import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import FrontScreen from './Screens/FrontScreen';
import Home from './Screens/Home';
import Checkout from './Screens/Checkout';
import Login from './Screens/Login';
import Signup from './Screens/Signup';
import Timer from './Screens/Timer';
import { TimerProvider } from './Context/TimerContext';

function App() {
    const [cookie] = useCookies(["token"]);

    return (
        <Router>
            <div className='bg-black w-full h-full'>
                {cookie.token ? (
                    <TimerProvider>
                        <Routes>
                            <Route path="/" element={<FrontScreen />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/checkout" element={<Checkout />} />
                            <Route path="*" element={<Navigate to="/home" />} />
                            <Route path="/timer" element={<Timer />} />
                        </Routes>
                    </TimerProvider>
                ) : (
                    <Routes>
                        <Route path="/" element={<FrontScreen />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                )}
            </div>
        </Router>
    );
}

export default App;
