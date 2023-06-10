import Navbar from "./Navbar";
import RegisterForm from "./RegisterForm";

const Register = () => {

    return (
        <>
            <Navbar register={true} />
            <RegisterForm />
        </>
    );

}
export default Register;