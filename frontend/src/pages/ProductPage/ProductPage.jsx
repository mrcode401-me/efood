import React, { useContext, useEffect, useRef, useState } from "react";
import "./ProductPage.css";
import { useParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import SuggestProduct from "../../components/SuggestProduct/SuggestProduct";

const ProductPage = ({}) => {
  const navigate = useNavigate();

  const pincodeAreaRef = useRef(null);
  const ProductImg = useRef(null)
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [showBtn,setShowBtn] = useState(true)

  const [heartIcon, setHeartIcon] = useState("#c8c8c8");
  
  const {  food_list,  pincodeList, findPincode, currentPincode,
          setCurrentPincode, addToCart,removeFromCart, currentCurrency,  cartItem} = useContext(StoreContext);

  const [product, setProduct] = useState({});
  const [pincode, setPincode] = useState(Number);
  const [canAdd, setCanAdd] = useState(false);
  let pi = "";
  const [refReady, setRefReady] = useState(false);

  const [showDesc, setShowDesc] = useState(false);
  // const [deliveryPincodes,setDeliveryPincodes] = useState([])

  const params = useParams();
  const productId = params.product.split("&")[1];
  // console.log(pincodeList)

  const checkPincode = async () => {
    pincodeAreaRef.current.style.animation = "none";
    console.log(pincode);
    console.log(String(pincode).length);

    if (String(pincode).length != 6) {
      console.log(String(pincode).length);
      delivery_message.style.color = "darkred";
      delivery_message.innerHTML = `<span style={{color:"red"}}>Pincode is not valid</span>`;
      return;
    }
    const x = findPincode(Number(pincode));
    localStorage.setItem("pincode", x.pincode);
    setCurrentPincode(x.pincode);
    console.log(x);
    console.log("deliveryPincodes");

    // console.log(deliveryPincodes)
    console.log(pincode);
    const d = new Date();
    const daysInWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const MonthsInYear = [
      "Jan",
      "Feb",
      "Mar",
      "April",
      "May",
      "June",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    if (x) {
      delivery_message.style.display = "flex";
      delivery_message.style.gap = `8px`;
      if (
        x.deliveryDuration === "Same Day Delivery" ||
        x.deliveryDuration === "Tomorrow Delivery"
      ) {
        delivery_message.innerHTML = ` Delivery by <p style={{color:"rgb(50 198 57)"}}>${x.deliveryDuration}</p>`;
      } else {
        delivery_message.innerHTML = ` Delivery by <p style={{color:"rgb(50 198 57)"}}>${
          d.getDate() + x.deliveryDuration
        } ${MonthsInYear[d.getMonth()]}, ${
          daysInWeek[(d.getDay() + x.deliveryDuration) % 7]
        }</p>`;
      }
      setShowBtn(true)
      setCanAdd(true);
    } 
    
    else {
      localStorage.setItem("pincode", pincode);
      delivery_message.style.color = "#b20808";
      delivery_message.innerHTML = `<span style={{color:"red"}}>Delivery is not available at ${pincode}</span>`;
      setShowBtn(false)
    }

  };

  const addToCartFunc = () => {
    console.log("object");
    if (canAdd) {
      addToCart(product._id);
    } else {
      console.log("pincodeAreaRef");
      pincodeAreaRef.current.style.animation =
        "swing 0.3s ease-in-out infinite";
    }
  };

  const buyNowFunc = () => {

    if (canAdd) {
      addToCart(product._id);
      navigate("/cart")
    } else {
      console.log("pincodeAreaRef");
      pincodeAreaRef.current.style.animation =
        "swing 0.3s ease-in-out infinite";
    }

  };

  useEffect(() => {
    const p1 = food_list.filter((pro) => {
      return pro._id === productId;
    });
    if(p1[0]){
      setProduct(p1[0]);  
      if(p1[0].variation.length != 0){
        setSelectedVariation(0)
      }
    }
  }, [food_list]);

  useEffect(() => {
    if (currentPincode) {
      setPincode(currentPincode);
      // checkPincode();
    }
  }, [currentPincode]);

  //   useEffect(() => {
  //   if (pincodeRef.current) {
  //     setRefReady(true);
  //     console.log("true")
  //   }
  // }, [pincode]);

  return (
    <div className="product-page-container">
      {Object.keys(product).length != 0 ? (
        <>
          {" "}
          <p id="product-slug">
            <span onClick={() => navigate("/")}>Home</span> /{" "}
            <span onClick={() => navigate(`/category/${product.category}`)}>
              {product.category}
            </span>{" "}
            / <span>{product.name}</span>
          </p>
          <div className="product-container">
            <div id="product-page-left">
              <div className="product-image-options">
              {
                product.galleyImage.length !=0 &&  <>
                    <img
                      onClick={()=>ProductImg.current.src = `${import.meta.env.VITE_SERVER_URL}/images/${
                        product.galleyImage[0]
                      }` }
                      src={`${import.meta.env.VITE_SERVER_URL}/images/${
                        product.galleyImage[0]
                      }`}
                      alt=""
                    />
                    <img
                      onClick={()=>ProductImg.current.src = `${import.meta.env.VITE_SERVER_URL}/images/${
                        product.galleyImage[1]
                      }` }
                      src={`${import.meta.env.VITE_SERVER_URL}/images/${
                        product.galleyImage[1]
                      }`}
                      alt=""
                    />
                    <img
                      onClick={()=>ProductImg.current.src = `${import.meta.env.VITE_SERVER_URL}/images/${
                        product.galleyImage[2]
                      }` }
                      src={`${import.meta.env.VITE_SERVER_URL}/images/${
                        product.galleyImage[2]
                      }`}
                      alt=""
                    />
                    <img
                      onClick={()=>ProductImg.current.src = `${import.meta.env.VITE_SERVER_URL}/images/${
                        product.galleyImage[3]
                      }` }
                      src={`${import.meta.env.VITE_SERVER_URL}/images/${
                        product.galleyImage[3]
                      }`}
                      alt=""
                    /> </>
                  }
                </div>
              <div className="product-image">
                <div
                  className="wishlist-box"
                  onClick={() =>
                    setHeartIcon((prev) =>
                      prev === "#ff5555" ? "#c8c8c8" : "#ff5555"
                    )
                  }
                >
                  <svg height={25} viewBox="0 0 24 24" fill={heartIcon}>
                    <path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853Z"></path>
                  </svg>
                </div>
                <img
                ref={ProductImg} style={{height:"50vh"}}
                  src={`${import.meta.env.VITE_SERVER_URL}/images/${
                    product.image
                  }`}
                  alt=""
                />
              </div>
            </div>
            <div id="product-page-right">
              <div className="product-info">
                <div className="title">
                  <p>{product.category}</p> <span>{product.name}</span>
                </div>
                <div className="price">
                  <span style={{ fontWeight: "500", fontSize: "1.5rem" }}>
                    {currentCurrency}
                    {selectedVariation !== null
                      ? product.variation[selectedVariation].price
                      : product.price}
                  </span>
                  <s style={{ color: "#878787" }}>
                    {currentCurrency}
                    {selectedVariation !== null
                      ? product.variation[selectedVariation].price
                      : product.price}
                  </s>
                  <p style={{ color: "#rgb(50 198 57)" }}>50% off</p>
                </div>
                <div className="offers">
                  <span id="offer">
                    <p>Top Offers : </p>
                    <span>Exclusive Offers & Discount</span>
                  </span>
                </div>
              </div>
              <hr />

              { product.variation.length !=0 && 
              <>
                <div className="product-variations">
                  <h3 style={{ fontWeight: "500" }}>Product Variations</h3>
                  <div className="variations">
                    {product.variation.map((elm, e) => (
                      <div
                        key={e}
                        className={`variation ${
                          selectedVariation === e ? "active-variation" : ""
                        }`}
                        onClick={() => setSelectedVariation(e)}
                      >
                        {elm.name}
                      </div>
                    ))}
                  </div>
                </div>

                <hr />
              </>
                }



              <div className="delivery-area">
                <h3 style={{ fontWeight: "600" }}>Delivey To</h3>
                <p>Enter your pincode to check delivey info</p>
                <div className="pincode-area" onClick={()=>pincodeAreaRef.current.style.animation = "none"} ref={pincodeAreaRef}>
                  <input
                    onChange={(e) => setPincode(e.target.value)}
                    value={pincode}
                    type="number"
                    placeholder="Enter Pincode"
                  />
                  <button onClick={checkPincode}>Check</button>
                </div>
                <div className="delivery-updates" id="delivery_message"></div>
                <div className="but-options">

                  {showBtn ? <>

                  <button 
                    style={{ background: "tomato" }}
                    onClick={() => addToCartFunc()}
                  >
                    ADD TO CART
                  </button>

                  <button onClick={()=>{buyNowFunc()}} style={{ background: "#ff9f00" }}  >BUY NOW</button>
                  
                  </>: <p style={{fontSize:"2.2rem"}}>Currently Unavailable</p>}

                </div>
              </div>

              <hr />

              <div className="product-description">
                <div className="heading">
                  <div style={{ display: "flex", gap: "10px" }}>
                    <div>
                      <img src={assets.product_description} alt="" />
                    </div>
                    <div className="info">
                      <h3>Product Information</h3>
                      <p>Specifications, Package Info</p>
                    </div>
                  </div>
                  <div
                    className="indicator"
                    onClick={() => setShowDesc((prev) => !prev)}
                  >
                    <img src={showDesc ? assets.up_arrow : assets.down_arrow} />
                  </div>
                </div>
                {showDesc ? (
                  <div className="desc">
                    <p>{product.description}</p>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="suggest-product-container">
            <h3>You May also like</h3>
            <div className="suggest-products"></div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProductPage;
