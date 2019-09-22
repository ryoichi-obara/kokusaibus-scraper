const AWS = require('aws-sdk');
const rp = require('request-promise');

const region = process.env.S3_REGION;
const Bucket = process.env.S3_BUCKET_NAME;

const S3 = new AWS.S3({ region });

exports.handler = async (event) => {
  console.log(JSON.stringify(event));
  const place = 'buzo3/02';
  const params = {
    uri: `https://uf520iamq6.execute-api.ap-northeast-1.amazonaws.com/prod/${place}`,
    json: true, // Automatically parses the JSON string in the response
  };

  const data = await rp(params)
    .catch((err) => {
      // request error.
      console.log(err);
    });

  await S3.putObject({
    Bucket,
    Key: `${place}/latest.json`, // body.fileName || `${execDatetime}.jpg`,
    Body: JSON.stringify(data), // Buffer.from(body.encodedFileContent, 'base64'),
    // ACL: 'public-read',
  }).promise();

  console.log(data);
};
