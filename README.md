# 2-Forest-of-Study-4-FE

개인 공부 관리 및 커뮤니티 서비스 공부의 숲 FE

## 프로젝트 소개

### 제목: 공부의 숲

#### 소개: 개인 공부 관리 및 커뮤니티 서비스

최근 몇 년간 올바른 습관의 정착에 대한 사람들의 관심이 높아지고 있고, 그중에서도 '조금씩 습관을 들이기'에 대한 이론이 각광받고 있습니다. 따라서 개인이 학습할 내용을 정리할 스터디를 만들고, 하루동안 수행할 공부를 관리하며 집중 타이머 기능을 제공해 잘 수행할 때마다 포인트를 제공하는 서비스를 제작합니다.

## 팀원 구성

| 김윤서                                                                           | 김경호                                                                           | 김민선                                                                           | 김차현                                                                           | 천우승                                                                            |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| <img src="https://avatars.githubusercontent.com/u/168805133?v=4" width="200px"/> | <img src="https://avatars.githubusercontent.com/u/176007766?v=4" width="200px"/> | <img src="https://avatars.githubusercontent.com/u/164968618?v=4" width="200px"/> | <img src= "https://avatars.githubusercontent.com/u/39423417?v=4" width="200px"/> | <img src= "https://avatars.githubusercontent.com/u/174844724?v=4" width="200px"/> |
| [(Hi-Yoonseo)](https://github.com/Hi-Yoonseo)                                    | [(ganghoho)](https://github.com/ganghoho)                                        | [(alscksdlek)](https://github.com/alscksdlek)                                    | [(rlackgus)](https://github.com/rlackgus)                                        | [(MingmungXD)](https://github.com/MingmungXD)                                     |

<br><br>

## 기술 스택

Frontend: JavaScript, React.js, CSS (Netlify에 배포)

Backend: Express.js, PrismaORM (Render에 배포)

Database: PostgreSQL

공통 Tool: Git & Github, Discord, VS Code

## 역할분담

### 김윤서

- 스터디 공유하기 기능 구현
- 스터디 삭제+수정 기능 구현 (권한 확인 후 수정 페이지로 이동)
- Notion / github / 발표 자료 제작
- 데일리 팀별 브리핑 발표
- 회의록 작성
- 스터디용 모달,toast 개발

### 김경호

- 오늘의 집중 페이지 구현
- 타이머 기능 구현 및 수정,시간초과 등 상황별 화면 구현
- 포인트 적립기능 구현

### 김민선

- 공통 컴포넌트 GNB(Global Navigation), header 개발, 모달 디자인 수정
- 오늘의 습관 페이지 로딩 표시 및 빈 배열 처리 추가
- 습관 check 상태 자정 초기화 기능 추가
- 스터디+스터디 상세+오늘의 습관 페이지 연결
- 습관 수정 및 삭제 기능 추가
- 습관 조회 API 적용 및 check 상태 업데이트 기능 추가
- FE/BE 프로젝트 기초 세팅 개발
- 오늘의 습관 페이지 구현 (현재시간, 오늘의 습관 title, 오늘의 습관 list)
- 오늘의 습관 API 기능 추가 및 render 배포
- controller 병합
- emoji controller 연결
- 데이터베이스 시딩
- 쿼리 파라미터를 이용한 페이지 라우팅

### 김차현

- 공통 컴포넌트 Toast 개발
- 스터디 리스트 페이지 + 스터디 만들기 페이지 렌더링 (스터디 정보입력)
- 스터디 리스트 페이지 포인트 및 이모지, 진행일수 연동
- 스터디 생성 및 목록 프론트엔드 api 연동
- 스터디 만들기 페이지 redirection기능 및 배경선택 defalult값 추가, 패스워드 input 태그 토글기능 추가
- 스터디 만들기 페이지 정보 전부 입력시 만들기 기능 활성화되는 로직 구현
- 스터디 리스트, 스터디 만들기 페이지 API 엔드포인트 설계 및 스키마 수정
- 스터디 리스트, 스터디 만들기 페이지 API 구현
- 쿼리 파라미터를 이용한 페이지 라우팅
- 스터디 리스트 페이지 더보기버튼, 검색기능, 드롭다운리스트 구현

### 천우승

- 스터디 상세 페이지 기록표 조회 페이지 구현
- 습관 기록표 제작
- 이모지 기능 및 이모지 개수 추가
- 중간발표 및 최종 발표때 공통 개요 발표
- 공용 컴포넌트 모달 구현

## 파일 구조

```
📦 프로젝트 루트
┣ 📜.gitignore
┣ 📜package-lock.json
┣ 📜package.json
┣ 📜README.md
┣ 📂public
┃ ┣ 📜favicon.png
┃ ┗ 📜index.html
┣ 📂src
┃ ┣ 📂API
┃ ┃ ┣ 📜StudyAPI.js
┃ ┃ ┗ 📜UserAPI.js
┃ ┣ 📂components
┃ ┃ ┣ 📜CreateStudyPage.js
┃ ┃ ┣ 📜StudyListPage.js
┃ ┃ ┗ 📜Toast.js
┃ ┣ 📂utils
┃ ┃ ┣ 📜validateForm.js
┃ ┃ ┗ 📜localStorageHelper.js
┃ ┣ 📂pages
┃ ┃ ┣ 📜HabitPage.js
┃ ┃ ┣ 📜testPage.js
┃ ┃ ┣ 📜Timer.js
┃ ┃ ┗ 📜CreateStudyPage.js
┃ ┗ 📂StudyDetail
┃ ┣ 📜Emoji.js
┃ ┣ 📜HabitRecord.js
┃ ┣ 📜Introduce.js
┃ ┣ 📜StudyDashboard.js
┃ ┗ 📜StudyDetail.js
┣ 📂styles
┃ ┗ 📜global.css
┗ 📜App.js
```

# 팀 내 컨벤션

## 기본적인 규칙

- **들여쓰기**:
  - **2칸**으로 고정.
- **연산자 앞뒤 공백**:
  - 연산자(`=`, `+`, `, `, `/`, `==`, `&&`, `||` 등) 앞뒤에 **공백**을 넣어 가독성 확보.
- **주석**:
  - 단일 줄 주석(`//`)을 사용해 코드 블록의 간단한 설명 추가.
  - 코드의 목적과 흐름을 명확하게 하기 위해 주석을 **충분히 작성** (나만 읽는 게 아니라는 점 고려).
- **코드 블록의 정리**:
  - **같은 기능**을 수행하는 코드들은 가급적 **함께** 모아서 정리.
- **조건문**:
  - 간단한 조건문은 **삼항 연산자**를 사용해 한 줄로 작성.
- **세미콜론 사용**:
  - **세미콜론을 사용하는 방향**으로 통일.
- **빈 줄 활용**:
  - 적절한 위치에 **빈 줄**을 추가해 가독성을 높이기.

## 네이밍 컨벤션

- React 컴포넌트 파일은 PascalCase사용
- 다른 유틸리티 파일이나 훅 파일은 CamelCase
- 변수 및 함수 이름은 CamelCase
- 상수 이름은 대문자 snake_case
- 컴포넌트 이름은 PascalCase
- 커스텀 훅은 커스텀 훅 이름은 항상 use로 시작하고 그 기능을 설명하는 CamelCase
- 이벤트 핸들러는 handle + 이벤트명 CamelCased

## Git 컨벤션

| Type 키워드 | 사용 시점                                                             |
| ----------- | --------------------------------------------------------------------- |
| feat        | 새로운 기능 추가                                                      |
| fix         | 버그 수정                                                             |
| docs        | 문서 수정                                                             |
| style       | 코드 스타일 변경 (코드 포매팅, 세미콜론 누락 등)기능 수정이 없는 경우 |
| design      | 사용자 UI 디자인 변경 (CSS 등)                                        |
| test        | 테스트 코드, 리팩토링 테스트 코드 추가                                |
| refactor    | 코드 리팩토링                                                         |
| build       | 빌드 파일 수정                                                        |
| ci          | CI 설정 파일 수정                                                     |
| perf        | 성능 개선                                                             |
| chore       | 빌드 업무 수정, 패키지 매니저 수정 (gitignore 수정 등)                |
| rename      | 파일 혹은 폴더명을 수정만 한 경우                                     |
| remove      | 파일을 삭제만 한 경우                                                 |

## 관련 이슈

| 사용 시점 | 사용 키워드                                 |
| --------- | ------------------------------------------- |
| 해결      | Closes(종료), Fixes(수정), Resolves(해결)   |
| 참고      | Ref(참고), Related to(관련), See also(참고) |

## 구현 홈페이지

## 구현 홈페이지

![Page 1](/imgs/page1.png)
![Page 2](/imgs/page2.png)
![Page 3](/imgs/page3.png)
![Page 4](/imgs/page4.png)
![Page 5](/imgs/page5.png)
![Page 6](/imgs/page6.png)
![Page 7](/imgs/page7.png)
![Page 8](/imgs/page8.png)
![Page 9](/imgs/page9.png)
