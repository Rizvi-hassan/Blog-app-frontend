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
import Personal from './Components/Personal';
import EditBlog from './Components/EditBlog';

function App() {
  let value = '';
  return (
    <div>
      <UserState>
        <Router>
          <Alert/>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/personal' element={<Personal/>} />
            <Route path='/page/:id' element={<Page />} />
            <Route path='/editblog' element={<EditBlog />} />
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>} />
          </Routes>
        </Router>
      </UserState>
    </div>
  );
}

export default App;
