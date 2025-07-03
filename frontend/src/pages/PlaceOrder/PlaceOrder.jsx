import React, { useContext, useState,useEffect } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import {useNavigate} from 'react-router-dom'

const PlaceOrder = () => {

  const navigate = useNavigate();

  const {getTotalCartAmount,food_list,token,cartItem,setCartItem,findPincode,currentPincode,currentCurrency} = useContext(StoreContext)

  const [charge,setCharge] = useState(0)

  const [addressData,setAddressData] = useState({
    firstname:"",
    lastname:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  });
   useEffect(() => {
         async function a (){
            if(getTotalCartAmount !== 0){
               const p = await findPincode(Number(currentPincode))
               console.log("p")
               console.log(p)
               setCharge(p.deliveryCharge)
           }
          }
          a()
     }, [currentPincode])

  function onChangeHandler (e){
      setAddressData(data=>({...data,[e.target.name]:e.target.value}));
  }

  async function placeOrder(e){
    e.preventDefault();
    console.log(addressData) 
    let orderItems = [];
    food_list.map((item)=>{
        if(cartItem[item._id]){
            let itemInfo = item;
            itemInfo["quantity"] = cartItem[item._id];
            orderItems.push(itemInfo)
        }
    })
    console.log(orderItems)

    let orderData = {
        address:addressData,
        items:orderItems,
        amount:getTotalCartAmount()+20,
    }

    let response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/order/place-order`,orderData,{headers:{token}});
    if(response.data.success){
          toast.success(response.data.message)
          const response3 = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/cart/clear`,{},{headers:{token}});
          if(response3.data.success){
            setCartItem({})
            navigate("/")
          }
    }

    else{
      toast.error(response.data.message)
    }

  }

  return (
    <form className='place-order' onSubmit={placeOrder}>

        <div className="place-order-left">
            <p className="title">Delivery Information</p>

            <div className="multi-fields">
                <input required type="text" onChange={onChangeHandler} name="firstname" value={addressData.firstname} placeholder='First name' />
                <input required type="text" onChange={onChangeHandler} name="lastname" value={addressData.lastname} placeholder='Last name' />
            </div>
            <input required type="email" onChange={onChangeHandler} name="email" value={addressData.email} placeholder='Email address' />
            <input  requiredtype="text" onChange={onChangeHandler} name="street" value={addressData.street} placeholder='Street' />
            <div className="multi-fields">
                <input required type="text" onChange={onChangeHandler} name="city" value={addressData.city} placeholder='City' />
                <input required type="text" onChange={onChangeHandler} name="state" value={addressData.state} placeholder='State' />
            </div>
            <div className="multi-fields">
                <input required type="text" onChange={onChangeHandler} name="zipcode" value={addressData.zipcode} placeholder='Zip code' />
                <input required type="text" onChange={onChangeHandler} name="country" value={addressData.country} placeholder='Country' />
            </div>
            <input required type="text" onChange={onChangeHandler} name="phone" value={addressData.phone} placeholder='Phone'/>

        </div>

        <div className="place-order-right">

              <div className="cart-total">
                <h2>Cart Total</h2>

                <div>
                    <div className="cart-total-details">
                      <p>Subtotal</p>
                      <p>{currentCurrency}{getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className="cart-total-details">
                      <p>Delivery Fee</p>
                      <p>{typeof charge === 'number'?(getTotalCartAmount()===0?0:`${currentCurrency}`+charge):charge}</p>
                    </div>
                    <hr />
                    <div className="cart-total-details">
                      <b>Total</b>
                     <b>{currentCurrency}{getTotalCartAmount()===0?0:getTotalCartAmount()+(typeof charge === 'number'?charge:0)}</b>
                    </div>
                </div>
                <button type='submit'>PROCEED TO CHECKOUT</button>
              </div>
            
        </div>

    </form>
  )
}

export default PlaceOrder