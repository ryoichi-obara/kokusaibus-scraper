require('dotenv').config();

const event = {
  version: '0',
  id: '531d7d4c-80de-a044-9485-cf99b81989fc',
  'detail-type': 'Scheduled Event',
  source: 'aws.events',
  account: '012345678901',
  time: '2016-04-06T04:04:46Z',
  region: 'ap-northeast-1',
  resources: [
    'arn:aws:events:ap-northeast-1:012345678901:rule/Your-CloudWatchEvent-Name',
  ],
  detail: {},
};

const lambda = require('./src/hook');

(async () => {
  console.log(await lambda.handler(event));
})();
