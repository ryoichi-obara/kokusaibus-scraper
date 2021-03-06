const AWS = require('aws-sdk');

const region = process.env.REGION;
const TABLE_NAME = process.env.DYNAMO_TABLE_NAME;
const QUEUE_URL = process.env.SQS_URL; // ポーリング先のSQSのURL

const Dynamo = new AWS.DynamoDB.DocumentClient({ region });
const SQS = new AWS.SQS({ apiVersion: '2012-11-05' });

// ----------------------------------------

const dynamoScan = async TableName => (await Dynamo.scan({ TableName }).promise()).Items;
// const dynamoScan = async TableName => new Promise((resolve, reject) => {
//   Dynamo.scan({ TableName }, (err, data) => (err ? reject(err) : resolve(data.Item)));
// });

const sendMessage = async messageBody => SQS.sendMessage({
  QueueUrl: QUEUE_URL,
  DelaySeconds: 0,
  MessageBody: JSON.stringify(messageBody),
}).promise();

// ----------------------------------------

exports.handler = async (event) => {
  // console.log(JSON.stringify(event));

  const hour = new Date().getHours(); // UTC 24 hour
  // Avoid hook from 3:00(+9) JST to 4:00 JST(+9)
  if (hour === (27 - 9) || hour === (28 - 9)) {
    return;
  }

  // Dynamo scan.
  const items = (await dynamoScan(TABLE_NAME))
    .filter(i => i.url);

  // Send SQS message.
  await Promise.all(
    items.map(item => sendMessage({
      url: item.url,
      location: item.location.replace(/^\//, ''), // TODO Remove replace.
    })),
  );

  // console.log(result);
};
