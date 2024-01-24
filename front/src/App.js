import './App.css';
import Search from './Components/Search';
import Home from './Screens/Home';
import Login from './Screens/Login';
import Signup from './Screens/Signup';
import FrontScreen from './Screens/FrontScreen';
import { Navigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Checkout from './Screens/Checkout';

function App() {

//useStates
const [cookie, setCookie] = useCookies(["token"]);


  return (
    <Router>
      <div className='bg-black w-full h-full'>
      {cookie.token ? (
            <Routes>
              <Route path="/" element={<FrontScreen />} />
              <Route path="/home" element={<Home />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<FrontScreen />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
    </div>
    </Router>
  );
}

export default App;
