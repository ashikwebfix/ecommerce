const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const { connectDB } = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const mediaRoutes = require('./routes/mediaRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const settingRoutes = require('./routes/settingRoutes');
const couponRoutes = require('./routes/couponRoutes');
const bundleRoutes = require('./routes/bundleRoutes');
const pathaoRoutes = require('./routes/pathaoRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const abandonedCartRoutes = require('./routes/abandonedCartRoutes');
const pageRoutes = require('./routes/pageRoutes');
const fs = require('fs');
const Product = require('./models/Product');
const Category = require('./models/Category');

const { migrateProductSlugs } = require('./controllers/productController');

require('dotenv').config({ path: path.join(__dirname, '.env') });

// Connect to database and run migrations
connectDB().then(() => {
  migrateProductSlugs();
});

const app = express();

app.use(cors());
app.use(express.json());

// Serve static files from the uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', mediaRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/bundles', bundleRoutes);
app.use('/api/pathao', pathaoRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/abandoned-carts', abandonedCartRoutes);
app.use('/api/pages', pageRoutes);

// API Fallback (Optional - send 404 for unknown API routes)
app.use('/api/*', (req, res) => {
  res.status(404).json({ message: 'API Route Not Found' });
});

// Since we migrated to Next.js, the Express server acts purely as an API server.
// The Next.js frontend will handle routing and SEO metadata.
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
