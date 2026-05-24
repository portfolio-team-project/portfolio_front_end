import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
  

function BoardList() {
   const navigate = useNavigate();
  
  return (
    <Fragment>
      <section className="qna-section">
        <div className="qna-wrap">
          <h2 className="qna-title">문의</h2>

          <div className="boardList-top">
            <input className="qna-search" placeholder="Search" />
            <button className="qna-write-btn">검색</button>
          </div>

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
              <Fragment>
                <tr>
                  <td className="col-no">１</td>
                  <td className="col-title">123123</td>
                  <td className="col-author">123123</td>
                  <td className="col-date">1231232</td>
                  <td className="col-status">
                    <span className={`qna-badge ${"answered"}`}>답변완료</span>
                  </td>
                  <td className="col-status">0</td>
                </tr>
                <tr>
                  <td className="col-no">２</td>
                  <td className="col-title">123123</td>
                  <td className="col-author">123123</td>
                  <td className="col-date">1231232</td>
                  <td className="col-status">
                    <span className={`qna-badge ${"answered"}`}>답변완료</span>
                  </td>
                  <td className="col-status">0</td>
                </tr>
                <tr>
                  <td className="col-no">３</td>
                  <td className="col-title">title</td>
                  <td className="col-author">author</td>
                  <td className="col-date">date</td>
                  <td className="col-status">
                    <span className={`qna-badge ${"waiting"}`}>대기중</span>
                  </td>
                  <td className="col-status">0</td>
                </tr>
                <tr>
                  <td className="col-no">４</td>
                  <td className="col-title">title</td>
                  <td className="col-author">author</td>
                  <td className="col-date">date</td>
                  <td className="col-status">
                    <span className={`qna-badge ${"waiting"}`}>대기중</span>
                  </td>
                  <td className="col-status">0</td>
                </tr>
             
              </Fragment>
            </tbody>
        </table>
          <div className="write-bottom">
              <button className="qna-write-btn" onClick={() => navigate("/boardwrite")}>
                글쓰기
              </button>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default BoardList;