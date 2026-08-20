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

const frontendDistPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(frontendDistPath, { index: false }));

app.get(/.*/, async (req, res) => {
  const indexPath = path.join(frontendDistPath, 'index.html');
  if (!fs.existsSync(indexPath)) {
    return res.status(200).send('API is running... (Frontend not built yet. Run "npm run build" in the frontend directory)');
  }

  let html = fs.readFileSync(indexPath, 'utf-8');

  // Default SEO Tags
  let title = "Home | kinaboo.com";
  let description = "পছন্দের পণ্য বেছে নিন, হাতে পেয়ে টাকা দিন।";
  
  const siteUrl = `${req.protocol}://${req.get('host')}`;
  let image = `${siteUrl}/favicon.svg`; // fallback logo

  try {
    if (req.path.startsWith('/product/')) {
      const slug = req.path.split('/')[2];
      const product = await Product.findOne({ where: { slug } });
      if (product) {
        title = `${product.name} | kinaboo.com`;
        
        const stripHtml = (html) => html ? html.replace(/<[^>]*>?/gm, '') : '';
        const cleanDesc = stripHtml(product.description);
        description = cleanDesc.length > 200 ? cleanDesc.substring(0, 200) + '...' : cleanDesc;
        
        let pImage = product.image;
        if (product.images && product.images.length > 0) {
          pImage = product.images[0];
        }
        if (pImage) {
          image = pImage.startsWith('http') ? pImage : `${siteUrl}${pImage.startsWith('/') ? '' : '/'}${pImage}`;
        }
      }
    } else if (req.path.startsWith('/search') && req.query.q) {
      const catName = req.query.q;
      const category = await Category.findOne({ where: { title: catName } });
      if (category) {
        title = `${category.title} | kinaboo.com`;
        description = category.description || `Browse our collection of ${category.title}`;
        if (category.image) {
          image = category.image.startsWith('http') ? category.image : `${siteUrl}${category.image.startsWith('/') ? '' : '/'}${category.image}`;
        }
      } else {
        title = `${catName} - Search Results | kinaboo.com`;
      }
    } else if (req.path === '/categories') {
       title = "Categories | kinaboo.com";
       description = "Explore our wide range of product categories.";
    }

    // Replace existing title and inject OG tags
    html = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
    
    const ogTags = `
    <meta name="description" content="${description}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:url" content="${siteUrl}${req.originalUrl}" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    `;
    
    html = html.replace('</head>', `${ogTags}</head>`);
  } catch (error) {
    console.error('Error generating SEO tags:', error);
  }

  res.send(html);
});

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
