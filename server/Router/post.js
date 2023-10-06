const express = require('express');
const router = express.Router();
const Post = require("../Model/PostModel.js")
const Counter = require("../Model/CounterModel.js")
const User = require("../Model/UserModel.js")
const Comment = require("../Model/CommentModel.js")
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const crypto = require('crypto');
require('dotenv').config()
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const sharp = require('sharp');


//게시글 작성
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

//게시글 이미지 s3 버켓 저장
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



//회원가입 
router.post("/user/register", async (req, res) => {

  const newUser = new User(req.body)

  await newUser.save(req.body)
    .then(() => { res.send({ success: true }) })
    .catch((err) => { console.log("서버 회원가입", err) })
})


//닉네임 중복검사
router.post("/user/namecheck", async (req, res) => {

  User.findOne({ displayName: req.body.displayName })
    .exec()
    .then((doc) => {
      if (!doc) {
        res.send({ success: true, check: true })

      } else {
        res.send({ success: true, check: false })

      }
    })
    .catch((err) => console.log(err))
})


//댓글 업로드
router.post("/reple/submit", (req, res) => {
  let temp = {
    reple: req.body.reple,
    user: req.body.user,
    postNum: req.body.postNum,
  };

  User.findOne({ uid: req.body.user.uid }).exec().then(() => {

    const NewComment = new Comment(temp)

    NewComment.save().then(() => {

      Post.findOneAndUpdate({ postNum: req.body.postNum }, { $inc: { repleNum: 1 } }).then(() => {
        res.status(200).send({ success: true })
      })

    })
  })



})


module.exports = router;
