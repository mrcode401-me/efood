import React, { useEffect, useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useContext } from 'react'
import { dataContext } from '../../context/AdminContext'

const Add = () => {

    const {category_list,fetchCategories,companyInfo} = useContext(dataContext)
    const url = import.meta.env.VITE_SERVER_URL;
    console.log(url)

    const [showVariation,setShowVariation] = useState(false)

    const [image,setImage] = useState(false)
    const [image1,setImage1] = useState(false)
    const [image2,setImage2] = useState(false)
    const [image3,setImage3] = useState(false)
    const [image4,setImage4] = useState(false);
    const [variationData,setVariationData] = useState([])

    const [data,setData] = useState({
        name:"",
        description:"",
        price:"",
        category:"Salad"
    });

    const onChangeHandler = (elem)=>{
        const name = elem.target.name;
        const value = elem.target.value;
        setData(data=>({...data,[name]:value}))
    }

    const submitHandler = async(elem)=>{
        elem.preventDefault();

        const variations = [1, 2, 3, 4].map(i => {
        const name = document.getElementById(`variation-name-${i}`)?.value.trim();
        const price = document.getElementById(`variation-price-${i}`)?.value.trim();
        return name && price ? { name, price: Number(price) } : null;
        }).filter(Boolean);

        // console.log(variations)     

        const formData = new FormData()
        formData.append("name",data.name)
        formData.append("description",data.description)
        formData.append("category",data.category)
        formData.append("price",Number(data.price))
        formData.append("image",image)
        formData.append("image1",image1)
        formData.append("image2",image2)
        formData.append("image3",image3)
        formData.append("image4",image4);
        formData.append("variation",JSON.stringify(variations))

        
        

        const response  = await axios.post(`${url}/api/food/add`,formData)
        if(response.data.success){
            setData({
                name:"",
                description:"",
                price:"",
                category:"Salad"
            })
            
            setImage(false)
            setImage1(false)
            setImage2(false)
            setImage3(false)
            setImage4(false)

            console.log("Product Successfully added")
            toast.success(response.data.message)
        }
        else{
            console.log("An Error Occured")
            toast.error(response.data.message)
        }

    }

    useEffect(()=>{
        fetchCategories()
    },[])

  return (
    <div className="add" style={{paddingBottom:'40px'}}>
        <form className='flex-col' onSubmit={(e)=>{submitHandler(e)}}>
            
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
                    </label>
                    <input  required onChange={(e)=>{setImage(e.target.files[0]);}} type="file" id='image' hidden />
                </div>

                    <p>Upload Gallery Images</p>
                <div className="gallery-images">
                    
                     <div className="add-img-upload flex-col">
                        <label htmlFor="image1">
                            <img src={image1?URL.createObjectURL(image1):assets.upload_area} alt="" />
                        </label>
                        <input   onChange={(e)=>{setImage1(e.target.files[0]);}} type="file" id='image1' hidden />
                    </div>

                     <div className="add-img-upload flex-col">
                        <label htmlFor="image2">
                            <img src={image2?URL.createObjectURL(image2):assets.upload_area} alt="" />
                        </label>
                        <input   onChange={(e)=>{setImage2(e.target.files[0]);}} type="file" id='image2' hidden />
                    </div>

                     <div className="add-img-upload flex-col">
                        <label htmlFor="image3">
                            <img src={image3?URL.createObjectURL(image3):assets.upload_area} alt="" />
                        </label>
                        <input   onChange={(e)=>{setImage3(e.target.files[0]);}} type="file" id='image3' hidden />
                    </div>

                     <div className="add-img-upload flex-col">
                        <label htmlFor="image4">
                            <img src={image4?URL.createObjectURL(image4):assets.upload_area} alt="" />
                        </label>
                        <input   onChange={(e)=>{setImage4(e.target.files[0]);}} type="file" id='image4' hidden />
                    </div>

                </div>

            
            <div className="add-product-name flex-col">
                <p>Product Name</p>
                <input  required onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
            </div>
            <div className="add-product-description flex-col">
                <p>Product Description</p>
                <textarea  required onChange={onChangeHandler} value={data.description} name='description' rows='6' placeholder='Write content here'>  </textarea>
            </div>
            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Product Category</p>
                    <select  required onChange={onChangeHandler} name="category">
                        <option value="" hidden>Choose a Category</option>
                        {category_list.map((category,index)=>{
                           return <option key={index} value={category.name}>{category.name}</option>
                        })}
                    </select>
                </div>
                <div className="add-price">
                    <p>Product Price</p>
                    <input required onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder={`${companyInfo.currency}10`} />
                </div>
            </div>

            <div className="variation-container">
                <div className='variation-header'>
                      <p>Variations</p>
                        <span onClick={()=>setShowVariation((prev)=>!prev)}><img style={{cursor:"pointer"}} src={assets.add_icon} alt="" /></span>
                </div>

                {showVariation && <div className="variations">
                    <div className="variation">
                        <input type="text" id='variation-name-1' placeholder='Half Plate' />
                        <input type="Number" id='variation-price-1'  placeholder={`${companyInfo.currency}5`} />
                    </div>
                    <div className="variation">
                        <input type="text" id='variation-name-2' placeholder='Full Plate' />
                        <input type="Number" id='variation-price-2'  placeholder={`${companyInfo.currency}10`} />
                    </div>
                    <div className="variation">
                        <input type="text" id='variation-name-3' placeholder='Double Plate' />
                        <input type="Number" id='variation-price-3'  placeholder={`${companyInfo.currency}25`} />
                    </div>
                    <div className="variation">
                        <input type="text" id='variation-name-4' placeholder='Combo' />
                        <input type="Number" id='variation-price-4'  placeholder={`${companyInfo.currency}35`} />
                    </div>
                </div>}

            </div>

            <button type='submit' className='add-btn'>ADD</button>

        </form>
    </div>
  )
}

export default Add