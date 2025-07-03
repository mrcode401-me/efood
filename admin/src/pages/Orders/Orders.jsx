import React, { useEffect, useState } from 'react'
import './Orders.css'
import axios from 'axios'
import {assets} from '../../assets/assets.js'
import { useContext } from 'react'
import { dataContext } from '../../context/AdminContext.jsx'
import { useNavigate } from 'react-router-dom'


const Orders = () => {
  
  const [listOrders,setListOrders] = useState([])
  const {companyInfo,fetchOrders} = useContext(dataContext)
  const navigate = useNavigate()

  // const fetchOrders = async()=>{
  //   try{
  //       const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/order/list`)
  //           if(response.data.success){
  //               setListOrders(response.data.data);
  //               console.log(response.data.data)
  //           }else{
  //             console.log(response.data.message)
  //           }
  //   }catch(error){
  //         console.log(error)
  //   }
   
  // }

 async function updateStatus(elem,orderId){
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/order/status`,{orderId:orderId,status:elem.target.value})
      if(response.data.success){
          await fetchOrders()
      }
  }


  useEffect(()=>{
     async function data (){
      // console.log("object")
        const a = await fetchOrders();
        if(a.length > 0){
          setListOrders(a);
          console.log(a)
        }
     }
     data()
  },[])

  return (
    <div className="order add">
        <h3>Order Page</h3>
        <div className="order-list">
          {listOrders.map((order,index)=>{
             return <div key={index} className="order-item">
                  <img src={assets.parcel_icon} alt=""  style={{cursor:"pointer"}} onClick={()=>navigate("/orders/"+order._id)} />
                  <div>
                    <p className="order-item-food" style={{cursor:"pointer"}} onClick={()=>navigate("/orders/"+order._id)}>
                        {order.items.map((item,ind)=>{
                          if(ind===order.items.length -1){
                            return item.name +" x "+item.quantity
                          }
                          else{
                            return item.name +" x "+item.quantity +", "
                          }
                        })}
                    </p>
                    <p className="order-item-name">
                      {order.address.firstname+" "+order.address.lastname}
                    </p>
                    <div className="order-item-address">
                        <p>{order.address.street +", "}</p>
                        <p>{order.address.city +", "+order.address.state+", "+order.address.country+", "+order.address.zipcode}</p>
                    </div>
                    <p className="order-item-phone">{order.address.phone}</p>
                  </div>
                  <p>Items : {order.items.length}</p>
                  <p>{companyInfo.currency}{order.amount}</p>
                  <select onChange={(elem)=>{updateStatus(elem,order._id)}} value={order.status}>
                    <option value="Food Processing">Food Processing</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
              </div>
          })}
        </div>
    </div>
  )
}

export default Orders