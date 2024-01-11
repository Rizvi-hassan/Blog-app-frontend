import React, {useState} from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/hljs';


const Code = (props) => {
    const [copy, setCopy] = useState(false);
    const { codeString } = props;
    console.log(codeString);
    const handleCopy = async () => {
        if ('clipboard' in navigator) {
            await navigator.clipboard.writeText(codeString);
        }
        else {
            await document.execCommand('copy', true, codeString);
        }
        setCopy(true);
        setTimeout(() => {
            setCopy(false);
        }, 3000);
    }
    return (
        <div className="code-box">
            <div className="code-heading">
                <span style={{ color: 'white' }}>Sample Code</span>
                {!copy ? <span className="code-btn-box" onClick={handleCopy}>
                    <span ><i className="fa-regular fa-clipboard icon" ></i> </span>
                    {/* <span style={{color:'white'}}>Copy </span> */}
                </span> :
                    <span className="code-btn-box" onClick={handleCopy}>
                        <span><i className="fa-solid fa-check icon" ></i> </span>
                        {/* <span style={{color:'white'}}>copied! </span> */}
                    </span>
                }

            </div>
            <SyntaxHighlighter language='jsx' style={nightOwl} showLineNumbers={true}>
                {codeString}
            </SyntaxHighlighter>

        </div>
    )
}

export default Code

