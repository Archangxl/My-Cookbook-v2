import LandingPage from "./Components/LoginNotRequiredComponents/Landing";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from "./Components/LoginNotRequiredComponents/Login";
import Register from "./Components/LoginNotRequiredComponents/Register";
import Cookbook from "./Components/LoginRequiredComponents/Cookbook";

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
