import {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const LoginForm = ({mainStyle, formStyle, inputStyle, buttonSytle}) => {

    const navigate = useNavigate();

    const logUserIn = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/loginUser', {email, password}, {withCredentials: true})
            .then(res => navigate('/cookbook'))
            .catch(err => console.log(err));
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <main style={mainStyle}>
            
            <form style={formStyle} onSubmit={logUserIn}>

                <label htmlFor='email'>Email: </label>
                <input id="email" style={inputStyle} type="text" onChange={(e) => setEmail(e.target.value)} value={email}></input>
                
                <label htmlFor='password' >Password: </label>
                <input id='password' style={inputStyle} type="password" onChange={(e) => setPassword(e.target.value)} value={password}></input>
                
                <div>
                    <button style={buttonSytle}>Submit</button>
                </div>
                
            </form>
            
        </main>
    );

}

export default LoginForm;