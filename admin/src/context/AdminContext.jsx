import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';


export const dataContext = createContext()

const AdminContext = ({children}) => {

    const[token,setToken] = useState("");
    const [category_list,setCategores] = useState([])
    const [companyInfo,setCompanyInfo] = useState({})


    const fetchCategories = async()=>{
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/admin/category/list`,{},{headers:{adminToken:localStorage.getItem("token")}});
            if(response.data.success){
                setCategores(response.data.data);
                // console.log(response.data.data)
            }
            else{
                console.log(response.data.message);
             }
        }

         const fetchCompanyInfo = async()=>{
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/admin/company-info/get`,{})
            if(response.data.success){
                // console.log(response.data.data.currency)
                setCompanyInfo(response.data.data)
            }
            else{
                console.log(response.data.message);
             }
        }

          const fetchOrders = async()=>{
            try{
                const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/order/list`)
                    if(response.data.success){
                        // console.log(response.data.data)
                        return (response.data.data);
                    }else{
                    console.log(response.data.message)
                    }
            }catch(error){
                console.log(error)
            }
        
        }

        
        const fetchProductList = async ()=>{
            const response = await axios.get(`${import.meta.env}/api/food/list`);
            if(response.data.success){
                return(response.data.data)
            }else{
                console.log("Products list are empty")
            }
        }


    const contextData = {
        token,
        setToken,
        category_list,
        fetchCategories,
        companyInfo,
        fetchOrders,
        fetchProductList
    }


    useEffect(()=>{
        fetchCompanyInfo()
        if(token===""){
            setToken(localStorage.getItem("token"))
        }
        fetchCategories()
    },[])

  return (
    <dataContext.Provider value={contextData}>
        {children}
    </dataContext.Provider>
  )
}

export default AdminContext