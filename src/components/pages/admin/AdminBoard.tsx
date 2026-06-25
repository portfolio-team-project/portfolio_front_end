const mockPosts = [
  { no: 1, title: "토마토 재배 노하우 공유합니다", author: "홍길동", date: "2025-06-02", views: 128 },
  { no: 2, title: "고추 병해 방제 후기", author: "김철수", date: "2025-06-04", views: 87 },
  { no: 3, title: "스마트팜 센서 연동 후기", author: "이영희", date: "2025-06-06", views: 312 },
];

interface Props {
  onTabChange: (tab: string) => void;
}

function AdminBoard({ onTabChange }: Props) {
  return (
    <div className="admin-content">
      <button className="admin-back-btn" onClick={() => onTabChange("dashboard")}>← 대시보드로</button>
      <div className="admin-card">
        <div className="admin-card-header">
          <span className="admin-card-title">게시판 게시글</span>
          <div className="admin-search-wrap">
            <input className="admin-search" type="text" placeholder="제목 검색..." />
          </div>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>No</th>
              <th className="col-left">제목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>조회수</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {mockPosts.map((p) => (
              <tr key={p.no}>
                <td>{p.no}</td>
                <td className="col-left">{p.title}</td>
                <td>{p.author}</td>
                <td>{p.date}</td>
                <td>{p.views}</td>
                <td>
                  <button className="admin-action-btn">보기</button>
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

export default AdminBoard;
