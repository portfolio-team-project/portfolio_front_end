import { Fragment, useState } from "react";
import type { AccessionItem } from "../../../types/Accession";
import axiosInstance from "../../../api/axiosInstance";
import toast from "react-hot-toast";


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
    terms_agree: false,
    privacy_agree: false,
    marketing_agree: false,
  });

  const [isCustomDomain, setIsCustomDomain] = useState(false);
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const [consents, setConsents] = useState({
    terms: false,
    privacy: false,
    marketing: false,
  });
  const [expandedConsent, setExpandedConsent] = useState<string | null>(null);

  const isAllRequired = consents.terms && consents.privacy;
  const isAllChecked = consents.terms && consents.privacy && consents.marketing;
  const isPasswordMismatch = form.passwordCheck.length > 0 && form.password !== form.passwordCheck;

  const handleConsentAll = () => {
    const next = !isAllChecked;
    setConsents({ terms: next, privacy: next, marketing: next });
    setForm((prev) => ({ ...prev, terms_agree: next, privacy_agree: next, marketing_agree: next }));
  };

  const handleConsent = (key: keyof typeof consents) => {
    const next = !consents[key];
    setConsents((prev) => ({ ...prev, [key]: next }));
    const formKey = key === "terms" ? "terms_agree" : key === "privacy" ? "privacy_agree" : "marketing_agree";
    setForm((prev) => ({ ...prev, [formKey]: next }));
  };

  const toggleExpand = (key: string) => {
    setExpandedConsent((prev) => (prev === key ? null : key));
  };

  const handleEmailIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, emailId: e.target.value }));
  };

  const handleDomainSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "etc") {
      setIsCustomDomain(true);
      setForm((prev) => ({ ...prev, emailDomain: "" }));
    } else {
      setIsCustomDomain(false);
      setForm((prev) => ({ ...prev, emailDomain: value }));
    }
  };

  const handleDomainInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, emailDomain: e.target.value }));
  };

  const handleSendEmail = async () => {
    const emailId = form.emailId.trim();
    const emailDomain = form.emailDomain.trim();
    if (!emailId || !emailDomain) { toast.error("이메일을 확인해주세요"); return; }
    const email = `${emailId}@${emailDomain}`;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { toast.error("이메일 형식이 올바르지 않습니다"); return; }
    try {
      await axiosInstance.post("/api/accession/sendEmailAuth", { email });
      setIsEmailVerified(false);
      toast.success("인증번호가 전송되었습니다");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "이메일 전송 실패");
    }
  };

  const handleVerifyNum = async () => {
    const email = `${form.emailId.trim()}@${form.emailDomain.trim()}`;
    const certNum = form.authenticationCode.trim();
    if (!certNum) { toast.error("인증번호를 입력해주세요"); return; }
    try {
      await axiosInstance.post("/api/accession/verifyNum", { email, certNum });
      setIsEmailVerified(true);
      toast.success("이메일 인증이 완료되었습니다");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "인증번호 확인 실패");
    }
  };

  const handleIdCheck = async () => {
    if (!form.user_id.trim()) { toast.error("아이디를 입력해주세요"); return; }
    try {
      const res = await axiosInstance.get("/api/member/idCheck", { params: { userId: form.user_id } });
      const status = res.data?.data;
      if (status === "DUPLICATED") {
        toast.error("이미 사용 중인 아이디입니다");
        setIsIdChecked(false);
      } else if (status === "WITHDRAWN") {
        toast.error("탈퇴한 계정의 아이디입니다");
        setIsIdChecked(false);
      } else {
        toast.success("사용 가능한 아이디입니다");
        setIsIdChecked(true);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "중복검사 실패");
    }
  };

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    if (!isIdChecked) { toast.error("아이디 중복검사를 해주세요"); return; }
    if (!isEmailVerified) { toast.error("이메일 인증을 완료해주세요"); return; }
    if (!isAllRequired) { toast.error("필수 약관에 동의해주세요"); return; }
    if (isPasswordMismatch || !form.password) { toast.error("비밀번호를 확인해주세요"); return; }
    const email = `${form.emailId.trim()}@${form.emailDomain.trim()}`;
    try {
      await axiosInstance.post("/api/accession/join", {
        userId: form.user_id,
        userName: form.user_name,
        rank: form.rank,
        cpName: form.cp_name,
        password: form.password,
        work: form.work,
        department: form.department,
        email,
        termsAgree: form.terms_agree,
        privacyAgree: form.privacy_agree,
        marketingAgree: form.marketing_agree,
      });
      toast.success("회원가입이 완료되었습니다!");
      setTimeout(() => { window.location.href = "/"; }, 1500);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "회원가입 실패");
    }
  };

  return (
    <Fragment>
      <section className="ac-section">
        <div className="ac-wrap">
          <div className="ac-right">
            <div className="ac-header">
              <div className="ac-title">회원가입</div>
              <div className="ac-subtitle">정보를 입력하고 서비스를 시작하세요</div>
            </div>

            <form className="ac-form" onSubmit={handleSubmit}>

              {/* 계정 정보 */}
              <div className="ac-group">
                <div className="ac-group-title">계정 정보</div>

                <div className="ac-row">
                  <div className="ac-field">
                    <label>아이디 *</label>
                    <div className="ac-input-btn">
                      <input
                        placeholder="아이디 입력"
                        value={form.user_id}
                        onChange={(e) => {
                          setForm((prev) => ({ ...prev, user_id: e.target.value }));
                          setIsIdChecked(false);
                        }}
                      />
                      <button type="button" className="ac-btn-sm" onClick={handleIdCheck}>
                        중복검사
                      </button>
                    </div>
                    {isIdChecked && <span className="ac-status-ok">✓ 사용 가능</span>}
                  </div>

                  <div className="ac-field">
                    <label>이름 *</label>
                    <input
                      placeholder="이름 입력"
                      value={form.user_name}
                      onChange={(e) => setForm((prev) => ({ ...prev, user_name: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="ac-row">
                  <div className="ac-field">
                    <label>비밀번호 *</label>
                    <input
                      type="password"
                      placeholder="비밀번호 입력"
                      value={form.password}
                      onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                    />
                  </div>

                  <div className="ac-field">
                    <label>비밀번호 확인 *</label>
                    <input
                      type="password"
                      placeholder="비밀번호 재입력"
                      className={isPasswordMismatch ? "ac-err" : ""}
                      value={form.passwordCheck}
                      onChange={(e) => setForm((prev) => ({ ...prev, passwordCheck: e.target.value }))}
                    />
                    {isPasswordMismatch && (
                      <span className="ac-error-text">비밀번호가 일치하지 않습니다</span>
                    )}
                  </div>
                </div>
              </div>

              {/* 추가 정보 */}
              <div className="ac-group">
                <div className="ac-group-title">추가 정보</div>

                <div className="ac-row">
                  <div className="ac-field">
                    <label>회사명</label>
                    <input
                      placeholder="회사명 입력"
                      value={form.cp_name}
                      onChange={(e) => setForm((prev) => ({ ...prev, cp_name: e.target.value }))}
                    />
                  </div>
                  <div className="ac-field">
                    <label>직급</label>
                    <input
                      placeholder="직급 입력"
                      value={form.rank}
                      onChange={(e) => setForm((prev) => ({ ...prev, rank: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="ac-row">
                  <div className="ac-field">
                    <label>부서</label>
                    <input
                      placeholder="부서 입력"
                      value={form.department}
                      onChange={(e) => setForm((prev) => ({ ...prev, department: e.target.value }))}
                    />
                  </div>
                  <div className="ac-field">
                    <label>담당업무</label>
                    <input
                      placeholder="담당업무 입력"
                      value={form.work}
                      onChange={(e) => setForm((prev) => ({ ...prev, work: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              {/* 이메일 인증 */}
              <div className="ac-group">
                <div className="ac-group-title">이메일 인증</div>

                <div className="ac-field">
                  <label>이메일 *</label>
                  <div className="ac-email-row">
                    <input
                      className="ac-email-id"
                      type="text"
                      placeholder="이메일 입력"
                      value={form.emailId}
                      onChange={handleEmailIdChange}
                    />
                    <span className="ac-at">@</span>
                    <input
                      className="ac-email-domain"
                      type="text"
                      placeholder={isCustomDomain ? "도메인 입력" : "도메인"}
                      value={form.emailDomain}
                      disabled={!isCustomDomain}
                      onChange={handleDomainInput}
                    />
                    <select
                      className="ac-email-select"
                      value={isCustomDomain ? "etc" : form.emailDomain}
                      onChange={handleDomainSelect}
                    >
                      <option value="">선택</option>
                      <option value="gmail.com">gmail.com</option>
                      <option value="naver.com">naver.com</option>
                      <option value="daum.net">daum.net</option>
                      <option value="outlook.com">outlook.com</option>
                      <option value="etc">직접 입력</option>
                    </select>
                    <button type="button" className="ac-btn-sm" onClick={handleSendEmail}>
                      인증번호 전송
                    </button>
                  </div>
                  {isEmailVerified && <span className="ac-status-ok">✓ 인증 완료</span>}
                </div>

                <div className="ac-field">
                  <label>인증번호</label>
                  <div className="ac-input-btn">
                    <input
                      placeholder="인증번호 입력"
                      value={form.authenticationCode}
                      onChange={(e) => setForm((prev) => ({ ...prev, authenticationCode: e.target.value }))}
                    />
                    <button type="button" className="ac-btn-sm" onClick={handleVerifyNum}>
                      인증하기
                    </button>
                  </div>
                </div>
              </div>

              {/* 개인정보 동의 */}
              <div className="ac-group">
                <div className="ac-group-title">개인정보 동의</div>

                <div className="ac-consent-box">
                  <div className="ac-consent-all-row">
                    <label className="ac-consent-all-label">
                      <input type="checkbox" checked={isAllChecked} onChange={handleConsentAll} />
                      전체 동의
                    </label>
                    <span className="ac-consent-all-desc">선택 항목 포함</span>
                  </div>

                  <div className="ac-consent-item">
                    <label className="ac-consent-label">
                      <input type="checkbox" checked={consents.terms} onChange={() => handleConsent("terms")} />
                      <span className="ac-badge req">필수</span>
                      이용약관 동의
                    </label>
                    <button type="button" className="ac-consent-view-btn" onClick={() => toggleExpand("terms")}>
                      {expandedConsent === "terms" ? "접기" : "내용보기"}
                    </button>
                  </div>
                  {expandedConsent === "terms" && (
                    <div className="ac-consent-detail">
                      <p>제1조 (목적) 이 약관은 회사가 제공하는 서비스의 이용 조건 및 절차, 회사와 회원 간의 권리·의무 및 책임 사항을 규정함을 목적으로 합니다.</p>
                      <p>제2조 (정의) "서비스"란 회사가 제공하는 모든 온라인 서비스를 의미합니다. "회원"이란 본 약관에 동의하고 서비스를 이용하는 자를 의미합니다.</p>
                      <p>제3조 (약관의 효력) 이 약관은 서비스 화면에 게시하거나 기타 방법으로 회원에게 공지함으로써 효력이 발생합니다.</p>
                      <p>제4조 (회원가입) 이용자는 회사가 정한 양식에 따라 회원 정보를 기입한 후 약관에 동의함으로써 회원가입을 신청합니다.</p>
                    </div>
                  )}

                  <div className="ac-consent-item">
                    <label className="ac-consent-label">
                      <input type="checkbox" checked={consents.privacy} onChange={() => handleConsent("privacy")} />
                      <span className="ac-badge req">필수</span>
                      개인정보 수집 및 이용 동의
                    </label>
                    <button type="button" className="ac-consent-view-btn" onClick={() => toggleExpand("privacy")}>
                      {expandedConsent === "privacy" ? "접기" : "내용보기"}
                    </button>
                  </div>
                  {expandedConsent === "privacy" && (
                    <div className="ac-consent-detail">
                      <table className="ac-consent-table">
                        <thead>
                          <tr>
                            <th>수집 항목</th>
                            <th>수집 목적</th>
                            <th>보유 기간</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>아이디, 이름, 이메일, 비밀번호</td>
                            <td>회원 식별 및 서비스 제공</td>
                            <td>탈퇴 후 즉시 삭제</td>
                          </tr>
                          <tr>
                            <td>회사명, 직급, 부서, 담당업무</td>
                            <td>서비스 맞춤화 및 업무 연계</td>
                            <td>탈퇴 후 즉시 삭제</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}

                  <div className="ac-consent-item">
                    <label className="ac-consent-label">
                      <input type="checkbox" checked={consents.marketing} onChange={() => handleConsent("marketing")} />
                      <span className="ac-badge opt">선택</span>
                      마케팅 정보 수신 동의
                    </label>
                    <button type="button" className="ac-consent-view-btn" onClick={() => toggleExpand("marketing")}>
                      {expandedConsent === "marketing" ? "접기" : "내용보기"}
                    </button>
                  </div>
                  {expandedConsent === "marketing" && (
                    <div className="ac-consent-detail">
                      <p>서비스 관련 이벤트, 프로모션, 신규 기능 안내 등 마케팅 정보를 이메일로 수신하는 것에 동의합니다.</p>
                      <p>동의하지 않아도 서비스 이용에 제한이 없으며, 언제든지 설정에서 수신을 거부할 수 있습니다.</p>
                    </div>
                  )}
                </div>
              </div>

              <button type="submit" className="ac-submit-btn">
                회원가입 완료
              </button>

              <div className="ac-footer">
                <span>이미 계정이 있으신가요?</span>
                <button type="button" className="ac-footer-btn" onClick={() => window.location.href = "/login"}>
                  로그인
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default Accession;
