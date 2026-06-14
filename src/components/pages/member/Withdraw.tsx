import { Fragment, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import { logout } from "../../../slices/memberSlice";
import store from "../../../store/store";

function Withdraw() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleWithdraw = async () => {
    if (!password.trim()) return toast.error("비밀번호를 입력해주세요.");

    setLoading(true);
    try {
      await axiosInstance.post("/api/member/withdraw", { password });
      store.dispatch(logout());
      toast.success("회원 탈퇴가 완료되었습니다.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "회원 탈퇴에 실패했습니다.");
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
          <h2>회원 탈퇴</h2>
          <p>탈퇴 후 계정 정보는 복구되지 않습니다</p>

          <div style={{
            background: "#fff3cd",
            border: "1px solid #ffc107",
            borderRadius: "8px",
            padding: "14px 16px",
            marginBottom: "24px",
            fontSize: "13px",
            color: "#856404",
            lineHeight: "1.6",
          }}>
            ⚠️ 탈퇴 시 모든 데이터가 비활성화되며, 동일한 아이디로 재가입이 불가합니다.
          </div>

          <form>
            <div className="field">
              <label>비밀번호 확인</label>
              <input
                type="password"
                placeholder="현재 비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleWithdraw()}
              />
            </div>

            <button
              className="btn-login"
              type="button"
              onClick={handleWithdraw}
              disabled={loading}
              style={{ background: "#dc3545" }}
            >
              {loading ? "처리 중..." : "회원 탈퇴"}
            </button>
          </form>

          <Link to="/sangwon" onClick={() => window.scrollTo(0, 0)} className="btn-signup-move">
            돌아가기
          </Link>
        </div>
      </div>
    </Fragment>
  );
}

export default Withdraw;
