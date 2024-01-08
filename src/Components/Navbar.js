import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import userContext from '../Contexts/user/userContext';


const Navbar = () => {
  const context = useContext(userContext);
  const { name } = context;
  const [showL, setShowL] = useState(false);
  const [showBtn, setShwoBtn] = useState(false);

  const navigate = useNavigate();

  const showHide = () => {
    document.getElementById('name').classList.toggle('show')
  }

  const goToAdd = () => {
    navigate('/editblog')
  }

  const handleLogOut = () => {
    localStorage.clear();
    navigate('/login');
  }
  const handleArrowClick = () => {
    if (showL === false) {
      document.getElementById('links').style.height = '26px';
      document.getElementById('arrow').style.transform = 'rotate(180deg)';
      setShowL(true);
    }
    else {
      document.getElementById('links').style.height = '0';
      document.getElementById('arrow').style.transform = 'rotate(0deg)';
      setShowL(false);
    }
  }

  const handleUserClick = ()=>{
    if(showBtn === false){
      setShwoBtn(true);
      document.getElementById('btn-box').style.transform = 'translateX(0%)';
      document.getElementById('userIcon').classList.toggle('fa-regular');
      document.getElementById('userIcon').classList.toggle('fa-solid');
    }
    else
    {
      setShwoBtn(false);
      document.getElementById('btn-box').style.transform = 'translateX(100%)';
      document.getElementById('userIcon').classList.toggle('fa-regular');
      document.getElementById('userIcon').classList.toggle('fa-solid');
    }
  }


  return (
    <div className="nav-bar">
      <div className="title">B_LOG</div>
      <div className="links">
        <span className="arrow" id="arrow">
          <i className="fa-solid fa-chevron-down" onClick={handleArrowClick} ></i>
        </span>
        <ul id="links">
          <li><Link className="hover transition" to="/">Home</Link></li>
          <li><Link className="hover transition" to="/personal">Personal Blogs</Link></li>
        </ul>
      </div>

      <div className="search-box">
        <span className="profile">
        <i className="fa-regular fa-user" style={{color:'white', fontSize:'1.5rem'}} id="userIcon" onClick={handleUserClick}></i>
        </span>
        <div className="btn-box" id="btn-box">
          {!localStorage.getItem('blog-token') ? <>
            <button className="btn-primary transition" onClick={() => navigate('/register')}>Register</button>
            <button className="btn-primary transition" onClick={() => navigate('/login')}>Login</button>
          </> : <>
            <button className="btn-primary transition" onClick={goToAdd}>Add Blog <i className="fa-solid fa-plus icon" style={{ padding: '0' }}></i></button>
            <div className="user" id="user" onClick={showHide}>
              <div className="user-icon"><i className="fa-solid fa-user" style={{ color: 'white', fontSize: '1.5rem' }}></i></div>
              <div className="name" id="name" >{name}
                <button className="btn-danger transition" onClick={handleLogOut} >Logout</button>
              </div>
            </div>
          </>
          }
        </div>

      </div>
    </div>
  )
}

export default Navbar
