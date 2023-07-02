import {Link} from 'react-router-dom';
import { useState } from 'react';
import image from './dropDownImage.png'
import image2 from './dropDownImageTwo.png'

const Navbar = ({login = false, register = false, landingPage = false}) => {

    const navStyle = {
        padding: '20px 10px',
        backgroundColor: '#606C5D',
        color: 'white',
        minWidth: '320px',
    }

    const dropDownImg = {
        height: '20px'
    }

    const topNavDiv = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
    const bottomNavDiv = {
        margin: '5px',
    }

    const titleStyle = {
        fontSize: '20px', 
        fontWeight: '600'
    }

    const linkStyle = {
        borderTop: 'white 1px solid',
        marginTop: '5px',
        textDecoration: 'none',
        color: 'white',
        fontSize: '16px'
    }

    const headerStyle = {
        display: 'flex', 
        justifyContent: 'center',
        minWidth: '320px',
        padding: '0px 10px',
        fontSize: '16px', 
        fontWeight: '600'
    }

    const [clickMe, setClickMe] = useState(true);

    return (
        <>
        {
            landingPage === true 
            
            && 
            <>
                
                <nav style={navStyle}>
                    <div style={topNavDiv}>
                        <p style={titleStyle}>My Cookbook</p>
                        <div>
                            {
                                clickMe === false && 
                                    <button style={{backgroundColor: '#FFF4F4 ', border: 'none'}} onClick={(e) => {
                                        setClickMe(clickMe === false ? true : false);
                                    }}><img style={dropDownImg} alt="hello" src={image} /></button>
                                
                            }
                            {
                                clickMe === true && 
                                <button style={{backgroundColor: '#FFF4F4 ', border: 'none'}} onClick={(e) => {
                                    setClickMe(clickMe === false ? true : false);
                                }}><img style={dropDownImg} alt="hello" src={image2} /></button>
                            }
                        </div>
                    </div>
                {
                    clickMe === true 
                    && 
                    <div style={bottomNavDiv}>
                        <p style={linkStyle}><Link to="/login" style={linkStyle}>Login</Link></p>
                        <p style={linkStyle}><Link to="/register" style={linkStyle}>Register</Link></p>
                    </div>
                }
                </nav>

                <header style={headerStyle}>
                    <p>Shared Recipes</p>
                </header>

            </>
        }
        {
            login === true 

            &&
            <>
                <nav style={navStyle}>
                    <div style={topNavDiv}>
                        <p style={titleStyle}>My Cookbook</p>
                        <div>
                            {
                                clickMe === false && 
                                    <button style={{backgroundColor: '#FFF4F4 ', border: 'none'}} onClick={(e) => {
                                        setClickMe(clickMe === false ? true : false);
                                    }}><img style={dropDownImg} alt="hello" src={image} /></button>
                                
                            }
                            {
                                clickMe === true && 
                                <button style={{backgroundColor: '#FFF4F4 ', border: 'none'}} onClick={(e) => {
                                    setClickMe(clickMe === false ? true : false);
                                }}><img style={dropDownImg} alt="hello" src={image2} /></button>
                            }
                        </div>
                    </div>
                {
                    clickMe === true 
                    && 
                    <div style={bottomNavDiv}>
                        <p style={linkStyle}><Link to="/" style={linkStyle}>Home</Link></p>
                        <p style={linkStyle}><Link to="/register" style={linkStyle}>Register</Link></p>
                    </div>
                }
                </nav>

                <header style={headerStyle}>
                    <p>login</p>
                </header>

            </>
        }
        {
            register === true

            &&
            <>

                <nav style={navStyle}>
                    <div style={topNavDiv}>
                        <p style={titleStyle}>My Cookbook</p>
                        <div>
                            {
                                clickMe === false && 
                                    <button style={{backgroundColor: '#FFF4F4 ', border: 'none'}} onClick={(e) => {
                                        setClickMe(clickMe === false ? true : false);
                                    }}><img style={dropDownImg} alt="hello" src={image} /></button>
                                
                            }
                            {
                                clickMe === true && 
                                <button style={{backgroundColor: '#FFF4F4 ', border: 'none'}} onClick={(e) => {
                                    setClickMe(clickMe === false ? true : false);
                                }}><img style={dropDownImg} alt="hello" src={image2} /></button>
                            }
                        </div>
                    </div>
                {
                    clickMe === true 
                    && 
                    <div style={bottomNavDiv}>
                        <p style={linkStyle}><Link to="/" style={linkStyle}>Home</Link></p>
                        <p style={linkStyle}><Link to="/login" style={linkStyle}>Login</Link></p>
                    </div>
                }
                </nav>

                <header style={headerStyle}>
                    <p>Register</p>
                </header>
            </>
        }
        </>
    );
}

export default Navbar;