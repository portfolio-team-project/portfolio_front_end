import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { type AppDispatch, type RootState } from "../../../store/store";
import { fetchMembers, fetchMonthCount } from "../../../slices/adminSlice";
import AdminDashboard from "./AdminDashboard";
import AdminMembers from "./AdminMembers";
import AdminQna from "./AdminQna";
import AdminBoard from "./AdminBoard";

type MenuTab = "dashboard" | "members" | "qna" | "board";

const menuItems: { key: MenuTab; label: string; icon: string }[] = [
  { key: "dashboard", label: "대시보드", icon: "📊" },
  { key: "members", label: "회원 관리", icon: "👥" },
  { key: "qna", label: "Q&A 관리", icon: "💬" },
  { key: "board", label: "게시판 관리", icon: "📋" },
];

function AdminPage() {
  const { user, loading } = useSelector((state: RootState) => state.member);
  const [activeTab, setActiveTab] = useState<MenuTab>("dashboard");
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (user?.role === import.meta.env.VITE_CHECK_AUTH) {
      dispatch(fetchMembers({ page: 0, size: 10 }));
      dispatch(fetchMonthCount());
    }
  }, [user]);

  if (loading) return null;

  if (!user || user.role !== import.meta.env.VITE_CHECK_AUTH) {
    return <Navigate to="/" replace />;
  }

  const handleTabChange = (tab: string) => setActiveTab(tab as MenuTab);

  return (
    <Fragment>
      <div className="admin-layout">
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

        <main className="admin-main">
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

          {activeTab === "dashboard" && <AdminDashboard onTabChange={handleTabChange} />}
          {activeTab === "members" && <AdminMembers onTabChange={handleTabChange} />}
          {activeTab === "qna" && <AdminQna onTabChange={handleTabChange} />}
          {activeTab === "board" && <AdminBoard onTabChange={handleTabChange} />}
        </main>
      </div>
    </Fragment>
  );
}

export default AdminPage;
