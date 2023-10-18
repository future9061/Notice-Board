# 🎇목차

1. [💻 프로젝트 소개](#-프로젝트-소개)
2. [📁 directory 구조](#-directory-구조)
3. [⏲ 개발 기간](#-개발-기간)
4. [❗ 개발 환경](#-개발-환경)
5. [📌 주요 기능](#-주요-기능)
6. [🧾 code review](#-code-review)
7. [📢 Project review](#-project-review)
8. [🙏 참고한 게시글](#-참고한-게시글)

<br>

## 💻 프로젝트 소개

<br>

- `url` : 미완
- 개발을 공부하면서 스터디를 구하는 일이 잦아지면서, 개발자들을 위한 커뮤니케이션을 만들어보고 싶어 제작하게 된 for-developers 프로젝트 입니다.
- MERN stack 개발
- AWS S3 bucket에 파일 저장 및 관리
- 파이어베이스로 로그인, 로그아웃 기능 구현
- client단에서 http-proxy-middleware 라이브러리로 cors 이슈 해결

<br>

# 📁 directory 구조

- ### client directory

```
📦client
 ┣ 📂public
 ┣ 📂src
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂ui
 ┃ ┣ 📂pages
 ┃ ┣ 📂store //Redux로 로그인 한 사용자 데이터와 post 데이터 관리
 ┃ ┣ 📂style //scss로 style를 컴포넌트 별로 주며, 폴더 구조를 똑같이 함
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📂ui
 ┃ ┣ 📜App.js
 ┃ ┣ 📜firebase.js
 ┃ ┣ 📜index.css
 ┃ ┣ 📜index.js
 ┃ ┣ 📜reportWebVitals.js
 ┃ ┗ 📜setupProxy.js //http proxy 라이브러리 설치 후 config 파일
 ┣ 📜.env // firebase api는 env로 관리
 ┗ 📜package.json
```

- ### server directory

```
📦server
 ┣ 📂Model //몽고db 모델 디렉토리
 ┃ ┣ 📜CounterModel.js
 ┃ ┗ 📜PostModel.js
 ┣ 📂Router //express router
 ┃ ┣ 📜get.js
 ┃ ┗ 📜post.js
 ┣ 📜.env
 ┣ 📜index.js
 ┗ 📜package.json
```

<br>

## ⏲ 개발 기간

- 23.09.21 ~ 미정

<br>

# ❗ 개발 환경

- **Editor** : `vs code 1.77`
- **Runtime** : `Node.js`
- **Framework**
  - client : `react(18.2.0)`
  - server : `express(4.18.2)`
- **Library**
  - client : `axios(1.5.0)` `reduxjs/toolkit(1.9.5)` `http-proxy-middleware(2.0.6)` `firebase(10.4.0)` `sass(1.68.0)`
  - server : `aws-sdk/client-s3(3.417.0)` `aws-sdk/s3-request-presigner(3.418.0)` `express(4.18.2)` `mongodb(6.1.0)` `mongoose(7.5.2)` `multer(1.4.4)` `dotenv(16.3.1)`
- **Cloud service**
  - `AWS EC2` `AWS S3`

<br>

## 📌 주요 기능

#### 파이어베이스 인증 객체로 로그인, 로그아웃

- 파이어베이스 인증 객체를 이용하여 [회원가입](#회원가입), [로그인](#로그인), 로그아웃 기능 구현
- setPersistence로 사용자의 로그인 데이터를 sessionStorage에 저장하여 탭을 닫으면 로그아웃 되로록 옵션을 설정
- 사용자의 [프로필 사진](#프로필-사진)은 파이어베이스 storage에 저장하고 url을 만들어 이미지를 보여준다.
- [닉네임 중복 검사](#닉네임-중복검사)

<br >

#### 게시물

- Create
  - 작성한 글과 사용자 정보를 담아 post 메소드로 서버에 요청을 보낸다.
  - 요청을 받은 서버는 게시글마다 고유의 번호를 주기 위해 몽고db의 Couter를 body에 postNum이라는 새로운 프로퍼티로 추가해 Couter를 할당한다.
  - 몽고db의 Post 모델의 새로운 인스턴스를 만들어 해당 데이터를 저장한다.
  - 게시글이 저장되면 Couter 모델을 $inc로 1 증가시킨다.
  - **이미지 파일은 S3 Bucket에 저장한다** - [코드 보기](#s3-bucket에-이미지-저장)

<br >

- Read

  - App이 랜더링 될 때 get 메소드로 서버에 요청을 보낸다.
  - 서버는 몽고 DB에 저장된 모든 게시글 데이터를 find으로 가져와 클라이언트에 success true와 데이터를 응답한다.
  - 응답을 받은 클라이언트는 데이터를 redux로 관리한다.
  - 게시글을 보여줄 컴포넌트 jsx에 데이터 바인딩한다.
  - **s3 Bucket에 있는 이미지의 url을 생성해 보여준다** - [코드보기](#s3-bucket에-이미지-불러오기)

<br >

- Update

  - 현재 로그인 한 사용자의 uid와 게시글을 올린 사용자의 uid가 일치해야 수정 버튼을 보여준다.
  - 수정 버튼 클릭 시 수정 페이지로 이동하며, 새로 작성한 글을 put 메소드로 서버에 요청을 보낸다.
  - 해당 게시글의 imgId를 찾아 s3 Bucket에서 삭제한다.
  - 새롭게 받은 이미지의 buffer를 sharp로 리사이즈한 후 s3 bucket에 저장한다.

  <br >

- Delete
  - 현재 로그인한 사용자와 게시글에 저장된 사용자의 uid가 일치해야 삭제 버튼을 보여준다.
  - 삭제 버튼 클릭 시 delete 메소드와 해당 게시글의 고유의 postNum을 서버에 요청한다.
  - 요청을 받은 서버는 s3 client의 인스턴스를 만들어 해당 버켓의 이미지를 삭제
  - 몽고db에서 postNum이 일치하는 데이터를 찾아 DeleteOne으로 삭제한다.

<br >

#### 댓글

- Create [-코드보기](#댓글-생성)

  - 작성한 댓글 내용, 작성한 사용자, 해당 게시글의 고유 번호를 담은 데이터와 함께 post 메서드로 서버에 요청합니다
  - 요청을 받은 서버는 해당 데이터를 Comment 모델의 인스턴스를 생성해 저장한다.
  - 게시글의 총 댓글 개수를 반환하기 위해 해당 게시글의 postNum을 inc로 1 증가시킨다.

- Read [-코드보기](#댓글-조회)
  - useEffect로 컴포넌트 랜더링 시 get으로 데이터를 요청한다.

<br>

## 🧾 code review

### 회원가입

- 빈 항목이 있거나 비밀번호 불일치 시 함수를 종료시킨다.
- 유저가 작성한 이메일과 비밀번호를 createUserWithEmailAndPassword함수에 전달한다.
- 회원가입이 완료 됐을 시 alert 알림과 함께 login 페이지로 이동한다.
- 회원가입 실패 시 err.code에 따른 경고문을 보여준다.

```javascript

const handleRegister = async (e) => {
  e.preventDefault();

  if (!(Name && Email && PW && PWConfirm && photo)) {
    alert("모든 항목을 채워주세요");
    return;
  }
  if (PW !== PWConfirm) {
    alert("비밀번호가 일치하지 않습니다");
    return;
  }

  try {
    await createUserWithEmailAndPassword(firebaseAuth, Email, PW);
    alert("회원가입이 완료되었습니다");
    navigate("/login");
  } catch (err) {
   //err.code에 따라 경고문을 보여줌. switch문을 이용..
    }
  }
};

```

<br />

### 프로필 사진

- 회원가입시 사용자가 선택한 파일을 파이어베이스 storage에 저장한다.
- 선택한 사진을 미리 보기 위해 createObjectURL로 임시 url을 생성한다.
- storage 참조를 생성하고 uploadBytes 메소드에 참조와 파일, 옵션을 제공한다.
- getDownloadURL로 저장된 파일의 url을 만들어 사용자 프로필에 업데이트한다.

```javascript
//사용자가 파일을 onChange 할 때마다 임시 url을 생성
useEffect(() => {
  if (photo) {
    const imageUrl = URL.createObjectURL(photo);
    setPhotoUrl(imageUrl);
  }
}, [photo]);

//storage의 참조를 생성하고 uploadBytes에 제공
const storageRef = ref(storage);
const fileRef = ref(storageRef, `${firebaseAuth.currentUser.uid}`);
const metadata = { contentType: photo.type };
await uploadBytes(fileRef, photo, metadata);

const fileUrl = await getDownloadURL(ref(storage, fileRef));

//생성한 url을 사용자 프로필에 업데이트
await updateProfile(firebaseAuth.currentUser, {
  displayName: Name,
  photoURL: fileUrl,
});
```

  <br />

### 로그인

- setPersistence으로 로그인 정보가 sessionStorage에 저장되도록 한다.
- signInWithEmailAndPassword 프로퍼티에 사용자가 입력한 이메일과 비밀번호를 제공하면 로그인 된다.
- err.code에 따라 사용자에게 문제 사항을 알린다.

```javascript
const handleLogin = async (e) => {
  e.preventDefault();
  if (!(Email && PW)) {
    alert("모든 항목을 채워주세요");
    return;
  }

  await setPersistence(firebaseAuth, browserSessionPersistence)
    .then(() => {
      signInWithEmailAndPassword(firebaseAuth, Email, PW)
        .then(() => {
          navigate("/");
        })
        .catch((err) => {
          switch (err.code) {
            case "auth/invalid-email":
              setErrMsg("존재하지 않는 아이디 입니다");
              break;
            case "auth/invalid-login-credentials":
              setErrMsg("잘못된 비밀번호입니다");
              break;
            case "auth/wrong-password":
              setErrMsg("잘못된 비밀번호입니다");
              break;
          }
        });
    })
    .catch((err) => console.log("파이어베이스 로그인", err));
};
```

  <br />

### 닉네임 중복검사

- 작성한 닉네임과 일치하는 user 데이터를 findOne로 찾는다.
- 반환 값이 false라면 사용할 수 있는 닉네임으로 판단한다.

```javascript
router.post("/user/namecheck", (req, res) => {
  User.findOne({ displayName: req.body.displayName })
    .exec()
    .then((doc) => {
      if (!doc) {
        res.send({ success: true, check: true });
      } else {
        res.send({ success: true, check: false });
      }
    })
    .catch((err) => console.log(err));
});
```

<br />

### S3 Bucket에 이미지 저장

- client에서 FormData 인스턴스로 이미지 파일을 서버에 전달
- 서버는 multer로 이미지 파일을 요청 받음
- 받은 파일은 sharp로 데이터 조작(사이즈만 조절)
- 정보는 mongoDB의 저장
- Buffer는 PutObjectCommand로 S3 Bucket에 send

```javascript
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }); //받아온 파일은 폴더가 아닌 메모리에 저장하기 위함

const randomImageName = () => crypto.randomBytes(32).toString("hex"); //crypto로 랜덤 숫자를 만들어 이미지 고유의 Id로 전달한다.

router.post("/images", upload.single("image"), async (req, res) => {
  //sharp로 Buffer 데이터 조작 생략...

  //몽고db에 전달할 이미지 정보 객체 만듦
  const imgInfor = {
    name: req.file.originalname,
    imgId: randomImageName(),
    caption: req.body.caption,
  };

  //몽고 db 이미지 데이터 모델을 가져와 인스턴스 생성, save로 저장
  const imgData = new Image(imgInfor);
  imgData.save();

  //PutObjectCommand에 전달할 이미지 데이터 객체 생성
  const params = {
    Bucket: bucketName,
    Key: imgInfor.imgId,
    Body: resizeImg,
    ContentType: req.file.mimetype,
  };

  //버켓에 전달할 인스턴스 생성
  const putObject = new PutObjectCommand(params);

  //s3 client로 버켓에 이미지 데이터를 전달.
  try {
    await s3.send(putObject);
    res.status(200).send({ success: true, imgData: imgInfor });
  } catch (error) {
    console.error("Error uploading to S3:", error);
    res.status(500).send({ success: false, error: "Error uploading to S3" });
  }
});
```

<br>

### S3 Bucket에 이미지 불러오기

- S3와 연결하는 역할을 하는 S3client의 인스턴스를 생성해 bucket의 정보를 객체형태로 전달
- GetObjectCommand 객체로 bucket에 저장된 이미지를 불러온다.
- getSignedUrl 메서드로 이미지의 Url을 생성한다.

```javascript
const s3Client = new S3Client({
  region: bucketRegion,
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
}); //s3와 연결하기 위해 S3client 인스턴스 생성

for (const post of posts) {
  //모든 이미지를 불러올 것이기 때문에 for 문 작성

  const getObjectParams = {
    Bucket: bucketName,
    Key: post.img.imgId,
  }; //해당 버켓 이름과 가져올 이미지의 고유의 id를 객체 리터럴로 생성

  const command = new GetObjectCommand(getObjectParams);

  const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); //초단위
  post.img.imgUrl = url;
}
```

<br>

### 댓글 CRUD

- ##### 댓글 생성

```javascript
//client

const handleSubmit = (e) => {
  e.preventDefault();

  // 로그인 하지 않았거나 댓글의 내용이 없으면 return 하는 조건문 생략..

  const body = {
    reple: reple,
    user: user,
    postNum: Number(postNum),
  };

  axios
    .post("/api/post/reple", body)
    .then((res) => {
      res.data.success && alert("댓글 작성이 성공하였습니다");
      setReple("");
    })
    .catch((err) => {
      console.log(err);
      alert("댓글 작성이 실패하였습니다.");
    });
};

//server

router.post("/post/reple", (req, res) => {
  let temp = {
    reple: req.body.reple,
    user: req.body.user,
    postNum: req.body.postNum,
  };

  User.findOne({ uid: req.body.user.uid })
    .exec()
    .then(() => {
      const NewComment = new Comment(temp);
      NewComment.save().then(() => {
        Post.findOneAndUpdate(
          { postNum: req.body.postNum },
          { $inc: { repleNum: 1 } }
        ).then(() => {
          res.status(200).send({ success: true });
        });
      });
    });
});
```

- ##### 댓글 조회

```javascript
//client

useEffect(() => {
  axios
    .get("/api/reple", { params: { postNum: params.postNum } })
    .then((res) => {
      if (res.data.success) {
        setRepleList([...res.data.repleList]);
        setRepleNum(res.data.repleNum);
      }
    });
}, []);

//server
router.get("/reple", (req, res) => {
  Comment.find({ postNum: req.query.postNum })
    .then((doc) => {
      res.status(200).send({ success: true, repleList: doc });
    })
    .catch(() => {
      res.status(400).send({ success: false });
    });
});
```

## 🙏 참고한 게시글

- _몽고DB 연결_ <br />
  https://jin-co.tistory.com/130

- _파이어베이스 회원가입, 로그인_ <br />
  https://velog.io/@zmin9/React-Firebase-Authentication-%EC%9D%B4%EC%9A%A9%ED%95%B4%EC%84%9C-%EC%9D%B4%EB%A9%94%EC%9D%BC-%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85%EB%A1%9C%EA%B7%B8%EC%9D%B8

- _클라이언트에서 서버로 이미지 보내기(FormData)_ <br />
  https://velog.io/@3436rngus/React-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%97%85%EB%A1%9C%EB%93%9C%EC%8B%9C%EC%97%90-Form-Data-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0
  <br />
  https://inpa.tistory.com/entry/JS-%F0%9F%93%9A-FormData-%EC%A0%95%EB%A6%AC-fetch-api

- _s3에 이미지 업로드_ <br />
  https://www.youtube.com/watch?v=eQAIojcArRY&ab_channel=SamMeech-Ward

- 이미지에 랜덤숫자 부여(고유 아이디)<br />
  https://www.geeksforgeeks.org/node-js-crypto-randombytes-method/

- 파이어베이스 새로고침 시 로그인 유지 <br />
  https://velog.io/@project_mizzu/React%EB%A1%9C-Firebase-%EC%86%8C%EC%85%9C%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0

- 파이어베이스 프로필 사진 업로드 <br />
  https://hayley-0616.tistory.com/57 <br />
  https://velog.io/@wlwl99/Firebase-Cloud-Storage
