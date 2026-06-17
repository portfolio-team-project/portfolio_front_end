# 팀 포트폴리오

React + TypeScript + Vite 기반의 팀 포트폴리오 프론트엔드입니다.

## 기술 스택

| 분류 | 기술 |
|------|------|
| **Framework** | React 19, TypeScript |
| **Build** | Vite |
| **State** | Redux Toolkit, React-Redux |
| **Routing** | React Router DOM v7 |
| **HTTP** | Axios |
| **Editor** | Tiptap |
| **UI** | react-hot-toast |

## 폴더 구조

```
src/
├── api/
│   └── axiosInstance.ts           # Axios 인스턴스 (interceptor 포함)
├── assets/
│   ├── image/                     # 일반 이미지
│   ├── profile/                   # 프로필 이미지
│   ├── github.svg
│   └── kakao.svg
├── constants/
│   └── messageConstants.ts        # 공통 메시지 상수
├── components/
│   ├── layout/
│   │   ├── Header.tsx             # 네비게이션, 프로필 드롭다운
│   │   ├── Footer.tsx
│   │   ├── Layout.tsx             # Header + Footer 레이아웃
│   │   ├── HeaderOnlyLayout.tsx   # Header만 있는 레이아웃
│   │   ├── PrivateRoute.tsx       # 로그인 인증 라우트 가드
│   │   └── ContactModal.tsx
│   └── pages/
│       ├── main/
│       │   ├── EntryPage.tsx      # 메인 진입 페이지
│       │   ├── SangwonPage.tsx    # 지상원 포트폴리오
│       │   └── EuigwangPage.tsx   # 이의광 포트폴리오
│       ├── admin/
│       │   ├── adminPage.tsx      # 관리자 페이지
│       │   └── AdminMemberModal.tsx
│       ├── member/
│       │   ├── Login.tsx          # 로그인
│       │   ├── Accession.tsx      # 회원가입
│       │   ├── FindPassword.tsx   # 비밀번호 찾기 (이메일 인증)
│       │   ├── ChangePassword.tsx # 비밀번호 변경
│       │   ├── AccountPage.tsx    # 계정 설정
│       │   ├── Withdraw.tsx       # 회원 탈퇴
│       │   └── KakaoCallback.tsx  # 카카오 로그인 콜백
│       └── qna/
│           ├── Qna.tsx
│           ├── BoardList.tsx
│           ├── Boardwrite.tsx
│           └── Faq.tsx
├── slices/
│   ├── memberSlice.ts
│   ├── qnaSlice.ts
│   └── adminSlice.ts
├── store/
│   ├── store.ts
│   └── hooks.ts
├── types/
│   ├── member.ts
│   ├── Accession.ts
│   ├── BoardList.ts
│   └── qna.ts
├── App.tsx
├── App.css
└── main.tsx
```

## 라우트 구조

| 경로 | 컴포넌트 | 인증 필요 |
|------|----------|----------|
| `/` | EntryPage | - |
| `/sangwon` | SangwonPage | - |
| `/euigwang` | EuigwangPage | - |
| `/qna` | Qna | - |
| `/faq` | Faq | - |
| `/BoardList` | BoardList | O |
| `/Boardwrite` | Boardwrite | O |
| `/login` | Login | - |
| `/accession` | Accession | - |
| `/find-password` | FindPassword | - |
| `/change-password` | ChangePassword | - |
| `/account` | AccountPage | - |
| `/withdraw` | Withdraw | - |
| `/admin` | AdminPage | - |
| `/kakao/callback` | KakaoCallback | - |

## 환경 변수

`.env` 파일을 루트에 생성하고 아래 값을 설정하세요.

```env
VITE_API_URL=http://your-api-server
VITE_REST_API_KEY=카카오_REST_API_KEY
VITE_REDIRECT_URL=http://your-redirect-url
VITE_CHECK_AUTH=관리자_권한_코드
```

## 시작하기

### 1. Git 설치

[https://git-scm.com](https://git-scm.com) 에서 Git을 다운로드하여 설치합니다.

### 2. Node.js 설치

[https://nodejs.org](https://nodejs.org) 에서 LTS 버전을 다운로드하여 설치합니다.

### 3. 클론 및 설치

```bash
git clone https://github.com/portfolio-team-project/portfolio_front_end.git
cd portfolio_front_end
npm install
```

### 4. 개발 서버 실행

```bash
npm run dev
```

### 5. 빌드

```bash
npm run build
```

## 팀원

| 이름 | 역할 |
|------|------|
| 지상원 | Backend |
| 이의광 | Fullstack · Infra |
