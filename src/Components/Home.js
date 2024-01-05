import React, { useContext, useEffect, useState } from 'react'
import Tile from './Tile'
import Header from './Header'
import userContext from '../Contexts/user/userContext'
import Loading from './Loading'

const Home = () => {
  const context = useContext(userContext);
  const [data, setData] = useState([])
  const { url, showAlert, fetchName, name, showLoading } = context;
  const fetchdata = async () => {
    try{
      showLoading(true);
      const response = await fetch(`${url}/blog/fetchblogs`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const out = await response.json();
      if (response.status === 200) {
        setData(out);
      }
      else {
        showAlert('fail', 'Unable to get blogs. Check your connection.');
      }
    }
    catch(error){
      console.log(error);
      showAlert("fail", "Unable to fetch blog. Check your network.");
    }
    showLoading(false);
  }

  useEffect(() => {
    try {
      fetchdata();

      if (localStorage.getItem('blog-token')) {
        if (name === ''){
          fetchName();
        }
      }
    } catch (error) {
      showAlert('fail', 'Something went wrong.');
    }
  }, [name])

  return (
    <>
      <Header />
      <div className='container'>
        <h2>Home</h2>
        <Loading/>
        {(data.length === 0) && <span>End of page</span>}
        {data.map((val) => {
          return <Tile key={val._id} data={val} />
        })}
      </div>
    </>
  )
}

export default Home
