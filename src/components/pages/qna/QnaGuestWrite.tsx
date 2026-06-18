import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import type { QnaGuestRequest } from "../../../types/qna";
import toast from "react-hot-toast";

function QnaGuestWrite() {
  const [form, setForm] = useState<QnaGuestRequest>({ nickname: "", title: "", content: "" });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!form.nickname.trim() || !form.title.trim() || !form.content.trim()) return;

    await axiosInstance.post("/api/qna/guest", form);

    toast.success("관리자가 확인 후 답변이 등록됩니다.");
    navigate("/qna");
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
              <button className="qna-submit-btn" onClick={handleSubmit}>등록</button>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default QnaGuestWrite;
