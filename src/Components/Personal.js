import React, { useContext, useEffect, useState } from 'react'
import Header from './Header'
import { useNavigate } from 'react-router-dom'
import userContext from '../Contexts/user/userContext'
import TilePersonal from './TilePersonal'
import Loading from './Loading'


const YourBlogs = () => {
    const context = useContext(userContext);
    const { showAlert, url } = context;
    const navigate = useNavigate()
    const [blogs, setBlogs] = useState([]);

    const fetchdata = async () => {
        const response = await fetch(`${url}/blog/fetchpersonal`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'auth-token': localStorage.getItem('blog-token')
            }

        })
        if (response.status !== 200) {
            var msg = response.errors.msg;
            showAlert('fail', msg);
            navigate(-1);
        }
        else {
            const data = await response.json();
            console.log(data);
            setBlogs(data);
        }
    }

    useEffect(() => {
        if (!localStorage.getItem('blog-token')) {
            showAlert("success", "Login to see you blogs.");
            navigate('/login');
        }
        else {
            fetchdata();
        }
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <Header />
            <div className="container">
                <h2>Your Blogs</h2>
                <Loading/>
                {(blogs.length === 0) && <span>End of page</span>}
                {blogs.length !== 0 && blogs.map((data) => {
                    return <TilePersonal key={data._id} data={data} fetchdata={fetchdata} />
                })}
            </div>
        </>
    )
}

export default YourBlogs
