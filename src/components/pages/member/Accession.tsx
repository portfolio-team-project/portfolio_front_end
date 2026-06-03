import { Fragment, useState } from "react";
import axios from "axios";
import type { AccessionItem } from "../../../types/Accession";

function Accession() {
  const [form, setForm] = useState<AccessionItem>({
    user_id: "",
    user_name: "",
    rank: "",
    cp_name: "",
    password: "",
    passwordCheck: "",
    work: "",
    emailId: "",
    emailDomain: "",
    authenticationCode: "",
    department: "",
  });


  const [isCustomDomain, setIsCustomDomain] = useState(false);

  const isPasswordMismatch =
    form.passwordCheck.length > 0 &&
    form.password !== form.passwordCheck;

  // 이메일 아이디
  const handleEmailIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      emailId: e.target.value,
    }));
  };

  // 도메인 선택
  const handleDomainSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    if (value === "etc") {
      setIsCustomDomain(true);
      setForm((prev) => ({
        ...prev,
        emailDomain: "",
      }));
    } else {
      setIsCustomDomain(false);
      setForm((prev) => ({
        ...prev,
        emailDomain: value,
      }));
    }
  };

  // 도메인 직접 입력
  const handleDomainInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      emailDomain: e.target.value,
    }));
  };

  // 이메일 전송
  const handleSendEmail = async () => {
  const emailId = form.emailId.trim();
  const emailDomain = form.emailDomain.trim();

  if (!emailId || !emailDomain) {
    alert("이메일을 확인해주세요");
    return;
  }

  const email = `${emailId}@${emailDomain}`;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    alert("이메일 형식이 올바르지 않습니다");
    return;
  }

  if (isCustomDomain && !emailDomain) {
    alert("도메인을 입력해주세요");
    return;
  }

  try {
    const res = await axios.post("/sendEmailAuth", {
      email,
    });

    alert("인증번호가 전송되었습니다");
    console.log(res.data);
  } catch (error: any) {
    alert(error.response?.data?.message || "이메일 전송 실패");
  }
};

  // 아이디 중복검사
  const [isIdChecked, setIsIdChecked] = useState(false);
  const dTest = async (user_id: string): Promise<boolean> => {
    if (!user_id.trim()) {
      alert("아이디를 입력해주세요");
      return false;
    }

    try {
      const res = await axios.post("/checkUserId", {
        user_id,
      });

      if (res.data.available) {
        alert("사용 가능한 아이디입니다");
        setIsIdChecked(true);
        return true;
      } else {
        alert("이미 사용 중인 아이디입니다");
        return false;
      }
    } catch (error: any) {
      alert(error.response?.data?.message || "중복검사 실패");
      return false;
    }
  };

    //회원가입
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (!isIdChecked) {
        alert("아이디 중복검사를 해주세요");
        return;
      }

      if (isPasswordMismatch) {
        alert("비밀번호가 일치하지 않습니다");
        return;
      }

      //passwordCheck와 authenticationCode form 제외
      const { passwordCheck, authenticationCode, ...sendData } = form;

      try {
        const res = await axios.post("/AccessionSignup", sendData);

        alert("회원가입 성공!");
        console.log(res.data);
      } catch (error: any) {
        alert(error.response?.data?.message || "회원가입 실패");
      }
    };


  return (
    <Fragment>
      <section className="signup-section">
        <div className="signup-wrap">
          <div className="signup-header">
            <h2 className="signup-title">회원가입</h2>
          </div>

          <form className="signup-form" onSubmit={handleSubmit}>
            {/* 계정 정보 */}
            <div className="signup-group">
              <h3>계정 정보</h3>

              <div className="signup-row">
                <div className="signup-col">
                  <div className="signup-field">
                    <label>아이디 *</label>
                   <input
                        value={form.user_id}
                        placeholder="아이디 입력"
                        onChange={(e) => {
                          setForm((prev) => ({
                            ...prev,
                            user_id: e.target.value,
                          }));

                          setIsIdChecked(false);
                        }}
                      />
                 <button
                  type="button"
                  className="id-checker-btn"
                  onClick={() => dTest(form.user_id)}
                >
                  중복검사
                </button>
                  </div>

                </div>

                <div className="signup-col">
                  <div className="signup-field">
                    <label>이름 *</label>
                    <input
                      value={form.user_name}
                      placeholder="이름 입력"
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          user_name: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="signup-row">
                <div className="signup-col">
                  <div className="signup-field">
                    <label>비밀번호 *</label>
                    <input
                      type="password"
                      value={form.password}
                      placeholder="비밀번호 입력"
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="signup-col">
                  <div className="signup-field">
                    <label>비밀번호 확인 *</label>
                    <input
                      type="password"
                      value={form.passwordCheck}
                      placeholder="비밀번호 재입력"
                      className={
                        isPasswordMismatch ? "error-input" : ""
                      }
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          passwordCheck: e.target.value,
                        }))
                      }
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
                      value={form.cp_name}
                      placeholder="회사명을 입력해주세요"
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          cp_name: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="signup-col">
                  <div className="signup-field">
                    <label>직급</label>
                    <input
                      value={form.rank}
                      placeholder="직급을 입력해주세요"
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          rank: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="signup-row">
                <div className="signup-col">
                  <div className="signup-field">
                    <label>부서</label>
                    <input
                    value={form.department}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        department: e.target.value,
                      }))
                    }
                  />
                  </div>
                </div>

                <div className="signup-col">
                  <div className="signup-field">
                    <label>담당업무</label>
                    <input
                      value={form.work}
                      placeholder="담당업무 입력"
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          work: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 이메일 인증 */}
            <div className="signup-group">
              <h3>이메일 인증</h3>

              <div className="signup-col email-col-wide">
                <div className="signup-field email-field">
                  <div className="email-box">
                    <label className="email-label">
                      이메일 *
                    </label>

                    <input
                      type="text"
                      placeholder="이메일 입력"
                      value={form.emailId}
                      onChange={handleEmailIdChange}
                    />

                    <span className="email-at">@</span>

                    <input
                      className="email-domain-input"
                      type="text"
                      placeholder={
                        isCustomDomain
                          ? "도메인 직접 입력"
                          : "이메일 주소를 선택해주세요"
                      }
                      value={form.emailDomain}
                      disabled={!isCustomDomain}
                      onChange={handleDomainInput}
                    />

                    <select
                      className="email-select"
                      value={
                        isCustomDomain
                          ? "etc"
                          : form.emailDomain
                      }
                      onChange={handleDomainSelect}
                    >
                      <option value="">
                        도메인 선택
                      </option>
                      <option value="gmail.com">
                        gmail.com
                      </option>
                      <option value="naver.com">
                        naver.com
                      </option>
                      <option value="daum.net">
                        daum.net
                      </option>
                      <option value="outlook.com">
                        outlook.com
                      </option>
                      <option value="etc">
                        직접 입력
                      </option>
                    </select>

                    <button
                      type="button"
                      className="email-send-btn"
                      onClick={handleSendEmail}
                    >
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
                    <button
                      type="button"
                      className="email-send-btn"
                    >
                      인증하기
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 에러 */}
            {isPasswordMismatch && (
           <p className={`error-text ${isPasswordMismatch ? "show" : ""}`}>
            비밀번호가 일치하지 않습니다.
          </p>
            )}

            <button
              type="submit"
              className="signup-btn"
            >
              회원가입
            </button>

            <div className="signup-footer">
              <span>이미 계정이 있으신가요?</span>

              <button
                type="button"
                className="login-link-btn"
              >
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