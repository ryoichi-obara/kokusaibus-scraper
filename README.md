# kokusaibus-scraper

Web scraping for http://www.kokusaibus.com/blsys/loca

## Preparation

Put data ``{ location: ***, url: *** }`` to your DynamoDB.

## Build zip, Upload S3, Update Lambda

```
$ npm run make
$ aws s3 cp ./build/kokusaibus-scraper.zip s3://${YOUR_S3_BUCKET_HERE}/
$ aws lambda update-function-code --function-name ${YOUR_LAMBDA_FUNCTION_NAME} --s3-bucket ${YOUR_S3_BUCKET_HERE} --s3-key ${YOUR_S3_FILE_PATH_HERE} --publish
```
