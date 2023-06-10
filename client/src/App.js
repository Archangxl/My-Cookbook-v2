import LandingPage from "./Components/LoginNotRequired/Pages/Landing";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from "./Components/LoginNotRequired/Pages/Login";
import Register from "./Components/LoginNotRequired/Pages/Register";
import Cookbook from "./Components/LoginRequired/Pages/Cookbook";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <LandingPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path="/cookbook" element={<Cookbook />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
