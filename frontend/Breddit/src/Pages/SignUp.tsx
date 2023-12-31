import axios from 'axios';
import {useState, useEffect, ChangeEvent} from 'react';
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
                profilePicture: formData.profilePicture

            }
            axios.post("http://localhost:3000/sign_up",account)
            .then(function (response) {
                if (response.data){
                    localStorage.setItem("userID",response.data);
                    alert("Account Created!")
                    navigate('../');
                }
            }).catch(function (error) {
                alert(error);
            });
              
        }

    }
    const ImageUploadComponent: React.FC = () => {
        const [base64String, setBase64String] = useState<string>('');
        const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
          const file = event.target.files ? event.target.files[0] : null;
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              const base64 = reader.result as string;
                setFormData({
                    ...formData,
                    profilePicture: base64
                });
              setBase64String(base64);
            };
            reader.readAsDataURL(file);
          }

        };
      
      
        return (
            <input type="file" accept="image/*" onChange={handleFileChange} /> 
        );
      };

    return (
        <div className="bg-offwhite">
            <div className='flex flex-col items-center justify-center h-screen'>
                <div className='w-full max-w-md bg-slate-gray rounded-xl shadow-md py-8 px-8'>
                    <h2 className='text-[28px] font-bold text-white mb-6 text-center'>
                        Sign Up
                    </h2>
                    <form className='flex flex-col'>
                        <input name="username" onChange={handleChange} placeholder='Username' className='bg-gray-700 text-white border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none transition ease-in-out duration-150 placeholder-gray-300' type="email" />
                        <input name="email" onChange={handleChange} placeholder='Email Address' className='bg-gray-700 text-white border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none transition ease-in-out duration-150 placeholder-gray-300' type="email" />
                        <input name="emailDuplicate" onChange={handleChange}placeholder='Confirm Email Address' className='bg-gray-700 text-white border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none transition ease-in-out duration-150 placeholder-gray-300' type="email" />
                        <input name="password" onChange={handleChange} placeholder='Password' className='bg-gray-700 text-white border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none transition ease-in-out duration-150 placeholder-gray-300' type="password" />
                        <input name="passwordDuplicate" onChange={handleChange} placeholder='Confirm Password' className='bg-gray-700 text-white border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none transition ease-in-out duration-150 placeholder-gray-300' type="password" />
                        <h3 className= "text-[20px] font-bold text-white mb-6 text-center">Upload a PFP</h3>
                        <div className="flex flex-col justify-center items-center"><ImageUploadComponent/></div>
                        <br></br>
                        <button onClick={handleOnSubmit} className="bg-gradient-to-r bg-amber-500 text-white font-medium py-2 px-4 rounded-md hover:bg-amber-400 ease-in duration-200" type="submit">
                            Submit
                        </button>
                        <p className="text-white mt-4 text-center">
                            Already have an account?
                            <a className="text-white-500 hover:underline mt-4 px-1" href="/login">
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