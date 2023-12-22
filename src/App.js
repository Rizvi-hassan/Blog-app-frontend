// import logo from './logo.svg';
import './App.css';
import Home from './Components/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Page from './Components/Page';
import Addblog from './Components/Addblog';
import UserState from './Contexts/user/userState'
import Login from './Components/Login';
import Register from './Components/Register';
import Alert from './Components/Alert';

function App() {
  return (
    <div>
      <UserState>
        <Router>
          <Alert/>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/blog-page' element={<Page />} />
            <Route path='/add-blog' element={<Addblog />} />
            <Route path='/auth/login' element={<Login/>}/>
            <Route path='/auth/register' element={<Register/>} />
          </Routes>
        </Router>
      </UserState>
    </div>
  );
}

export default App;
