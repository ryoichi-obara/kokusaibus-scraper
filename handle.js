require('dotenv').config();

// Parmeters for lambda function. (This is default values of lambda function test.)
const event = {
  resource: '/{proxy+}',
  path: '/minamiurawa-nishi/05',
  httpMethod: 'GET',
  headers:
  {
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'ja,en-US;q=0.9,en;q=0.8,zh-CN;q=0.7,zh;q=0.6,zh-TW;q=0.5',
    'Cache-Control': 'max-age=0',
    'CloudFront-Forwarded-Proto': 'https',
    'CloudFront-Is-Desktop-Viewer': 'true',
    'CloudFront-Is-Mobile-Viewer': 'false',
    'CloudFront-Is-SmartTV-Viewer': 'false',
    'CloudFront-Is-Tablet-Viewer': 'false',
    'CloudFront-Viewer-Country': 'JP',
    Host: 'uf520iamq6.execute-api.ap-northeast-1.amazonaws.com',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
    Via: '1.1 8244cce4bb9e3b3ddfe53ba04174c085.cloudfront.net (CloudFront)',
    'X-Amz-Cf-Id': 'BxYZQimNwHle8uL7ZDBsvXf3FSzZ5h09B9qscB6zcXMo5nLaooyfvQ==',
    'X-Amzn-Trace-Id': 'Root=1-5c5d703b-67c919c01f9d1a586728d65e',
    'X-Forwarded-For': '126.236.163.222, 52.46.20.80',
    'X-Forwarded-Port': '443',
    'X-Forwarded-Proto': 'https',
  },
  multiValueHeaders:
  {
    Accept:
      ['text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'],
    'Accept-Encoding': ['gzip, deflate, br'],
    'Accept-Language': ['ja,en-US;q=0.9,en;q=0.8,zh-CN;q=0.7,zh;q=0.6,zh-TW;q=0.5'],
    'Cache-Control': ['max-age=0'],
    'CloudFront-Forwarded-Proto': ['https'],
    'CloudFront-Is-Desktop-Viewer': ['true'],
    'CloudFront-Is-Mobile-Viewer': ['false'],
    'CloudFront-Is-SmartTV-Viewer': ['false'],
    'CloudFront-Is-Tablet-Viewer': ['false'],
    'CloudFront-Viewer-Country': ['JP'],
    Host: ['uf520iamq6.execute-api.ap-northeast-1.amazonaws.com'],
    'Upgrade-Insecure-Requests': ['1'],
    'User-Agent':
      ['Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'],
    Via:
      ['1.1 8244cce4bb9e3b3ddfe53ba04174c085.cloudfront.net (CloudFront)'],
    'X-Amz-Cf-Id': ['BxYZQimNwHle8uL7ZDBsvXf3FSzZ5h09B9qscB6zcXMo5nLaooyfvQ=='],
    'X-Amzn-Trace-Id': ['Root=1-5c5d703b-67c919c01f9d1a586728d65e'],
    'X-Forwarded-For': ['126.236.163.222, 52.46.20.80'],
    'X-Forwarded-Port': ['443'],
    'X-Forwarded-Proto': ['https'],
  },
  queryStringParameters: null,
  multiValueQueryStringParameters: null,
  pathParameters: { proxy: 'minamiurawa-nishi/05' },
  stageVariables: null,
  requestContext:
  {
    resourceId: 'mz0cpk',
    resourcePath: '/{proxy+}',
    httpMethod: 'GET',
    extendedRequestId: 'Ux55QGEDtjMFiMA=',
    requestTime: '08/Feb/2019:12:04:11 +0000',
    path: '/prod/minamiurawa-nishi/05',
    accountId: '048895066302',
    protocol: 'HTTP/1.1',
    stage: 'prod',
    domainPrefix: 'uf520iamq6',
    requestTimeEpoch: 1549627451284,
    requestId: 'a52f4545-2b99-11e9-a895-6b1200cfeb23',
    identity:
    {
      cognitoIdentityPoolId: null,
      accountId: null,
      cognitoIdentityId: null,
      caller: null,
      sourceIp: '126.236.163.222',
      accessKey: null,
      cognitoAuthenticationType: null,
      cognitoAuthenticationProvider: null,
      userArn: null,
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
      user: null,
    },
    domainName: 'uf520iamq6.execute-api.ap-northeast-1.amazonaws.com',
    apiId: 'uf520iamq6',
  },
  body: null,
  isBase64Encoded: false,
};

const lambda = require('./src/index');

// lambda.handler(event);

(async () => {
  console.log(await lambda.handler(event));
})();
