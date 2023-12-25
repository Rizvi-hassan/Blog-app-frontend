import { useState } from 'react';
import userContext from './userContext'

const QUOTE_API = "+OiyO57BRGCLn0pD+uXe0g==UOCCpQbV6cATbefJ";

const UserState = (props) => {
    // const navigate = useNavigate();

    const [alert, setAlert] = useState(null);
    const [blog, setBlog] = useState({});
    const [name, setName] = useState('');
    const [quote, setQuote] = useState(null);
    const [edit, setEdit] = useState({ _id: '', head: '', author: name, title: '', mainImg: '', tag: '', elements: [], isnew: true });
    const url = 'http://localhost:5000';
    const showAlert = (type, msg) => {
        setAlert({ state: true, type, msg })
        setTimeout(() => {
            setAlert(null)
        }, 2000);
    }

    const newBlog = (data, preview) => {
        setBlog({ data, preview });
    }

    const newEdit = (val) => {
        if (val) {
            setEdit({ _id: val._id, head: val.head, author: name, title: val.title, mainImg: val.mainImg, tag: val.tag, elements: val.elements, isnew: false })
        }
        else {
            setEdit({ _id: '', head: '', author: name, title: '', mainImg: '', tag: '', elements: [], isnew: true })
        }
    }

    const fetchName = async () => {
        const response = await fetch(`${url}/auth/getuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('blog-token')
            }
        });
        const out = await response.json();
        setName(out.user.name);
        console.log(out)
    }
    if (localStorage.getItem('blog-token')) {
        if (name === '') {
            fetchName();
        }
    }

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
            let temp = await out[0];
            await setQuote(temp.quote, temp.author);
            await console.log(temp);
        } catch (error) {
            console.log(error);
        }
    }

    if(!quote){
        fetchquote();
    }

    return (
        <userContext.Provider value={{ showAlert, alert, url, blog, newBlog, name, fetchName, newEdit, edit }}>
            {props.children}
        </userContext.Provider>
    )
}

export default UserState;