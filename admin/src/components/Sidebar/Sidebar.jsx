import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const sideBar = () => {
  return (
    <div className="sidebar">
        <div className="sidebar-options">

            <NavLink to='/' className="sidebar-option">
                <img src={assets.home_icon} alt="" />
                <p>Home</p>
            </NavLink>

            <NavLink to='/banner' className="sidebar-option">
                <img src={assets.coupon_icon} alt="" />
                <p>Banner</p>
            </NavLink>

            <NavLink to='/add-product' className="sidebar-option">
                <img src={assets.add_icon} alt="" />
                <p>Add Product</p>
            </NavLink>
            <NavLink to='/list-products' className="sidebar-option">
                <img src={assets.product_icon} alt="" />
                <p>All Products</p>
            </NavLink>
            <NavLink to='/orders' className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>Orders</p>
            </NavLink>
            <NavLink to='/categories' className="sidebar-option">
                <img src={assets.category_icon} alt="" />
                <p>All Categories</p>
            </NavLink>
            <NavLink to='/add-category' className="sidebar-option">
                <img src={assets.add_icon} alt="" />
                <p>Add Category</p>
            </NavLink>
            <NavLink to='/pincode' className="sidebar-option">
                <img src={assets.pincode_icon} alt="" />
                <p>Pincode</p>
            </NavLink>
            <NavLink to='/wishlist' className="sidebar-option">
                <img src={assets.wishlist_icon} alt="" />
                <p>Wishlist</p>
            </NavLink>
            <NavLink to='/coupon' className="sidebar-option">
                <img src={assets.coupon_icon} alt="" />
                <p>Coupon</p>
            </NavLink>
            <NavLink to='/users' className="sidebar-option">
                <img src={assets.user_icon} alt="" />
                <p>Users</p>
            </NavLink>
            <NavLink to='/settings' className="sidebar-option">
                <img src={assets.settings_icon} alt="" />
                <p>Settings</p>
            </NavLink>

        </div>
    </div>
  )
}

export default sideBar
