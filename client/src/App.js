import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LandingPage from "./Pages/Landing";
import LoginOrRegister from "./Pages/LoginOrRegister";
import Cookbook from "./Pages/Cookbook";
import CreateOrUpdateRecipe from "./Pages/CreateOrUpdateRecipe";
import ViewRecipe from './Pages/ViewRecipe';

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
          <Route path="/viewRecipe/:recipeId" element={<ViewRecipe />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
