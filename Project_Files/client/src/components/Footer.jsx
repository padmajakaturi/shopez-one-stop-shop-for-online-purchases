import React from 'react'
import '../styles/Footer.css'
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="Footer">
      <h4>@ShopEZ - One Destination for all your needs....</h4>
      <div className="footer-body">

        <ul>
  <li><Link to="">Home</Link></li>
  <li><Link to="/category/:category">Categories</Link></li>
  <li><Link to="/category/:category">All products</Link></li>
</ul>

<ul>
  <li><Link to="/cart">Cart</Link></li>
  <li><Link to="/profile">Profile</Link></li>
  <li><Link to="/all-orders">Orders</Link></li>
</ul>

        



      </div>
      
    </div>
  )
}

export default Footer