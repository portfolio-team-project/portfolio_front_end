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
  });

  // 비밀번호 불일치 체크
  const isPasswordMismatch =
    form.passwordCheck.length > 0 &&
    form.password !== form.passwordCheck;


  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
 

  return (
    <Fragment>
      <section className="signup-section">
        <div className="signup-wrap">

          <h2 className="signup-title">회원가입</h2>

          <form className="signup-form" >

            {/* 아이디 / 이름 */}
            <div className="signup-row">
              <div className="signup-col">
                <label>아이디</label>
                <input
                  placeholder="아이디 입력"
                />
              </div>

              <div className="signup-col">
                <label>이름</label>
                <input
                  placeholder="이름 입력"
                />
              </div>
            </div>

            {/* 비밀번호 */}
            <div className="signup-row">
              <div className="signup-col">
                <label>비밀번호</label>
                <input
                  name="password"
                  value={form.password}
                  onChange={onChange}
                  type="password"
                  placeholder="비밀번호 입력"
                />
              </div>

              <div className="signup-col">
                <label>비밀번호 확인</label>
                <input
                  name="passwordCheck"
                  value={form.passwordCheck}
                  onChange={onChange}
                  type="password"
                  placeholder="비밀번호 확인"
                  className={isPasswordMismatch ? "error-input" : ""}
                />
              </div>
            </div>

            {/* 회사 / 직급 */}
            <div className="signup-row">
              <div className="signup-col">
                <label>회사명</label>
                <input
                  placeholder="회사명 입력"
                />
              </div>

              <div className="signup-col">
                <label>직급</label>
                <input
                  placeholder="직급 입력"
                />
              </div>
            </div>

             {/* 별명 / email */}
            <div className="signup-row">
              <div className="signup-col">
                <label>Email</label>
                <input
                  placeholder="Email 입력"
                />
              </div>

              <div className="signup-col">
                <label>닉네임</label>
                <input
                  placeholder="닉네임 입력"
                />
              </div>
            </div>
            

            {/* 에러 메시지 */}
            {isPasswordMismatch && (
              <p className="error-text">
                비밀번호가 서로 다릅니다
              </p>
            )}

            {/* 버튼 */}
            <button type="submit" className="signup-btn">
              회원가입
            </button>

          </form>

        </div>
      </section>
    </Fragment>
  );
}

export default Accession;