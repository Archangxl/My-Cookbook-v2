import axios from 'axios'; 
import {useNavigate} from 'react-router-dom';

const LoggedInNavbar = () => {

    const navigate = useNavigate();

    const logOut = (e) => {
        axios.get('http://localhost:8000/api/logout')
            .then(res => navigate('/'))
    }

    
    const navStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        backgroundColor: '#606C5D',
        color: 'white',
        minWidth: '300px'
    }

    const h1Style = {
        fontSize: '20px'
    }

    const linkStyle = {
        textDecoration: 'none',
        color: 'white',
        fontSize: '16px'
    }

    return (
        <>
            <nav style={navStyle}>

                <h1 style={h1Style}>My Cookbook</h1>
                <p style={linkStyle} onClick={logOut}>logout</p>

            </nav>
        </>
    );
}

export default LoggedInNavbar;