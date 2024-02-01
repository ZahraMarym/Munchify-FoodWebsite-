import React, { createContext, useContext, useState, useEffect } from 'react';

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
    const [seconds, setSeconds] = useState(() => {
        // Get the timerSeconds from localStorage if available, otherwise default to 0
        const savedSeconds = localStorage.getItem('timerSeconds');
        return savedSeconds ? parseInt(savedSeconds, 10) : 0;
    });

    // Update localStorage whenever the timer state changes
    useEffect(() => {
        localStorage.setItem('timerSeconds', seconds.toString());
    }, [seconds]);

    const resetTimer = () => {
        setSeconds(0);
    };

    return (
        <TimerContext.Provider value={{ seconds, setSeconds, resetTimer }}>
            {children}
        </TimerContext.Provider>
    );
};

export const useTimer = () => {
    const context = useContext(TimerContext);
    if (!context) {
        throw new Error('useTimer must be used within a TimerProvider');
    }
    return context;
};
