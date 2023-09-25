const express = require('express')
const router = express.Router()
const Post = require("../Model/PostModel.js")
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
// const client = new S3Client(clientParams);
// const command = new GetObjectCommand(getObjectParams);
// const url = getSignedUrl(client, command, { expiresIn: 3600 });

router.get("/", (req, res) => {

  Post.find()
    .then((doc) => {
      res.send({ success: true, post: doc })
    }).catch((err) => console.log(err))

})

module.exports = router