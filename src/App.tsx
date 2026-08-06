import {Provider} from "react-redux";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import './App.css'
import store from "./store/store";
import EntryPage from "./components/pages/main/EntryPage";
import Layout from "./components/layout/Layout";
import SangwonPage from "./components/pages/main/SangwonPage";
import EuigwangPage from "./components/pages/main/EuigwangPage";
import QnA from "./components/pages/qna/Qna";
import BoardList from "./components/pages/qna/BoardList";
import Boardwrite from "./components/pages/qna/Boardwrite";
import BoardDetail from "./components/pages/qna/BoardDetail";
import QnaGuestWrite from "./components/pages/qna/QnaGuestWrite";
import QnaMemberWrite from "./components/pages/qna/QnaMemberWrite";
import Accession from "./components/pages/member/Accession";
import Login from "./components/pages/member/Login";
import HeaderOnlyLayout from "./components/layout/HeaderOnlyLayout";
import PrivateRoute from "./components/layout/PrivateRoute";
import { Toaster } from "react-hot-toast";
import FindPassword from "./components/pages/member/FindPassword";
import KakaoCallback from "./components/pages/member/KakaoCallback";
import ChangePassword from "./components/pages/member/ChangePassword";
import Withdraw from "./components/pages/member/Withdraw";
import AccountPage from "./components/pages/member/AccountPage";
import AdminPage from "./components/pages/admin/adminPage";
import { useEffect } from "react";
import { refreshAccessToken } from "./slices/memberSlice";
import ChatWidget from "./components/layout/ChatWidget";

function App() {
  // App.tsx
  useEffect(() => {
    store.dispatch(refreshAccessToken()); // 앱 시작 시 자동으로 refresh 시도
  }, []);


  return (
    <Provider store={store}>
      <Toaster position="top-center" />
      <Router>
        <Routes>
          <Route path="/" element={<EntryPage />} />
          <Route element={<Layout />}>
            <Route path="/sangwon" element={<SangwonPage />} />
            <Route path="/euigwang" element={<EuigwangPage />} />
            <Route path="/qna" element={<QnA />} />
            <Route path="/qnaWriteGuest" element={<QnaGuestWrite />} />
            <Route element={<PrivateRoute />}>
              <Route path="/boardList" element={<BoardList />} />
              <Route path="/boardWrite" element={<Boardwrite />} />
              <Route path="/boardDetail/:localId" element={<BoardDetail />} />
              <Route path="/qnaWrite" element={<QnaMemberWrite />} />
            </Route>
          </Route>
          <Route element={<HeaderOnlyLayout />}>
            <Route path="/accession" element={<Accession />} />
            <Route path="/login" element={<Login />} />
            <Route path="/findPassword" element={<FindPassword />} />
            <Route path="/kakao/callback" element={<KakaoCallback />} />
            <Route path="/changePassword" element={<ChangePassword />} />
            <Route path="/withdraw" element={<Withdraw />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Route>
        </Routes>
        <ChatWidget />
      </Router>
    </Provider>
  )
}

export default App
