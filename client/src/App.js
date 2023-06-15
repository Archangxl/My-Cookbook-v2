import LandingPage from "./Components/LoginNotRequired/Pages/Landing";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginOrRegister from "./Components/LoginNotRequired/Pages/LoginOrRegister";
import Cookbook from "./Components/LoginRequired/Pages/Cookbook";
import CreateOrUpdateRecipe from "./Components/LoginRequired/Pages/CreateOrUpdateRecipe";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<LoginOrRegister formType="Login" />} />
          <Route path='/register' element={<LoginOrRegister formType="Register" />} />
          <Route path="/cookbook" element={<Cookbook />} />
          <Route path="/recipe" element={<CreateOrUpdateRecipe formType="Login"/>} />
          <Route path="/updateRecipe/:recipeId" element={<CreateOrUpdateRecipe formType="Update" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
