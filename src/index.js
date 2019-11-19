const AWS = require('aws-sdk');
const client = require('cheerio-httpcli');

const { REGION } = process.env;
const { TABLE_NAME } = process.env;
const Dynamo = new AWS.DynamoDB.DocumentClient({ region: REGION });

const dynamoGet = async (TableName, Key) => new Promise((resolve, reject) => {
  Dynamo.get({ TableName, Key }, (err, data) => (err ? reject(err) : resolve(data.Item)));
});

const logAndRes = (code, message) => {
  console.log(message);
  return {
    statusCode: code,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  };
};

exports.handler = async (event) => {
  console.log(event);
  console.log(event.path);

  const dynamoResult = await dynamoGet(TABLE_NAME, { location: event.path });
  // const dynamoResult = {};
  // dynamoResult.url = 'http://www.kokusaibus.com/blsys/loca?VID=ldt&EID=nt&DSMK=1581&DK=1hd_1sq_q9-1hd_1sq_nqu31o-1hd_1sq_nqu31v-1hd_1sq_1f8';
  if (!dynamoResult) {
    return logAndRes(400, 'No DynamoResult.');
  }
  if (!dynamoResult.url) {
    return logAndRes(400, 'No url.');
  }

  // console.log('----------------------------------------');
  // console.log(dynamoResult.url);

  const fetchResult = await client.fetch(dynamoResult.url);
  console.log(fetchResult);
  // const doc = new DOM().parseFromString(fetchResult.body);
  // const trTags = xpath.select('//table[@class="R_Table"]//tr', doc);

  // ex. "東川口駅南口０１"
  const fetchedBusStopName = fetchResult.$('p.fontBK_mB').text().replace('停留所名：　', '');
  // ex. "【12:06】現在"
  const fetchedDatetime = fetchResult.$('span.fontBK_m').text();

  const fetchedTable = [];
  const trTags = fetchResult.$('table.R_Table tr');

  trTags.each((trTag) => {
    const trArray = [];
    trTags[trTag].children.forEach((td) => {
      // Process TH, TD, TEXT, others.
      if (td.name === 'th') {
        trArray.push(td.children[0].data.trim());
      } else if (td.name === 'td') {
        trArray.push(td.children[0].data.trim());
      } else if (td.type === 'text') {
        // console.log(td.text);
      } else {
        // console.log(`? ${td.type}`);
        // console.log(td);
      }
    });
    fetchedTable.push(trArray);
  });

  // fetchedTable = [
  //   ["時刻表","到着予測","のりば","【系統】行き先","車両","運行状況"],
  //   ["13:17","13:17","1","【東川05】差間循環","[ノンステップ]","定刻です。"],
  //   ["13:35","13:35","1","【川20】川口駅東口","[ノンステップ]","定刻です。"],
  //   ["13:47","13:47","1","【東川05】差間循環","","＊"],
  //   ["14:05","14:05","1","【川20】川口駅東口","","＊"]
  // ];

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      originUrl: dynamoResult.url,
      originUpdated: fetchedDatetime,
      busStopName: fetchedBusStopName,
      table: fetchedTable,
    }),
  };
};
