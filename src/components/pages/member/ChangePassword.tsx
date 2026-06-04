import axios from "axios";
import { Fragment, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";

function ChangePassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const [userId, setUserId] = useState((location.state as any)?.userId || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!userId.trim()) return toast.error("아이디를 입력해주세요.");
    if (!currentPassword.trim()) return toast.error("현재 비밀번호를 입력해주세요.");
    if (!newPassword.trim() || !confirmPassword.trim()) return toast.error("새 비밀번호와 확인을 모두 입력해주세요.");
    if (newPassword !== confirmPassword) return toast.error("새 비밀번호와 확인이 일치하지 않습니다.");

    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/member/changePassword`, {
        userId,
        currentPassword,
        newPassword,
      });
      toast.success("비밀번호가 성공적으로 변경되었습니다.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "비밀번호 변경에 실패했습니다.");
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
            <i className="ti ti-plant-2" />
          </div>
          <div>
            <div className="left-title">작물 관리 플랫폼</div>
            <div className="left-sub">
              스마트한 농작물 관리를<br />
              시작해보세요
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
          <p>3개월마다 비밀번호를 변경해주세요</p>

          <form>
            <div className="field">
              <label>아이디</label>
              <input
                type="text"
                placeholder="아이디를 입력하세요"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </div>

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

          <Link to="/login" onClick={() => window.scrollTo(0, 0)} className="btn-signup-move">
            로그인으로 돌아가기
          </Link>
        </div>
      </div>
    </Fragment>
  );
}

export default ChangePassword;
