import React from 'react'
import './InputArea.css'

const InputArea = (props) => {
    const val = props.val;
    const msg = { 'p': 'Paragraph', 'h2':'Sub Heading', 'Code': 'Code block', 'img': 'Image block'}
    let colors = { 'p': '#2626db', 'h2': '#18dbd2', 'Code': '#6a0808', 'img': '#8a62eb' };
    let color = colors[val[0]]
    let k = "element" + val[2];
    const delete_ = (e) => {
        props.delete_element(val);
    }
    return (
        <>
            {/* createElement('textarea', { className: 'content text-box', name: val[2], key: "element" + val[2], value: value[val[2]][1], onChange, style: { borderColor: colors[val[0]] } }, val[1]); */}
            <div className="box" key={k}>
                <div className='box-head'>
                    <label htmlFor={val[2]} className="label" style={{ color: color }}>{msg[val[0]]}</label>
                    <span className='delete-element' name={k + "delete_btn"} onClick={() => { delete_(val) }}>Delete</span>

                </div>
                <textarea className="content text-box" name={val[2]} rows="2" value={val[1]} onChange={props.onchange} style={{ borderColor: color }} ></textarea>
            </div>
        </>
    );
}

export default InputArea