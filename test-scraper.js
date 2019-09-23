require('dotenv').config();

// Parmeters for lambda function. (This is default values of lambda function test.)
const event = {};

const lambda = require('./src/scraper');

// lambda.handler(event);

(async () => {
  console.log(await lambda.handler(event));
})();
