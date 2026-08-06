import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../../api/axiosInstance";
import type { RootState } from "../../../store/store";
import type { QnaListItem, QnaPageResponse } from "../../../types/qna";
import type { boardPageResponse } from "../../../types/BoardList";

interface Props {
  onTabChange: (tab: string) => void;
}

function AdminDashboard({ onTabChange }: Props) {
  const { members, totalCount, monthCount } = useSelector((state: RootState) => state.admin);
  const [unansweredQna, setUnansweredQna] = useState<QnaListItem[]>([]);
  const [unansweredCount, setUnansweredCount] = useState(0);
  const [totalQnaCount, setTotalQnaCount] = useState(0);
  const [qnaMonthCount, setQnaMonthCount] = useState(0);
  const [totalBoardCount, setTotalBoardCount] = useState(0);
  const [boardMonthCount, setBoardMonthCount] = useState(0);

  useEffect(() => {
    axiosInstance.get("/api/admin/qna", { params: { delYn: "N", page: 0 } }).then((res) => {
      const data: QnaPageResponse = res.data.data;
      setTotalQnaCount(data.page.totalElements);
    });

    axiosInstance.get("/api/admin/qna", { params: { delYn: "N", answerYn: "N", page: 0, size: 3 } }).then((res) => {
      const data: QnaPageResponse = res.data.data;
      setUnansweredQna(data.content);
      setUnansweredCount(data.page.totalElements);
    });

    axiosInstance.get("/api/admin/qnaMonthCount").then((res) => {
      setQnaMonthCount(res.data.data);
    });

    axiosInstance.get("/api/board/list", { params: { page: 0 } }).then((res) => {
      const data: boardPageResponse = res.data.data;
      setTotalBoardCount(data.page.totalElements);
    });

    axiosInstance.get("/api/admin/boardMonthCount").then((res) => {
      setBoardMonthCount(res.data.data);
    });
  }, []);

  const stats = [
    { label: "총 회원 수", value: (totalCount ?? 0).toString(), icon: "👥", change: `+${monthCount} 이번 달` },
    { label: "Q&A 게시글", value: totalQnaCount.toString(), icon: "💬", change: `+${qnaMonthCount} 이번 달` },
    { label: "미답변 Q&A", value: unansweredCount.toString(), icon: "⏳", change: "빠른 처리 필요" },
    { label: "게시판 게시글", value: totalBoardCount.toString(), icon: "📋", change: `+${boardMonthCount} 이번 달` },
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
            {unansweredQna.length === 0 ? (
              <div className="qna-empty">미답변 문의가 없습니다.</div>
            ) : (
              unansweredQna.map((q) => (
                <div key={q.qnaSeq} className="admin-qna-item">
                  <div className="admin-qna-row">
                    <div className="admin-qna-title">{q.title}</div>
                    <span className="admin-badge waiting">미답변</span>
                  </div>
                  <div className="admin-qna-meta">
                    <span>{q.nickname}</span>
                    <span>{q.regDt.slice(0, 10)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
