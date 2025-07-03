import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Cart from './pages/Cart/Cart.jsx'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder.jsx'
import Footer from './components/Footer/Footer.jsx'
import LoginPopup from './components/LoginPopup/LoginPopup.jsx'
import { ToastContainer } from 'react-toastify'
import MyOrder from './pages/MyOrder/MyOrder.jsx'
import Shop from './pages/Shop/Shop.jsx'
import ProductPage from './pages/ProductPage/ProductPage.jsx'
import Category from './pages/Category/Category.jsx'
import OrderDetails from './pages/OrderDetails/OrderDetails.jsx'

const App = () => {


  const [showLogin,setShowLogin] = useState(false)

  return (
    <>
      {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin}/>
      <ToastContainer/>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/cart' element={<Cart setShowLogin={setShowLogin}/>}/>
          <Route path='/order' element={<PlaceOrder/>} />
          <Route path='/my-order' element={<MyOrder/>}/>
          <Route path='/my-order/:id' element={<OrderDetails/>}/>
          <Route path='/shop' element={<Shop/>}/>
          <Route path='/category/:category' element={<Category/>}/>
          <Route path='/shop/p/:query' element={<Shop/>}/>
          <Route path='/shop/:product' element={<ProductPage/>}/>
      </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App