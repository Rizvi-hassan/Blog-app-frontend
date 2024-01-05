import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import DateObject from "react-date-object";
import userContext from '../Contexts/user/userContext';



const Tile = (props) => {
  const navigate = useNavigate();
  const context = useContext(userContext);
  const { newBlog } = context;
  const { data } = props;
  const date = new DateObject(data.date);

  const handleClick = () => {
    console.log(data);
    newBlog(data, false);
    navigate(`/page/${data._id}`);
  }


  return (
    <div className="tile">

      <div className="tile-body">
        <div className="content">

          <span className="tag">{data.tag}</span>
          <span className="date">{date.format("MMMM DD, YYYY")}</span>
          <h3>{data.head}</h3>
          <p className="desc">{(data.title.length > 130) ? data.title.substring(0, 129) + "..." : data.title}</p>
          <span onClick={handleClick} style={{ fontWeight: '700', textDecoration: 'none', cursor: 'pointer' }}>Read More <i className="fa-solid fa-square-up-right"></i></span>
          <span className="author"> &#8213; {data.author}</span>
        </div>
        <img src={data.mainImg} alt='img' className="image"></img>

      </div>
    </div>

    // </div >
  )
}

export default Tile
