import {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const RegisterForm = ({mainStyle, formStyle, inputStyle, buttonSytle}) => {

    const navigate = useNavigate();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [fullNameError, setFullNameError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [confirmPasswordError, setConfrimPasswordError] = useState(null);
    
    const createUser = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/createUser', {fullName, email, password, confirmPassword}, {withCredentials: true})
            .then(res => navigate('/cookbook'))
            .catch(err => {
                if (err.response.data.email === undefined) {
                    setFullNameError(err.response.data.errors.fullName !== undefined ? <span style={{color: "red"}}>{err.response.data.errors.fullName.message}</span> : null);
                    setEmailError(err.response.data.errors.email !== undefined ? <span style={{color: "red"}}>{err.response.data.errors.email.message}</span> : null);
                    setPasswordError(err.response.data.errors.password !== undefined ? <span style={{color: "red"}}>{err.response.data.errors.password.message}</span> : null);
                    setConfrimPasswordError(err.response.data.errors.confirmPassword !== undefined ? <span style={{color: "red"}}>{err.response.data.errors.confirmPassword.message}</span> : null);
                } else {
                    setEmailError(<span style={{color: "red"}}>{err.response.data.email}</span>);
                }
            });
    }

    return (
        <main style={mainStyle}>

            <form style={formStyle} onSubmit={createUser}>

                <label htmlFor='fullName'>Full Name: {fullNameError}</label>
                <input id='fullName' style={inputStyle} type="text" onChange={(e) => setFullName(e.target.value)} value={fullName}></input>

                <label htmlFor='email'>Email: {emailError}</label>
                <input id='email' style={inputStyle} type="text" onChange={(e) => setEmail(e.target.value)} value={email}></input>
                
                <label htmlFor='password'>Password: {passwordError}</label>
                <input id='password' style={inputStyle} type="password" onChange={(e) => setPassword(e.target.value)} value={password}></input>
                
                <label htmlFor='confirmPassword'>Confirm Password: {confirmPasswordError}</label>
                <input id='confirmPassword' style={inputStyle} type="password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword}></input>
                
                <div>
                    <button style={buttonSytle}>Submit</button>
                </div>

            </form>

        </main>
    );

}

export default RegisterForm;