import { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import type { RootState } from "../../../store/store";
import type { QnaListItem, QnaDetailItem, QnaPageResponse } from "../../../types/qna";

function QnA() {
  const [items, setItems] = useState<QnaListItem[]>([]);
  const [openId, setOpenId] = useState<number | null>(null);
  const [detail, setDetail] = useState<QnaDetailItem | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const user = useSelector((state: RootState) => state.member.user);
  const navigate = useNavigate();

  useEffect(() => {
    const params: Record<string, unknown> = { page };
    if (search) params.title = search;

    axiosInstance.get("/api/qna/searchQna", { params }).then((res) => {
      const data: QnaPageResponse = res.data.data;
      setItems(data.content);
      setTotalPages(data.page.totalPages);
    });
  }, [page, search]);

  const handleRowClick = async (qnaSeq: number) => {
    if (openId === qnaSeq) {
      setOpenId(null);
      setDetail(null);
      return;
    }
    const res = await axiosInstance.get(`/api/qna/detail/${qnaSeq}`);
    const detailData: QnaDetailItem = res.data.data;
    setDetail(detailData);
    setOpenId(qnaSeq);
    setItems(prev => prev.map(item =>
      item.qnaSeq === qnaSeq ? { ...item, viewCnt: detailData.viewCnt } : item
    ));
  };

  const handleSearch = () => {
    setSearch(searchInput);
    setPage(0);
  };

  const handleWrite = () => {
    if (user) {
      navigate("/Boardwrite");
    } else {
      navigate("/qna-write-guest");
    }
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
                <th className="col-status">답변여부</th>
                <th className="col-status">조회수</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <Fragment key={item.qnaSeq}>
                  <tr
                    className={`qna-row ${openId === item.qnaSeq ? "open" : ""}`}
                    onClick={() => handleRowClick(item.qnaSeq)}
                  >
                    <td className="col-no">{item.qnaSeq}</td>
                    <td className="col-title">{item.title}</td>
                    <td className="col-author">{item.nickname ?? "탈퇴한 회원"}</td>
                    <td className="col-date">{item.regDt.slice(0, 10)}</td>
                    <td className="col-status">
                      <span className={`qna-badge ${item.answerYn === "Y" ? "answered" : "waiting"}`}>
                        {item.answerYn === "Y" ? "답변완료" : "대기중"}
                      </span>
                    </td>
                    <td className="col-status">{item.viewCnt}</td>
                  </tr>
                  {openId === item.qnaSeq && detail && (
                    <tr className="qna-detail-row">
                      <td colSpan={6}>
                        <div className="qna-detail">
                          <div className="qna-question">
                            <span className="qna-label">Q</span>
                            <p>{detail.content}</p>
                          </div>
                          {detail.answer && (
                            <div className="qna-answer">
                              <span className="qna-label answer">A</span>
                              <p>{detail.answer}</p>
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
                  <td colSpan={6} className="qna-empty">검색 결과가 없습니다.</td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="qna-bottom">
            <input
              className="qna-search"
              placeholder="제목 검색"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button className="qna-search-btn" onClick={handleSearch}>검색</button>
            <button className="qna-write-btn" onClick={handleWrite}>글쓰기</button>
          </div>

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
      </section>
    </Fragment>
  );
}

export default QnA;
