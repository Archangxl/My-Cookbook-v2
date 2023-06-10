import {Link} from 'react-router-dom';

const Navbar = ({login = false, register = false, landingPage = false}) => {

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
        {
            landingPage === true 
            
            && 

            <nav style={navStyle}>

                <h1 style={h1Style}>My Cookbook</h1>
                <p style={linkStyle}><Link to="/login" style={linkStyle}>Login</Link> | <Link to="/register" style={linkStyle}>Register</Link></p>

            </nav>
        }
        {
            login === true 

            &&

            <nav style={navStyle}>

                <h1 style={h1Style}>My Cookbook</h1>
                <p style={linkStyle}><Link to="/" style={linkStyle}>Home</Link> | <Link to="/register" style={linkStyle}>Register</Link></p>

            </nav>
        }
        {
            register === true

            &&

            <nav style={navStyle}>

                <h1 style={h1Style}>My Cookbook</h1>
                <p style={linkStyle}><Link to="/" style={linkStyle}>Home</Link> | <Link to="/login" style={linkStyle}>Login</Link></p>

            </nav>
        }
        </>
    );
}

export default Navbar;