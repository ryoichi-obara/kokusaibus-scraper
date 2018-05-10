require('dotenv').config();

// Parmeters for lambda function. (This is default values of lambda function test.)
const event = {
  path: '/busstop-name/02',
};

const lambda = require('./src/index');

// lambda.handler(event);

(async () => {
  console.log(await lambda.handler(event));
})();
