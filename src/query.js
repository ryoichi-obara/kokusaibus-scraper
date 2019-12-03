/** Returns latest data from S3. */
const AWS = require('aws-sdk');

const region = process.env.S3_REGION;
const Bucket = process.env.S3_BUCKET_NAME;

const S3 = new AWS.S3({ region });

/**
 * @param {object} event - AWSLambda event parameter.
 */
const main = async (event) => {
  // const place = 'buzo3/02';
  // const event.path = '/buzo3/02';
  // const place = event.path.substr(1);
  // const event.pathParameters.proxy = 'buzo3/02';
  const place = event.pathParameters.proxy;
  console.log(place);

  const latestData = await S3.getObject({
    Bucket,
    Key: `${place}/latest.json`,
  }).promise();

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    body: latestData.Body.toString(),
  };
};

exports.handler = async (event) => {
  // console.log(JSON.stringify(event));

  return main(event)
    .catch((e) => {
      console.log(e);
      return {
        statusCode: e.statusCode || 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: e.message ? JSON.stringify(e.message) : '',
      };
    });
};
