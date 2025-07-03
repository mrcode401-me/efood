import React, { useContext,useEffect } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
import { useState } from 'react';
import { assets } from '../../assets/assets';
import './MyOrder.css'
import { useNavigate } from 'react-router-dom';

const MyOrder = () => {

    const [orderData,setOrderData] = useState([])
    const {token,currentCurrency,fetchOrders} = useContext(StoreContext);
    const navigate = useNavigate()


  
    useEffect(() => {
        if(token){
            async function fetch() {
               const data = await fetchOrders()
               if(data.length > 0){
                    console.log(data)
                    setOrderData(data)
               }
            }
            fetch()
        }
    }, [token,fetchOrders])
    

  return (
    <div className="my-orders">
        <h2>My Orders</h2>
        <div className="container">
            {orderData.map((order,index)=>{
                return (
                    <div key={index} className='my-orders-order'>
                            <img src={assets.parcel_icon} alt="" />
                            <p>{order.items.map((item,ind)=>{
                                if(ind === order.items.length-1){
                                        return item.name +" x "+item.quantity
                                }else{
                                        return item.name +" x "+item.quantity+", "
                                }
                            })}</p>
                            <p className='amount'>{currentCurrency}{order.amount}</p>
                            <p>Items: {order.items.length}</p>
                            <p><span className={order.status==="Food Processing"?"red":"green"}>&#x25cf;</span> <b>{order.status}</b> </p>
                            <button onClick={()=>navigate("/my-order/"+order._id)}>Track Order</button>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default MyOrder