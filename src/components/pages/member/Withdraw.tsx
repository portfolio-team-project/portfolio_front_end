import { Fragment, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import axiosInstance from "../../../api/axiosInstance";
import { logout } from "../../../slices/memberSlice";
import store from "../../../store/store";

function Withdraw() {
  const navigate = useNavigate();
  const isSocial = useSelector((state: RootState) => state.member.user?.isSocial ?? false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleWithdraw = async () => {
    if (!isSocial && !password.trim()) return toast.error("비밀번호를 입력해주세요.");

    setLoading(true);
    try {
      if (isSocial) {
        await axiosInstance.post("/api/member/socialWithdraw");
      } else {
        await axiosInstance.post("/api/member/withdraw", { password });
      }
      store.dispatch(logout());
      toast.success("회원 탈퇴가 완료되었습니다.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error: any) {
      if (!error.response?.data?.message) toast.error("회원 탈퇴에 실패했습니다.");
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
            {isSocial
              ? "⚠️ 탈퇴 시 모든 데이터가 삭제되며, 동일한 카카오 계정으로 재가입이 가능합니다."
              : "⚠️ 탈퇴 시 모든 데이터가 비활성화되며, 동일한 아이디로 재가입이 불가합니다."
            }
          </div>

          <form>
            {!isSocial && (
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
            )}

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
