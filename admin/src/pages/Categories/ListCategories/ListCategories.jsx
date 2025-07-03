import React from 'react'
import './ListCategories.css'
import { useState } from 'react'
import axios, { formToJSON } from 'axios'
import { useContext } from 'react'
import { dataContext } from '../../../context/AdminContext'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

const ListCategories = () => {

  const [categories,setCategories] = useState([])
  const {token} = useContext(dataContext)

  const fetchCategories = async(req,res)=>{
    const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/admin/category/list`,{},{headers:{adminToken:token}})
    if(response.data.success){
        setCategories(response.data.data)
        console.log(response.data.data)
    }else{
      toast(response.data.message)
    }
  }

  const removeCategoryHandler = async(id)=>{
    const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/admin/category/remove`,{id},{headers:{adminToken:token}})
    if(response.data.success){
      toast(response.data.message)
      fetchCategories()
    }else{
      toast(response.data.message)
    }
  }

  useEffect(()=>{
      fetchCategories()
  },[])

  return (
    <div className="add flex-col">
        <p>Categories list</p>
        <div>
          <div className="table title" style={{textAlign:"center"}} >
                <b>SR</b>
                <b>Image</b>
                <b>Name</b>
                <b>Description</b>
                <b>Action</b>
          </div>
          {categories.map((category,index)=>{
               return  <div key={index} className='table' style={{textAlign:"center"}}> 
                      <p>{index+1}</p>
                      <div id='category-image' >
                          <img src={`${import.meta.env.VITE_SERVER_URL}/images/category_images/`+category.image} alt="" />
                      </div>
                      <p>{category.name}</p>
                      <p>{category.description}</p>
                      <p className='cursor' onClick={()=>removeCategoryHandler(category._id)}>X</p>
                  </div> 
          })}
        </div>
    </div>
  )
}

export default ListCategories