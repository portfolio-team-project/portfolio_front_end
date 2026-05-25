import { Fragment } from "react";

// 회원가입

function Accession() {
  return (
    <Fragment>
      <section className="qna-section">
        <div className="qna-wrap">
          <h2 className="qna-title">회원가입</h2>

          <div className="signup-form">
            <div className="signup-row">
              <label>아이디</label>
              <input
                type="text"
                className="qna-search"
                placeholder="아이디를 입력하세요"
              />
            </div>

            <div className="signup-row">
              <label>비밀번호</label>
              <input
                type="password"
                className="qna-search"
                placeholder="비밀번호를 입력하세요"
              />
            </div>

            <div className="signup-row">
              <label>비밀번호 확인</label>
              <input
                type="password"
                className="qna-search"
                placeholder="비밀번호를 다시 입력하세요"
              />
            </div>

            <div className="signup-row">
              <label>이름</label>
              <input
                type="text"
                className="qna-search"
                placeholder="이름을 입력하세요"
              />
            </div>

            <div className="signup-row">
              <label>이메일</label>
              <input
                type="email"
                className="qna-search"
                placeholder="이메일을 입력하세요"
              />
            </div>

            <div className="signup-row">
              <label>전화번호</label>
              <input
                type="text"
                className="qna-search"
                placeholder="전화번호를 입력하세요"
              />
            </div>

            <div className="write-bottom">
              <button className="qna-write-btn">
                회원가입
              </button>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default Accession;