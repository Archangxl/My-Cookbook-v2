import {Link} from 'react-router-dom';

const Navbar = () => {

    const navStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        backgroundColor: 'coral',
        color: 'white'
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
        <nav style={navStyle}>

            <h1 style={h1Style}>My Cookbook</h1>
            <p style={linkStyle}><Link style={linkStyle} >Login</Link> | <Link style={linkStyle} >Register</Link></p>

        </nav>
    );
}

export default Navbar;