require('dotenv').config();

// Parmeters for lambda function from SQS.
const event = {
  Records: [
    {
      messageId: 'abbababe-feed-beef-cafe-decafec0ffee',
      receiptHandle: 'SomeString==',
      body: '{"url":"http://www.kokusaibus.com/blsys/loca?VID=ldt&EID=nt&DSMK=1581&DK=1hd_1sq_q9-1hd_1sq_nqu31o-1hd_1sq_nqu31v-1hd_1sq_1f8","location":"higashikawaguchi-minami/01"}',
      attributes: {
        ApproximateReceiveCount: '1',
        SentTimestamp: '1572249647127',
        SenderId: 'ABCDEFGHIJKLMNOPQRSTU:your-lambda-function-name',
        ApproximateFirstReceiveTimestamp: '1234567890123',
      },
      messageAttributes: {},
      md5OfBody: 'abcdefghijklmnopqrstuvwxyz123456',
      eventSource: 'aws:sqs',
      eventSourceARN: 'arn:aws:sqs:ap-northeast-1:000000000000:your-sqs-name',
      awsRegion: 'ap-northeast-1',
    },
  ],
};

const lambda = require('./src/cache');

(async () => {
  console.log(await lambda.handler(event));
})();
