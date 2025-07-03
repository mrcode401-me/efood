import React from 'react'
import './ExploreMenu.css'
import {StoreContext} from '../../context/StoreContext.jsx'
import { useContext } from 'react'

const ExploreMenu = ({category,setCategory}) => {
  const {category_list} = useContext(StoreContext)
  // console.log(category_list)
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore our menu</h1>
        <p className='explore-menu-text'>Choose from a diverse menu featuring a delectable array , Order the food and get ready for the fight to life and enjoy your life</p> 
        <div className="explore-menu-list">
            {
                category_list.map((item,index)=>{
                    return <div onClick={()=>setCategory(savedName=>savedName===item.name?"All":item.name)} key={`list-item${index}`} className="explore-menu-list-item">
                                <img className={category===item.name?"active":""} src={`${import.meta.env.VITE_SERVER_URL}/images/category_images/${item.image}`} alt="" />
                                <p>{item.name}</p>
                    </div>
                })
            }
        </div>
        <hr />
    </div>
  )
}

export default ExploreMenu