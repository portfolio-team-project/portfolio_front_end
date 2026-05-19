import { Fragment, useState } from "react";
import type { QnaItem } from "../../../types/qna";

const initialItems: QnaItem[] = [
  { id: 2, title: "기술 스택 관련 질문이요", content: "Spring Boot 말고 다른 프레임워크도 사용하시나요?", author: "익명", date: "2026-05-18", answer: null },
  { id: 1, title: "포트폴리오 관련 문의드립니다.", content: "프로젝트 협업 제안드리고 싶은데 연락 방법이 있을까요?", author: "방문자", date: "2026-05-17", answer: "contact 섹션의 이메일로 연락 주시면 됩니다!" },
];

function QnA() {
  const [items, setItems] = useState<QnaItem[]>(initialItems);
  const [openId, setOpenId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ title: "", content: "", author: "" });

  const filtered = items.filter(
    (i) => i.title.includes(search) || i.content.includes(search)
  );

  const submit = () => {
    if (!form.title.trim() || !form.content.trim()) return;
    const newItem: QnaItem = {
      id: items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1,
      title: form.title,
      content: form.content,
      author: form.author || "익명",
      date: new Date().toISOString().slice(0, 10),
      answer: null,
    };
    setItems([newItem, ...items]);
    setForm({ title: "", content: "", author: "" });
    setShowForm(false);
  };

  return (
    <Fragment>
      <section className="qna-section">
        <div className="qna-wrap">
          <h2 className="qna-title">Q&amp;A</h2>

          <table className="qna-table">
            <thead>
              <tr>
                <th className="col-no">No</th>
                <th className="col-title">제목</th>
                <th className="col-author">작성자</th>
                <th className="col-date">작성일</th>
                <th className="col-status">상태</th>
                <th className="col-status">조회수</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <Fragment key={item.id}>
                  <tr
                    className={`qna-row ${openId === item.id ? "open" : ""}`}
                    onClick={() => setOpenId(openId === item.id ? null : item.id)}
                  >
                    <td className="col-no">{item.id}</td>
                    <td className="col-title">{item.title}</td>
                    <td className="col-author">{item.author}</td>
                    <td className="col-date">{item.date}</td>
                    <td className="col-status">
                      <span className={`qna-badge ${item.answer ? "answered" : "waiting"}`}>
                        {item.answer ? "답변완료" : "대기중"}
                      </span>
                    </td>
                    <td className="col-status">0</td>
                  </tr>
                  {openId === item.id && (
                    <tr className="qna-detail-row">
                      <td colSpan={6}>
                        <div className="qna-detail">
                          <div className="qna-question">
                            <span className="qna-label">Q</span>
                            <p>{item.content}</p>
                          </div>
                          {item.answer && (
                            <div className="qna-answer">
                              <span className="qna-label answer">A</span>
                              <p>{item.answer}</p>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="qna-empty">검색 결과가 없습니다.</td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="qna-bottom">
            <input
              className="qna-search"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="qna-write-btn" onClick={() => setShowForm(!showForm)}>
              {showForm ? "취소" : "글쓰기"}
            </button>
          </div>

          {showForm && (
            <div className="qna-form">
              <input
                className="qna-input"
                placeholder="닉네임 (선택)"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
              />
              <input
                className="qna-input"
                placeholder="제목"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              <textarea
                className="qna-textarea"
                placeholder="질문 내용을 입력하세요"
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
              />
              <button className="qna-submit-btn" onClick={submit}>등록</button>
            </div>
          )}
        </div>
      </section>
    </Fragment>
  );
}

export default QnA;
