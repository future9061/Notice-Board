const express = require('express')
const router = express.Router()
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const crypto = require('crypto');
const sharp = require('sharp');
const Post = require("../Model/PostModel.js")
const { S3Client, DeleteObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");
require('dotenv').config()

router.put(`/edit/:postNum`, async (req, res) => {

  await Post.updateOne({ postNum: req.body.postNum }, { $set: req.body })
    .then(() => { res.send({ success: true }) })
    .catch((err) => console.log(err))
})

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

const randomImageName = () => crypto.randomBytes(32).toString("hex")

router.put(`/edit/images/:postNum`, upload.single('image'), async (req, res) => {

  const deleteImg = await Post.findOne({ postNum: req.params.postNum }).then((doc) => doc.img.imgId)

  const params = {
    Bucket: bucketName,
    Key: deleteImg
  }
  const command = new DeleteObjectCommand(params)
  await s3Client.send(command)

  const resizeImg = await sharp(req.file.buffer)
    .resize({
      width: 400,
      height: 200,
      fit: "contain"
    }).toBuffer();

  const imgInfor = {
    name: req.file.originalname,
    imgId: randomImageName(),
    caption: req.body.caption
  }

  const paramsNew = {
    Bucket: bucketName,
    Key: imgInfor.imgId,
    Body: resizeImg,
    ContentType: req.file.mimetype
  }

  const putObject = new PutObjectCommand(paramsNew);

  await s3Client.send(putObject);

  res.send({ success: true, imgData: imgInfor });

})




module.exports = router