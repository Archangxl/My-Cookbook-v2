import Navbar from "./Navbar";
import LoginForm from "./LoginForm";

const Login = () => {

    return (
        <>
            <Navbar login={true} />
            <LoginForm />
        </>
    );

}
export default Login;