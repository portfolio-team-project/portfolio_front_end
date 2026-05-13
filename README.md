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

## 시작하기

```bash
npm install
npm run dev
```

## 빌드

```bash
npm run build
```
