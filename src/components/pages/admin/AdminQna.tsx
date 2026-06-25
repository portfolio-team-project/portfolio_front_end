import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../../api/axiosInstance";
import type { QnaListItem, QnaDetailItem, QnaPageResponse } from "../../../types/qna";

interface Props {
  onTabChange: (tab: string) => void;
}

function AdminQna({ onTabChange }: Props) {
  const [items, setItems] = useState<QnaListItem[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [openId, setOpenId] = useState<number | null>(null);
  const [detail, setDetail] = useState<QnaDetailItem | null>(null);
  const [answerInput, setAnswerInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [onlyUnanswered, setOnlyUnanswered] = useState(false);
  const [deleteTargetSeq, setDeleteTargetSeq] = useState<number | null>(null);

  useEffect(() => {
    const params: Record<string, unknown> = { page, delYn: "N" };
    if (search) params.title = search;
    if (onlyUnanswered) params.answerYn = "N";
    axiosInstance.get("/api/admin/qna", { params }).then((res) => {
      const data: QnaPageResponse = res.data.data;
      setItems(data.content);
      setTotalPages(data.page.totalPages);
    });
  }, [page, search, onlyUnanswered]);

  const handleRowClick = async (qnaSeq: number) => {
    if (openId === qnaSeq) {
      setOpenId(null);
      setDetail(null);
      setAnswerInput("");
      return;
    }
    const res = await axiosInstance.get(`/api/admin/detail/${qnaSeq}`);
    setDetail(res.data.data);
    setOpenId(qnaSeq);
    setAnswerInput("");
  };

  const handleDeleteConfirm = async () => {
    if (deleteTargetSeq === null) return;
    try {
      await axiosInstance.post(`/api/admin/deleteQna`, null, { params: { qnaSeq: deleteTargetSeq } });
      toast.success("삭제되었습니다.");
      setItems((prev) => prev.filter((item) => item.qnaSeq !== deleteTargetSeq));
      if (openId === deleteTargetSeq) { setOpenId(null); setDetail(null); }
    } finally {
      setDeleteTargetSeq(null);
    }
  };

  const handleAnswerSubmit = async (qnaSeq: number) => {
    if (!answerInput.trim()) {
      toast.error("답변 내용을 입력해주세요.");
      return;
    }
    setIsLoading(true);
    try {
      await axiosInstance.post(`/api/admin/insertQnaAnswer`, null, { params: { qnaSeq, answer: answerInput } });
      toast.success("답변이 등록되었습니다.");
      setItems((prev) => prev.map((item) => item.qnaSeq === qnaSeq ? { ...item, answerYn: "Y" } : item));
      setDetail((prev) => prev ? { ...prev, answerYn: "Y", answer: answerInput } : prev);
      setAnswerInput("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-content">
      {deleteTargetSeq !== null && (
        <div className="confirm-overlay" onClick={() => setDeleteTargetSeq(null)}>
          <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
            <p className="confirm-message">해당 문의를 삭제하시겠습니까?</p>
            <div className="confirm-btns">
              <button className="admin-action-btn danger" onClick={handleDeleteConfirm}>삭제</button>
              <button className="qna-back-btn" onClick={() => setDeleteTargetSeq(null)}>취소</button>
            </div>
          </div>
        </div>
      )}

      <button className="admin-back-btn" onClick={() => onTabChange("dashboard")}>← 대시보드로</button>
      <div className="admin-card">
        <div className="admin-card-header">
          <span className="admin-card-title">Q&A 목록</span>
          <div className="admin-filter-wrap">
            <label className="admin-check-label">
              <input type="checkbox" checked={onlyUnanswered} onChange={() => { setOnlyUnanswered(!onlyUnanswered); setPage(0); }} />
              미답변
            </label>
            <input
              className="qna-search"
              placeholder="제목 검색"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { setSearch(searchInput); setPage(0); } }}
            />
            <button className="qna-search-btn" onClick={() => { setSearch(searchInput); setPage(0); }}>검색</button>
            <button className="qna-back-btn" onClick={() => { setSearchInput(""); setSearch(""); setOnlyUnanswered(false); setPage(0); }}>초기화</button>
          </div>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>No</th>
              <th className="col-left">제목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>상태</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <Fragment key={item.qnaSeq}>
                <tr
                  className={`qna-row ${openId === item.qnaSeq ? "open" : ""}`}
                  onClick={() => handleRowClick(item.qnaSeq)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{item.qnaSeq}</td>
                  <td className="col-left">{item.title}</td>
                  <td>{item.nickname ?? "탈퇴한 회원"}</td>
                  <td>{item.regDt.slice(0, 10)}</td>
                  <td>
                    <span className={`admin-badge ${item.answerYn === "Y" ? "answered" : "waiting"}`}>
                      {item.answerYn === "Y" ? "답변완료" : "미답변"}
                    </span>
                  </td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <button className="admin-action-btn danger" onClick={() => setDeleteTargetSeq(item.qnaSeq)}>삭제</button>
                  </td>
                </tr>
                {openId === item.qnaSeq && detail && (
                  <tr className="qna-detail-row">
                    <td colSpan={6}>
                      <div className="qna-detail">
                        <div className="qna-question">
                          <span className="qna-label">Q</span>
                          <p>{detail.content}</p>
                        </div>
                        {detail.answer ? (
                          <div className="qna-answer">
                            <span className="qna-label answer">A</span>
                            <p>{detail.answer}</p>
                          </div>
                        ) : (
                          <div className="qna-answer-form">
                            <textarea
                              className="qna-textarea"
                              placeholder="답변을 입력하세요"
                              value={answerInput}
                              onChange={(e) => setAnswerInput(e.target.value)}
                            />
                            <button
                              className="qna-submit-btn"
                              onClick={() => handleAnswerSubmit(item.qnaSeq)}
                              disabled={isLoading}
                            >
                              {isLoading ? "등록 중..." : "답변 등록"}
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={6} className="qna-empty">등록된 문의가 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>

        {totalPages > 1 && (
          <div className="qna-pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`qna-page-btn ${page === i ? "active" : ""}`}
                onClick={() => setPage(i)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminQna;
