import React, { createElement, useState } from 'react'
// import StringParser from '../Modules/StringParser'

const Addblog = () => {
    document.body.contentEditable = true;
    let key = 1;
    let [value, setValue] = useState([['p', 'Old p element', 1]]);
    

    const handleClick = (e)=>{
        key++;
         setValue(value.concat([['p', 'This is new p element', key]]));
         

    }


    // const [data, setData] = useState({head:"", title:"", elements:[]});
    // let element = -1;
    // const onchange = (e)=>{
    //     setData({...data, [e.target.name]: e.target.value})
    // }
    // const onElementAdd = ()=>{
    //     setData({...data, [elements]: elements.push(['', ''])});
    //     element++;
    // }
    
    return (
        <div className="container">
            <button onClick={handleClick}>Add paragrapha element</button>
            <div className="content-box" style={{border:'2px solid black'}}>
                <p>First paragraph</p>
                <p>Second paragraph</p>
                <p>Third paragraph</p>
                <p>Fourth paragraph</p>
                {value.map((item)=>{
                    return createElement(item[0], {key:item[2]}, item[1])
                })}
            </div>
        </div>
    )
}

export default Addblog
