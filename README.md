# team

React + TypeScript + Vite + Redux Toolkit 기반 프로젝트입니다.

## 기술 스택

- **React 19**
- **TypeScript**
- **Vite**
- **Redux Toolkit** + **React-Redux**

## 폴더 구조

```
team/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── store/
│   │   ├── index.ts       # configureStore, RootState, AppDispatch
│   │   └── hooks.ts       # useAppDispatch, useAppSelector
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx           # Provider 연결
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## 프로젝트 가져오기

### 1. Git 설치

[https://git-scm.com](https://git-scm.com) 에서 Git을 다운로드하여 설치합니다.

### 2. Node.js 설치

[https://nodejs.org](https://nodejs.org) 에서 LTS 버전을 다운로드하여 설치합니다.

### 3. VSCode에서 클론

VSCode를 열고 터미널을 실행합니다. (`Ctrl + 백틱`)

```bash
git clone https://github.com/portfolio-team-project/portfolio_front_end.git
cd portfolio_front_end
```

## 시작하기

```bash
npm install
npm run dev
```

## 빌드

```bash
npm run build
```
