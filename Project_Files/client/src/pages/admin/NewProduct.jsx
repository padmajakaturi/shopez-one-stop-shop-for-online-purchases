import React, { useEffect, useState } from 'react';
import '../../styles/NewProducts.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NewProduct = () => {
  const navigate = useNavigate();

  const [availableCategories, setAvailableCategories] = useState([]);

  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productMainImg, setProductMainImg] = useState('');
  const [productCarouselImg1, setProductCarouselImg1] = useState('');
  const [productCarouselImg2, setProductCarouselImg2] = useState('');
  const [productCarouselImg3, setProductCarouselImg3] = useState('');
  const [productSizes, setProductSizes] = useState([]);
  const [productGender, setProductGender] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productNewCategory, setProductNewCategory] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDiscount, setProductDiscount] = useState('');

  /* ---------- Fetch Categories from ADMIN ---------- */
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await axios.get('http://localhost:6001/fetch-categories');
    setAvailableCategories(res.data);
  };

  /* ---------- Sizes ---------- */
  const handleCheckBox = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setProductSizes([...productSizes, value]);
    } else {
      setProductSizes(productSizes.filter((s) => s !== value));
    }
  };


  
  /* ---------- Add Product ---------- */
  const handleNewProduct = async () => {
    await axios.post('http://localhost:6001/add-new-product', {
      productName,
      productDescription,
      productMainImg,
      productCarousel: [
        productCarouselImg1,
        productCarouselImg2,
        productCarouselImg3,
      ],
      productSizes,
      productGender,
      productCategory,
      productNewCategory,
      productPrice,
      productDiscount,
    });

    alert('Product Added!');
    navigate('/all-products');
  };

  return (
    <div className="new-product-page">
      <div className="new-product-container">
        <h3>New Product</h3>

        <div className="new-product-body">

          {/* Name */}
          <input
            type="text"
            placeholder="Product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />

          {/* Description */}
          <input
            type="text"
            placeholder="Product description"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />

          {/* Main Image */}
          <input
            type="text"
            placeholder="Thumbnail image url"
            value={productMainImg}
            onChange={(e) => setProductMainImg(e.target.value)}
          />

          {/* Carousel */}
          {[setProductCarouselImg1, setProductCarouselImg2, setProductCarouselImg3].map((setter, i) => (
            <input
              key={i}
              type="text"
              placeholder={`Carousel image ${i + 1}`}
              onChange={(e) => setter(e.target.value)}
            />
          ))}
<br></br>
          {/* Sizes */}
          <h6>sizess available:</h6><br></br>
          {['S', 'M', 'L', 'XL'].map((size) => (
           
            <label key={size}>
              <input
                type="checkbox"
                value={size}
                checked={productSizes.includes(size)}
                onChange={handleCheckBox}
              />
              {size}
            </label>
          ))}

          {/* Gender */}
          <h6>Genders Suitable for:</h6><br></br>
          {['Men', 'Women', 'Unisex'].map((g) => (
            <label key={g}>
              <input
                type="radio"
                name="gender"
                value={g}
                onChange={(e) => setProductGender(e.target.value)}
              />
              {g}
            </label>
          ))}

          {/* Category */}
          <select
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
          >
            <option value="">Choose category</option>
            {availableCategories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
            <option value="new category">New category</option>
          </select>

          {productCategory === 'new category' && (
            <input
              type="text"
              placeholder="Enter new category"
              value={productNewCategory}
              onChange={(e) => setProductNewCategory(e.target.value)}
            />
          )}

          {/* Price & Discount */}
          <input
            type="number"
            placeholder="Price"
            onChange={(e) => setProductPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="Discount %"
            onChange={(e) => setProductDiscount(e.target.value)}
          />

        </div>

        <button onClick={handleNewProduct}>Add Product</button>
      </div>
    </div>
  );
};

export default NewProduct;
