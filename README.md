# 🛒 ShopEZ — One Stop Shop for Online Purchases

ShopEZ is a full-stack e-commerce web application that allows users to browse products, filter by categories, manage carts, and place orders. It also includes an simple admin panel for managing products and categories.

This project is built using the **MERN stack** (MongoDB, Express, React, Node.js).

---

## 🚀 Features

### 👤 User Features
*Register and login
<img width="1920" height="1080" alt="Screenshot (335)" src="https://github.com/user-attachments/assets/aa159f3a-77fd-42b3-9221-e7ef994e08f8" />


<img width="1920" height="1080" alt="Screenshot (334)" src="https://github.com/user-attachments/assets/ffd6f70c-a602-4f74-8169-7c7bc34d3578" />


* Browse all products
* Filter products by category and gender
 <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/a29cb370-9784-4e28-8cc4-743a64a88862" />


* Sort by price and discount
* Add products to cart
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/f0051230-79df-4e5a-ad4e-2817a7cafa73" />




* View cart and order details
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/f10b615f-7a2e-406b-be15-b7923717303a" />



* Responsive user interface
  ![Screenshot_18-2-2026_135748_localhost](https://github.com/user-attachments/assets/64aeba4a-bda4-4561-ab89-2a030beaa733)




### 🔧 Admin Features
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/001100f3-8c9b-4a1d-bdba-010271b30d30" />


* Add new products
  <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/42267ff4-bcff-4968-bcfb-37a64e9c4a3d" />


* Update existing products
 <img width="1920" height="1080" alt="Screenshot (333)" src="https://github.com/user-attachments/assets/54e647bf-0477-4cf0-a063-2d825d6b9f22" />


* Delete products
* Add categories
* Delete categories
* Manage product listings

---

## 🛠️ Tech Stack

**Frontend**

* React.js
* React Router
* CSS
* Axios

**Backend**

* Node.js
* Express.js

**Database**

* MongoDB

---

## 📁 Project Structure

```
ShopEZ/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│
└── README.md
```

---

## ⚙️ Installation & Setup

### Prerequisites

Make sure you have installed:

* Node.js
* npm
* MongoDB (local or MongoDB Atlas)

---

### Step 1: Clone the repository

```
git clone https://github.com/padmajakaturi/ShopEZ-One-Stop-Shop-for-Online-Purchases.git
cd ShopEZ-One-Stop-Shop-for-Online-Purchases
```

---

### Step 2: Setup Backend

```
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```
MONGO_URI=your_mongodb_connection_string
PORT=6001
```

Start backend server:

```
npm start
```

---

### Step 3: Setup Frontend

Open a new terminal:

```
cd frontend
npm install
npm start
```

Open browser:

```
http://localhost:3000
```

---

## 🔗 API Endpoints

### Categories

* `GET /fetch-categories` → Get all categories
* `POST /add-category` → Add category
* `DELETE /delete-category/:cat` → Delete category

### Products

* `GET /fetch-products` → Get all products
* `POST /add-product` → Add product
* `PUT /update-product/:id` → Update product
* `DELETE /delete-product/:id` → Delete product

---

## 🧠 How It Works

* Frontend communicates with backend using REST APIs.
* Backend handles product and category logic.
* MongoDB stores all application data.
* React Router manages navigation.
* Axios is used for API requests.

---
