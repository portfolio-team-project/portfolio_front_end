import axios from "axios";
import axiosInstance from "../../../api/axiosInstance";
import { Fragment, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../store/store";
import { logout } from "../../../slices/memberSlice";
import {
  REQUIRED_USER_ID,
  REQUIRED_CURRENT_PASSWORD,
  REQUIRED_NEW_PASSWORD,
  SAME_PASSWORD,
  PASSWORD_MISMATCH,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_EXPIRED_SUCCESS,
  CHANGE_PASSWORD_FAIL,
} from "../../../constants/messageConstants";

function ChangePassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const state = location.state as any;
  const fromAccount = state?.from === "account";
  const [userId, setUserId] = useState(state?.userId || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!fromAccount && !userId.trim()) return toast.error(REQUIRED_USER_ID);
    if (!currentPassword.trim()) return toast.error(REQUIRED_CURRENT_PASSWORD);
    if (!newPassword.trim() || !confirmPassword.trim()) return toast.error(REQUIRED_NEW_PASSWORD);
    if (currentPassword === newPassword) return toast.error(SAME_PASSWORD);
    if (newPassword !== confirmPassword) return toast.error(PASSWORD_MISMATCH);

    setLoading(true);
    try {
      const client = fromAccount ? axiosInstance : axios;
      const url = fromAccount
        ? `/api/member/changePassword`
        : `${import.meta.env.VITE_API_URL}/api/member/changePassword`;
      const body = fromAccount
        ? { currentPassword, newPassword }
        : { userId, currentPassword, newPassword };
      await client.post(url, body);
      toast.success(fromAccount ? CHANGE_PASSWORD_SUCCESS : CHANGE_PASSWORD_EXPIRED_SUCCESS);
      if (fromAccount) dispatch(logout());
      setTimeout(() => navigate("/login"), 2000);
    } catch (error: any) {
      const status = error.response?.status;
      const message = error.response?.data?.message;
      if (status === 423) {
        if (fromAccount) {
          dispatch(logout());
          setTimeout(() => navigate("/login"), 2000);
        }
        if (!fromAccount) toast.error(message);
        return;
      }
      // 일반 실패 — fromAccount는 인터셉터가 toast 처리, message 없는 경우만 보완
      if (!fromAccount) {
        toast.error(message || CHANGE_PASSWORD_FAIL);
      } else if (!message) {
        toast.error(CHANGE_PASSWORD_FAIL);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <div className="wrap">

        {/* LEFT */}
        <div className="left">
          <div className="left-icon">
            <span className="code-icon">&lt;/&gt;</span>
          </div>
          <div>
            <div className="left-title">개발자 포트폴리오</div>
            <div className="left-sub">
              두 개발자의 이야기를<br />
              만나보세요
            </div>
          </div>
          <div className="dots">
            <div className="dot active"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="right">
          <h2>비밀번호 변경</h2>
          <p>{fromAccount ? "새로운 비밀번호로 변경합니다" : "3개월마다 비밀번호를 변경해주세요"}</p>

          <form>
            {!fromAccount && (
              <div className="field">
                <label>아이디</label>
                <input
                  type="text"
                  placeholder="아이디를 입력하세요"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                />
              </div>
            )}

            <div className="field">
              <label>현재 비밀번호</label>
              <input
                type="password"
                placeholder="현재 비밀번호를 입력하세요"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>

            <div className="field">
              <label>새 비밀번호</label>
              <input
                type="password"
                placeholder="새 비밀번호를 입력하세요"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="field">
              <label>새 비밀번호 확인</label>
              <input
                type="password"
                placeholder="새 비밀번호를 다시 입력하세요"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button className="btn-login" type="button" onClick={handleChangePassword} disabled={loading}>
              {loading ? "변경 중..." : "비밀번호 변경"}
            </button>
          </form>

          {fromAccount ? (
            <Link to="/account" className="btn-signup-move">
              계정설정으로 돌아가기
            </Link>
          ) : (
            <Link to="/login" onClick={() => window.scrollTo(0, 0)} className="btn-signup-move">
              로그인으로 돌아가기
            </Link>
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default ChangePassword;
