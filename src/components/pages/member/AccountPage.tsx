import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";

function AccountPage() {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.member);

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
          <h2>계정 설정</h2>
          <p>계정 정보를 확인하고 관리하세요</p>

          {/* 계정 정보 */}
          <div style={{
            background: "#f8f9fa",
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            padding: "20px",
            marginBottom: "28px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
              <div style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
                fontWeight: "700",
                color: "#fff",
                flexShrink: 0,
              }}>
                {user?.userName?.charAt(0) ?? "?"}
              </div>
              <div>
                <div style={{ fontWeight: "700", fontSize: "17px", color: "#1a1a1a" }}>{user?.userName}</div>
                <div style={{ fontSize: "13px", color: "#718096", marginTop: "2px" }}>ID: {user?.userId}</div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                <span style={{ color: "#718096" }}>역할</span>
                <span style={{ fontWeight: "600", color: "#2d3748" }}>
                  {user?.role === import.meta.env.VITE_CHECK_AUTH ? "관리자" : "일반 회원"}
                </span>
              </div>
            </div>
          </div>

          {/* 설정 메뉴 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <button
              type="button"
              className="btn-login"
              onClick={() => navigate("/change-password", { state: { userId: user?.userId, from: "account" } })}
              style={{ background: "#4a5568" }}
            >
              비밀번호 변경
            </button>

            <button
              type="button"
              className="btn-login"
              onClick={() => navigate("/withdraw")}
              style={{ background: "#e53e3e" }}
            >
              계정 삭제
            </button>
          </div>

        </div>
      </div>
    </Fragment>
  );
}

export default AccountPage;
