const express = require('express')
const router = express.Router()
const Post = require("../Model/PostModel.js")
const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");
require('dotenv').config()

const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKER_REGION
const accessKey = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY

const s3Client = new S3Client({
  region: bucketRegion,
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  }
})

router.use('/remove/:postNum', async (req, res) => {

  const post = await Post.findOne({ postNum: req.params.postNum })

  if (!post) {
    res.status(400).send("해당 게시글이 없는데?")
    return
  }

  const params = {
    Bucket: bucketName,
    Key: post.img.imgId
  }

  const command = new DeleteObjectCommand(params)
  await s3Client.send(command)
  await Post.deleteOne({ postNum: req.params.postNum })
  res.status(200).send({ success: true })
})

module.exports = router;