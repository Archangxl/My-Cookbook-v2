import Navbar from '../Components/Navbar';
import Main from '../Components/SharedRecipesBody';

const LandingPage = () => {

    return (
        <div>
            <Navbar landingPage={true} />
            <Main />
        </div>
    );

}

export default LandingPage;