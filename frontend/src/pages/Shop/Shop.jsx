import React, { useContext, useEffect, useState } from 'react'
import '../../components/FoodDisplay/FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../../components/FoodItem/FoodItem.jsx'
import { useParams } from 'react-router-dom'

const Shop = () => {
    const {food_list} = useContext(StoreContext)
    const [product_list,setProductList] = useState([])
    
      const params = useParams()
      console.log(Object.keys(params).length==0)

      console.log(food_list)
      console.log(product_list)


      useEffect(()=>{
          console.log(food_list)
          console.log(params)

          if(Object.keys(params).length==0){
              setProductList(food_list)
              return;
          }

          let searchProduct = [];
        if(params.query.split("&")[1].length > 0){
            searchProduct = food_list.filter((elem,index)=>{
            return elem.name.toLowerCase().includes(params.query.split("&")[1])
        })
            console.log("searchProduct")
            textResult.innerHTML = ""
            console.log(searchProduct)   
            setProductList(searchProduct)
        }
          
        if(searchProduct.length == 0){
          textResult.innerHTML = "Product Not Found"
            setProductList(food_list)
        }

        console.log(product_list)

      },[params.query,food_list])

    // useEffect(()=>{
    //   if(product_list.length >0){
    //         setProductQuery("All")
    //       }else{
    //         setProductQuery("SEARCH")
    //       }
    //       console.log(productQuery)
    // },[queryProduct]);

  return (
    <div className='food-display' id='food-display'>
              {<h2 id='textResult' className=''></h2>}
        <div className="food-display-list">
            {product_list.map((item,index)=>{
                return <FoodItem key={index} id={item._id} name={item.name} price={item.price} description={item.description} image={item.image} />
                })  }

        </div>
    </div>
  )
}

export default Shop