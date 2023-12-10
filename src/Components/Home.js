import React from 'react'
import Tile from './Tile'
import Header from './Header'

const Home = () => {

  return (
    <>
    <Header/>
    <div className='container'>
      <h2>Home</h2>
      <Tile/>
      <Tile/>
      <Tile/>
      <Tile/>
      <Tile/>
      <Tile/>
    </div>
  </>
  )
}

export default Home
