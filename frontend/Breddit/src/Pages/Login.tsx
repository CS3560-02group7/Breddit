function LoginForm() {
    return (
        <>
            <h1> Welcome to Breddit</h1>
            <form action="" method="get" className="login-form">
                <div className="login-form">
                    <label htmlFor="name">Email: </label>
                    <input type="email" name="email" id="loginEmail" required />
                </div>
                <div className="login-form">
                    <label htmlFor="email">Password: </label>
                    <input type="password" name="password" id="loginPassword" required />
                </div>
                <a href="login">Forgot password?</a>
                <br />
                New to Breddit? <a href="signup">Sign up for an account.</a>

                <div className="login-form">
                    <input type="submit" value="Login" />
                </div>
            </form>
        </>
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