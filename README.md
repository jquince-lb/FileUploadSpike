# Node.js REST API for Uploading Files to S3 and Saving URLs to MongoDB

# Endpoints

## POST /api/upload

Uploads a file to the specified S3 bucket and saves the returned URL to the MongoDB database.

### Request

- Method: POST
- Content-Type: multipart/form-data
- Body:
- - file (required): The file to be uploaded.

### Response

- Status Code: 200 OK
- Content-Type: application/json
- Body:
- - success: true/false indicating whether the upload and database save were successful or not.
- - message: A string describing the result of the upload and save.

## GET /api/files

### Request

- Method: GET

### Response

- Status Code: 200 OK
- Content-Type: application/json
- Body:
- - success:
  - - - True: An object `{files}` is returned
  - - - False: Error message

## GET /api/files/:key

Return a presign URL to the client so we can download the file with `{key}`. Signed url will expire after 10 seconds

### Request

- Method: GET

### Response

- Status Code: 200 OK

## DELETE /api/files/:key

Deleting the file in the S3 bucket and the reference in the database by using the`{key}`. Signed url will expire after 10 seconds

### Request

- Method: GET

### Response

- Status Code: 200 OK

### Dependencies

- AWS SDK for Node.js: [Amazon-SDK](https://aws.amazon.com/sdk-for-node-js/)
- Multer: (https://github.com/expressjs/multer)
- MulterS3: (https://github.com/anacronw/multer-s3)
- MongoDB: (https://www.mongodb.com/)
- Mongoose: (https://mongoosejs.com/)

### Configuration

- BUCKET_NAME: The name of the S3 bucket to which the files will be uploaded.
- AWS_S3_ACCESS_KEY: The AWS access key ID with permission to upload to
  the specified S3 bucket.
- AWS_S3_SECRET_ACCESS_KEY: The AWS secret access key associated with the
  access key ID.
- MONGO_DB_URI: The URI for connecting to the MongoDB database.
- S3_REGION: Where the bucket is located

### Communication Flow

Here is a high-level overview of the communication flow between the client, server, API, and S3 bucket:

1. The client sends a POST request to the API endpoint "/api/upload" with the file to be uploaded in the body of the request.
2. The API receives the request and uses the AWS SDK/Multer/MulterS3 to upload the file to the specified S3 bucket.
3. The S3 bucket stores the uploaded file.
4. A reference (key) of the file will be stored in a MongoDB database.
5. The API returns a success/failure message to the client, indicating whether
   the upload and database save were successful or not.

![s3upload01-700x481](https://user-images.githubusercontent.com/104788395/217636591-0f8edc07-65f7-4f6e-afcd-dd3cf4e93290.jpeg)
