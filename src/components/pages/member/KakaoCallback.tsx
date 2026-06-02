import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../store/store";
import { kakaoLogin } from "../../../slices/memberSlice";
import toast from "react-hot-toast";

function KakaoCallback() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (!code) return;

    dispatch(kakaoLogin({ code })).then((result) => {
      if (kakaoLogin.fulfilled.match(result)) {
        toast.success("카카오 로그인 성공!");
        navigate("/");
      } else if (kakaoLogin.rejected.match(result)) {
        const payload = result.payload as any;
        if (payload?.message === "존재하지 않는 아이디입니다.") {
          toast.error("카카오 계정과 연결된 회원이 없습니다. 회원가입 페이지로 이동합니다.");
          navigate("/accession", { state: { kakaoId: payload.data.kakaoId } });
        } else {
          toast.error(String(payload?.message || "카카오 로그인에 실패했습니다."));
          navigate("/login");  // 그 외 에러는 로그인 페이지로
        }
      }
    }).catch((error) => {
      toast.error(error.response?.data?.message ||"카카오 로그인 처리 중 오류가 발생했습니다.");
      navigate("/login");
    });
  }, [dispatch, navigate]);

  return <div>카카오 로그인 처리 중...</div>;
}

export default KakaoCallback;
