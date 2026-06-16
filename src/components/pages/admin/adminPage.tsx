import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { type AppDispatch, type RootState } from "../../../store/store";
import { fetchMembers, fetchMonthCount, fetchMemberDetail } from "../../../slices/adminSlice";
import AdminMemberModal from "./AdminMemberModal";

type MenuTab = "dashboard" | "members" | "qna" | "board";

const mockQna = [
  { no: 1, title: "작물 병해 식별 기능 문의", author: "홍길동", date: "2025-06-01", status: "answered" },
  { no: 2, title: "회원 탈퇴 방법 안내 요청", author: "김철수", date: "2025-06-03", status: "waiting" },
  { no: 3, title: "데이터 수출 기능 추가 요청", author: "이영희", date: "2025-06-05", status: "waiting" },
  { no: 4, title: "모바일 앱 지원 일정 문의", author: "박민준", date: "2025-06-07", status: "answered" },
];

const mockPosts = [
  { no: 1, title: "토마토 재배 노하우 공유합니다", author: "홍길동", date: "2025-06-02", views: 128 },
  { no: 2, title: "고추 병해 방제 후기", author: "김철수", date: "2025-06-04", views: 87 },
  { no: 3, title: "스마트팜 센서 연동 후기", author: "이영희", date: "2025-06-06", views: 312 },
];

function AdminPage() {
  const { user } = useSelector((state: RootState) => state.member);
  const [activeTab, setActiveTab] = useState<MenuTab>("dashboard");
  const [selectedMember, setSelectedMember] = useState<null | typeof members[0]>(null);
  const {members, totalPages, currentpage, totalCount, mounthCount, memberDetail} = useSelector((state: RootState)=> state.admin);
  const dispatch = useDispatch<AppDispatch>();

  const handlePageChange = (page: number) => {
    dispatch(fetchMembers({page, size: 10}));
  };

  useEffect(() => {
    if (user?.role === import.meta.env.VITE_CHECK_AUTH) {
      dispatch(fetchMembers({page: 0, size: 10}));
      dispatch(fetchMonthCount());
    }
  },[]);

  if (!user || user.role !== import.meta.env.VITE_CHECK_AUTH ) {
    return <Navigate to="/" replace />;
  }

  const stats = [
    { label: "총 회원 수", value: totalCount.toString(), icon: "👥", change: `+${mounthCount} 이번 달` },
    { label: "Q&A 게시글", value: "84", icon: "💬", change: "+5 이번 주" },
    { label: "미답변 Q&A", value: "3", icon: "⏳", change: "빠른 처리 필요" },
    { label: "게시판 게시글", value: "391", icon: "📋", change: "+18 이번 달" },
  ];

  const menuItems: { key: MenuTab; label: string; icon: string }[] = [
    { key: "dashboard", label: "대시보드", icon: "📊" },
    { key: "members", label: "회원 관리", icon: "👥" },
    { key: "qna", label: "Q&A 관리", icon: "💬" },
    { key: "board", label: "게시판 관리", icon: "📋" },
  ];

  return (
    <Fragment>
      <div className="admin-layout">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <div className="admin-sidebar-header">
            <span className="admin-logo-icon">&lt;/&gt;</span>
            <div>
              <div className="admin-logo-title">관리자 패널</div>
              <div className="admin-logo-sub">개발자 포트폴리오</div>
            </div>
          </div>

          <nav className="admin-nav">
            {menuItems.map((item) => (
              <button
                key={item.key}
                className={`admin-nav-item ${activeTab === item.key ? "active" : ""}`}
                onClick={() => setActiveTab(item.key)}
              >
                <span className="admin-nav-icon">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="admin-sidebar-footer">
            <div className="admin-user-info">
              <div className="admin-user-avatar">{user.userName.charAt(0)}</div>
              <div>
                <div className="admin-user-name">{user.userName}</div>
                <div className="admin-user-id">{user.userId}</div>
              </div>
            </div>

          </div>
        </aside>

        {/* Mobile Tab Bar */}
        <div className="admin-mobile-tabs">
          {menuItems.map((item) => (
            <button
              key={item.key}
              className={`admin-mobile-tab ${activeTab === item.key ? "active" : ""}`}
              onClick={() => setActiveTab(item.key)}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Main Content */}
        <main className="admin-main">
          {/* Top bar */}
          <div className="admin-topbar">
            <div>
              <h1 className="admin-page-title">
                {menuItems.find((m) => m.key === activeTab)?.icon}{" "}
                {menuItems.find((m) => m.key === activeTab)?.label}
              </h1>
              <p className="admin-page-sub">
                {new Date().toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>
          </div>

          {/* Dashboard */}
          {activeTab === "dashboard" && (
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
                    <button className="admin-card-link" onClick={() => setActiveTab("members")}>전체 보기 →</button>
                  </div>
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>아이디</th>
                        <th>이름</th>
                        <th>가입일</th>
                        <th>권한</th>
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
                    <button className="admin-card-link" onClick={() => setActiveTab("qna")}>전체 보기 →</button>
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
          )}

          {/* Members */}
          {activeTab === "members" && (
            <div className="admin-content">
              <button className="admin-back-btn" onClick={() => setActiveTab("dashboard")}>← 대시보드로</button>
              <div className="admin-card">
                <div className="admin-card-header">
                  <span className="admin-card-title">전체 회원 목록</span>
                  <div className="admin-search-wrap">
                    <input className="admin-search" type="text" placeholder="아이디 또는 이름 검색..." />
                  </div>
                </div>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>아이디</th>
                      <th>이름</th>
                      <th>이메일</th>
                      <th>가입일</th>
                      <th>상태</th>
                      <th>관리</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.map((m, idx) => (
                      <tr key={m.userId}>
                        <td>{currentpage * 10 + idx + 1}</td>
                        <td>{m.userId}</td>
                        <td>{m.userName}</td>
                        <td>{m.email}</td>
                        <td>{m.createdDate?.slice(0, 10)}</td>
                        <td>
                          <span className={`admin-role-badge ${m.status === "Y" ? "active" : "inactive"}`}>
                            {m.status === "Y" ? "활성" : "비활성"}
                          </span>
                        </td>
                        <td>
                          <button className="admin-action-btn" onClick={() => { dispatch(fetchMemberDetail(m.userId)); setSelectedMember(m); }}>상세</button>
                          <button className="admin-action-btn danger">탈퇴</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="admin-pagination">
                  <button disabled={currentpage === 0} onClick={() => handlePageChange(0)}>처음</button>
                  <button disabled={currentpage === 0} onClick={() => handlePageChange(currentpage - 1)}>이전</button>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      className={currentpage === i ? "active" : ""}
                      onClick={() => handlePageChange(i)}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button disabled={currentpage === totalPages - 1} onClick={() => handlePageChange(currentpage + 1)}>다음</button>
                  <button disabled={currentpage === totalPages - 1} onClick={() => handlePageChange(totalPages - 1)}>마지막</button>
                </div>
              </div>
            </div>
          )}

          {/* QnA */}
          {activeTab === "qna" && (
            <div className="admin-content">
              <button className="admin-back-btn" onClick={() => setActiveTab("dashboard")}>← 대시보드로</button>
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
          )}

          {/* Board */}
          {activeTab === "board" && (
            <div className="admin-content">
              <button className="admin-back-btn" onClick={() => setActiveTab("dashboard")}>← 대시보드로</button>
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
          )}
        </main>
      </div>
      {selectedMember && memberDetail && (
        <AdminMemberModal member={memberDetail} onClose={() => setSelectedMember(null)} />
      )}
    </Fragment>
  );
}

export default AdminPage;
