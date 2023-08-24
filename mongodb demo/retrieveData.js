const db = require('./db');
const Product = require('./product');

const retrieveProducts = async () => {
  try {
    const query = { name: 'Smartwatch' };
    const start = performance.now(); // Start the timer
    const products = await Product.find(query);

    const end = performance.now(); // End the timer
    console.log('Products:');
    console.log(products);


    const duration = end - start;
    console.log('Query duration:', duration, 'ms');
  } catch (error) {
    console.error('Error retrieving products:', error);
  } finally {
    process.exit(0);
  }
};

retrieveProducts();
