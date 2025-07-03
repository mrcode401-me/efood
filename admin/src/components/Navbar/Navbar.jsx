import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import {dataContext} from '../../context/AdminContext.jsx'

const Navbar = () => {
  const navigate = useNavigate();
  const {setToken} = useContext(dataContext);

  const logout = ()=>{
    console.log("object")
    localStorage.removeItem("token");
    setToken("")
    navigate("/")
  }
  return (
    <div className="navbar" id='navbar'>
        <img className='logo' onClick={()=>navigate("/")} src={assets.logo} alt="" />
        <div className='nav-profile'>
            <img className='profile' src={assets.profile_image} alt="" /> 
            <div className='profile-dropdown'>
              <div> <img src={assets.setting_icon} alt="" /> Settings</div>
              <hr />
              <div onClick={()=>logout()}> <img src={assets.logout_icon} alt="" /> Logout</div>
            </div>
        </div>
    </div>
  )
}

export default Navbar
