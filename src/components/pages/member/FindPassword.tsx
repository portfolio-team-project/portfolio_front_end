import { Fragment, useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function FindPassword() {
  const [step, setStep] = useState<"input" | "verify" | "done">("input");
  const [timeLeft, setTimeLeft] = useState(180); // 3분 = 180초
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleSendCode = () => {
      if (userId.trim() === "" || email.trim() === "") {
        return toast.error("아이디와 이메일을 모두 입력해주세요.");
      }
      /* TODO: 서버에 아이디와 이메일을 전송하여 인증번호 발송 로직 추가 */

      /* TODO: 인증번호 검증 확인 후 성공 시 반환 추가 */
      return setStep("verify");
  };

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

                <button className="btn-login" type="button" onClick={() => handleSendCode()}>
                  인증번호 발송
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
                  <input type="text" placeholder="인증번호 6자리를 입력하세요" maxLength={6} />
                </div>

                <button className="btn-login" type="button" onClick={() => setStep("done")}>
                  확인
                </button>
              </form>

              <button className="btn-signup-move" type="button" onClick={() => startTimer()}>
                인증번호 재전송
              </button>

              <button className="btn-signup-move" type="button" onClick={() => setStep("input")}>
                이메일 다시 입력
              </button>
            </>
          )}

          {/* STEP 3: 완료 */}
          {step === "done" && (
            <div className="find-pw-result">
              <div className="find-pw-icon">✉️</div>
              <h2>이메일을 확인해주세요</h2>
              <p className="find-pw-desc">
                인증이 완료됐어요.<br />
                이메일로 비밀번호 재설정 링크를 보냈어요.
              </p>
              <Link to="/login" onClick={() => window.scrollTo(0, 0)} className="btn-signup-move">
                로그인으로 돌아가기
              </Link>
            </div>
          )}

        </div>
      </div>
    </Fragment>
  );
}

export default FindPassword;
