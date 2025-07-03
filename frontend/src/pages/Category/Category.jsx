import React, { useContext, useState, useEffect } from 'react'
import './Category.css'
import { useNavigate, useParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../../components/FoodItem/FoodItem'
import { assets } from '../../assets/assets'

const Category = () => {

  const {food_list,category_list} = useContext(StoreContext)
  const [product_list,setProductList] = useState([])
  const [current_category,setCurrentCategory] = useState({image:""})
  const [showVariation,setShowVariation] = useState(false)

    const navigate = useNavigate()
    const params = useParams()
    const category_name = params.category.replace("%"," ");
    // console.log(category_name)
    

    useEffect(() => {
        const newList = food_list.filter((eln,index)=>{
            return eln.category == category_name
        });
        
        const currentCategory = category_list.filter((e,index)=>{
            return e.name == category_name
        });
        console.log(currentCategory)
        if(currentCategory[0]){
          setCurrentCategory(currentCategory[0])
        }
        if(newList){
          setProductList(newList) 
        }
    }, [category_list,food_list])
    
  return (
    <div className="category-container">
      
        <div className='left'>
            <div className="offer-details">
                <img style={{padding:'15px',height:"23vh"}} src={`${import.meta.env.VITE_SERVER_URL}/images/category_images/${current_category.image}`} alt="" />
                <div style={{backgroundColor:"white",width:'100%',textAlign:'start',padding:"10px 10px"}}>
                    <p >Buy One Get One Free</p>
                    <span>Under 590 + Extra 15% </span>
                </div>
            </div>
            <div className='filters'>
                <p style={{width:"100%", padding:"10px 0",fontSize:"1.5rem"}}>Filters</p>
                <hr style={{background:"white"}}/>
                <div className='box'>

                    <div className='head'>
                      <p>Variations</p>
                      <div className='pointer' onClick={()=>setShowVariation(!showVariation)}><img width={'12'} src={showVariation?assets.up_arrow:assets.down_arrow} alt="" /></div>
                    </div>

                    {showVariation && <div style={{display:"flex",flexDirection:"column"}}>
                            <div >
                              <input type="checkbox" className="pointer" style={{marginRight:"5px"}} /> Half Plate
                            </div>
                            <div>
                              <input type="checkbox" className="pointer" style={{marginRight:"5px"}} id=""/> Full Plate
                            </div>
                    </div>}

                </div>
            </div>
        </div>

        <div className='right'>
           <div style={{color:"#635555"}} >
              <p style={{marginBottom:"10px"}}><span onClick={()=>navigate("/")}  className='pointer'>Home</span> / <span onClick={()=>navigate(`/category/${current_category.name}`)}  className='pointer'> {current_category.name} </span> </p>
              <p style={{fontSize:"0.9rem",color:"#757575"}}>{current_category.description}</p>
              <div className='filter-box'>
                  <p>{current_category.name} <span style={{fontSize:"0.95rem",color:"gray"}}>(Showing 144 products)</span></p>
                  <select name="" id="">
                      <option value="">Popularity</option>
                      <option value="">Low to High</option>
                      <option value="">High to Low</option>
                      <option value="">Newest First</option>
                  </select>
              </div>
           </div>
           <div className="products-lists">
               {product_list.map((item,index)=>{
                  return <FoodItem key={index} id={item._id} name={item.name} price={item.price} description={item.description} image={item.image} />
                })}
           </div>
        </div>

    </div>
  )
}

export default Category