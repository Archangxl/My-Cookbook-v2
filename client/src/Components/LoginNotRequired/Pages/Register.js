import Navbar from "../Components/Navbar";
import RegisterForm from "../Components/RegisterForm";

const Register = () => {

    return (
        <>
            <Navbar register={true} />
            <RegisterForm />
        </>
    );

}
export default Register;