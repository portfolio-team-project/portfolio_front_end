import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";

const mockQna = [
  { no: 1, title: "작물 병해 식별 기능 문의", author: "홍길동", date: "2025-06-01", status: "answered" },
  { no: 2, title: "회원 탈퇴 방법 안내 요청", author: "김철수", date: "2025-06-03", status: "waiting" },
  { no: 3, title: "데이터 수출 기능 추가 요청", author: "이영희", date: "2025-06-05", status: "waiting" },
  { no: 4, title: "모바일 앱 지원 일정 문의", author: "박민준", date: "2025-06-07", status: "answered" },
];

interface Props {
  onTabChange: (tab: string) => void;
}

function AdminDashboard({ onTabChange }: Props) {
  const { members, totalCount, mounthCount } = useSelector((state: RootState) => state.admin);

  const stats = [
    { label: "총 회원 수", value: (totalCount ?? 0).toString(), icon: "👥", change: `+${mounthCount} 이번 달` },
    { label: "Q&A 게시글", value: "84", icon: "💬", change: "+5 이번 주" },
    { label: "미답변 Q&A", value: "3", icon: "⏳", change: "빠른 처리 필요" },
    { label: "게시판 게시글", value: "391", icon: "📋", change: "+18 이번 달" },
  ];

  return (
    <div className="admin-content">
      <div className="admin-stats-grid">
        {stats.map((stat, i) => (
          <div key={i} className="admin-stat-card">
            <div className="admin-stat-icon">{stat.icon}</div>
            <div className="admin-stat-info">
              <div className="admin-stat-label">{stat.label}</div>
              <div className="admin-stat-value">{stat.value}</div>
              <div className="admin-stat-change">{stat.change}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-section-grid">
        <div className="admin-card">
          <div className="admin-card-header">
            <span className="admin-card-title">최근 가입 회원</span>
            <button className="admin-card-link" onClick={() => onTabChange("members")}>전체 보기 →</button>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>아이디</th>
                <th>이름</th>
                <th>가입일</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {members.slice(0, 5).map((m) => (
                <tr key={m.userId}>
                  <td>{m.userId}</td>
                  <td>{m.userName}</td>
                  <td>{m.createdDate?.slice(0, 10)}</td>
                  <td><span className="admin-role-badge user">{m.status === "Y" ? "활성" : "비활성"}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="admin-card">
          <div className="admin-card-header">
            <span className="admin-card-title">미답변 Q&A</span>
            <button className="admin-card-link" onClick={() => onTabChange("qna")}>전체 보기 →</button>
          </div>
          <div className="admin-qna-list">
            {mockQna.filter((q) => q.status === "waiting").map((q) => (
              <div key={q.no} className="admin-qna-item">
                <div className="admin-qna-title">{q.title}</div>
                <div className="admin-qna-meta">
                  <span>{q.author}</span>
                  <span>{q.date}</span>
                  <span className="admin-badge waiting">미답변</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
