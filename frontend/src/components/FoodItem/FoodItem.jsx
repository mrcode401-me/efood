import React, { useContext, useState } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from "react-router";

const FoodItem = ({id,name,price,description,image}) => {

  const navigate = useNavigate()
  const {cartItem,addToCart,removeFromCart,currentCurrency} = useContext(StoreContext);

  return (
    <div className='food-item'>
        <div className="food-item-image-container">
          <img className='food-item-image' onClick={()=>navigate("/shop/"+name+"&"+id)} style={{cursor:"pointer"}} src={`${import.meta.env.VITE_SERVER_URL}/images/${image}`} alt="" />
         
        </div>
        <div className="food-item-info">
          <div className="food-item-name-rating">
              <p onClick={()=>navigate("/shop/"+name)} style={{cursor:"pointer"}} >{name}</p>
              <img src={assets.rating_starts} alt="" />
          </div>
          <p className="food-item-desc">
            {description}
          </p>
          <p className="food-item-price">{currentCurrency}{price}</p>
        </div>
    </div>
  )
}

export default FoodItem