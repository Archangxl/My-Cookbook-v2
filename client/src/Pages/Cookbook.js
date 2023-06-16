import LoggedInNavbar from "../Components/NavsAndHeaders/LoggedInNavbar";
import UsersCookbook from "../Components/Mains/CookbookForLoggedInUser";

const Cookbook = () => {

    return(
        <>
            <LoggedInNavbar headerName="Your Cookbook" navType="User Cookbook"/>
            <UsersCookbook />
        </>
    );

}

export default Cookbook;