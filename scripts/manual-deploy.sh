
echo "Building application...."

yarn build

echo "Build Done!"

echo "Uploading to S3...."

aws s3 cp dist/api.zip s3://server-template --region ap-southeast-1

echo "S3 Uploaded!"

echo "Updating lambda source code..."

aws lambda update-function-code \
    --function-name serverTemplateLambda \
    --s3-bucket server-template \
    --s3-key api.zip \
    --region ap-southeast-1 \
    --publish > /dev/null

rm dist/api.zip

echo "Lambda source code updated!"
