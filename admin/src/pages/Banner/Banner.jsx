import React, { useContext, useEffect, useState } from 'react'
import './Banner.css'
import axios from 'axios'
import { dataContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets'

const Pincode = () => {
  
    const {token,companyInfo} = useContext(dataContext)
    const [bannerList,setBannerList] = useState([])

  const [name,setName] = useState("")
  const [image,setImage] = useState(false)


  const btnSubmitHandler = async(e)=>{
      e.preventDefault();
    //   console.log(image)
    //   console.log(name)
    //   console.log(URL.createObjectURL(image))
    if(!!!image){
         toast("Add Image")
         return
    }

    if(String(name).length<3){
         toast("Set Banner Name")
         return
    }

    const form = new FormData()
    form.append("name",name),
    form.append("image",image)
    
    const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/banner/add`,form)
    console.log(response)
        if(response.data.success){
            toast(response.data.message)
            fetchBanner()
        }else{
            console.log(response.data.message)
        }

  }

  const fetchBanner = async()=>{
    const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/banner/get`,{})
    console.log(response)
    if(response.data.success){
        console.log(response.data.data)
        setBannerList(response.data.data)
    }else{
        console.log(response.data.message)
    }
  }

  const removeBanner = async(id)=>{
    const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/banner/remove`,{id})
    console.log(response)
    if(response.data.success){
        console.log(response.data.message)
        toast.success(response.data.message)
        fetchBanner()
    }else{
        console.log(response.data.message)
    }
  }

  useEffect(() => {
    fetchBanner()
  }, [])
  

  return (
    <div className="banner-container add">

        <form className='add-banner' onSubmit={btnSubmitHandler}>
                <div className="category-image">
                    <p style={{fontSize:"1.1rem"}}>Banner Image</p>
                    <label htmlFor="image">
                        <img style={{width:'180px'}} src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
                    </label>
                        <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden />
                </div>
                <div className="banner-name">
                    <p style={{fontSize:"1.1rem"}}>Banner Name</p>
                    <input onChange={(e)=>setName(e.target.value)} type="text" name='name' value={name} placeholder='Type Category Name' />
                </div>
              
                <button className='submitBtn' type='submit'>Add Banner</button>
        </form>

        <div className="banner-list-container">
                <div className="banner-list">
                    <div className='banner-table' style={{backgroundColor:"#f9f9f9"}}>
                          <p>SR</p>
                          <p>Banner Image</p>
                          <p>Banner Name</p>
                          <p>Action</p>
                    </div>
                    {bannerList.map((data,index)=>{
                        return <div key={"T"+index} className='banner-table' >
                          <p>{index+1}</p>
                          <p style={{height:"15vh"}}><img style={{height:"100%",width:"100%"}} src={`${import.meta.env.VITE_SERVER_URL}/images/banner_images/${data.image}`} alt="" /></p>
                          <p>{data.name}</p>
                          <p style={{cursor:'pointer'}} onClick={()=>removeBanner(data._id)}>x</p>
                    </div>
                    })}
                </div>
        </div>

    </div>
  )
}

export default Pincode