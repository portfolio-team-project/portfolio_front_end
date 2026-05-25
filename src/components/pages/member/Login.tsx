import { Fragment } from "react";
import { Link } from "react-router-dom";

function Login() {


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
          <h2>로그인</h2>
          <p>계정 정보를 입력해주세요</p>

          <div className="field">
            <label>아이디</label>
            <input type="text" placeholder="아이디를 입력하세요" />
          </div>

          <div className="field">
            <label>비밀번호</label>
            <input type="password" placeholder="비밀번호를 입력하세요" />
          </div>

          <button className="btn-login">
            로그인
          </button>

              <Link
                to="/Accession" onClick={() => window.scrollTo(0, 0)} className="btn-signup-move">
                회원가입
              </Link>


          <div className="divider">
            <hr />
            <span>또는</span>
            <hr />
          </div>

          <button className="btn-kakao" type="button">
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path
                d="M9 1.5C4.86 1.5 1.5 4.19 1.5 7.5c0 2.1 1.26 3.95 3.18 5.04L3.9 15.3a.3.3 0 0 0 .43.33l3.6-2.4c.35.05.71.07 1.07.07 4.14 0 7.5-2.69 7.5-6S13.14 1.5 9 1.5Z"
                fill="#191919"
              />
            </svg>
            카카오로 로그인
          </button>

        </div>
      </div>
    </Fragment>
  );
}

export default Login;