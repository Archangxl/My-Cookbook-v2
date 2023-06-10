import {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const RegisterForm = () => {

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

    const formStyle = {
        padding: '10px',
        margin: '10px',
        display: 'grid',
        gap: '10px',
        minWidth: '280px',
        borderRadius: '5px',
        backgroundColor: '#F1C376',
        color: 'white', 
    }

    const inputStyles = {
        borderRadius: '5px',
        border: '1px solid white',
        padding: '5px'
    }

    const buttonSytle = {
        padding: '6px 10px 5px 10px',
        borderRadius: '5px',
        border: '2px solid #606C5D',
        backgroundColor: '#F7E6C4',
        color: '#606C5D'
    }

    return (
        <main>
            <form style={formStyle} onSubmit={createUser}>
                <p><b>Register</b></p>
                <label>Full Name:</label>
                <input style={inputStyles} type="text" onChange={(e) => setFullName(e.target.value)} value={fullName}></input>

                <label>Email: </label>
                <input style={inputStyles} type="text" onChange={(e) => setEmail(e.target.value)} value={email}></input>
                
                <label>Password: </label>
                <input style={inputStyles} type="password" onChange={(e) => setPassword(e.target.value)} value={password}></input>
                
                <label>Confirm Password</label>
                <input style={inputStyles} type="password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword}></input>
                
                <div>
                    <button style={buttonSytle}>Submit</button>
                </div>
            </form>
        </main>
    );

}

export default RegisterForm;