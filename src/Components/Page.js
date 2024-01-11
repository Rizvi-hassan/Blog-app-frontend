import React, { createElement, useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import DateObject from "react-date-object";
import { useNavigate, useParams } from 'react-router'
import userContext from '../Contexts/user/userContext'
import Code from './Code';
import Loading from './Loading';

const Page = () => {
    const context = useContext(userContext);
    const navigate = useNavigate();
    const {url, showAlert, showLoading} = context;
    const params = useParams();
    const {id} = params;
    const [blog, setBlog] = useState({elements:[]});
    let date = null;
    const [loading, setLoading] = useState(false);

    const fetchdata = async()=>{
        try {
            showLoading(true);
            setLoading(true);
            const response = await fetch(`${url}/blog/fetchblog?id=${id}`, {
                method: 'GET',
                headers: {
                    'auth-token': localStorage.getItem('blog-token')
                }
            });
            if(response.status === 200){
                showLoading(false);
                setLoading(false);
                let data = await response.json();
                setBlog(data);
                date = new DateObject(blog.date);
                console.log(data);
            }
            else{
                let msg = await response.json();
                showLoading(false);
                setLoading(false);
                showAlert('fail', msg.errors.msg);
                navigate('/');
            }
        } catch (error) {
            console.log(error);
            showAlert('fail', 'The blog you are looking is unavailable.');
            navigate('/');
        }
    }

    useEffect(()=>{
        fetchdata();
        // eslint-disable-next-line
    }, [])

    let key = 0;
    
    
    // const data = blog.data;
    const handleBack = () => {
        navigate(-1);
    }
    return (
        <div>
            <Navbar />
            <i className="fa-solid fa-left-long back" onClick={handleBack}></i>
            {!loading &&
            <div className="container">
                <span className="tag">{blog && blog.tag}</span>
                <span className="date">{date && date.format("MMMM DD, YYYY")}</span>
                <span className="author"> &#8213; {blog && blog.author}</span>
                <h1 className="main-heading">{blog && blog.head}</h1>
                <img src={blog && blog.mainImg} alt="error" className="image-main"/>
                <p className="paragraph">{blog && blog.title}</p>
                {blog && blog.elements.map((element) => {

                    if (element[0] === 'p') {
                        key++;
                        return createElement(element[0], { className: "paragraph", key: key }, element[1])
                    }
                    if (element[0] === 'h2') {
                        key++;
                        return createElement(element[0], { className: "sec-heading", key: key }, element[1])
                    }
                    if (element[0] === 'img') {
                        key++;
                        return createElement(element[0], { className: "img-blog", src: element[1], key: key })
                    }
                    if (element[0] === 'Code') {
                        key++;
                        return <Code key={key} codeString = {element[1]}/>
                    }
                })}
                
            </div> }
            <Loading/>
        </div>
    )
}

export default Page
