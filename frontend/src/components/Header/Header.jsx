import React, { useState } from 'react'
import './Header.css'
import { assets } from '../../assets/assets'
import { useEffect } from 'react'
import axios from 'axios'

const Header = () => {
  const [banners,setBanners] = useState([])
  const [currentBannerIndex,setCurrentBannerIndex] = useState(0)

  const fetchBanner = async()=>{
    const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/banner/get`,{})
    if(response.data.success){
        console.log(response.data.data)
        setBanners(response.data.data)
    }else{
        console.log(response.data.message)
    }
  }

  const goToPrevious = () =>{
    const isFirst = currentBannerIndex == 0;
    const newIndex = isFirst ? banners.length - 1 : currentBannerIndex -1
    setCurrentBannerIndex(newIndex)
  }

  const goToNext = () =>{
    const isLast = currentBannerIndex == banners.length - 1;
    const newIndex = isLast ? 0 : currentBannerIndex +1
    setCurrentBannerIndex(newIndex)
  }

    useEffect(()=>{
      fetchBanner()
    },[])
  
  return (
    <div className='header'>
         <button onClick={()=>goToPrevious()} className='arrow-btn' style={{left:"1rem",rotate:'-90deg'}}><img src={assets.up_arrow} alt="" /></button>
          {banners.length >0 && <img id='banner' src={`${import.meta.env.VITE_SERVER_URL}/images/banner_images/${banners[currentBannerIndex].image}`} alt="" /> }
        <button onClick={()=>goToNext()} className='arrow-btn' style={{right:"1rem",rotate:'90deg'}}><img src={assets.up_arrow} alt="" /></button>
    </div>
  )
}

export default Header