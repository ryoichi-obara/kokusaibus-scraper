const AWS = require('aws-sdk');
const rp = require('request-promise');

const region = process.env.REGION;
const Bucket = process.env.S3_BUCKET_NAME;
const { SCRAPER_BASE_URL } = process.env;

const S3 = new AWS.S3({ region });

// ----------------------------------------

exports.handler = async (event) => {
  // console.log(JSON.stringify(event));

  await Promise.all(
    event.Records.map(async (record) => {
      const body = JSON.parse(record.body);
      const { location } = body;
      const result = await rp({ uri: `${SCRAPER_BASE_URL}/${location}` });

      return S3.putObject({
        Bucket,
        Key: `${location}/latest.json`,
        Body: result,
      }).promise();
    }),
  );
};
