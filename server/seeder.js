const { sequelize } = require('./config/db');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const OrderItem = require('./models/OrderItem');
const Category = require('./models/Category');
const { categories, products } = require('./demoData');
const bcrypt = require('bcryptjs');

const importData = async () => {
  try {
    await sequelize.sync({ force: true }); // Wipe DB and recreate tables
    console.log('Database Synced!');

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash('password123', salt);

    await User.bulkCreate([
      { name: 'Admin User', email: 'admin@site.com', password, isAdmin: true },
      { name: 'John Doe', email: 'john@site.com', password, isAdmin: false }
    ]);
    
    await Category.bulkCreate(categories);
    await Product.bulkCreate(products);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
