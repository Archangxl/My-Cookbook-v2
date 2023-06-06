import LandingPage from "./Components/Pages/LandingPage";
import Navbar from "./Components/Pages/Navbar";
import SharedRecipes from "./Components/Pages/SharedRecipes";
import SharedRecipesApiCall from "./Components/AxiosCalls/SharedRecipesApiCall";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { useState } from "react";

function App() {

  const [apiPassingInformation, setApiPassingInformation] = useState(); 

  return (
    <>
      <SharedRecipesApiCall sharedRecipes={apiPassingInformation} setSharedRecipes={setApiPassingInformation} />
      <BrowserRouter>

        <Routes>
          <Route
            path='/' 
            element={
              <LandingPage>
                <Navbar/>
                <SharedRecipes receivingApiInfo={apiPassingInformation} setReceivingApiInfo={setApiPassingInformation} />
              </LandingPage>
            }
          />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
