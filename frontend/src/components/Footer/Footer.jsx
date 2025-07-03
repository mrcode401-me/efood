import React, { useContext, useState,useEffect } from 'react'
import './Footer.css'
import {assets} from  '../../assets/assets.js'
import { StoreContext } from '../../context/StoreContext.jsx'

const Footer = () => {
  const [details,setDetails] = useState({number:"",email:""})
  const {companyDetails} = useContext(StoreContext);


  useEffect(() => {
   setDetails(companyDetails)
  }, [companyDetails])
  
  return (
    <div className="footer" id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit qui quia illum ullam totam commodi illo repudiandae a quam fugit dolore enim expedita, molestiae ad voluptatibus dolor blanditiis repellat beatae!</p>
                <div className="footer-social-icon">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                  <li>Home</li>
                  <li>About us</li>
                  <li>Delivery</li>
                  <li>Privacy policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                  <h2>GET  IN TOUCH</h2>
                  <ul>
                      <li>{details.number}</li>
                      <li>{details.email}</li>
                  </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">Copyright 2024 &copy; Tomato.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer