require('dotenv').config()
const S3  = require('aws-sdk/clients/s3')
const fs = require('fs')
const sharp = require('sharp')

const bucketName = process.env.AWS_BUCKET_NAME 
const region = process.env.AWS_BUCKET_REGION 
const accessKey = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY 
const height = 100
const width = 100
const s3 = new S3({
    region,
    accessKey,
    secretAccessKey
})


function uploadFile(file)  {
    const fileStream = fs.createReadStream(file.path)
    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    }
    sharp(file.path)
    .resize(height, width)
    .toBuffer()
    .then (buffer => {
        uploadParams.Body = buffer;
        uploadParams.Key = width + "-" + height + "-" + uploadParams.Key;
    });
    return s3.upload(uploadParams).promise()
}
exports.uploadFile = uploadFile;


function getFileStream(fileKey){
    const downloadParams = { Key: fileKey, Bucket: bucketName }
    const result =  s3.getObject(downloadParams).createReadStream()
    return result
}
exports.getFileStream = getFileStream;