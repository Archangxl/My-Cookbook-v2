import Navbar from './Navbar';
import Main from './SharedRecipesBody';

const LandingPage = () => {

    return (
        <div>
            <Navbar landingPage={true} />
            <Main />
        </div>
    );

}

export default LandingPage;