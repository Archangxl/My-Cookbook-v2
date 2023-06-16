import Navbar from "../Components/NavsAndHeaders/NotLoggedInNavbar";
import AllSharedRecipes from '../Components/Mains/AllSharedRecipes';

const LandingPage = () => {

    return (
        <>
            <Navbar landingPage={true} />
            <AllSharedRecipes />
        </>
    );

}

export default LandingPage;