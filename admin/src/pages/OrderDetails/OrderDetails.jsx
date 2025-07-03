import React , {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import { dataContext } from '../../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import './OrderDetails.css'
import axios from 'axios'


const OrderDetails = () => {
    const params = useParams()
    console.log(params)

    
    const [orderData,setOrderData] = useState({})
    const {token,companyInfo,fetchOrders} = useContext(dataContext);
    const navigate = useNavigate()


    
 async function updateStatus(elem,orderId){
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/order/status`,{orderId:orderId,status:elem.target.value})
      if(response.data.success){
            window.location.reload();
      }
  }
  
    useEffect(() => {
        if(token){
            async function fetch() {
               const data = await fetchOrders()
               if(data.length > 0){
                    const orderData = data.filter((item)=>{
                        return item._id === params.id
                    })
                    console.log(orderData)
                    if(orderData.length > 0){
                        setOrderData(orderData[0])
                    }else{
                       return
                    }
               }
            }
            fetch()
        }
    }, [token,fetchOrders,])
    

  return (
    <div style={{width:"80%"}}>
        {Object.keys(orderData).length > 0 ?    <div className="order-details shadowBox">
                {orderData.items.map((item, index) => {
                    return (
                    <div key={"i"+index} className="item">
                            <img onClick={()=>navigate('/shop/'+item.price+"&"+item._id)} src={`${import.meta.env.VITE_SERVER_URL}/images/${item.image}`} alt="" />
                            <div className="info">
                                <p className="product-name"  onClick={()=>navigate('/shop/'+item.price+"&"+item._id)} >{item.name}</p>
                                <p style={{color:"grey",marginBottom:"0.3rem"}}>{item.description}</p>
                                <p style={{color:"gray",marginBottom:"0.5rem"}}>{item.category}</p>
                                <p style={{fontSize:"1.1rem",fontWeight:"500"}}>{companyInfo.currency}{item.price}</p>
                            </div>
                            <div className='item-amount-container'>
                               <p> Total: {item.price * item.quantity}</p>
                                <select className='status-options' onChange={(elem)=>{updateStatus(elem,orderData._id)}} value={orderData.status}>
                                    <option value="Food Processing">Food Processing</option>
                                    <option value="Out for delivery">Out for delivery</option>
                                    <option value="Delivered">Delivered</option>
                                </select>
                               
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