import { Fragment } from "react";

function Boardwrite() {
  return (
    <Fragment>
      <section className="qna-section">
        <div className="qna-wrap">
          <h2 className="qna-title">문의 작성</h2>

          <div className="qna-form">
            <input className="qna-input" placeholder="작성자 이름" readOnly />
            <input className="qna-input" placeholder="제목" />
            <textarea
              className="qna-textarea"
              placeholder="질문 내용을 입력하세요"
            />
            <button className="qna-submit-btn">등록</button>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default Boardwrite;