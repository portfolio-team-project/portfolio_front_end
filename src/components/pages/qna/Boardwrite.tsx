import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import type { RootState } from "../../../store/store";
import type { boardWriteRequest } from "../../../types/BoardList";
import toast from "react-hot-toast";

function Boardwrite() {
  const [form, setForm] = useState<boardWriteRequest>({ title: "", content: "" });
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state: RootState) => state.member.user);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.content.trim()) {
      toast.error("제목과 내용을 입력해주세요.");
      return;
    }

    setIsLoading(true);
    try {
      await axiosInstance.post("/api/board/write", form);
      toast.success("게시글이 등록되었습니다.");
      navigate("/boardList");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      <section className="qna-section">
        <div className="qna-wrap">
          <h2 className="qna-title">게시글 작성</h2>

          <div className="qna-form">
            <input
              className="qna-input"
              placeholder="작성자"
              value={user?.userId ?? ""}
              readOnly
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
              <button className="qna-back-btn" onClick={() => navigate("/boardList")}>이전</button>
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

export default Boardwrite;
