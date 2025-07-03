import React, { useContext, useState } from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import { toast } from 'react-toastify'

const Navbar = ({setShowLogin}) => {

  const [menu,setMenu] = useState("home")
  const {getTotalCartAmount,token,setToken,food_list} = useContext(StoreContext)
  const [showSearchBox,setShowSearchBox] = useState(false)
  const [productInput,setProductInput] = useState("")

  const navigate = useNavigate();

  
  const logout = ()=>{
    localStorage.removeItem("token")
    setToken("")
    navigate("/")
  }

  const searchProduct = ()=>{
    // if(productInput.length <3){
    //   toast("At")
    // }
    // console.log(food_list)
    // const searchProduct = food_list.filter((elem,index)=>{
    //     return elem.name.toLowerCase().includes(productInput)
    // })
    // console.log(searchProduct)
    navigate(`/shop/p/search&${productInput}`)
    setShowSearchBox(false)
  }

  return (
    <>
    <div className='navbar'>
      <Link to="/"> <img src={assets.logo} className='logo' alt="" /></Link>
        <ul className='navbar-menu'>
          <Link to='/' onClick={()=>setMenu("home")} className={menu==="home"?"active":""}> home </Link>
          <Link to='/shop' onClick={()=>setMenu("shop")} className={menu==="shop"?"active":""}> shop </Link>
          <a href='#explore-menu' onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>menu</a>
          <a href='#app-download' onClick={()=>setMenu("mobile")} className={menu==="mobile"?"active":""}>mobile</a>
          <a href='#footer' onClick={()=>setMenu("contact")} className={menu==="contact"?"active":""}>contact us</a>
        </ul>
        <div className="navbar-right">
          {showSearchBox?<img src={assets.cross_icon} alt="" onClick={()=>setShowSearchBox((prev)=>!prev)} />:<img src={assets.search_icon} alt="" onClick={()=>setShowSearchBox((prev)=>!prev)} />}
          <div className="navbar-search-icon">
            <Link to='/cart'><img src={assets.basket_icon} alt="" /> </Link> 
            {getTotalCartAmount()?<div className="dot"></div>:<></>}
          </div>

          {!token?<button onClick={()=>setShowLogin(true)}>sign in</button>
          :<div className='navbar-profile'>
                  <img src={assets.profile_icon} alt="" />
                  <ul className="nav-profile-dropdown">
                    <li onClick={()=>navigate("/my-order")}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                    <hr />  
                    <li onClick={logout} ><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                  </ul>
            </div>}

        </div>
    </div>
    {
      showSearchBox && <div className='search-bar'>
        <div className="search-input">

            <input onChange={(e)=>setProductInput(e.target.value)}onKeyDown={(e) => { if (e.key === 'Enter') { searchProduct();   }
                       }} type="text" value={productInput} placeholder='Search Product*'/>

            <button style={{cursor:"pointer"}} onClick={()=>searchProduct()}><img src={assets.search_icon} width={22} alt="" /></button>
        </div>
    </div>
    }
    
    </>
  )
}

export default Navbar