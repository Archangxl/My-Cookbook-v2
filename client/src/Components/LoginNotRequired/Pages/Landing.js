import Navbar from "../Components/Navbar";
import Main from '../Components/SharedRecipesBody';

const LandingPage = () => {

    return (
        <>
            <Navbar landingPage={true} />
            <Main />
        </>
    );

}

export default LandingPage;