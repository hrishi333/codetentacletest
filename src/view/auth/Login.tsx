import React, {useState} from 'react';
import Loader from "../../components/Loader";
import {Input} from 'antd';
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import { toast } from 'react-hot-toast';


const Login: React.FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const {name, value} = e.target;

        if (name) {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();


        const validationErrors = {
            email: '',
            password: '',
        };
        if (!formData.email) {
            validationErrors.email = 'Email is required';
        }
        if (!formData.password) {
            validationErrors.password = 'Password is required';
        }

        setErrors(validationErrors);

        if (Object.values(validationErrors).every((error) => !error)) {
            setIsLoading(true);
            const data = {
                email: formData.email,
                password: formData.password,
            };

            console.log(data, "form data")
            handleApiCall(data);
        }
    };


    const handleApiCall =async (data:{email:string,password:string})=>{
        try{
            setIsLoading(true);
            const response = await axios.post('https://reqres.in/api/Login',data);
            console.log(response,"this is response")
            if (response.status === 200 || response.status === 201) {
                console.log('Request successful:', response.data);
                sessionStorage.setItem("authToken", response?.data?.token);
                navigate('/page')
                toast.success('Login success message!');

            } else {
                console.error('Request failed with status:', response.status);
                toast.error('Wrong Credintials!');
            }
        }catch (e:any) {
            console.error('Error:', e);
            toast.error(e.response?.data?.error);

        }finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            {!isLoading?<div>

            <div className="min-h-screen   flex items-center gap-y-10 flex-col justify-center">
                <div
                    className="bg-white  rounded-xl min-w-[500px] z-30 px-12 lg:px-8 py-5 xl:py-10 flex flex-col gap-y-1">
                    <span className=" flex justify-center ">
                             <img
                                 src="/assets/images/logo_QdaU1apKnI.webp"
                                 alt="Logo"
                                 className="object-contain w-[100px]"/>
                        </span>
                    <h1 className="text-xl font-medium lg:font-normal lg:text-3xl mt-1 leading-10 text-gray-700 text-center w-full">
                        Login
                    </h1>
                    <span className="text-sm lg:text-base text-center text-gray-500 flex justify-center">
              Welcome to Login
            </span>
                    <form onSubmit={handleSubmit} className="flex flex-col  gap-2 mt-2">
                        <div className="col-span-1 flex-col flex gap-y-.5">
                            <label className="text-base    pb-2">Email</label>
                            <Input
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                size="large"
                                className="rounded border border-gray-600"
                            />
                            {errors.email && <p className="text-danger">{errors.email}</p>}
                        </div>
                        <div className="col-span-1 flex-col flex gap-y-.5">
                            <label className="text-base    pb-2">Password</label>
                            <Input.Password
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                size="large"
                                className="rounded border border-gray-600"
                            />
                            {errors.password && (
                                <p className="text-danger">{errors.password}</p>
                            )}
                            <span
                                // onClick={() => router('/auth/forgot-password')}
                                className="font-medium text-primary mt-1 cursor-pointer hover:text-darkPrimary"
                            >
                  Forgot password?
                </span>
                        </div>

                        <span className="flex justify-center mt-4">
                <button
                    className="w-min p-1 rounded border hover:border-primary hover:text-primary hover:font-bold"
                >
                  <span className="flex text-xs gap-x-2 px-4 py-1 whitespace-nowrap">
                    LOG IN

                  </span>
                </button>
              </span>

                        <span className="text-center flex justify-center text-sm">
                Don’t have an account?{' '}
                            <p
                                onClick={()=>{
                                navigate('/signup')
                                }}
                                className="text-primary w-2 px-1 hover:font-bold hover:underline cursor-pointer"
                            >
                  SignUp
                </p>
              </span>
                        <span className="text-center text-sm">
                ©2023 All rights reserved
              </span>
                    </form>
                </div>
            </div>
            </div>:<div>
                <Loader/>
            </div>

            }
            </>
    );
};

export default Login;