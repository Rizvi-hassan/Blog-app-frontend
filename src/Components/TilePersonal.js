import React, { useContext } from 'react'
import DateObject from "react-date-object";
import userContext from '../Contexts/user/userContext';
import { useNavigate } from 'react-router-dom';
// import EditBlog from './EditBlog';

const TilePersonal = (props) => {
    const navigate = useNavigate();
    const context = useContext(userContext);
    const { newBlog, showAlert, url, newEdit } = context;
    const { data, fetchdata } = props;
    const date = new DateObject(data.date);

    const handleClick = (val) => {
        console.log(val);
        newBlog(val, false);
        navigate(`/page/${data._id}`);
    }

    const handleDelete = async(e) =>{
        console.log("delete: data");
        const response = await fetch(`${url}/blog/deleteblog/${data._id}`, {
            method:'DELETE',
            headers:{
                'auth-token':localStorage.getItem('blog-token')
            }
        });
        const out = await response.json();
        if(response.status !== 200){
            showAlert('fail', out.errors.msg);
        }
        else{
            showAlert('success', 'Blog deleted successfully.');
            fetchdata();
        }
    }
    const handleChange = ()=>{
        console.log("Change working");
        newEdit(data);
        navigate('/editblog');
    }

    return (
        <div className="tile">

            <div className="tile-body">
                <div className="content">

                    <span className="tag">{data.tag}</span>
                    <span className="date">{date.format("MMMM DD, YYYY")}</span>
                    <h3>{data.head}</h3>
                    <p className="desc">{(data.title.length > 130) ? data.title.substring(0, 129) + "..." : data.title}</p>
                    <span onClick={() => { handleClick(data) }} style={{ fontWeight: '700', textDecoration: 'none', cursor: 'pointer' }}>Read More <i className="fa-solid fa-square-up-right"></i></span>
                    <div className="foot">
                        <span className="author"> &#8213; {data.author}</span>
                        <span className="buttons">
                            <i onClick={handleChange} className="fa-solid fa-pen-to-square" style={{marginRight:'1rem', cursor:'pointer'}}></i>
                            <i onClick={handleDelete} className="fa-solid fa-trash" style={{marginRight:'1rem', cursor:'pointer'}}></i>
                        </span>
                    </div>
                </div>
                <img src={data.mainImg} alt='img' className="image">

                </img>
            </div>

        </div>
    )
}

export default TilePersonal
