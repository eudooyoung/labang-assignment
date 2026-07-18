# 씨브이쓰리 기술과제

## 실행 환경

- Git
- Node.js 24+

## 실행 순서

- 프로젝트 복사: `git clone https://github.com/eudooyoung/labang-assignment.git`
- 앱 설치: `cd labang-assignment && npm install`
- **환경 변수 설정**:  
  .env.example을 복사하여 .env파일을 생성한 후 각 값을 입력하세요.

  ```
  VITE_USERNAME=<라방바_아이디>
  VITE_PASSWORD=<라방바_비밀번호>
  ```

- 앱 구동: `npm run dev`
- 앱 접속: 브라우저 주소창에 콘솔에 출력된 주소(기본: `http://localhost:5173/`)를 입력합니다.

## 앱 설명

- 로그인 & 로그아웃 버튼으로 인증 상태를 변경합니다.
- 라방 & 홈쇼핑 토글 버튼으로 방송 유형을 전환합니다.
- 방송 제목을 클릭하여 방송 분석 페이지로 이동합니다.
- 분류명을 클릭하여 해당 분류 분석 페이지로 이동합니다.
