import { Input } from 'antd';
function LoginForm() {
    return (
        <div className="h-screen flex">
        <img src="https://tastesbetterfromscratch.com/wp-content/uploads/2020/03/Bread-Recipe-5-2.jpg"/>
        <div className="h-screen flex items-center justify-center w-full bg-amber-700">
        <div className="flex items-center justify-center flex-col h-3/5 w-2/5 bg-white rounded">
            <h1 className="text-3xl text-gray-900 dark:text-black mb-8"> Welcome to Breddit</h1>
            <form action="" method="get" className="login-form" style={{
            display:"flex",
            alignItems: "center",
            justifyContent: "center",
            flexFlow: "column"}}>
                <div className="login-form w-3/4">
                    <Input placeholder='Email:'type="email" className="w-full mb-2">
                    </Input>
                </div>
                <div className="login-form w-3/4">
                    <Input placeholder='Password:' type="password" className="mb-5">
                    </Input>
                </div>
                <a href="login" className="font-semibold text-blue-900 underline dark:text-blue decoration-blue-500 mb-1">Forgot password?</a>
                <p>New to Breddit? <a href="signup" className="font-semibold text-blue-900 underline dark:text-blue decoration-blue-500 mb-1" >Sign up for an account.</a></p>

                <div className="login-form w-full">
                    <button type="submit" className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded w-full mt-4">Submit</button>
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