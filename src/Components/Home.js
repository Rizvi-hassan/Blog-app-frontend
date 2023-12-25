import React, { useContext, useEffect, useState } from 'react'
import Tile from './Tile'
import Header from './Header'
import userContext from '../Contexts/user/userContext'

const Home = () => {
  const context = useContext(userContext);
  const [data, setData] = useState([])
  const { url, showAlert, fetchName } = context;
  const fetchdata = async () => {
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

  useEffect(() => {
    try {
      fetchdata();

      if (localStorage.getItem('blog-token')) {
        fetchName();
      }
    } catch (error) {
      showAlert('fail', 'Something went wrong.');
    }
  }, [])

  return (
    <>
      <Header />
      <div className='container'>
        <h2>Home</h2>
        {(data.length === 0) && <h3>No blogs to show.</h3>}
        {data.map((val) => {
          return <Tile key={val._id} data={val} />
        })}
      </div>
    </>
  )
}

export default Home
