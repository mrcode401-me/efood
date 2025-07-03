import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

const Cart = ({setShowLogin}) => {
  const { cartItem, food_list, removeFromCart,addToCart,totalRemoveFromCart,getTotalCartAmount,token,currentPincode,findPincode,currentCurrency } = useContext(StoreContext);
  const [charge,setCharge] = useState(0);
  const navigate = useNavigate();
  console.log(Object.keys(cartItem).length)
  console.log(cartItem)
  // console.log(currentPincode)
  const notify = () => toast("Cart is empty")
  // console.log(charge?"SS":"Not");
  useEffect(() => {
      async function a (){
         if(getTotalCartAmount !== 0){
            const p = await findPincode(Number(currentPincode))
            console.log("p")
            console.log(p)
            setCharge(p.deliveryCharge)
        }
       }
       a()
  }, [currentPincode])
  
  
  return (
    <div className="cart">
      <div className="shadowBox cart-items">
        {food_list.map((item, index) => {
          if (cartItem[item._id] > 0) {
            return (
              <div key={"i"+index} className="items">
                <div className="item-details">
                      <img onClick={()=>navigate('/shop/'+item.price+"&"+item._id)} src={`${import.meta.env.VITE_SERVER_URL}/images/${item.image}`} alt="" />
                      <div className="info">
                          <p className="product-name"  onClick={()=>navigate('/shop/'+item.price+"&"+item._id)} >{item.name}</p>
                          <p style={{color:"grey",marginBottom:"0.3rem"}}>{item.description}</p>
                          <p style={{color:"gray",marginBottom:"0.5rem"}}>{item.category}</p>
                          <p style={{fontSize:"1.1rem",fontWeight:"500"}}>{currentCurrency}{item.price}</p>
                      </div>
                      <div style={{display:"flex",fontSize:"1.1rem",marginTop:"1rem"}}>
                        Total: <p>{currentCurrency}{item.price * cartItem[item._id]}</p>
                      </div>
                </div>

                <div className="item-options">
                  <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
                        <p  onClick={() => removeFromCart(item._id)} className="circle-box">-</p>
                        <p className="qty-box">{cartItem[item._id]}</p>
                        <p onClick={()=>addToCart(item._id)} className="circle-box">+</p>
                  </div>
                  <p style={{cursor:"pointer"}} onClick={() => totalRemoveFromCart(item._id)} className="cross">
                    REMOVE
                  </p>
                </div>
              </div>
            );
          }
        })}
      </div>

      <div className="cart-bottom">
          
          
          {/* Promo code section */}
          <div className="cart-promocode shadowBox">
              <div>
                  <p>If you have a promo code, Enter it here</p>
                  <div className="cart-promocode-input">
                      <input type="text" placeholder="promo code" />
                      <button>Submit</button>  
                  </div>
              </div>
          </div>
          {/* cart options */}
          <div className="cart-total shadowBox">
            <h2>Cart Total</h2>

            <div>
                <div className="cart-total-details">
                  <p>Subtotal</p>
                  <p>{currentCurrency}{getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <p>Delivery Fee</p>
                  <p>{typeof charge === 'number'?(getTotalCartAmount()===0?0:`${currentCurrency}`+charge):charge}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <b>Total</b>
                  <b>{currentCurrency}{getTotalCartAmount()===0?0:getTotalCartAmount()+(typeof charge === 'number'?charge:0)}</b>
                </div>
            </div>
            {
              charge ? 
            <button onClick={()=>{token?Object.keys(cartItem).length>0?navigate("/order"):alert("Add some products"):setShowLogin(true)}}>PROCEED TO CHECKOUT</button>
            : <p style={{fontSize:"2.2rem"}}>Currently Unavailable</p>
            }

          </div>


      </div>
    </div>
  );
};

export default Cart;
