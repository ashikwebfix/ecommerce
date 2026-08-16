const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ecommerce', 'root', 'mysql', {
  host: '127.0.0.1',
  dialect: 'mysql',
  logging: false, // Set to console.log to see SQL queries
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL Database Connected Successfully!');
    await sequelize.sync({ alter: true });
    console.log('Database synced with alter: true');
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
  }
};

module.exports = { sequelize, connectDB };
