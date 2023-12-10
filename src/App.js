// import logo from './logo.svg';
import './App.css';
import Home from './Components/Home';
import {BrowserRouter as Router,
Routes,
Route} from 'react-router-dom';
import Page from './Components/Page';
import Addblog from './Components/Addblog';

function App() {
  return (
    <div>
      <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/blog-page' element={<Page/>}/>
        <Route path='/add-blog' element= {<Addblog/>}/>

      </Routes>
      </Router>
    </div>
  );
}

export default App;
