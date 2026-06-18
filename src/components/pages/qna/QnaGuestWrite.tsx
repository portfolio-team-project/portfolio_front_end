import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import type { QnaGuestRequest } from "../../../types/qna";

function QnaGuestWrite() {
  const [form, setForm] = useState<QnaGuestRequest>({ nickname: "", title: "", content: "", qnaPwd: "" });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!form.nickname.trim() || !form.title.trim() || !form.content.trim() || !form.qnaPwd.trim()) return;

    await axiosInstance.post("/api/qna/guest", form);
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
            <input
              className="qna-input"
              type="password"
              placeholder="비밀번호 (수정/삭제 시 필요)"
              value={form.qnaPwd}
              onChange={(e) => setForm({ ...form, qnaPwd: e.target.value })}
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
