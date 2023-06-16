import {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const RegisterForm = ({mainStyle, formStyle, inputStyle, buttonSytle}) => {

    const navigate = useNavigate();
    
    const createUser = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/createUser', {fullName, email, password, confirmPassword}, {withCredentials: true})
            .then(res => navigate('/cookbook'))
            .catch(err => console.log(err));
    }

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <main style={mainStyle}>

            <form style={formStyle} onSubmit={createUser}>

                <label htmlFor='fullName'>Full Name:</label>
                <input id='fullName' style={inputStyle} type="text" onChange={(e) => setFullName(e.target.value)} value={fullName}></input>

                <label htmlFor='email'>Email: </label>
                <input id='email' style={inputStyle} type="text" onChange={(e) => setEmail(e.target.value)} value={email}></input>
                
                <label htmlFor='password'>Password: </label>
                <input id='password' style={inputStyle} type="password" onChange={(e) => setPassword(e.target.value)} value={password}></input>
                
                <label htmlFor='confirmPassword'>Confirm Password</label>
                <input id='confirmPassword' style={inputStyle} type="password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword}></input>
                
                <div>
                    <button style={buttonSytle}>Submit</button>
                </div>

            </form>

        </main>
    );

}

export default RegisterForm;