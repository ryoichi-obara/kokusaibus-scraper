require('dotenv').config();

// Parmeters for lambda function. (This is default values of lambda function test.)
const event = {
  resource: '/{proxy+}',
  path: '/%7Bproxy+%7D',
  httpMethod: 'GET',
  queryStringParameters: null,
  multiValueQueryStringParameters: null,
  pathParameters: {
    proxy: '%7Bproxy+%7D',
  },
  body: null,
  isBase64Encoded: false,
};

const lambda = require('./src/query');

// lambda.handler(event);

(async () => {
  console.log(await lambda.handler(event));
})();
