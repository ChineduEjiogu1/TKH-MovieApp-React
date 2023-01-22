import React from 'react'
import './header.css'

const Header = () =>{
  return <header onClick={() => window.scroll(0,0)} className='title-header'> Immersed In Film </header>
};

export default Header;