import React, {useEffect, useState} from 'react'
import Navbar from './Navbar'
const QUOTE_API = "+OiyO57BRGCLn0pD+uXe0g==UOCCpQbV6cATbefJ";


const Header = () => {
    const [q, setQuote] = useState({quote: '...', author:'...'});
    const fetchquote = async () => {
        try {
            const response = await fetch('https://api.api-ninjas.com/v1/quotes?category=happiness', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': QUOTE_API
                }
            });
            const out = await response.json();
            setQuote(out[0]);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchquote();
    }, [])

    return (
        <div className="header">
            <Navbar/>
            <div className="content-main">
                <i className="fa-solid fa-quote-right" style={{color:'white'}}></i>
                <div className="content-quote">
                {q.quote}
                </div>
                <div className="content-author"> &#8213; {q.author}</div>
            </div>
        </div>
    )
}

export default Header
