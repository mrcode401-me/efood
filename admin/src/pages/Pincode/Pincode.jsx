import React, { useContext, useEffect, useState } from 'react'
import './Pincode.css'
import axios from 'axios'
import { dataContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'

const Pincode = () => {
  
    const {token,companyInfo} = useContext(dataContext)

    const [pincodeList,setPincodeList] = useState([])
  const [form,setForm] = useState({pincode:Number,deliveryCharge:Number,deliveryDuration:Number})

  const onChangeHandler = (e)=>{
      setForm({...form,[e.target.name]:e.target.value})
  }

  const btnSubmitHandler = async(e)=>{
      e.preventDefault();
      console.log(form)
        const response =  await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/admin/pincode/add-pincode`,form,{headers:{adminToken:token}});
        if(response.data.success){
            toast(response.data.message)
            fetchPincodeList()
            setForm({pincode:Number,deliveryCharge:Number,deliveryDuration:Number})
        }else{
            toast(response.data.message)
        }
  }

  const fetchPincodeList = async()=>{
        const response =  await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/admin/pincode/get-pincode`,{},{headers:{adminToken:token}});

        if(response.data.success){
            setPincodeList(response.data.data)
        }else{
            toast(response.data.message)
        }
  }

  const removePincode = async(id)=>{
        const response =  await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/admin/pincode/remove`,{id:id},{headers:{adminToken:token}});

        if(response.data.success){
            toast(response.data.message)
            fetchPincodeList()
        }else{
            toast(response.data.message)
        }
  }
  useEffect(() => {
        fetchPincodeList()
  }, [])
  

  return (
    <div className="pincode-container add">

        <div className="add-pincode">
            <form onSubmit={(e)=>btnSubmitHandler(e)}>
                <div className='inputs'>
                    <p>Pincode</p>
                    <input onChange={onChangeHandler} required  type="number" name='pincode' value={form.pincode} placeholder='Type Pincode'/>
                </div>
                <div className='inputs'>
                    <p>Delivery Charge</p>
                    <input onChange={onChangeHandler} required type="number" name='deliveryCharge' value={form.deliveryCharge} placeholder='Type Delivery Charge' />
                </div>
                <div className='inputs'>
                    <p>Delivery Duration</p>
                    <input onChange={onChangeHandler} required type="number" name='deliveryDuration' value={form.deliveryDuration} placeholder='Type Delivery Duration' />
                </div>
                <button type="submit">Add Pincode</button>
            </form>
        </div>

        <div className="pincodes-list">
                <div className="pincode-list-container">
                    <div className='pincode-table' style={{backgroundColor:"#f9f9f9"}}>
                          <p>SR</p>
                          <p>Pincode</p>
                          <p>Delivery Charge</p>
                          <p>Delivery Duration</p>
                          <p>Action</p>
                    </div>
                    {pincodeList.map((data,index)=>{
                        return <div key={"T"+index} className='pincode-table' >
                          <p>{index+1}</p>
                          <p>{data.pincode}</p>
                          <p>{companyInfo.currency}{data.deliveryCharge}/-</p>
                          <p>{data.deliveryDuration}</p>
                          <p style={{cursor:'pointer'}} onClick={()=>removePincode(data._id)}>x</p>
                    </div>
                    })}
                </div>
        </div>

    </div>
  )
}

export default Pincode