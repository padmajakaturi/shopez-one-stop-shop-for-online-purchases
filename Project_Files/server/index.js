import dotenv from 'dotenv';
dotenv.config();

import { Category } from './Schema.js';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { Admin, Cart, Orders, Product, User } from './Schema.js';

const app = express();
const PORT = 6001;

app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

/* -------------------- DB CONNECTION -------------------- */

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch((e) => console.log("DB Error:", e));

/* -------------------- AUTH -------------------- */

app.post('/register', async (req, res) => {
    const { username, email, usertype, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, usertype, password: hashedPassword });
        const userCreated = await newUser.save();
        res.status(201).json(userCreated);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: 'Invalid email or password' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

        res.json(user);
    } catch {
        res.status(500).json({ message: 'Server Error' });
    }
});

/* -------------------- FETCH APIs -------------------- */

app.get('/fetch-banner', async (req, res) => {
    const admin = await Admin.findOne();
    res.json(admin?.banner || "");
});

app.get('/fetch-users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

app.get('/fetch-product-details/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.json(product);
});

app.get('/fetch-products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

app.get('/fetch-orders', async (req, res) => {
    const orders = await Orders.find();
    res.json(orders);
});

app.get('/fetch-categories', async (req, res) => {
    let admin = await Admin.findOne();
    if (!admin) {
        admin = new Admin({ banner: "", categories: [] });
        await admin.save();
    }
    res.json(admin.categories);
});

app.get('/fetch-cart', async (req, res) => {
    const items = await Cart.find();
    res.json(items);
});

/* -------- CATEGORY APIs -------- */

app.post('/add-category', async (req, res) => {
  const { name, image } = req.body;

  const exists = await Category.findOne({ name });
  if (exists) return res.json({ message: "Category already exists" });

  await new Category({ name, image }).save();
  res.json({ message: "Category added" });
});

app.get('/fetch-categories', async (req, res) => {
  const admin = await Admin.findOne();
  res.json(admin?.categories || []);
});



/* -------------------- PRODUCT -------------------- */
app.post('/add-category', async (req, res) => {
    try {
        const { category } = req.body;

        let admin = await Admin.findOne();
        if (!admin) admin = new Admin({ banner: "", categories: [] });

        // Add to top if not exists
        if (!admin.categories.includes(category)) {
            admin.categories.unshift(category); // 👈 adds to TOP
            await admin.save();
        }

        res.json({ message: "Category added" });
    } catch {
        res.status(500).json({ message: "Error" });
    }
});

app.post('/add-new-product', async (req, res) => {
    const { productName, productDescription, productMainImg, productCarousel, productSizes, productGender, productCategory, productNewCategory, productPrice, productDiscount } = req.body;

    let category = productCategory;

    if (productCategory === 'new category') {
        const admin = await Admin.findOne();
        admin.categories.push(productNewCategory);
        await admin.save();
        category = productNewCategory;
    }

    const newProduct = new Product({
        title: productName,
        description: productDescription,
        mainImg: productMainImg,
        carousel: productCarousel,
        sizes: productSizes,
        gender: productGender,
        category,
        price: productPrice,
        discount: productDiscount
    });

    await newProduct.save();
    res.json({ message: "product added!!" });
});

app.put('/update-product/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    Object.assign(product, {
        title: req.body.productName,
        description: req.body.productDescription,
        mainImg: req.body.productMainImg,
        carousel: req.body.productCarousel,
        sizes: req.body.productSizes,
        gender: req.body.productGender,
        category: req.body.productCategory,
        price: req.body.productPrice,
        discount: req.body.productDiscount
    });
    await product.save();
    res.json({ message: "product updated!!" });
});

/* -------------------- BANNER -------------------- */

app.post('/update-banner', async (req, res) => {
    let admin = await Admin.findOne();
    if (!admin) admin = new Admin({ categories: [] });

    admin.banner = req.body.banner;
    await admin.save();
    res.json({ message: "banner updated" });
});

/* -------------------- CART -------------------- */

app.post('/add-to-cart', async (req, res) => {
    const item = new Cart(req.body);
    await item.save();
    res.json({ message: 'Added to cart' });
});

app.put('/increase-cart-quantity', async (req, res) => {
    const item = await Cart.findById(req.body.id);
    item.quantity = parseInt(item.quantity) + 1;
    await item.save();
    res.json({ message: 'incremented' });
});

app.put('/decrease-cart-quantity', async (req, res) => {
    const item = await Cart.findById(req.body.id);
    item.quantity = parseInt(item.quantity) - 1;
    await item.save();
    res.json({ message: 'decremented' });
});

app.put('/remove-item', async (req, res) => {
    await Cart.deleteOne({ _id: req.body.id });
    res.json({ message: 'item removed' });
});

/* -------------------- ORDERS -------------------- */

app.post('/buy-product', async (req, res) => {
    const order = new Orders(req.body);
    await order.save();
    res.json({ message: 'order placed' });
});

app.post('/place-cart-order', async (req, res) => {
    const cartItems = await Cart.find({ userId: req.body.userId });

    for (let item of cartItems) {
        await new Orders({ ...item.toObject(), ...req.body }).save();
        await Cart.deleteOne({ _id: item._id });
    }

    res.json({ message: 'Order placed' });
});

/* -------------------- SERVER -------------------- */

app.listen(PORT, () => {
    console.log('Server running at 6001');
});

app.put('/cancel-order', async (req, res) => {
  try {
    const { id } = req.body;

    await Orders.findByIdAndUpdate(id, {
      orderStatus: 'cancelled',
    });

    res.json({ message: 'Order cancelled' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error' });
  }
});

app.put('/update-order-status', async (req, res) => {
  try {
    const { id, updateStatus } = req.body;

    await Orders.findByIdAndUpdate(id, {
      orderStatus: updateStatus,
    });

    res.json({ message: 'Order updated' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error' });
  }
});

app.delete('/delete-product/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product' });
  }
});


// DELETE CATEGORY
// DELETE CATEGORY PROPERLY
app.delete('/delete-category/:cat', async (req, res) => {
  const category = req.params.cat;

  try {
    // Remove category from admin.categories
    const admin = await Admin.findOne();

    if (admin) {
      admin.categories = admin.categories.filter(
        c => c !== category
      );
      await admin.save();
    }

    // Update products
    await Product.updateMany(
      { category: category },
      { $set: { category: "uncategorized" } }
    );

    res.send({ message: "Category deleted successfully" });

  } catch (err) {
    res.status(500).send(err);
  }
});







