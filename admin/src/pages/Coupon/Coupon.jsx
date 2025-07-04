import React, { useContext, useEffect, useState } from 'react'
import './Coupon.css'
import axios from 'axios'
import { dataContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'

const Coupon = () => {
  
    const {token} = useContext(dataContext)

    const [pincodeList,setPincodeList] = useState([])
  const [form,setForm] = useState({pincode:'',deliveryCharge:'',deliveryDuration:Number})

  const onChangeHandler = (e)=>{
      setForm({...form,[e.target.name]:e.target.value})
  }

  const btnSubmitHandler = async(e)=>{
      e.preventDefault();
     
  }

  const fetchPincodeList = async()=>{
      
  }

  const removePincode = async(id)=>{
       
  }
  useEffect(() => {
        fetchPincodeList()
  }, [])
  

  return (
    <div className="coupon-container add">

        <div className="add-coupon">
            <form onSubmit={(e)=>btnSubmitHandler(e)}>
                <div className='inputs'>
                    <p>Coupon Name</p>
                    <input onChange={onChangeHandler} required  type="number" name='pincode' value={form.pincode} placeholder='Type Coupon Name'/>
                </div>
                <div className='inputs'>
                    <p>Coupon Code</p>
                    <input onChange={onChangeHandler} required type="number" name='deliveryCharge' value={form.deliveryCharge} placeholder='Type Coupon Code' />
                </div>
                <div className='inputs'>
                    <p>Coupon Amount</p>
                    <input onChange={onChangeHandler} required type="number" name='deliveryDuration' value={form.deliveryDuration} placeholder='Type Coupon Amount' />
                </div>
                <button type="submit">Add Pincode</button>
            </form>
        </div>

        <div className="coupons-list">
                <div className="coupon-list-container">
                    <div className='coupon-table' style={{backgroundColor:"#f9f9f9"}}>
                          <p>SR</p>
                          <p>Coupon Name</p>
                          <p>Coupon Code</p>
                          <p>Coupon Amount</p>
                          <p>Action</p>
                    </div>
                     <div className='coupon-table' >
                          <p>1.</p>
                          <p>cc</p>
                          <p>cc</p>
                          <p>cc</p>
                          <p style={{cursor:'pointer'}} onClick={()=>removePincode(data._id)}>x</p>
                    </div>
                </div>
        </div>

    </div>
  )
}

export default Coupon