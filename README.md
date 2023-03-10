# Would, U?
> 친구와 함께 일기를 작성하고 서로의 감정을 돌아볼 수 있는 서비스

## 프로젝트 개요

![로고](./front/public/mainlogo.png)

- 개발 기간: 2022-11-14 ~ 2022-12-16
- 서비스 링크: ~~[https://kdt-ai5-team05.elicecoding.com](https://kdt-ai5-team05.elicecoding.com/)~~ (배포 중단)
- 본 프로젝트의 구조를 더 자세히 알고 싶다면?
  - [백엔드 README](./back/README.md)
  - [프론트엔드 README](./front/README.md)
  - [AI README](./ai/README.md)

## 기술 스택
`Front-End` 

<img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white"/>
<img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/ReactQuery-FF4154?style=flat-square&logo=ReactQuery&logoColor=white"/>
<img src="https://img.shields.io/badge/Recoil-black?style=flat-square&logo=Recoil&logoColor=white"/>
<img src="https://img.shields.io/badge/styledcomponents-DB7093?style=flat-square&logo=styled-components&logoColor=white"/>
<img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=Axios&logoColor=white"/>
<img src="https://img.shields.io/badge/ReactHookForm-EC5990?style=flat-square&logo=ReactHookForm&logoColor=white"/>


`Back-end`

<img src="https://img.shields.io/badge/Nest.js-E0234E?style=flat-square&logo=Nestjs&logoColor=white">
<img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/mysql-4479A1?style=flat-square&logo=mysql&logoColor=white">

`AI`

<img src="https://img.shields.io/badge/Tensorflow-FF6F00?style=flat-square&logo=TensorFlow&logoColor=white">
<img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=Docker&logoColor=white">
<img src="https://img.shields.io/badge/Flask-000000?style=flat-square&logo=Flask&logoColor=white">

## 실행 방법

1. 프로젝트 레포지토리를 클론합니다.

```sh
$ git clone https://kdt-gitlab.elice.io/ai_track/class05/ai_project/team05/team05.git
```

2. 프로젝트 실행에 필요한 패키지를 설치합니다.

```sh
$ cd front
$ npm i

$ cd back
$ npm i
```

3. development server을 실행합니다.
```sh
$ npm run dev
# or
$ yarn dev
```

## 주요 기능

### ✏ 소중한 사람과 **공용 일기장**을 만들어 서로의 일상을 공유할 수 있어요.  
  <img src="/uploads/ae6b90ccf2d9100625d9db6ec4e10384/connect1.PNG" height="300">
  <img src="/uploads/13b842d222ff2ea2d93f56faf4f1e493/connect2.PNG" height="300">
  <img src="/uploads/ed4e1fbd091b2dd5ae5669cd47150820/diarylist.PNG" height="300">
  <img src="/uploads/9c0423b294ff4a2343f07da297c43d27/calendar.PNG" height="300">

+ 마이페이지
  + 유저 코드를 입력하여 친구 요청
  + 알림을 통해 친구 요청을 수락하거나 거절
  + 수락 시 공용 일기장 생성
  + 일기장 이름 수정 가능

+ 교환일기
  + 월 별 일기 기록 제공
  + 정확한 감정 분석을 위해 일기 작성은 당일 한 번만 가능 (수정 및 삭제 불가능)
  + 일기 작성 시 자동으로 감정을 분석
  + 일기 작성 당일 자정이 지나는 시점에 기분 전환할 수 있는 활동을 추천
+ 홈
  + 분석된 감정 기록을 캘린더 형태로 제공 (나 & 상대방)

### 📌 추천받은 활동을 포함한 사용자의 일정을 **투두 리스트**로 관리할 수 있어요.   
  <img src="/uploads/67bbe012d2e357de23bd7b88d268ff87/todo.PNG" height="300">
  <img src="/uploads/8e1c8a897b22b1db667f109b5a7b7416/stamptod.PNG" height="300">

+ 일정 관리
  + 추천받은 활동은 자동으로 투두 리스트에 추가
  + 사용자가 직접 투두 리스트 생성, 수정, 삭제 가능
  + 월 별로 일정을 보여 줌
  + 완료 표시 가능

### ⚙ 내 정보를 간편하게 관리할 수 있어요.
  <img src="/uploads/188c742576476a35e9c7e7499aa6f78b/mypage.PNG" height="300">
  <img src="/uploads/3de2f576e86b79fa102d874c9aa4d3a1/connectedit.PNG" height="300">
  
+ 마이페이지
  + 닉네임, 비밀번호, 일기장 이름 수정 가능
  + 최적화된 활동 추천을 위한 관심 분야 설정 가능
  + 연결 끊기, 회원 탈퇴 가능

## 부가 기능

* 소셜 로그인 (카카오)
* 반응형 웹 디자인
* react-error-boundary 사용하여 폴백 UI로 에러 화면 구성
* 전역 style 정의하여 라이트/다크 모드 구현

## 팀원 소개

| 이름 | 포지션 | Contact |
| --- | --- | --- |
| 송태원 | AI | stw8194@gmail.com |
| 신채민 | BE | chaemins193@gmail.com |
| 남궁혜진 | FE | hjinnny@naver.com |
| 박지연 | FE | https://github.com/yeoooon |
| 임정은 | FE | zzeong315@gmail.com |
