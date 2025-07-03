import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

export const StoreContext = createContext()

const ContextDataProvider = ({children})=>{

    const [cartItem,setCartItem] = useState({});
    const [token,setToken] = useState("")
    const [food_list,setFoodList] = useState([]);
    const [category_list,setCategores] = useState([])
    const [pincodeList,setPincodeList] = useState([])
    const [currentPincode,setCurrentPincode] = useState()
    const [currentCurrency,setCurrentCurrency] = useState()
    const [companyDetails,setCompanyDetails] = useState({})



    const addToCart = async(itemId)=>{
        if(!cartItem[itemId]){
            setCartItem((prev)=>({...prev,[itemId]:1}))
        }else{
            setCartItem((prev)=>({...prev,[itemId]:prev[itemId]+1}))}
        
        if(token){
            await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/cart/add`,{itemId},{headers:{token}})
        }
    }
    const removeFromCart = async(itemId)=>{
            setCartItem((prev)=>({...prev,[itemId]:prev[itemId]-1}))
            
        if(token){
            await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/cart/remove`,{itemId},{headers:{token}})
        }
    }
    const totalRemoveFromCart = async(itemId)=>{
            setCartItem((prev)=>({...prev,[itemId]:0}))
            
        if(token){
            await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/cart/remove`,{itemId},{headers:{token}})
        }
    }

    const getTotalCartAmount = ()=>{
        let totalAmount = 0;
        for(const item in cartItem){
            if(cartItem[item]>0){
                let itemInfo = food_list.find((product)=>product._id === item);
                totalAmount += itemInfo.price * cartItem[item]
            }
        }
        return totalAmount;
    }

    const fetchFoodList = async()=>{
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/food/list`);
        if(response.data.success){
             setFoodList(response.data.data)
        }
        else{
            console.log("Product Not fount")
            alert("Internet not working")
        }
    }

    const fetchPincodeList = async()=>{
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/pincode/list`);
        if(response.data.success){
            // console.log(response.data.data)
            setPincodeList(response.data.data)
        }
        else{
            console.log(response.data.message)
        }
    }

    const fetchCartList = async(token)=>{
        // console.log("fetch cart items")
        // console.log(cartItem)
        if(token){
            // if(!Object.keys(cartItem).length==0){
            //       await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/cart/add`,{itemId},{headers:{token}})
            // }
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/cart/get`,{},{headers:{token}})
            if(response.data.success){
                setCartItem(response.data.data);
            }
            else{
                console.log(response.data.message);
             }
        }
    }


    const fetchCategories = async()=>{
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/user/category/list`)
            if(response.data.success){
                setCategores(response.data.data);
                // console.log(response.data.data)
            }
            else{
                console.log(response.data.message);
             }
        }


    const fetchCompanyInfo = async()=>{
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/admin/company-info/get`,{})
            if(response.data.success){
                // console.log(response.data.data.currency)
                setCurrentCurrency(response.data.data.currency)
                // console.log(response.data.data)
                setCompanyDetails(response.data.data)
            }
            else{
                console.log(response.data.message);
             }
        }

    const findPincode = (pincode)=>{
        // console.log(pincode)
      const p = pincodeList.filter((data)=>{
                    //  console.log(data.pincode)
                    return data.pincode === pincode
                    });
        if(p.length==0){
            return false;
        }
     
        if(p.length>0){
               p[0].deliveryCharge = p[0].deliveryCharge===0?"Delivery Free":p[0].deliveryCharge;

        if(p[0].deliveryDuration===0){
            p[0].deliveryDuration = "Same Day Delivery"
        }
        else if(p[0].deliveryDuration===1){
            p[0].deliveryDuration = "Tomorrow Delivery"
        }
        else{
            p[0].deliveryDuration = p[0].deliveryDuration
        }
        return p[0]
        }
        return ;
     
    }

    const fetchOrders = async()=>{
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/order/my-orders`,{},{headers:{token}})
        if(response.data.success){  
                // console.log(response.data.data)
                 const data = response.data.data;
                 return data
        }else{
            console.log(response.data.message)
        }
    }
    


    const contaxtData = {
        food_list,
        cartItem,
        setCartItem,
        addToCart,
        removeFromCart,
        totalRemoveFromCart,
        getTotalCartAmount,
        token,
        setToken,
        category_list,
        pincodeList,
        findPincode,
        setCurrentPincode,
        currentPincode,
        currentCurrency,
        companyDetails,
        fetchOrders
    }

    useEffect(()=>{

        async function loadData() {
            // fetch the data
            await fetchCategories()
            await fetchFoodList(); 
            await fetchPincodeList()
            await fetchCompanyInfo()
            
            if(localStorage.getItem("pincode")){
                setCurrentPincode(localStorage.getItem("pincode"))
            }
            // set token
                if(token===""){
                    if(localStorage.getItem("token")){
                        //   console.log(cartItem);
                        setToken(localStorage.getItem("token"))
                        await fetchCartList(localStorage.getItem("token"))
                        //   console.log("fatch cart items");
                    }
                }

        }

        loadData()  // call the function

    },[])

    return <StoreContext.Provider value={contaxtData}>
        {children}
    </StoreContext.Provider>
    }

export default ContextDataProvider