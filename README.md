# 🎇목차

1. [💻 프로젝트 소개](#-프로젝트-소개)
2. [📁 directory 구조](#-directory-구조)
3. [⏲ 개발 기간](#-개발-기간)
4. [❗ 개발 환경](#-개발-환경)
5. [📌 주요 기능](#-주요-기능)
6. [🧾 code review](#-code-review)
7. [📢 Project review](#-project-review)

<br>

## 💻 프로젝트 소개

<br>

- `url` :
- 자주 쓰는

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

#### 파이어베이스 인증 객체로 로그인, 로그아웃 - [코드 보기](#파이어베이스로-로그인-로그아웃-기능)

- 파이어베이스 인증 객체를 이용하여 로그인, 로그아웃 기능 구현
- setPersistence로 사용자의 로그인 데이터를 sessionStorage에 저장하여 탭을 닫으면 로그아웃 되로록 옵션을 설정
- 사용자의 프로필 사진은 파이어베이스 storage에 저장하고 url을 만들어 이미지를 보여준다.
- 닉네임 중복 검사

<br >

#### 게시물 불러오기

- App이 랜더링 될 때 get 메소드로 서버에 요청을 보낸다.
- 서버는 몽고 DB에 저장된 모든 게시글 데이터를 find으로 가져와 클라이언트에 success true와 데이터를 응답한다.
- 응답을 받은 클라이언트는 데이터를 redux로 관리한다.
- 게시글을 보여줄 컴포넌트 jsx에 데이터 바인딩한다.
- **s3 Bucket에 있는 이미지의 url을 가져와 이미지를 보여준다** - [코드보기](#s3-bucket에-이미지-불러오기)

<br >

#### 게시물 작성하기

- 작성한 글과 사용자 정보를 담아 post 메소드로 서버에 요청을 보낸다.
- 요청을 받은 서버는 게시글마다 고유의 번호를 주기 위해 몽고db의 Couter를 body에 postNum이라는 새로운 프로퍼티로 추가해 Couter를 할당한다.
- 몽고db의 Post 모델의 새로운 인스턴스를 만들어 해당 데이터를 저장한다.
- 게시글이 저장되면 Couter 모델을 $inc로 1 증가시킨다.
- **이미지 파일은 S3 Bucket에 저장한다** - [코드 보기](#s3-bucket에-이미지-저장)

<br >

#### 게시물 수정하기

- 현재 로그인 한 사용자의 uid와 게시글을 올린 사용자의 uid가 일치해야 수정 버튼을 보여준다.
- 수정 버튼 클릭 시 수정 페이지로 이동하며, 새로 작성한 글을 put 메소드로 서버에 요청을 보낸다.
- 해당 게시글의 imgId를 찾아 s3 Bucket에서 삭제한다.
- 새롭게 받은 이미지의 buffer를 sharp로 리사이즈한 후 s3 bucket에 저장한다.

<br >

#### 게시물 삭제하기

- 현재 로그인한 사용자와 게시글에 저장된 사용자의 uid가 일치해야 삭제 버튼을 보여준다.
- 삭제 버튼 클릭 시 delete 메소드와 해당 게시글의 고유의 postNum을 서버에 요청한다.
- 요청을 받은 서버는 s3 client의 인스턴스를 만들어 해당 버켓의 이미지를 삭제
- 몽고db에서 postNum이 일치하는 데이터를 찾아 DeleteOne으로 삭제한다.

<br >

#### 댓글 달기

<br>

#### 검색하기

<br>

#### 검색하기

<br>

## 🧾 code review

- ### 파이어베이스로 로그인, 로그아웃 기능

  - 로그인

  ```javascript

  ```

- ### S3 Bucket에 이미지 저장
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

- ### S3 Bucket에 이미지 불러오기

```javascript

```

## 📢 Project review

❗기능

로그인 및 로그아웃 - 닉네임 중복검사
글 쓰기
글 수정
글 삭제
페이지네이션
게시글 조회
조회수
댓글 - 수정, 삭제
❗브랜치 관리 main develop client 랑 server 따로 만들어서 별도로 분리하고 merge는 develop에서 반드시 기능별로 커밋하기 기능 짤 때마다 feature/login(c) feature/login/(s) 나눠서 프론트 단 백 단 브랜치 구분해서 올려! add 할 때 폴더 구분

참고한 게시물

- 파이어베이스 회원가입, 로그인 <br />
  https://velog.io/@zmin9/React-Firebase-Authentication-%EC%9D%B4%EC%9A%A9%ED%95%B4%EC%84%9C-%EC%9D%B4%EB%A9%94%EC%9D%BC-%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85%EB%A1%9C%EA%B7%B8%EC%9D%B8

- 몽고DB 연결 <br />
  https://jin-co.tistory.com/130

- 클라이언트에서 서버로 이미지 보내기(FormData) <br />
  https://velog.io/@3436rngus/React-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%97%85%EB%A1%9C%EB%93%9C%EC%8B%9C%EC%97%90-Form-Data-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0
  <br />
  https://inpa.tistory.com/entry/JS-%F0%9F%93%9A-FormData-%EC%A0%95%EB%A6%AC-fetch-api

- s3에 이미지 업로드 <br />
  리액트 <br />
  https://velog.io/@3436rngus/React-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%97%85%EB%A1%9C%EB%93%9C%EC%8B%9C%EC%97%90-Form-Data-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0
  <br />
  서버 <br />
  https://www.youtube.com/watch?v=eQAIojcArRY&ab_channel=SamMeech-Ward

- 파이어베이스 새로고침 시 로그인 유지 안되는 문제 발견 <br />
  setPersistence 의 기본값 local로 웹을 꺼도 사용자 정보가 저장되어 있으나.. <br />
  전체 F5 하면 사용자 정보가 저장된 redux가 초기화 되는 문제였다. <br />
  https://velog.io/@project_mizzu/React%EB%A1%9C-Firebase-%EC%86%8C%EC%85%9C%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0
- 파이어베이스 프로필 사진 업로드 <br />
  https://hayley-0616.tistory.com/57 <br />
  https://velog.io/@wlwl99/Firebase-Cloud-Storage<br />

s3 butket 이미지 업로드

1. 클라이언트

- formdata 객체의 인스턴스를 만든다. (form 데이터를 잘 전달하기 위한 객체)
- 클릭한 이미지 파일을 formdata에 append 한다
- axios로 post 요청 시 해당 인스턴스와 hearder 옵션 "Content-Type": "multipart/form-data"임을 객체로 꼭 명시 콘솔 network 에서 확인 가능

2. 서버

- 멀티 데이터는 서버와 클라이언트가 주고 받을 수 없는 형식임(서버랑은 문자열만)
- 때문에 multer 라이르러리 저장공간은 폴더가 아닌 storage 메모리에 저장할거임

- s3 버켓과의 연결은 aws/s3client 라이브러리 사용
- 해당 버켓의 이름, 리전 그리고 iam의 액세스, 비밀 액세스 키를 env에 담아 가져옴
- S3Client 인스턴스에 리전 ,액세스키, 시크릿 키
- PutObjectCommand 에게 전달해줄 params는 해당 이미지의 데이터들
- await s3.send(putObject); 로 s3에 전달해주면 끝!!!!!!

업로드 하는 이미지의 이름이 같으면 이전 파일을 새 파일로 완전이 덮어쓰게 됨
사용자가 같은 이름의 이미지가 같으면 뒤집어 쓴다는 것
때문에 params의 key이름은 완전히 고유하게 만들어야 한다.
crypto로 랜덤 이미지 숫자(비트) 만들기 <br />
https://www.geeksforgeeks.org/node-js-crypto-randombytes-method/

이미지 s3 올리기 전 리사이즈 - 라이브러리 sharp 공식문서 그대로 갖다 쓰면 됨

s3에 저장된 이미지는 나만 볼 수 있기 때문에
서버에서 임시 url 생성해서 사용자에게 전달해 사용자도 볼 수 있게 함
라이브러리 aws-sdk/s3-request-presigner
