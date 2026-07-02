import "@toast-ui/editor/dist/toastui-editor.css";
import Editor from "@toast-ui/editor";
import { Fragment, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import { fixEditorPopupOnMobile } from "../../../utils/fixEditorPopup";
import type { RootState } from "../../../store/store";
import type { QnaMemberRequest } from "../../../types/qna";
import toast from "react-hot-toast";

function QnaMemberWrite() {
  const [form, setForm] = useState<QnaMemberRequest>({ title: "", content: "" });
  const [isLoading, setIsLoading] = useState(false);
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<Editor | null>(null);
  const user = useSelector((state: RootState) => state.member.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (editorContainerRef.current && !editorRef.current) {
      editorRef.current = new Editor({
        el: editorContainerRef.current,
        initialEditType: "wysiwyg",
        hideModeSwitch: true,
        height: "400px",
        hooks: {
          addImageBlobHook: async (blob, callback) => {
            const formData = new FormData();
            const ext = blob.type.split("/")[1] || "png";
            formData.append("image", blob, `image.${ext}`);
            const res = await axiosInstance.post("/api/qna/uploadImg", formData);
            callback(`${import.meta.env.VITE_API_URL}${res.data.data.url}`);
          },
        },
      });
    }

    const cleanup = editorContainerRef.current ? fixEditorPopupOnMobile(editorContainerRef.current) : null;

    return () => {
      cleanup?.();
      editorRef.current?.destroy();
      editorRef.current = null;
    };
  }, []);

  const handleSubmit = async () => {
    const content = editorRef.current?.getHTML() ?? "";

    if (!form.title.trim() || !content.trim()) {
      toast.error("제목과 내용을 입력해주세요.");
      return;
    }

    setIsLoading(true);
    try {
      await axiosInstance.post("/api/qna/member", { ...form, content });
      toast.success("문의가 등록되었습니다.");
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
            <div ref={editorContainerRef} />
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

export default QnaMemberWrite;
