import Navbar from "../Components/NavsAndHeaders/NotLoggedInNavbar";
import RegisterForm from "../Components/Mains/RegisterForm";
import LoginForm from "../Components/Mains/LoginForm";

const LoginOrRegister = ({formType}) => {

    const mainStyle = {
        display: 'flex',
        justifyContent: 'center',
        minWidth: '320px',
        margin: '10px'
    }

    const formStyle = {
        color: 'black', 
        flex: '1',
        maxWidth: '800px',
        width: '80%',
        backgroundColor: '#F1C376',
        borderRadius: '5px',
        display: 'grid',
        padding: '10px',
        gap: '10px',
    }

    const inputStyle = {
        borderRadius: '5px',
        border: '1px solid white',
        padding: '5px'
    }

    const buttonSytle = {
        padding: '6px 10px 5px 10px',
        borderRadius: '5px',
        border: '2px solid #606C5D',
        backgroundColor: 'white',
        color: '#606C5D'
    }

    return (
        <>
            {formType === 'Register' && 
            <>
                <Navbar register={true} />
                <RegisterForm 
                    mainStyle={mainStyle} 
                    formStyle={formStyle} 
                    inputStyle={inputStyle} 
                    buttonSytle={buttonSytle} 
                />            
            </>}
            {formType === 'Login' && 
            <>
                <Navbar login={true} />
                <LoginForm 
                    mainStyle={mainStyle} 
                    formStyle={formStyle} 
                    inputStyle={inputStyle} 
                    buttonSytle={buttonSytle} />
            </>}
        </>
    );

}
export default LoginOrRegister;