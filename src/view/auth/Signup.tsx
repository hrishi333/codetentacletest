import React, {useState} from "react";
import {Input} from "antd";
import Loader from "../../components/Loader";
import axios from "axios";
import {toast} from "react-hot-toast";
import {useNavigate} from 'react-router-dom'

const Signup : React.FC=()=>{
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        name:'',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        name:'',
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
            name:'',
            email: '',
            password: '',
        };
        if (!formData.name) {
            validationErrors.name = 'Name is required';
        }
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
                name:formData.name,
                email: formData.email,
                password: formData.password,
            };


            handleApiCall(data);
        }
    };

    const handleApiCall =async (data:{name:string,email:string,password:string})=>{
        try{
            setIsLoading(true);
            const response = await axios.post('https://reqres.in/api/register',data);

            if (response.status === 200 || response.status === 201) {


                sessionStorage.setItem("authToken", response?.data?.token);
                toast.success('Login success message!');
                navigate('/page')


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

    return(
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
                            SignUp
                        </h1>
                        <span className="text-sm lg:text-base text-center text-gray-500 flex justify-center">
              Welcome to Sign Up
            </span>
                        <form onSubmit={handleSubmit} className="flex flex-col  gap-2 mt-2">

                            <div className="col-span-1 flex-col flex gap-y-.5">
                                <label className="text-base    pb-2">Name</label>
                                <Input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    size="large"
                                    className="rounded border border-gray-600"
                                />
                                {errors.name && <p className="text-danger">{errors.name}</p>}
                            </div>

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

                            </div>

                            <span className="flex justify-center mt-4">
                <button
                    className="w-min p-1 rounded border hover:border-primary hover:text-primary hover:font-bold"
                    // onClick={() => router.push('/dashboard')}
                >
                  <span className="flex text-xs gap-x-2 px-4 py-1 whitespace-nowrap">
                Sign Up

                  </span>
                </button>
              </span>

                            <span className="text-center flex justify-center text-sm">
                Already have an account?{' '}
                                <p
                                    onClick={()=>{
                                    navigate('/login')
                                    }
                                    }
                                    className="text-primary w-2 px-1 hover:font-bold hover:underline cursor-pointer"
                                >
              Login
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
    )
}

export default Signup;