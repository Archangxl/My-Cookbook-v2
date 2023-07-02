import axios from 'axios'; 
import {useNavigate, Link} from 'react-router-dom';
import { useState } from 'react';
import image from './dropDownImage.png'
import image2 from './dropDownImageTwo.png'

const LoggedInNavbar = ({headerName, navType}) => {

    const navigate = useNavigate();

    const logOut = (e) => {
        axios.get('http://localhost:8000/api/logout', {withCredentials: true})
            .then(res => navigate('/'))
            .catch(err => console.log(err));
    }

    
    const navStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        backgroundColor: '#606C5D',
        color: 'white',
        minWidth: '320px'
    }

    const h1Style = {
        fontSize: '20px'
    }

    const linkStyle = {
        textDecoration: 'none',
        color: 'white',
        fontSize: '16px',
        fontWeight: '300'
    }

    const headerStyle = {
        display: 'flex', 
        justifyContent: 'center',
        minWidth: '320px',
        padding: '0px 10px',
        fontSize: '16px', 
        fontWeight: '600'
    }

    const buttonSytledLikeALink = {
        backgroundColor: '#606C5D' ,
        border: 'none',
        color: 'white',
        fontSize: '16px',
        cursor: 'pointer'
    }

    const [clickMe, setClickMe] = useState(true);

    return (
        <>
            {
                navType === "User Cookbook" && 
                <>
                    <nav style={navStyle}>

                        <h1 style={h1Style}>My Cookbook</h1>
                        <p style={linkStyle}><Link style={linkStyle} to='/recipe' >Add Recipe</Link> |<button style={buttonSytledLikeALink} onClick={logOut}>Logout</button></p>

                    </nav>

                    <header style={headerStyle}>
                        <p>{headerName}</p>
                    </header>
                </>
            }
            {
                navType === "Recipe Create/Update/View" &&
                <>
                    <nav style={navStyle}>

                        <h1 style={h1Style}>My Cookbook</h1>
                        <p style={linkStyle}><Link style={linkStyle} to='/cookbook'>Your Cookbook</Link> |<button style={buttonSytledLikeALink} onClick={logOut}>Logout</button></p>

                    </nav>

                    <header style={headerStyle}>
                        <p>{headerName}</p>
                    </header>
                </>
            }
        </>
    );
}

export default LoggedInNavbar;