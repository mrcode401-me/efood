import React from 'react'
import './Settings.css'
import axios from 'axios'
import { useState } from 'react'
import { useContext } from 'react'
import {dataContext} from '../../context/AdminContext'
import {toast} from 'react-toastify'
import { useEffect } from 'react'

const Settings = () => {
    const [currency,setCurrency] = useState("")
    const [email,setEmail] = useState("")
    const [number,setNumber] = useState("")
    const {token,companyInfo} = useContext(dataContext)

    const setCurrencyHandler = async()=>{
      console.log("currency")
      console.log(currency)
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/admin/company-info/currency`,{currency},{headers:{adminToken:token}});
      if(response.data.success){
          toast.success(currency+" Currency")
      }else{
          toast.error(response.data.message)
      }
    }

    const makeChangesHandler = async()=>{
      //   const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/admin/company-info/currency`,{currency},{headers:{adminToken:token}});
      // if(response.data.success){
      //     toast.success(currency+" Currency")
      // }else{
      //     toast.error(response.data.message)
      // }
    }

    useEffect(()=>{
      console.log(companyInfo)
      if(companyInfo){
        setCurrency(companyInfo.currency)
        setNumber(companyInfo.number)
        setEmail(companyInfo.email)
      }
    },[companyInfo])

    

  return (
    <div className='add'>
        <h2>Settings</h2>

        <hr style={{margin:"30px 0"}}/>

        <div >
            <p>Admin Information</p>
            <div className="admin-info">
              <div>
                  <p>Username</p>
                  <input type="text" />
                  <button>Change Username</button>
              </div>
              <div>
                  <p>Password</p>
                  <input type="text" placeholder='create password'/>
                  <button>Change Password</button>
              </div>
              <div> 
                  <input style={{marginTop:"30px"}} type="text" placeholder='confirm password'/>
              </div>
            </div>
        </div>

        <hr style={{margin:"30px 0"}}/>

        <div >
            <p>Currency</p>
            <div className="currency-info">
              <div>
                  <select name="" id="" value={currency} onChange={(e)=>setCurrency(e.target.value)}>
                      <option value="" hidden>Choose Currency</option>
                      <option value="₹">INR (₹)</option>
                      <option value="€">EURO (€)</option>
                      <option value="﷼">SAR (﷼)</option>
                      <option value="£">POUND (£)</option>
                      <option value="$">USD ($)</option>
                  </select>
                  <button onClick={(e)=>setCurrencyHandler(e)}>Set Currency</button>
              </div>
              
            </div>
        </div>

        <hr style={{margin:"30px 0"}}/>

        <div >
            <p>Contact Details</p>
            <div className="contact-info">
              <div>
                    <p>Contact Number</p>
                    <input onChange={(e)=>setNumber(e.target.value)} value={number || ""} type="text" placeholder='+91 0000000000'/>
                    <button onChange={()=>makeChangesHandler}>Make Changes</button>
              </div>
              <div>
                    <p>Contact Email</p>
                    <input onChange={(e)=>setEmail(e.target.value)}  value={email || ""} type="text" placeholder='contact@company.com'/>
                    <button onChange={()=>makeChangesHandler}>Make Changes</button>
              </div>
            </div>
        </div>

        
        <hr style={{margin:"30px 0"}}/>

    </div>
  )
}

export default Settings