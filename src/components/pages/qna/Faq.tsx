import { Fragment, useState } from "react";
import type { QnaItem } from "../../../types/qna";

const initialItems: QnaItem[] = [
  { id: 2, title: "왜 팀명이 구황작물인가요?", content: "고구마와 감자의 정신으로 하나된다는 생각으로 정했습니다.", author: "관리자", date: "2026-05-18", answer: null },
  { id: 1, title: "프로젝트 협업 제안드리고 싶은데 연락 방법이 있을까요?", content: "아래 상단 메뉴에 CONTACT를 클릭하거나 하단에 CONNECT을 보시면 연락처가 나와있습니다., ", author: "관리자", date: "2026-05-17", answer: "contact 섹션의 이메일로 연락 주시면 됩니다!" },
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
                            <span className="qna-label">A</span>
                            <p>{item.content}</p>
                          </div>
                        
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
      

        </div>
      </section>
    </Fragment>
  );
}

export default QnA;