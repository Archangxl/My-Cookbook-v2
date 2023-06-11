import {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const LoginForm = () => {

    const navigate = useNavigate();

    const logUserIn = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/loginUser', {email, password}, {withCredentials: true})
            .then(res => navigate('/cookbook'))
            .catch(err => console.log(err));
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const mainStyle = {
        display: 'flex',
        justifyContent: 'center',
        minWidth: '300px',
        margin: '10px'
    }

    const formStyle = {
        color: 'white', 
        flex: '1',
        maxWidth: '600px',
        backgroundColor: '#F1C376',
        borderRadius: '5px',
        display: 'grid',
        padding: '10px',
        gap: '10px',
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
        <main style={mainStyle}>
            
                <form style={formStyle} onSubmit={logUserIn}>

                    <label>Email: </label>
                    <input style={inputStyles} type="text" onChange={(e) => setEmail(e.target.value)} value={email}></input>
                    
                    <label>Password: </label>
                    <input style={inputStyles} type="password" onChange={(e) => setPassword(e.target.value)} value={password}></input>
                    
                    <div>
                        <button style={buttonSytle}>Submit</button>
                    </div>
                </form>
            
        </main>
    );

}

export default LoginForm;