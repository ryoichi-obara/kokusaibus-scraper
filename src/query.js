/** Returns latest data from S3. */
const AWS = require('aws-sdk');

const region = process.env.S3_REGION;
const Bucket = process.env.S3_BUCKET_NAME;

const S3 = new AWS.S3({ region });

exports.handler = async (event) => {
  console.log(JSON.stringify(event));
  console.log('----------------------------------------');
  console.log(event.path);

  // const place = 'buzo3/02';
  // const event.path = '/buzo3/02';
  const place = event.path.substr(1);
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
