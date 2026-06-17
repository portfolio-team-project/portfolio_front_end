import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store/store";
import { fetchMembers, fetchMemberDetail } from "../../../slices/adminSlice";
import AdminMemberModal from "./AdminMemberModal";

interface Props {
  onTabChange: (tab: string) => void;
}

function AdminMembers({ onTabChange }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { members, totalPages, currentpage, memberDetail } = useSelector((state: RootState) => state.admin);
  const [keyword, setKeyword] = useState("");
  const [selectedMember, setSelectedMember] = useState<null | typeof members[0]>(null);

  const handlePageChange = (page: number) => {
    dispatch(fetchMembers({ page, size: 10, keyword }));
  };

  const handleSearch = () => {
    dispatch(fetchMembers({ page: 0, size: 10, keyword }));
  };

  return (
    <>
      <div className="admin-content">
        <button className="admin-back-btn" onClick={() => onTabChange("dashboard")}>← 대시보드로</button>
        <div className="admin-card">
          <div className="admin-card-header">
            <span className="admin-card-title">전체 회원 목록</span>
            <div className="admin-search-wrap">
              <input
                className="admin-search"
                type="text"
                placeholder="아이디 또는 이름 검색..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <button className="admin-search-btn" onClick={handleSearch}>검색</button>
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
      {selectedMember && memberDetail && (
        <AdminMemberModal member={memberDetail} onClose={() => setSelectedMember(null)} />
      )}
    </>
  );
}

export default AdminMembers;
