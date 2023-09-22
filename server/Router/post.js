const express = require('express');
const router = express.Router();
const Post = require("../Model/PostModel.js")
const Counter = require("../Model/CounterModel.js")
require('dotenv').config()
const multer = require('multer')
const { S3Client, PutObjectAclCommand } = require("@aws-sdk/client-s3")
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKER_REGION
const accessKey = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY

router.post("/submit", (req, res) => {
  Counter.findOne({ name: "counter" })
    .then((counter) => {
      req.body.postNum = counter.postNum

      const postItem = new Post(req.body)
      postItem.save(req.body)
        .then(() => {
          Counter.updateOne({ name: "counter" }, { $inc: { postNum: 1 } })
            .then((doc) => { res.send({ success: true, postList: doc }) })
        })
    })
    .catch((err) => { console.log("서버", err) })
})


const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey
  },
  region: bucketRegion,
})
const acl = 'public-read-write'; // acl 반드시.. 
router.post("/image", upload.single('image'), async (req, res) => {
  console.log(req.file.originalnam)
  console.log(req.file)
  // const params = {
  //   Bucket: bucketName,
  //   Key: req.file.originalname,
  //   Body: req.file.buffer,
  //   ContentType: req.file.mimetype,
  //   ACL: acl
  // }

  // const command = new PutObjectAclCommand(params)


  // await s3.send(command)
  res.send({})
})

module.exports = router;
