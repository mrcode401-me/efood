import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets';
import axios  from 'axios'
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';

const LoginPopup = ({setShowLogin}) => {

    
    // console.log(import.meta.env.VITE_SERVER_URL)
    const {token,setToken} = useContext(StoreContext)
    const [currentState,setCurrentState] = useState("Sign up");
    const [data,setData] = useState({
        name:"",
        email:"",
        password:""
    })

    function onChangeHandler(elem){
        const name = elem.target.name;
        const value = elem.target.value;
        setData(data=>({...data,[name]:value}));
    }

    const restart=()=>{
        setData({ name:"", email:"", password:""})
    }

   async function onSubmitBtn (e){
        e.preventDefault();
        console.log(data)
        let response;
        if(currentState==="Sign up"){
            response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/user/register`,{name:data.name,email:data.email,password:data.password});
        }else{
             response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/user/login`,{email:data.email,password:data.password});
        }
        if(response.data.success){
            toast.success('Register Successfully')
            setToken(response.data.token);
            console.log("token set on login page");
            localStorage.setItem("token",response.data.token)
            setShowLogin(false)
        }else{
            toast.error(response.data.message)
        }
}

  return (
    <div className="login-popup">
        <form className="login-popup-container" onSubmit={onSubmitBtn}>
            <div className="login-popup-title">
                <h2>{currentState}</h2>
                <img style={{cursor:'pointer'}} onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {currentState==="Sign up"?<input onChange={(elem)=>onChangeHandler(elem)} name='name' value={data.name} type="text" placeholder='Your name' required />:<></>}
                <input onChange={(elem)=>onChangeHandler(elem)} name='email' value={data.email} type="email" placeholder='Your email' required/>
                <input onChange={(elem)=>onChangeHandler(elem)} name='password' value={data.password} type="password" placeholder='password' required />
            </div>
            <button type='submit'>{currentState==="Sign up"?"Create account":"Login account"}</button>
            {currentState==="Sign up"? <div className="login-popup-condition">
                <input type="checkbox" required />
                <p>By continuing, I agree to the terms of use & privacy policy.</p>
            </div>:""}
            {currentState==="Sign up"?<p>Already have an account? <span onClick={()=>{setCurrentState("Login");restart()}}>Login here</span></p>:
            <p>Create a new account? <span onClick={()=>{setCurrentState("Sign up");restart()}}>Click here</span></p>}
        </form>
    </div>
  )
}

export default LoginPopup
