const db = require('./db');
const Product = require('./product');

const insertSampleData = async () => {
  try {
    await Product.insertMany([
      {
        name: 'iPad',
        price: 10000,
        description: 'Keertis iPad',
      },
      {
        name: 'Smart TV',
        price: 50000,
        description: 'Samsung TV',
      },
    ]);

    console.log('Sample data inserted successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error inserting sample data:', error);
    process.exit(1);
  }
};

insertSampleData();
