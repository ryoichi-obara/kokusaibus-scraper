const AWS = require('aws-sdk');
const client = require('cheerio-httpcli');

const region = process.env.REGION;
const Bucket = process.env.S3_BUCKET_NAME;
const TABLE_NAME = process.env.DYNAMO_TABLE_NAME;

const Dynamo = new AWS.DynamoDB.DocumentClient({ region });
const S3 = new AWS.S3({ region });

// ----------------------------------------

const dynamoScan = async TableName => (await Dynamo.scan({ TableName }).promise()).Items;
// const dynamoScan = async TableName => new Promise((resolve, reject) => {
//   Dynamo.scan({ TableName }, (err, data) => (err ? reject(err) : resolve(data.Item)));
// });

// ----------------------------------------

const fetchData = async (url) => {
  const fetchResult = await client.fetch(url);
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
    originUrl: url,
    originUpdated: fetchedDatetime,
    busStopName: fetchedBusStopName,
    table: fetchedTable,
  };
};

// ----------------------------------------

exports.handler = async (event) => {
  // console.log(JSON.stringify(event));

  const items = (await dynamoScan(TABLE_NAME))
    .filter(i => i.url);

  // TODO SQS.
  const fetchedDataArray = await Promise.all(
    items.map(async (item) => {
      const fetchedData = await fetchData(item.url);
      fetchedData.location = item.location.replace(/^\//, '');
      return fetchedData;
    }),
  );
  // console.log(fetchedDataArray);

  await Promise.all(
    fetchedDataArray
      .map(async (fetchedItem) => {
        await S3.putObject({
          Bucket,
          Key: `${fetchedItem.location}/latest.json`, // body.fileName || `${execDatetime}.jpg`,
          Body: JSON.stringify(fetchedItem),
          // ACL: 'public-read',
        }).promise();
      }),
  );
};
