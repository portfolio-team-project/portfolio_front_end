import { Fragment, useState } from "react";
import type { AccessionItem } from "../../../types/Accession";

function Accession() {
  const [form, setForm] = useState<AccessionItem>({
    user_id: "",
    user_name: "",
    rank: "",
    cp_name: "",
    password: "",
    passwordCheck: "",
    nick_name: "",
    emailId: "",
  });

  const [emailDomain, setEmailDomain] = useState("gmail.com");

  const isPasswordMismatch =
    form.passwordCheck.length > 0 &&
    form.password !== form.passwordCheck;


  return (
    <Fragment>
      <section className="signup-section">
        <div className="signup-wrap">

          <div className="signup-header">
            <h2 className="signup-title">회원가입</h2>
          </div>

          <form className="signup-form">

            
            <div className="signup-group">
              <h3>계정 정보</h3>

              <div className="signup-row">
                <div className="signup-col">
                  <div className="signup-field">
                    <label>아이디 *</label>
                    <input
                      name="user_id"
                                           
                      placeholder="아이디 입력"
                    />
                  </div>
                </div>

                <div className="signup-col">
                  <div className="signup-field">
                    <label>이름 *</label>
                    <input
                      name="user_name"
                      
                      placeholder="이름 입력"
                    />
                  </div>
                </div>
              </div>

              <div className="signup-row">
                <div className="signup-col">
                  <div className="signup-field">
                    <label>비밀번호 *</label>
                    <input
                      name="password"
                     
                 
                      placeholder="비밀번호 입력"
                    />
                  </div>
                </div>

                <div className="signup-col">
                  <div className="signup-field">
                    <label>비밀번호 확인 *</label>
                    <input
                      name="passwordCheck"
                   
                      type="password"
                      placeholder="비밀번호 재입력"
                      className={isPasswordMismatch ? "error-input" : ""}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 추가 정보 */}
            <div className="signup-group">
              <h3>추가 정보</h3>

              <div className="signup-row">
                <div className="signup-col">
                  <div className="signup-field">
                    <label>회사명</label>
                    <input
                      name="cp_name"
              
                      placeholder="회사명을 입력해주세요"
                    />
                  </div>
                </div>

                <div className="signup-col">
                  <div className="signup-field">
                    <label>직급</label>
                    <input
                      name="rank"
                      placeholder="직급을 입력해주세요"
                    />
                  </div>
                </div>
              </div>

              <div className="signup-row">
                <div className="signup-col">
                  <div className="signup-field">
                    <label>부서</label>
                    <input placeholder="부서를 입력해주세요" />
                  </div>
                </div>

                <div className="signup-col">
                  <div className="signup-field">
                    <label>닉네임</label>
                    <input
                      name="nick_name"
             
                      placeholder="닉네임 입력"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 인증 */}
            <div className="signup-group">
              <h3>인증</h3>

              <div className="signup-col email-col-wide">
                <div className="signup-field email-field">

                  <div className="email-box">

                    <label className="email-label">이메일 *</label>

                    <input
                      type="text"
                      placeholder="이메일 입력"
                      value={form.emailId}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          emailId: e.target.value,
                        }))
                      }
                    />

                    <span className="email-at">@</span>

                    <select
                      className="email-select"
                      value={emailDomain}
                      onChange={(e) => setEmailDomain(e.target.value)} >
                      <option value="gmail.com">gmail.com</option>
                      <option value="naver.com">naver.com</option>
                      <option value="daum.net">daum.net</option>
                      <option value="outlook.com">outlook.com</option>
                      <option value="etc">직접 입력</option>
                    </select>

                    <button type="button" className="email-send-btn">
                      인증번호 전송
                    </button>

                  </div>
                </div>
              </div>

              <div className="signup-row">
                <div className="signup-col">
                  <div className="signup-field">
                    <label>인증번호</label>
                    <input placeholder="인증번호 입력" />
                  </div>
                </div>
              </div>
            </div>

            {/* 에러 */}
            {isPasswordMismatch && (
              <p className="error-text">
                비밀번호가 서로 일치하지 않습니다.
              </p>
            )}

            <button type="submit" className="signup-btn">
              회원가입
            </button>
             <div className="signup-footer">
              <span>이미 계정이 있으신가요?</span>
              
              <button type="button" className="login-link-btn">
                로그인
              </button>
            </div>
          </form>
        </div>
      </section>
    </Fragment>
  );
}

export default Accession;