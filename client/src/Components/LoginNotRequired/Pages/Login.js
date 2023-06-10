import Navbar from "../Components/Navbar";
import LoginForm from "../Components/LoginForm";

const Login = () => {

    return (
        <>
            <Navbar login={true} />
            <LoginForm />
        </>
    );

}
export default Login;