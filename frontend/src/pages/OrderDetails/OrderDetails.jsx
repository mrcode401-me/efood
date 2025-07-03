import React , {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'
import './OrderDetails.css'

const OrderDetails = () => {
    const params = useParams()
    console.log(params)

    
    const [orderData,setOrderData] = useState({})
    const {token,currentCurrency,fetchOrders} = useContext(StoreContext);
    const navigate = useNavigate()


  
    useEffect(() => {
        if(token){
            async function fetch() {
               const data = await fetchOrders()
               if(data.length > 0){
                    console.log(data)
                    const orderData = data.filter((item)=>{
                        return item._id === params.id
                    })
                    console.log(orderData)
                    if(orderData.length > 0){
                        console.log(orderData[0])
                        setOrderData(orderData[0])
                    }else{
                        console.log("object")
                    }
               }
            }
            fetch()
        }
    }, [token,fetchOrders])
    

  return (
    <div>
        {Object.keys(orderData).length > 0 ?    <div className="order-details shadowBox">
                {orderData.items.map((item, index) => {
                    return (
                    <div key={"i"+index} className="item">
                            <img onClick={()=>navigate('/shop/'+item.price+"&"+item._id)} src={`${import.meta.env.VITE_SERVER_URL}/images/${item.image}`} alt="" />
                            <div className="info">
                                <p className="product-name"  onClick={()=>navigate('/shop/'+item.price+"&"+item._id)} >{item.name}</p>
                                <p style={{color:"grey",marginBottom:"0.3rem"}}>{item.description}</p>
                                <p style={{color:"gray",marginBottom:"0.5rem"}}>{item.category}</p>
                                <p style={{fontSize:"1.1rem",fontWeight:"500"}}>{currentCurrency}{item.price}</p>
                            </div>
                            <div className='item-amount-container'>
                               <p> Total: {item.price * item.quantity}</p>
                               {orderData.status === "Food Processing" ?<p style={{color:"gray",marginBottom:"0.5rem"}}>{orderData.status}</p>:<p style={{color:"green",marginBottom:"0.5rem"}}>{orderData.status}</p>}
                               
                            </div>
                    </div>
                    );
                })}

        </div>
        :<div>
            Not Found    
        </div>}
    </div>
  )
}

export default OrderDetails