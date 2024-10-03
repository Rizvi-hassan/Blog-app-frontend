import React, { useState, useContext, useEffect } from 'react'
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';
import userContext from '../../Contexts/user/userContext';
import DateObject from "react-date-object";
import InputArea from '../InputArea/InputArea';
import './Addblog.css';

// import StringParser from '../Modules/StringParser'

const Addblog = () => {
    const context = useContext(userContext);
    var date = new DateObject();
    const { name, showAlert, url } = context;
    // const isnew = edit.isnew;  -- not needed as editBlog handles edit
    const navigate = useNavigate();
    let [value, setValue] = useState([]);
    let [imp, setImp] = useState({ head: "", title: "", mainImg: "", tag: "" });
    // to activate loader in submit btn
    const [loading, setLoading] = useState(false);

    let [drop, setDrop] = useState(false);
    let data = {};

    const addElement = (what) => {
        if (what === 'p') {
            setValue(value.concat([['p', '', value.length]]));
            // console.log(value)

        }
        else if (what === 'h2') {
            setValue(value.concat([['h2', '', value.length]]))
            // console.log("heading", value)
        }
        else if (what === 'Code') {
            setValue(value.concat([['Code', '', value.length]]))
            // console.log(value)

        }

        else {
            setValue(value.concat([['img', '', value.length]]))
            // console.log(value)
        }

        handleClick();
    }

    const delete_element = (val) => {
        setValue(value.filter((v) => {
            return v !== val;
        }));
    }

    const handleClick = () => {
        if (drop === false) {
            setDrop(true)
            // console.log("drop down");
            document.getElementById('elements-list').classList.add('drop')
            document.getElementById('arrow').style.transform = 'rotate(90deg)';
        }
        else {
            setDrop(false);
            document.getElementById('elements-list').classList.remove('drop')
            document.getElementById('arrow').style.transform = 'rotate(0deg)';
        }
        //  setValue(value.concat([['p', 'This is new p element', key]]));

    }

    const onchange = (e) => {
        let temp = value.map((val) => {
            if (val[2] === parseInt(e.target.name)) {
                return [val[0], e.target.value, val[2]];
            }
            else {
                return val;
            }
        });
        // console.log(temp, e.target.value);
        setValue(temp);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log("Submit action");
        let response;
        data = {
            author: name,
            date: date,
            head: imp.head,
            title: imp.title,
            mainImg: imp.mainImg,
            tag: imp.tag.toUpperCase().trim(),
            elements: value
        }
        // console.log(data);

        response = await fetch(`${url}/blog/addblog`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('blog-token')
            },
            body: JSON.stringify(data)
        })

        const json = await response.json();
        console.log("Data: ", json);
        setLoading(false);
        if (response.status !== 200) {
            showAlert('fail', json.errors.msg);
        }
        else {
            showAlert('success', 'Blog created successfully.');
            navigate('/personal');
        }
    }

    const impChange = (e) => {
        setImp({ ...imp, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        if (!localStorage.getItem('blog-token')) {
            showAlert("success", "You need to login to write a blog.")
            navigate('/');
        }
    })


    const reset_val = () => {
        setValue([]);
        setImp({ head: "", title: "", mainImg: "", tag: "" });
        document.getElementsByClassName('check-btn')[0].classList.remove('check-btn-move');
        document.getElementsByClassName('check-box')[0].classList.remove('check-box-move');
    }

    const go_back = () => {
        console.log("Go back");
        navigate(-1);
    }

    const check_toggle = () => {
        const default_img = "https://pbwebdev.co.uk/wp-content/uploads/2018/12/blogs.jpg";
        document.getElementsByClassName('check-btn')[0].classList.toggle('check-btn-move');
        document.getElementsByClassName('check-box')[0].classList.toggle('check-box-move');
        if (imp.mainImg !== default_img) {
            setImp({ ...imp, mainImg: default_img });
        }
        else {
            setImp({ ...imp, mainImg: "" });
        }
    }

    return (
        <>
            <Navbar />
            <div className="container">
                <h1 className="main-heading">New Blog</h1>
                <form action="post" onSubmit={handleSubmit}>
                    <span className='date'>{date.format("MMMM DD, YYYY")}</span>
                    <div className="box">
                        <label htmlFor="head" className="label">Enter the heading of blog.</label>
                        <textarea className="content text-box" name="head" id="head" rows="1" required value={imp.head} onChange={impChange}></textarea>
                    </div>
                    <div className="box">
                        <label htmlFor="title" className="label">Enter the title of blog.</label>
                        <textarea className="content text-box" name="title" id="title" rows="5" required value={imp.title} onChange={impChange}></textarea>
                    </div>

                    <div className="box">
                        <label htmlFor="mainImg" className="label">Enter link to the main image.</label>

                        <div className='default-check'>
                            <span>Default</span> <div className='check-box' onClick={check_toggle}>
                                <div className='check-btn'></div>
                            </div>
                        </div>

                        <textarea className="content text-box" name="mainImg" id="mainImg" rows="2" required value={imp.mainImg} onChange={impChange}></textarea>
                    </div>
                    <div className="box">
                        <label htmlFor="tag" className="label">Enter the tag. Blogs with <em>private</em> tag will only be shown to you.</label>
                        <textarea className="content text-box" name="tag" id="tag" rows="1" style={{ textTransform: 'uppercase' }} required value={imp.tag} onChange={impChange}></textarea>
                    </div>

                    <div className="box">
                        <h2>Elements</h2>
                        {value.map((val) => {
                            return (
                                // createElement('textarea', { className: 'content text-box', name: val[2], key: "element" + val[2], value: value[val[2]][1], onChange, style:{ borderColor: color[val[0]]} }, val[1])
                                // createInputArea(val)
                                <InputArea key={val[2]} val={val} onchange={onchange} delete_element={delete_element} />
                            )
                        })}
                        <div className="dropdown">
                            <button className="btn-sec" type="button" onClick={handleClick}>Add element<i id="arrow" className="fa-solid fa-angle-right icon" ></i></button>
                            <div id="elements-list" >
                                <div className="element transition" onClick={() => {
                                    addElement('h2')
                                }}><i className="fa-solid fa-plus icon"></i>Sub-heading</div>

                                <div className="element transition" onClick={() => {
                                    addElement('p')
                                }}><i className="fa-solid fa-plus icon"></i>Paragraph</div>

                                <div className="element transition" onClick={() => {
                                    addElement('img')
                                }}><i className="fa-solid fa-plus icon"></i>Image</div>

                                <div className="element transition" onClick={() => {
                                    addElement('Code')
                                }}><i className="fa-solid fa-plus icon"></i>Code</div>
                            </div>
                        </div>
                    </div>

                    <ul className='submit-box'>
                        <button type="submit" className="btn-sec submit">Add blog{loading && <span className="gear-box"><i className="fa-solid fa-gear"></i></span>}</button>
                        <button type="button" className="btn-sec reset" onClick={reset_val}>Reset</button>
                        <button type="button" className="btn-sec " onClick={go_back}>Cancel</button>
                    </ul>
                </form>
            </div>
        </>
    )
}

export default Addblog
