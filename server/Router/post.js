const express = require('express');
const router = express.Router();
const Post = require("../Model/PostModel.js")
const Counter = require("../Model/CounterModel.js")
const Image = require("../Model/ImageModel.js")
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const crypto = require('crypto');
require('dotenv').config()
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const sharp = require('sharp');

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


const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKER_REGION
const accessKey = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey
  },
  region: bucketRegion
})

const randomImageName = () => crypto.randomBytes(32).toString("hex")

router.post("/images", upload.single('image'), async (req, res) => {
  //이미지 리사이즈
  const resizeImg = await sharp(req.file.buffer)
    .resize({
      width: 400,
      height: 200,
      fit: "contain"
    }).toBuffer();

  //몽고db에 이미지 고유 번호, 이름,caption 넣기
  const imgInfor = {
    name: req.file.originalname,
    imgId: randomImageName(),
    caption: req.body.caption
  }

  const imgData = new Image(imgInfor)
  imgData.save()

  const params = {
    Bucket: bucketName,
    Key: imgInfor.imgId,
    Body: resizeImg,
    ContentType: req.file.mimetype
  }

  const putObject = new PutObjectCommand(params);


  try {
    await s3.send(putObject);
    res.send({ success: true, imgData: imgInfor });
  } catch (error) {
    console.error("Error uploading to S3:", error);
    res.status(500).send({ success: false, error: "Error uploading to S3" });
  }
})




module.exports = router;
