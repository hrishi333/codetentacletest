import React,{useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";
import type { CountdownProps } from 'antd';
import { Col, Row, Statistic } from 'antd';
import {toast} from "react-hot-toast";

const { Countdown } = Statistic;

const TIMEOUT_DURATION = 60000;

const SuccessPage: React.FC = () => {
    const navigate = useNavigate();
    const [timeRemaining, setTimeRemaining] = useState<number>(TIMEOUT_DURATION);
    const [sessionActive, setSessionActive] = useState<boolean>(true);
    const [resetCountdown, setResetCountdown] = useState<number>(Date.now() + TIMEOUT_DURATION);


    const isAuthenticated = sessionStorage.getItem('authToken');



    const handleLogout = () => {
        sessionStorage.removeItem("authToken");
        setSessionActive(false);
        toast.error('You have been logged out.');
        navigate('/');
    };

    useEffect(() => {
        let timerId: NodeJS.Timeout;
        if(isAuthenticated===null){
            navigate('/');
        }
        if (sessionActive) {
            const remainingTime = resetCountdown - Date.now();
            if (remainingTime > 0) {
                timerId = setTimeout(() => {
                    handleLogout();
                }, remainingTime);
            } else {
                handleLogout();
            }
        }
        return () => clearTimeout(timerId);
    }, [resetCountdown, sessionActive]);

    const handleUserActivity = () => {
        setResetCountdown(Date.now() + TIMEOUT_DURATION);
        setSessionActive(true);
    };


    useEffect(() => {
        const activityListener = () => handleUserActivity();
        window.addEventListener('mousemove', activityListener);
        window.addEventListener('keydown', activityListener);

        return () => {
            window.removeEventListener('mousemove', activityListener);
            window.removeEventListener('keydown', activityListener);
        };
    }, []);


    return (
        <>
            <div>
                {sessionActive ? (
                    <div>


                        <section className="text-gray-600 body-font">
                            <div className="container px-5 py-24 mx-auto flex flex-wrap">
                                <h2 className="sm:text-3xl text-2xl text-gray-900 font-medium title-font mb-2 md:w-2/5">If user inactive for one minute , user will automatically logged out !</h2>
                                <div className="md:w-3/5 md:pl-6">
                                    <Countdown

                                        title="Session Expires if user inactive for 1 minute"
                                        value={resetCountdown}
                                        onFinish={handleLogout}
                                        format="mm:ss"
                                    />
                                    <p className="leading-relaxed text-base">user is inactive for one minute screen gets logout automatically , check countdown of inactivity , only one minute left.</p>
                                    <div className="flex md:mt-4 mt-6">
                                        <button
                                            onClick={()=>{
                                                handleLogout();
                                            }}
                                            className="inline-flex text-white bg-indigo-500 border-0 py-1 px-4 focus:outline-none hover:bg-indigo-600 rounded">Log Out
                                        </button>
                                        <a className="text-indigo-500 inline-flex items-center ml-4">move cursor for refresh time
                                            <svg fill="none" stroke="currentColor" strokeLinecap="round"
                                                 strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2"
                                                 viewBox="0 0 24 24">
                                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                ) : (
                    <p>You have been logged out due to inactivity.</p>
                )}
            </div>
        </>
    )
}

export default SuccessPage;





