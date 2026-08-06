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
          <div className="account-card">
            <div className="account-card-header">
              <div className="account-avatar">
                {user?.userName?.charAt(0) ?? "?"}
              </div>
              <div>
                <div className="account-name">{user?.userName}</div>
                <div className="account-id">ID: {user?.userId}</div>
              </div>
            </div>

            <div className="account-row">
              <span className="account-row-label">등급</span>
              {(() => {
                const isAdmin = user?.role === import.meta.env.VITE_CHECK_AUTH;
                return (
                  <span className={`account-badge${isAdmin ? " is-admin" : ""}`}>
                    {isAdmin ? "관리자" : "일반 회원"}
                  </span>
                );
              })()}
            </div>
          </div>

          {/* 설정 메뉴 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {!user?.isSocial && (
              <button
                type="button"
                className="btn-login"
                onClick={() => navigate("/changePassword", { state: { userId: user?.userId, from: "account" } })}
                style={{ background: "#4a5568" }}
              >
                비밀번호 변경
              </button>
            )}

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
