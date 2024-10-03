import './App.css';
import './Phone.css';
import Home from './Components/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Page from './Components/Page';
import UserState from './Contexts/user/userState'
import Login from './Components/Login';
import Register from './Components/Register';
import Alert from './Components/Alert';
import Personal from './Components/Personal';
import EditBlog from './Components/EditBlog/EditBlog';
import Addblog from './Components/Addblog/Addblog';


function App() {
  return (
    <div>
      <UserState>
        <Router>
          <Alert />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/personal' element={<Personal />} />
            <Route path='/page/:id' element={<Page />} />
            <Route path='/editblog' element={<EditBlog />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/newblog' element={<Addblog />} />
          </Routes>
        </Router>
      </UserState>

    </div>
  );
}

export default App;
