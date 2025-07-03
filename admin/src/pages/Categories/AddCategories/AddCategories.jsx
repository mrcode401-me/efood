import React from 'react'
import './AddCategories.css'
import { assets } from '../../../assets/assets'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const AddCategories = () => {

  const [form,setForm] = useState({name:"",description:""})
  const [image,setImage] = useState(false)


  function onChangeHandler (e){
      setForm(prev=>({...prev,[e.target.name]:e.target.value}))
  }

  async function onSubmitHandler (e){
    e.preventDefault();
    console.log(form)
    console.log(image)
    const formData = new FormData();
    formData.append("name",form.name);
    formData.append("description",form.description);
    formData.append("image",image);
    const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/admin/category/add`,formData);
    if(response.data.success){
        setForm({name:"",description:""})
        setImage(false)
        console.log("Product SuccessFully Added")
        toast.success(response.data.message)
    }else{
          console.log("An Error Occured")
          toast.error(response.data.message)
    }
  }

  return (
    <div className="add-category add">
        <form className='add-category-from flex-col' onSubmit={onSubmitHandler}>
            <div className="category-image">
                <p>Upload Image</p>
                <label htmlFor="image">
                    <img style={{width:'120px'}} src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
                </label>
                    <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden />
            </div>
            <div className="category-name category-inputs flex-col">
                <p>Category Name</p>
                <input onChange={onChangeHandler} type="text" name='name' value={form.name} placeholder='Type Category Name' />
            </div>
            <div className="category-desc category-inputs flex-col">
                <p>Category Description</p>
                <input onChange={onChangeHandler} type="text" name='description' value={form.description} placeholder='Type Category Description' />
            </div>
            <button type='submit'>Add Category</button>
        </form>
    </div>
  )
}

export default AddCategories