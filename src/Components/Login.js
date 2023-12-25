import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import userContext from '../Contexts/user/userContext'


const Login = () => {
    const context = useContext(userContext);
    const {showAlert, url, fetchName} = context;
    const navigate = useNavigate();
    const [creds, setCreds] = useState({email:"", password:""});
    const handleChange = (e)=>{
        setCreds({...creds, [e.target.name]:e.target.value});
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const response = await fetch(`${url}/auth/login`, {
                method: "POST",
    
                headers: {
                    "Content-Type": "application/json",
    
                },
    
                body: JSON.stringify({email:creds.email, password: creds.password}) // body data type must match "Content-Type" 
            });
        const json = await response.json();
        if (json.attempt === 'success'){
            localStorage.setItem('blog-token', json.token);
            showAlert('success', 'Logged in successfully. Welcome back to B_LOG');
            fetchName();
            navigate('/');
        }
        else{
            console.log('fail');
            if(Array.isArray(json.errors)){
                showAlert('fail', json.errors[0].msg);
            }
            else{
                showAlert('fail', json.errors.msg);
            }
        }
    }

    const toggleHideShow = ()=>{
        const pwd = document.getElementById('password');
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
            <div className="body">
                <h1 style={{ color: 'white', marginBottom: '1rem', fontSize: '3rem' }}>Login</h1>
                <div className="content-box">
                    <form action="post" className="form" onSubmit={handleSubmit}>
                        <i id="eye" className="fa-solid fa-eye hide-show" onClick={toggleHideShow}></i>
                        <input type='email' className="form-entry" name='email' value={creds.email} onChange={handleChange} placeholder='Enter your email' />
                        <input type="password" id="password" className="form-entry" name='password' value={creds.password} onChange={handleChange} placeholder='Enter your password' required/>
                        <input type="submit" className="form-btn green" value='Login' />
                        <Link to='/auth/register' className='link'>New user? Register</Link>
                        <Link to='/' className='link'>Home</Link>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
