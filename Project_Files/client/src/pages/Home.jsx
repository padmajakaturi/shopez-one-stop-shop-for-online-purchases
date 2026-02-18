import React, { useEffect, useState } from 'react';
import '../styles/Home.css';
import Products from '../components/Products';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();

  const [bannerImg, setBannerImg] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchBanner();
    fetchCategories();
  }, []);

  const fetchBanner = async () => {
    try {
      const res = await axios.get('/fetch-banner');
      setBannerImg(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get('/fetch-all-categories');
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

const categoryImages = {
  fashion: "https://d2w46d36moy248.cloudfront.net/media/shops/Pantaloons.jpg",
  appliances: "https://asset7.ckassets.com/blog/wp-content/uploads/sites/5/2021/12/How-to-Save-Money-on-Home-Appliances-in-India.jpg",
  electronics:"https://www.itedgenews.africa/wp-content/uploads/2021/03/Consumer-Electronics.png",
  "home & kitchen ":"https://i.pinimg.com/736x/15/2e/a2/152ea2326848f43a47d1468d630230d7.jpg",
  "beauty & personal care":"https://bsmedia.business-standard.com/_media/bs/img/article/2019-03/31/full/1554050813-9644.jpg",
  "health care":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpuB82oSHk7-MhwUsr55qNWCL49aFcWM1Khg&s",
  mobiles: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3jUW7v1WFJL9Ylax9a4vazyKXwG-ktSinI4Rd7qi7MkhMr79UlIyyrNkbiK0Cz5u6WYw&usqp=CAU",
  groceries: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXbpV_yQ_zCtZt_1kNebjvFqXvdDnLuuJPsQ&usqp=CAU",
  "toys & baby care":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTExEO6WsqwdvhRdE2-cX4LWKSmbWQnODhxbg&s",
  grocery:"https://cdn.prod.website-files.com/637f7c161a14232e2ea8473d/68273472635fcbdfa369f2e3_Untitled%20design%20(5)-compressed.jpg",
  "sports & fitness" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPhxftdEGr8xEEaevjWIR99yGcPK0WHobXew&s",
};


useEffect(() => {
  axios.get('http://localhost:6001/fetch-categories')
    .then(res => setCategories(res.data));
}, []);

  return (
    <div className="HomePage">

      {/* Banner */}
      <div className="home-banner">
        {bannerImg && <img src={bannerImg} alt="Banner" />}
      </div>

      {/* Categories */}
     <div className="home-categories-container">
  {categories.map((cat) => (
    <div
      key={cat}
      className="home-category-card"
      onClick={() => navigate(`/category/${cat}`)}
    >
      {/* <img
        src={categoryImages[cat.toLowerCase()]}
        alt={cat}
      /> */}
      <img
  src={
    categoryImages[cat.toLowerCase()] ||
    "https://via.placeholder.com/400x300?text=ShopEZ"
  }
  alt={cat}
/>
      <div className="category-name">
        <h5>{cat}</h5>
      </div>
    </div>
  ))}
</div>


      {/* Products */}
      <div id='products-body'></div>
      <Products category="all" />

      <Footer />
    </div>
  );
};

export default Home;
