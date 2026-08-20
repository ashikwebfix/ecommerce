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

  const siteUrl = process.env.SITE_URL || `${req.protocol}://${req.get('host')}`;
  const siteName = 'kinaboo.com';

  // Default SEO Tags (Home page)
  let title = "পছন্দের পণ্য বেছে নিন | kinaboo.com";
  let description = "পছন্দের পণ্য বেছে নিন, হাতে পেয়ে টাকা দিন। সেরা পণ্য, সেরা দাম, নিরাপদ ডেলিভারি।";
  // Use a JPG/PNG for og:image — Facebook does NOT support SVG
  let image = `${siteUrl}/og-default.jpg`;
  let ogType = 'website';

  // Helper: strip HTML tags
  const stripHtml = (str) => str ? str.replace(/<[^>]*>?/gm, '') : '';

  // Helper: escape HTML entities in attribute values
  const escAttr = (str) => str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Helper: make image URL absolute
  const absoluteImage = (img) => {
    if (!img) return null;
    if (img.startsWith('http://') || img.startsWith('https://')) return img;
    return `${siteUrl}${img.startsWith('/') ? '' : '/'}${img}`;
  };

  try {
    if (req.path.startsWith('/product/')) {
      // ── Product page ──────────────────────────────────────────
      const slug = req.path.split('/')[2];
      if (slug) {
        const product = await Product.findOne({ where: { slug } });
        if (product) {
          title = `${product.name} | kinaboo.com`;
          ogType = 'product';

          const cleanDesc = stripHtml(product.description || '');
          description = cleanDesc.length > 200 ? cleanDesc.substring(0, 200) + '...' : cleanDesc;
          if (!description) description = `${product.name} - কিনুন kinaboo.com থেকে`;

          // Prefer first image in gallery, then fallback to main image, then OG default
          let pImage = null;
          if (product.images && Array.isArray(product.images) && product.images.length > 0) {
            pImage = product.images[0];
          } else if (product.image) {
            pImage = product.image;
          }
          if (pImage) {
            image = absoluteImage(pImage);
          }
        }
      }

    } else if (req.path.startsWith('/search') && req.query.q) {
      // ── Category / Search page ────────────────────────────────
      const catName = req.query.q;
      const category = await Category.findOne({ where: { title: catName } });
      if (category) {
        title = `${category.title} | kinaboo.com`;
        description = category.description
          ? stripHtml(category.description).substring(0, 200)
          : `${category.title} - সেরা পণ্য দেখুন kinaboo.com এ`;
        if (category.image) {
          image = absoluteImage(category.image);
        }
      } else {
        title = `"${catName}" - সার্চ ফলাফল | kinaboo.com`;
        description = `kinaboo.com এ "${catName}" এর জন্য সার্চ ফলাফল দেখুন।`;
      }

    } else if (req.path === '/categories') {
      title = "সকল ক্যাটাগরি | kinaboo.com";
      description = "kinaboo.com এর সকল পণ্যের ক্যাটাগরি ব্রাউজ করুন।";

    } else if (req.path === '/shop') {
      title = "শপ | kinaboo.com";
      description = "kinaboo.com এ সকল পণ্য দেখুন। সেরা দামে সেরা পণ্য।";

    } else if (req.path === '/cart') {
      title = "কার্ট | kinaboo.com";
      description = "আপনার শপিং কার্ট দেখুন।";

    } else if (req.path === '/checkout') {
      title = "চেকআউট | kinaboo.com";
      description = "অর্ডার সম্পন্ন করুন।";
    }

    // Escape all meta content values to prevent broken HTML attributes
    const safeTitle = escAttr(title);
    const safeDescription = escAttr(description);
    const safeImage = escAttr(image);
    const safeUrl = escAttr(`${siteUrl}${req.originalUrl}`);

    // Replace existing <title> tag
    html = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);

    const ogTags = `
    <meta name="description" content="${safeDescription}" />
    <meta property="og:site_name" content="${siteName}" />
    <meta property="og:locale" content="bn_BD" />
    <meta property="og:type" content="${ogType}" />
    <meta property="og:title" content="${safeTitle}" />
    <meta property="og:description" content="${safeDescription}" />
    <meta property="og:image" content="${safeImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:url" content="${safeUrl}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${safeTitle}" />
    <meta name="twitter:description" content="${safeDescription}" />
    <meta name="twitter:image" content="${safeImage}" />
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
