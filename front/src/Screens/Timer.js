import React, { useEffect } from 'react';
import { useTimer } from '../Context/TimerContext';
import { useNavigate } from 'react-router-dom';
import rider from "../Images/motorbike.png";

const Timer = () => {
    const { seconds, setSeconds } = useTimer();
    const navigate = useNavigate();

    useEffect(() => {
        // Reset seconds to zero when the Timer component mounts
        setSeconds(0);

        const timer = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds + 1); // Increase the seconds
        }, 1000);

        return () => clearInterval(timer);
    }, [setSeconds]);

    // Function to format time in MM:SS format
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const remainingSeconds = time % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    // Calculate progress bar width dynamically
    const progressWidth = (seconds / (30 * 60)) * 100;

    return (
        <div className='bg-black h-screen w-screen'>
            <div className="fixed inset-0 bg-black bg-opacity-70 z-10 flex justify-center items-center">
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-black border border-yellow-500 p-6 rounded-md text-center">
                    <img src={rider} alt="Rider" className='w-52 ml-7 p-2 h-32 bg-yellow-500'/>
                    <h2 className="text-2xl text-yellow-500 font-bold mb-4">Order Placed!</h2>
                    <p className="text-lg text-yellow-500 mb-4">Your order will arrive in 30 minutes</p>
                    {/* Display formatted time */}
                    <p className="text-4xl text-yellow-500 bg-black font-bold">{formatTime(seconds)}</p>
                    <div className="relative pt-1 mt-4">
                        <div className="flex h-2 bg-yellow-500 w-full rounded-full">
                            <div
                                className="h-2 border border-yellow-500 bg-black rounded-full"
                                style={{ width: `${progressWidth > 0 ? progressWidth : 0}%` }} // Set progress bar width based on remaining time
                            />
                        </div>
                        <div className="flex justify-between mt-1 text-xs text-black">
                            <span>0 min</span>
                            <span>15 min</span>
                            <span>30 min</span>
                        </div>
                    </div>
                    <button className="bg-yellow-500 text-black px-4 py-2 rounded-md mt-4" onClick={()=>{
                        navigate("/home")
                    }}>Close</button>
                </div>
            </div>
        </div>
        </div>
        
    );
};

export default Timer;
