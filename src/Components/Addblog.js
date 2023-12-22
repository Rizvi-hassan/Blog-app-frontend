import React, { createElement, useState } from 'react'
import Navbar from './Navbar';
// import StringParser from '../Modules/StringParser'

const Addblog = () => {
    var key = 0;
    let [value, setValue] = useState([]);
    let [drop, setDrop] = useState(false);

    const addElement = (what) => {
        if (what === 'p') {
            setValue(value.concat([['p', 'Enter the content of paragraph', value.length]]));
            console.log(value, key)
            
        }
        else if (what === 'h2') {
            setValue(value.concat([['h2', 'Enter the subheading', value.length]]))
            console.log(value, key)
        }
        else {
            setValue(value.concat([['img', 'Enter link to the image', value.length]]))
            console.log(value, key)
        }
        handleClick();
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

    const onChange = (e)=>{
        let temp = value.map((val)=>{
            if (val[2] === parseInt(e.target.name)){
                return [val[0], e.target.value, val[2]];
            }
            else{
                return val;
            }
        });
        // console.log(temp, e.target.value);
        setValue(temp);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submit action");
        const data = {
            head: document.getElementById('head').value,
            title: document.getElementById('title').value,
            elements: value
        }
        console.log("Data: ", data)
    }

    return (
        <>
            <Navbar />
            <div className="container">
                <h1 className="main-heading">Add New Blog</h1>
                <form action="post" onSubmit={handleSubmit}>
                    <div className="box">
                        <label htmlFor="head" className="label">Enter the heading of blog.</label>
                        <textarea className="content text-box" name="head" id="head" rows="1" ></textarea>
                    </div>
                    <div className="box">
                        <label htmlFor="title" className="label">Enter the title of blog.</label>
                        <textarea className="content text-box" name="title" id="title" rows="5" ></textarea>
                    </div>
                    <div className="box">
                        <h2>Elements</h2>
                        {value.map((val) => {
                            return (
                            createElement('textarea', { className: 'content text-box', name:val[2], key:"element"+val[2], value:value[val[2]][1], onChange }, val[1])
                            )
                        })}
                        <div className="dropdown">
                            <button className="btn-sec" type="button" onClick={handleClick}>Add element<i id="arrow" className="fa-solid fa-angle-right icon" ></i></button>
                            <div id="elements-list" >
                                <div className="element transition" onClick={() => {
                                    addElement('p')
                                }}><i className="fa-solid fa-plus icon"></i>Paragraph</div>
                                <div className="element transition" onClick={() => {
                                    addElement('h2')
                                }}><i className="fa-solid fa-plus icon"></i>Sub-heading</div>
                                <div className="element transition" onClick={() => {
                                    addElement('img')
                                }}><i className="fa-solid fa-plus icon"></i>Image</div>
                            </div>
                        </div>
                    </div>
                    <input type="submit" className="btn-sec" value="Submit" />
                </form>
            </div>
        </>
    )
}

export default Addblog
