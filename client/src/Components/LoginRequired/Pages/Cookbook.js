import LoggedInNavbar from "../Components/LoggedInNavbar";
import UsersCookbook from "../Components/UserLoggedInCookbook";

const Cookbook = () => {

    return(
        <>
            <LoggedInNavbar headerName="Your Cookbook" navType="User Cookbook"/>
            <UsersCookbook />
        </>
    );

}

export default Cookbook;