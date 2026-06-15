import axios from "axios";
import { Fragment, useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function FindPassword() {
  const [step, setStep] = useState<"input" | "verify" | "done">("input");
  const [timeLeft, setTimeLeft] = useState(180); // 3분 = 180초
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [certificateNum, setCertificateNum] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isSending,setIsSending] = useState(false);

  const handleSendCode = async () => {
      if (userId.trim() === "" && email.trim() === "") {
        return toast.error("아이디와 이메일을 모두 입력해주세요.");
      }
      else if (userId.trim() === "") {
        return toast.error("아이디를 입력해주세요."); 
      }
      else if (email.trim() === "") {
        return toast.error("이메일을 입력해주세요."); 
      }
      setIsSending(true);
      try{
        const success = await handleSendEmail();
        if (!success) return;
        setStep("verify");
      } finally {
        setIsSending(false);
      }
  };

  const handleSendEmail = async (): Promise<boolean> => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/member/findPassword`, null, {
        params: { userId, email }
      });
      return true;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "인증번호 발송에 실패했습니다.");
      return false;
    }
  }

  const handleVerifyCode = async () => {
    await axios.post(`${import.meta.env.VITE_API_URL}/api/member/verifyNum`, null, {
      params: {
        userId,
        certificateNum
      }
    }).then((response) => {
      if (response.data.success) {
        setStep("done");
      } else {
        toast.error(response.data.message || "인증번호가 일치하지 않습니다.");
      }
    }).catch((error) => {
      toast.error(error.response?.data?.message || "인증번호 검증에 실패했습니다.");
    });
  }

  const handleResetPassword = async () => {
    if (newPassword.trim() === "" || confirmPassword.trim() === "") {
      return toast.error("새 비밀번호와 확인을 모두 입력해주세요.");
    }
    if (newPassword !== confirmPassword) {
      return toast.error("새 비밀번호와 확인이 일치하지 않습니다.");
    }
    await axios.post(`${import.meta.env.VITE_API_URL}/api/member/resetPassword`, {
        userId,
        newPassword
    }).then((response) => {
        if (response.data.success) {
          toast.success("비밀번호가 성공적으로 변경되었습니다.");
          setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
        }
        else {
          toast.error(response.data.message || "비밀번호가 동일한지 확인해주세요.");
        }
    }).catch((error) => {
      toast.error(error.response?.data?.message || "비밀번호 변경에 실패했습니다.");
    });
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const startTimer = () => {
    setTimeLeft(180);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    if (step === "verify") startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [step]);

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

          {/* STEP 1: 아이디 + 이메일 입력 */}
          {step === "input" && (
            <>
              <h2>비밀번호 찾기</h2>
              <p>가입 시 사용한 아이디와 이메일을 입력해주세요</p>

              <form>
                <div className="field">
                  <label>아이디</label>
                  <input type="text" placeholder="아이디를 입력하세요" value={userId} onChange={(e) => setUserId(e.target.value)} />
                </div>

                <div className="field">
                  <label>이메일</label>
                  <input type="email" placeholder="이메일을 입력하세요" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <button className="btn-login" type="button" onClick={() => handleSendCode()} disabled={isSending}>
                  {isSending ? "발송 중" : "인증번호 발송"}
                </button>
              </form>

              <Link to="/login" onClick={() => window.scrollTo(0, 0)} className="btn-signup-move">
                로그인으로 돌아가기
              </Link>
            </>
          )}

          {/* STEP 2: 인증번호 입력 */}
          {step === "verify" && (
            <>
              <h2>인증번호 확인</h2>
              <p>이메일로 발송된 인증번호를 입력해주세요</p>

              <form>
                <div className="field">
                  <div className="field-label-row">
                    <label>인증번호</label>
                    <span className={`find-pw-timer ${timeLeft === 0 ? "expired" : ""}`}>
                      {timeLeft === 0 ? "시간 만료" : formatTime(timeLeft)}
                    </span>
                  </div>
                  <input type="text" placeholder="인증번호 6자리를 입력하세요" maxLength={6} value={certificateNum} onChange={(e) => setCertificateNum(e.target.value)} />
                </div>

                <button className="btn-login" type="button" onClick={() => handleVerifyCode()} disabled={timeLeft === 0}>
                  확인
                </button>
              </form>

              <button className="btn-signup-move" type="button" onClick={() => {handleSendEmail(); startTimer();}} disabled={isSending}>
                {isSending ? "발송 중" : "인증번호 재전송"}
              </button>

              <button className="btn-signup-move" type="button" onClick={() => setStep("input")}>
                이메일 다시 입력
              </button>
            </>
          )}

          {/* STEP 3: 완료 */}
          {step === "done" && (
            <>
              <h2>비밀번호 재설정</h2>
              <p>새로운 비밀번호를 입력해주세요</p>

              <form>
                  <div className="field">
                      <label>새 비밀번호</label>
                      <input type="password" placeholder="새 비밀번호를 입력하세요" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                  </div>
                  <div className="field">
                      <label>비밀번호 확인</label>
                      <input type="password" placeholder="비밀번호를 다시 입력하세요" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                  </div>
                  <button className="btn-login" type="button" onClick={handleResetPassword} >
                      비밀번호 변경
                  </button>
              </form>
          </>
          )}

        </div>
      </div>
    </Fragment>
  );
}

export default FindPassword;
