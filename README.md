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

❗이슈 관리, project 관리

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
