import { Input } from 'antd';
import axios from 'axios';
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
function LoginForm(){

    interface loginForm {email: string, password: string}
    const [formData, setFormData] = useState<loginForm>({email: "", password: ""})
    const [logIn, setLogIn] = useState<Boolean>(false)
    const navigate = useNavigate();


    function handleOnSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault();

        // Using a state that just flips on and off and triggers the useEffect hook to fire
        setLogIn(!logIn);
    }

    useEffect(() => {
        // Update the document title using the browser API
        console.log(formData);
        axios.post("http://localhost:3000/log_in",formData)
        .then(function (response) {
            if (response.data){
                console.log(response.data);
                localStorage.setItem("userID",response.data.userID);
                navigate("home");
            }
        })
        .catch(function (error) {
            alert(error);
        });
      },[logIn]);

    function handleChange(e: { target: { name: any; value: any; }; }) {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }
    return (
        //body to make image and content flex
        <div className="h-screen flex">
        <img src="https://tastesbetterfromscratch.com/wp-content/uploads/2020/03/Bread-Recipe-5-2.jpg"/>
        <div className="h-screen flex items-center justify-center w-full bg-amber-700">
        <div className="flex items-center justify-center flex-col h-fit w-fit p-10 bg-white rounded">
            <h1 className="text-3xl text-gray-900 dark:text-black mb-8"> Welcome to Breddit</h1>
            <form  action="" method="get" className="login-form" style={{
            display:"flex",
            alignItems: "center",
            justifyContent: "center",
            flexFlow: "column"}}>
                <div className="login-form w-3/4">
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                        className="p-1 rounded-lg mb-3"
                    />
                </div>
                <div className="login-form w-3/4">
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                        className="p-1 rounded-lg mb-3"
                    />
                </div>
                <a href="login" className="font-semibold text-blue-900 underline dark:text-blue decoration-blue-500 mb-1">Forgot password?</a>
                <p>New to Breddit? <a href="signup" className="font-semibold text-blue-900 underline dark:text-blue decoration-blue-500 mb-1" >Sign up for an account.</a></p>

                <div className="login-form w-full">
                    <button type="button" onClick={handleOnSubmit} className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded w-full mt-4">Submit</button>
                </div>
            </form>
            </div>
        </div>
        </div>
    );
}




const Login = () => {
    return (
        <>
            <LoginForm />
        </>

    )
}


export default Login;