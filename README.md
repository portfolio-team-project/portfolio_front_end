# 팀 포트폴리오 & 작물 관리 플랫폼

React + TypeScript + Vite 기반의 팀 포트폴리오 및 작물 관리 플랫폼 프론트엔드입니다.

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
│   └── axiosInstance.ts       # Axios 인스턴스 (interceptor 포함)
├── assets/                    # 이미지, 아이콘
├── components/
│   ├── main/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Layout.tsx
│   │   ├── HeaderOnlyLayout.tsx
│   │   └── PrivateRoute.tsx
│   └── pages/
│       ├── main/
│       │   ├── EntryPage.tsx
│       │   ├── SangwonPage.tsx
│       │   └── EuigwangPage.tsx
│       ├── member/
│       │   ├── Login.tsx
│       │   ├── Accession.tsx
│       │   └── FindPassword.tsx
│       └── qna/
│           ├── qna.tsx
│           ├── BoardList.tsx
│           ├── Boardwrite.tsx
│           └── faq.tsx
├── slices/
│   ├── memberSlice.ts
│   └── qnaSlice.ts
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

## 환경 변수

`.env` 파일을 루트에 생성하고 아래 값을 설정하세요.

```env
VITE_API_URL=http://your-api-server
VITE_REST_API_KEY=카카오_REST_API_KEY
VITE_REDIRECT_URL=http://your-redirect-url
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
| 지상원 | Frontend |
| 이의광 | Fullstack · Backend · Infra |
