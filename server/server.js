const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const connectDB = require('./db');

// Models
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');

// Middleware
const upload = require('./upload');

// Initialize config
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Seed Database Function
const seedDatabase = async () => {
  try {
    // 1. Seed default products if empty
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      console.log('Seeding default products...');
      const defaultProducts = [
        {
          id: "men",
          title: "Men Anti-Hairfall Therapy",
          price: 499,
          rating: "4.8",
          desc: "A powerful Ayurvedic duo designed to reduce hair fall, strengthen roots, and promote natural hair growth for men.",
          features: [
            "Strengthens hair roots",
            "Reduces hair fall & breakage",
            "Nourishes scalp & prevents dandruff",
            "Made with Ayurvedic actives",
            "Suitable for all hair types"
          ],
          image: "/assets/Men Anti-Hairfall Therapy/Men Hero Image.png",
          isDefault: true
        },
        {
          id: "women",
          title: "Women Anti-Hairfall Therapy",
          price: 599,
          rating: "4.8",
          desc: "A powerful Ayurvedic oil crafted to reduce hair fall, nourish the scalp, and promote natural hair growth for women.",
          features: [
            "Strengthens hair roots",
            "Reduces hair fall & breakage",
            "Nourishes scalp & improves hair texture",
            "Made with Ayurvedic actives",
            "Suitable for all hair types"
          ],
          image: "/assets/Women Anti-HairFall Therapy Combo Pack/Women Anti-Hairfall Therapy.png",
          isDefault: true
        },
        {
          id: "combo",
          title: "Men Anti-Hairfall Combo",
          price: 799,
          rating: "4.8",
          desc: "The perfect Ayurvedic combo for complete hair care. Cleanses, nourishes, and strengthens for visibly thicker, healthier hair.",
          features: [
            "Strengthens hair roots",
            "Reduces hair fall & breakage",
            "Nourishes scalp & prevents dandruff",
            "Made with Ayurvedic actives",
            "Suitable for all hair types"
          ],
          image: "/assets/Women Anti-HairFall Therapy Combo Pack/Men Anti-Hairfall Therapy Combo .png",
          isDefault: true
        }
      ];
      await Product.insertMany(defaultProducts);
      console.log('Default products seeded successfully!');
    }

    // 2. Seed default admin if empty
    const adminCount = await User.countDocuments({ role: 'admin' });
    if (adminCount === 0) {
      console.log('Seeding default system administrator...');
      await User.create({
        name: 'System Administrator',
        email: 'admin@manushayam.com',
        password: 'admin123', // stored simple for local demo testing
        role: 'admin'
      });
      console.log('System administrator seeded successfully!');
    }
  } catch (err) {
    console.error(`Database seeding failed: ${err.message}`);
  }
};

// Connect to Database and Seed
connectDB().then(() => {
  seedDatabase();
});

// API Routes

// 1. Authentication Routes
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Please fill in all fields' });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists || email === 'admin@manushayam.com') {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    const newUser = await User.create({ name, email, password, role: 'customer' });
    res.status(201).json({ 
      success: true, 
      user: { name: newUser.name, email: newUser.email, role: newUser.role } 
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error during registration' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please fill in all fields' });
  }

  try {
    // Check database
    const user = await User.findOne({ email });
    if (user && user.password === password) {
      return res.json({ 
        success: true, 
        user: { name: user.name, email: user.email, role: user.role } 
      });
    }

    res.status(401).json({ success: false, message: 'Invalid email or password' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
});

// 2. Product Routes
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: 1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to retrieve products' });
  }
});

app.post('/api/products', upload.single('image'), async (req, res) => {
  const { title, price, desc, features } = req.body;

  if (!title || !price || !desc || !features) {
    return res.status(400).json({ success: false, message: 'Please fill in all fields' });
  }

  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Please upload a product image' });
  }

  try {
    // Process features (expecting comma separated string)
    const featuresList = features.split(',').map(f => f.trim()).filter(Boolean);
    const imagePath = `/uploads/${req.file.filename}`;

    const newProduct = await Product.create({
      id: 'prod-' + Date.now(),
      title,
      price: parseFloat(price),
      desc,
      features: featuresList,
      image: imagePath,
      rating: '4.5',
      isDefault: false
    });

    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to create product' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findOne({ id: productId });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    if (product.isDefault) {
      return res.status(400).json({ success: false, message: 'Default products cannot be deleted' });
    }

    // Delete image file from upload folder if it exists
    if (product.image.startsWith('/uploads/')) {
      const filename = product.image.replace('/uploads/', '');
      const filePath = path.join(__dirname, 'uploads', filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await Product.deleteOne({ id: productId });
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete product' });
  }
});

// 3. Order Routes
app.get('/api/orders', async (req, res) => {
  const { email } = req.query;

  try {
    let orders;
    if (email) {
      orders = await Order.find({ userEmail: email }).sort({ createdAt: -1 });
    } else {
      orders = await Order.find().sort({ createdAt: -1 });
    }
    res.json(orders);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to retrieve orders' });
  }
});

app.get('/api/orders/:id', async (req, res) => {
  const orderId = req.params.id;
  try {
    const order = await Order.findOne({ id: orderId });
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to retrieve order' });
  }
});


app.post('/api/orders', async (req, res) => {
  const { shippingDetails, paymentMethod, items, subtotal, tax, delivery, total, userEmail, userName } = req.body;

  if (!shippingDetails || !paymentMethod || !items || items.length === 0) {
    return res.status(400).json({ success: false, message: 'Missing order details' });
  }

  try {
    const newOrder = await Order.create({
      id: 'MSY-' + Math.floor(100000 + Math.random() * 900000),
      userEmail: userEmail || 'guest@manushayam.com',
      userName: userName || shippingDetails.name,
      items,
      subtotal,
      tax,
      delivery,
      total,
      paymentMethod,
      shippingDetails,
      status: 'Processing',
      date: new Date().toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    });

    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to place order' });
  }
});

app.put('/api/orders/:id/status', async (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ success: false, message: 'Status is required' });
  }

  try {
    const updatedOrder = await Order.findOneAndUpdate(
      { id: orderId },
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update order status' });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
