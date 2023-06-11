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

    const titleStyle = {
        fontSize: '20px', 
        fontWeight: '600'
    }

    const linkStyle = {
        textDecoration: 'none',
        color: 'white',
        fontSize: '16px'
    }

    const headerStyle = {
        display: 'flex', 
        justifyContent: 'center',
        minWidth: '300px'
    }

    const headerPageTitleStyle = {
        fontSize: '16px', 
        fontWeight: '600'
    }

    return (
        <>
        {
            landingPage === true 
            
            && 
            <>

                <nav style={navStyle}>

                    <p style={titleStyle}>My Cookbook</p>
                    <p style={linkStyle}><Link to="/login" style={linkStyle}>Login</Link> | <Link to="/register" style={linkStyle}>Register</Link></p>

                </nav>

                <header style={headerStyle}>
                    <p style={headerPageTitleStyle}>Shared Recipes</p>
                </header>

            </>
        }
        {
            login === true 

            &&
            <>

                <nav style={navStyle}>

                    <h1 style={titleStyle}>My Cookbook</h1>
                    <p style={linkStyle}><Link to="/" style={linkStyle}>Home</Link> | <Link to="/register" style={linkStyle}>Register</Link></p>

                </nav>

                <header style={headerStyle}>
                    <p style={headerPageTitleStyle}>Login</p>
                </header>

            </>
        }
        {
            register === true

            &&
            <>

                <nav style={navStyle}>

                    <h1 style={titleStyle}>My Cookbook</h1>
                    <p style={linkStyle}><Link to="/" style={linkStyle}>Home</Link> | <Link to="/login" style={linkStyle}>Login</Link></p>

                </nav>

                <header style={headerStyle}>
                    <p style={headerPageTitleStyle}>Register</p>
                </header>
            </>
        }
        </>
    );
}

export default Navbar;