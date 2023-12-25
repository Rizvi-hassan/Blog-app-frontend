import React, {useState, useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import userContext from '../Contexts/user/userContext'


const Register = () => {
    const context = useContext(userContext);
    const {showAlert, url} = context;
    const navigate = useNavigate();
    const [creds, setCreds] = useState({name:"", email:"", password:"", cpassword:""})
    const handleChange = (e)=>{
        setCreds({...creds, [e.target.name]: e.target.value})
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(creds.password === creds.cpassword){
            const response = await fetch(`${url}/auth/adduser`, {
                method: "POST",
    
                headers: {
                    "Content-Type": "application/json",
    
                },
    
                body: JSON.stringify({name:creds.name,email:creds.email, password: creds.password}) // body data type must match "Content-Type" 
            });
            const json = await response.json();
            if (json.attempt === 'success'){
                localStorage.setItem('blog-token', json.token);
                showAlert('success', 'Registration successfull. Welcome to B_LOG family.');
                navigate('/');
            }
            else{
                console.log(json.errors);
                if (Array.isArray(json.errors)){
                    showAlert('fail', json.errors[0].msg);
                }
                else{
                    showAlert('fail', json.errors.msg);
                }
            }

        }
        else{
            // document.getElementById('cpass').style.border = '2px solid red';
            showAlert('fail', 'Passwords do not match. Please re-check');
        }

    }

    const toggleHideShow = ()=>{
        const pwd = document.getElementById('cpass');
        const eye = document.getElementById('eye');
        if(pwd.type === 'password'){
            pwd.type = 'text';
            eye.classList.toggle('fa-eye');
            eye.classList.toggle('fa-eye-slash');
        }
        else{
            pwd.type = 'password';
            eye.classList.toggle('fa-eye');
            eye.classList.toggle('fa-eye-slash');
        }
    }
  return (
    <>
            <div className="body" onSubmit={handleSubmit}>
                <h1 style={{ color: 'white', marginBottom: '1rem', fontSize: '3rem' }}>Register</h1>
                <div className="content-box">
                    <form action="post" className="form">
                        <i id="eye" className="fa-solid fa-eye hide-show2" onClick={toggleHideShow}></i>
                        <input type="text" className="form-entry" id='name' name='name' value={creds.name} onChange={handleChange} placeholder="Enter your name"/>
                        <input type='email' className="form-entry" id='email' name='email' value={creds.email} onChange={handleChange} placeholder='Enter your email' />
                        <input type="password" className="form-entry" id='pass' name='password' value={creds.password} onChange={handleChange} placeholder='Enter your password' />
                        <input type="password" className="form-entry" id='cpass' name='cpassword' value={creds.cpassword} onChange={handleChange} placeholder='Re-enter your password' />
                        <input type="submit" className="form-btn blue" value='Register' />
                        <Link to='/auth/login' className='link'>Existing user? Login</Link>
                    </form>
                </div>
            </div>
        </>
  )
}

export default Register
