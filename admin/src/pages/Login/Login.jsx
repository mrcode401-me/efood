import React, { useContext, useState } from 'react'
import './Login.css'
import axios from 'axios';
import {toast } from 'react-toastify';
import { dataContext } from '../../context/AdminContext';

const Login = () => {

    const [form,setForm] = useState({username:"",password:""});
    const {setToken} = useContext(dataContext)

    const handleChange = (elm)=>{
        setForm({...form,[elm.target.name]:elm.target.value})
    }
   async function handleFormSubmit (e){
        e.preventDefault()
        // console.log(form)   
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/admin/login`,form)
        if(response.data.success){
            toast.success(response.data.message)
            setToken(response.data.adminToken)
            localStorage.setItem("token",response.data.adminToken)
            setForm({username:"",password:""})
        }else{
            toast(response.data.message)
        }
    }

  return (
    <div className="login-page">
        <form className='login-form' onSubmit={handleFormSubmit}>
            <h1>Food Order Admin</h1>
            <div className='login-inputs'>
                <h4>Username</h4>
                <input type="text" onChange={handleChange} name="username" value={form.username} placeholder='admin*'  />
            </div>
            <div className='login-inputs'>
                <h4>Password</h4>
                <input type="text" onChange={handleChange} name="password" value={form.password} placeholder='password*' />
            </div>
            <button type='submit'>Login</button>
        </form>
    </div>
  )
}

export default Login