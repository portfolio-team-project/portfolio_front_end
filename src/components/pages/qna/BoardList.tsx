import { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import type { RootState } from "../../../store/store";
import type { boardListItem, boardPageResponse } from "../../../types/BoardList";

function BoardList() {
  const [items, setItems] = useState<boardListItem[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  const user = useSelector((state: RootState) => state.member.user);
  const navigate = useNavigate();

  useEffect(() => {
    const params: Record<string, unknown> = { page };
    if (search) params.title = search;

    axiosInstance.get("/api/board/list", { params }).then((res) => {
      const data: boardPageResponse = res.data.data;
      setItems(data.content);
      setTotalPages(data.page.totalPages);
      setTotalElements(data.page.totalElements);
    });
  }, [page, search]);

  const handleSearch = () => {
    setSearch(searchInput);
    setPage(0);
  };

  const handleWrite = () => {
    if (user) {
      navigate("/boardWrite");
    } else {
      navigate("/login");
    }
  };

  return (
    <Fragment>
      <section className="qna-section">
        <div className="qna-wrap">
          <h2 className="qna-title">게시판</h2>

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

          <div className="board-total-count">총 {totalElements}개의 게시글</div>

          <table className="qna-table board-table">
            <thead>
              <tr>
                <th className="col-no">No</th>
                <th className="col-title">제목</th>
                <th className="col-author">작성자</th>
                <th className="col-date">작성일</th>
                <th className="col-status">조회수</th>
              </tr>
            </thead>
            <tbody>
              {(() => {
                const noticeCount = items.filter(i => i.noticeYn === 'Y').length;
                let regularIndex = 0;
                return items.map((item) => {
                  const isNotice = item.noticeYn === 'Y';
                  if (!isNotice) regularIndex++;
                  return (
                    <tr
                      key={item.localId}
                      className={`qna-row${isNotice ? ' board-notice' : ''}`}
                      onClick={() => navigate(`/boardDetail/${item.localId}`)}
                    >
                      <td className="col-no">{isNotice ? '공지' : regularIndex + page * (10 - noticeCount)}</td>
                      <td className="col-title">
                        {isNotice && <span className="board-notice-badge">[공지]</span>}
                        {item.title}
                      </td>
                      <td className="col-author">{item.userId ?? "탈퇴한 회원"}</td>
                      <td className="col-date">{item.createdDate?.slice(0, 10)}</td>
                      <td className="col-status">{item.viewCnt}</td>
                    </tr>
                  );
                });
              })()}
              {items.length === 0 && (
                <tr>
                  <td colSpan={5} className="qna-empty">게시글이 없습니다.</td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="qna-pagination">
            {(() => {
              const total = Math.max(1, totalPages);
              const WINDOW = 5;
              const half = Math.floor(WINDOW / 2);
              let start = Math.max(0, page - half);
              let end = Math.min(total - 1, start + WINDOW - 1);
              if (end - start < WINDOW - 1) start = Math.max(0, end - WINDOW + 1);

              return (
                <>
                  <button
                    className="qna-page-btn"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 0}
                  >
                    &lt;
                  </button>
                  {Array.from({ length: end - start + 1 }, (_, i) => start + i).map((i) => (
                    <button
                      key={i}
                      className={`qna-page-btn ${page === i ? "active" : ""}`}
                      onClick={() => setPage(i)}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    className="qna-page-btn"
                    onClick={() => setPage(page + 1)}
                    disabled={page >= total - 1}
                  >
                    &gt;
                  </button>
                </>
              );
            })()}
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default BoardList;
