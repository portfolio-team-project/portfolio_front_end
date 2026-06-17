const mockQna = [
  { no: 1, title: "작물 병해 식별 기능 문의", author: "홍길동", date: "2025-06-01", status: "answered" },
  { no: 2, title: "회원 탈퇴 방법 안내 요청", author: "김철수", date: "2025-06-03", status: "waiting" },
  { no: 3, title: "데이터 수출 기능 추가 요청", author: "이영희", date: "2025-06-05", status: "waiting" },
  { no: 4, title: "모바일 앱 지원 일정 문의", author: "박민준", date: "2025-06-07", status: "answered" },
];

interface Props {
  onTabChange: (tab: string) => void;
}

function AdminQna({ onTabChange }: Props) {
  return (
    <div className="admin-content">
      <button className="admin-back-btn" onClick={() => onTabChange("dashboard")}>← 대시보드로</button>
      <div className="admin-card">
        <div className="admin-card-header">
          <span className="admin-card-title">Q&A 목록</span>
          <div className="admin-filter-wrap">
            <select className="admin-select">
              <option value="">전체</option>
              <option value="waiting">미답변</option>
              <option value="answered">답변완료</option>
            </select>
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
            {mockQna.map((q) => (
              <tr key={q.no}>
                <td>{q.no}</td>
                <td className="col-left">{q.title}</td>
                <td>{q.author}</td>
                <td>{q.date}</td>
                <td>
                  <span className={`admin-badge ${q.status}`}>
                    {q.status === "answered" ? "답변완료" : "미답변"}
                  </span>
                </td>
                <td>
                  <button className="admin-action-btn">답변</button>
                  <button className="admin-action-btn danger">삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminQna;
