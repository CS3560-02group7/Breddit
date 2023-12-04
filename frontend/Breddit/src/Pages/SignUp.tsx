import axios from 'axios';
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

    interface signUpForm {username: string, email: string, password: string, profilePicture: string, emailDuplicate: string, passwordDuplicate: string}
    const [formData, setFormData] = useState<signUpForm>({email: "", password: "", username: "", profilePicture: "", emailDuplicate: "", passwordDuplicate: ""})
    const navigate = useNavigate();

    function handleChange(e: { target: { name: any; value: any; }; }) {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    function handleOnSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault();
        if (formData.email != formData.emailDuplicate){
            alert("Error, emails do not match")
            
        }
        else if (formData.password != formData.passwordDuplicate){
            alert("Error, passwords do not match")
        }
        else{
            const account = {
                email: formData.email,
                password: formData.password,
                username: formData.username,

            }
            axios.post("http://localhost:3000/sign_up",account)
            .then(function (response) {
                if (response.data){
                    alert("Account Created!")
                    navigate('../home');
                }
            }).catch(function (error) {
                alert(error);
            });
              
        }

    }

    return (
        <div className="bg-amber-500">
            <div className='flex flex-col items-center justify-center h-screen'>
                <div className='w-full max-w-md bg-[#222] rounded-xl shadow-md py-8 px-8'>
                    <h2 className='text-[28px] font-bold text-white mb-6 text-center'>
                        Sign Up
                    </h2>
                    <form className='flex flex-col'>
                        <input name="username" onChange={handleChange} placeholder='Username' className='bg-gray-700 text-white border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none transition ease-in-out duration-150 placeholder-gray-300' type="email" />
                        <input name="email" onChange={handleChange} placeholder='Email Address' className='bg-gray-700 text-white border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none transition ease-in-out duration-150 placeholder-gray-300' type="email" />
                        <input name="emailDuplicate" onChange={handleChange}placeholder='Confirm Email Address' className='bg-gray-700 text-white border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none transition ease-in-out duration-150 placeholder-gray-300' type="email" />
                        <input name="password" onChange={handleChange} placeholder='Password' className='bg-gray-700 text-white border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none transition ease-in-out duration-150 placeholder-gray-300' type="password" />
                        <input name="passwordDuplicate" onChange={handleChange} placeholder='Confirm Password' className='bg-gray-700 text-white border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none transition ease-in-out duration-150 placeholder-gray-300' type="password" />
                        <button onClick={handleOnSubmit} className="bg-gradient-to-r from-amber-500 to-amber-800 text-white font-medium py-2 px-4 rounded-md hover:bg-amber-500 hover:to-amber-700 ease-in duration-200" type="submit">
                            Submit
                        </button>
                        <p className="text-white mt-4 text-center">
                            Already have an account?
                            <a className="text-white-500 hover:underline mt-4 px-1" href="Login">
                                Sign In
                            </a>
                        </p>
                    </form>
                </div>
            </div >
        </div>
    )
}

export default SignUp