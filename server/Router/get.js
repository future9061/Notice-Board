const express = require('express')
const router = express.Router()
const Post = require("../Model/PostModel.js")
const Comment = require("../Model/CommentModel.js")
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { GetObjectCommand, S3Client } = require("@aws-sdk/client-s3");
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

router.get("/", async (req, res) => {
  const posts = await Post.find();

  for (const post of posts) {

    const getObjectParams = {
      Bucket: bucketName,
      Key: post.img.imgId
    }

    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 })//초단위
    post.img.imgUrl = url
  }
  res.send({ success: true, post: posts })
})

//댓글 가져오기
//댓글에 uid도 저장되어 있으니까 uid와 일치하는 사진과 이름
router.get("/reple/showReple", (req, res) => {
  Comment.find({ postNum: req.query.postNum }).then((doc) => {
    res.status(200).send({ success: true, repleList: doc })
  }).catch((err) => { res.status(400).send({ success: false }) })
})

module.exports = router