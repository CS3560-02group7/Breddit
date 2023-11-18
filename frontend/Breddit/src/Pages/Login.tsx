import { Input } from 'antd';
function LoginForm() {
    return (
        <div style={{backgroundColor:"gray", padding:"0 0 20px 0", width:"50%"}} className="h-screen flex items-center justify-center flex-col">
            <div>test</div>
            <h1 className="text-3xl text-gray-900 dark:text-black" style={{textAlign:"center", padding:"20px"}}> Welcome to Breddit</h1>
            <form action="" method="get" className="login-form" style={{
            display:"flex",
            alignItems: "center",
            justifyContent: "center",
            flexFlow: "column"}}>
                <div className="login-form">
                    <Input placeholder='Email:'>
                    </Input>
                </div>
                <div className="login-form">
                    <Input placeholder='Password:' type="password">
                    </Input>
                </div>
                <a href="login" className="font-semibold text-blue-900 underline dark:text-blue decoration-blue-500">Forgot password?</a>
                <br />
                New to Breddit? <a href="signup" className="font-semibold text-blue-900 underline dark:text-blue decoration-blue-500" >Sign up for an account.</a>

                <div className="login-form w-full">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">Submit</button>
                </div>
            </form>
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