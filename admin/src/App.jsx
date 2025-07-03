import React, { useContext } from 'react'
import Navbar from './components/Navbar/Navbar.jsx'
import Sidebar from './components/Sidebar/Sidebar.jsx'
import { Routes,Route } from 'react-router-dom'
import Add from './pages/Add/Add.jsx'
import List from './pages/List/List.jsx'
import Orders from './pages/Orders/Orders.jsx'
  import { ToastContainer } from 'react-toastify';
import { dataContext } from './context/AdminContext.jsx'
import Login from './pages/Login/Login.jsx'
import Home from './pages/Home/Home.jsx'
import Users from './pages/Users/Users.jsx'
import ListCategories from './pages/Categories/ListCategories/ListCategories.jsx'
import AddCategory from './pages/Categories/AddCategories/AddCategories.jsx'
import Settings from './pages/Settings/Settings.jsx'
import Pincode from './pages/Pincode/Pincode.jsx'
import Coupon from './pages/Coupon/Coupon.jsx'
import OrderDetails from './pages/OrderDetails/OrderDetails.jsx'
import Banner from './pages/Banner/Banner.jsx'

const App = () => {
  const {token} = useContext(dataContext)
  return (
    <div>
      <ToastContainer/>
      {!token?<Login/>:<>
        <Navbar/>
        <hr />
        <div className="app-content" id='app-content'>
             <Sidebar/>
             <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/add-product' element={<Add/>}/>
                <Route path='/list-products' element={<List/>}/>
                <Route path='/orders' element={<Orders/>}/>
                <Route path='/orders/:id' element={<OrderDetails/>}/>
                <Route path='/users' element={<Users/>}/>
                <Route path='/categories' element={<ListCategories/>}/>
                <Route path='/add-category' element={<AddCategory/>}/>
                <Route path='/pincode' element={<Pincode/>}/>
                <Route path='/coupon' element={<Coupon/>}/>
                <Route path='/banner' element={<Banner/>}/>
                <Route path='/settings' element={<Settings/>}/>
             </Routes>
        </div>
       </> }
    </div>
  )
}

export default App
