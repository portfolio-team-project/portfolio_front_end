import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import type { QnaGuestRequest } from "../../../types/qna";
import toast from "react-hot-toast";

function QnaGuestWrite() {
  const [form, setForm] = useState<QnaGuestRequest>({ nickname: "", title: "", content: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!form.nickname.trim() || !form.title.trim() || !form.content.trim()) {
      toast.error("닉네임, 제목, 내용을 모두 입력해주세요.");
      return;
    }

    setIsLoading(true);
    try {
      await axiosInstance.post("/api/qna/guest", form);
      toast.success("관리자 검토 후 답변 등록 시 게시됩니다.");
      navigate("/qna");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      <section className="qna-section">
        <div className="qna-wrap">
          <h2 className="qna-title">문의 작성</h2>

          <div className="qna-form">
            <input
              className="qna-input"
              placeholder="닉네임"
              value={form.nickname}
              onChange={(e) => setForm({ ...form, nickname: e.target.value })}
            />
            <input
              className="qna-input"
              placeholder="제목"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <textarea
              className="qna-textarea"
              placeholder="내용을 입력하세요"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
            />
            <div className="qna-btn-group">
              <button className="qna-back-btn" onClick={() => navigate("/qna")}>이전</button>
              <button className="qna-submit-btn" onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? "등록 중..." : "등록"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default QnaGuestWrite;
