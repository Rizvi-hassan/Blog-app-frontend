import React, {  useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import userContext from '../../Contexts/user/userContext';
import Navbar from '../Navbar';
import DateObject from "react-date-object";
import InputArea from '../InputArea/InputArea';
import './EditBlog.css';

const EditBlog = () => {
    const context = useContext(userContext);
    var date = new DateObject();
    const { name, showAlert, edit, url } = context;
    // const isnew = edit.isnew;  -- not needed as adblog handles new blogs
    const navigate = useNavigate();
    let [value, setValue] = useState(edit.elements);
    let [imp, setImp] = useState({ head: edit.head, title: edit.title, mainImg: edit.mainImg, tag: edit.tag });
    // to activate loader in submit btn
    const [loading, setLoading] = useState(false);

    let [drop, setDrop] = useState(false);
    let data = {};

    const addElement = (what) => {
        if (what === 'p') {
            setValue(value.concat([['p', '', value.length]]));
            // console.log(value, key)

        }
        else if (what === 'h2') {
            setValue(value.concat([['h2', '', value.length]]))
            // console.log(value, key)
        }
        else if (what === 'Code') {
            setValue(value.concat([['Code', '', value.length]]))
            // console.log(value, key)

        }

        else {
            setValue(value.concat([['img', '', value.length]]))
            // console.log(value, key)
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


        response = await fetch(`${url}/blog/updateblog/${edit._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
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
            showAlert('success', 'Blog updated successfully.');
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
                <h1 className="main-heading">Edit Blog</h1>
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

export default EditBlog
