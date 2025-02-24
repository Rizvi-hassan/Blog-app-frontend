import { useState } from 'react';
import userContext from './userContext'


const UserState = (props) => {
    // const navigate = useNavigate();

    const [alert, setAlert] = useState(null);
    const [loading, setLoading] = useState(false);
    const [blog, setBlog] = useState({});
    const [name, setName] = useState('');
    const [edit, setEdit] = useState({ _id: '', head: '', author: name, title: '', mainImg: '', tag: '', elements: [], isnew: true });
    // const url = 'http://localhost:5000';
    const url = 'https://blog-app-backend-fr80.onrender.com';
    const showAlert = (type, msg) => {
        setAlert({ state: true, type, msg })
        setTimeout(() => {
            setAlert(null)
        }, 2000);
    }

    const showLoading = (what) => {
        setLoading(what);
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
        try {
            const response = await fetch(`${url}/auth/getuser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('blog-token')
                }
            });
            const out = await response.json();
            setName(out.user.name);
            // console.log(out)
            
        } catch (error) {
            console.log(error);
        }
    }

    if (localStorage.getItem('blog-token')) {
        if (name === '') {
            fetchName();
        }
    }



    return (
        <userContext.Provider value={{ showAlert, alert, url, blog, newBlog, name, fetchName, newEdit, edit, loading, showLoading }}>
            {props.children}
        </userContext.Provider>
    )
}

export default UserState;