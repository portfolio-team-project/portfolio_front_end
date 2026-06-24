import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store/store";
import { fetchMembers, fetchMemberDetail } from "../../../slices/adminSlice";
import AdminMemberModal from "./AdminMemberModal";
import axiosInstance from "../../../api/axiosInstance";
import toast from "react-hot-toast";

interface Props {
  onTabChange: (tab: string) => void;
}

function AdminMembers({ onTabChange }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { members, totalPages, currentpage, memberDetail } = useSelector((state: RootState) => state.admin);
  const [keyword, setKeyword] = useState("");
  const [searchType, setSearchType] = useState("userId");
  const [selectedMember, setSelectedMember] = useState<null | typeof members[0]>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const handlePageChange = (page: number) => {
    dispatch(fetchMembers({ page, size: 10, keyword, searchType }));
  };

  const handleSearch = () => {
    dispatch(fetchMembers({ page: 0, size: 10, keyword, searchType }));
  };

  const handleReset = () => {
    setKeyword("");
    setSearchType("userId");
    dispatch(fetchMembers({ page: 0, size: 10 }));
  };

  const handleDeleteConfirm = async () => {
    if (deleteTargetId === null) return;
    try {
      await axiosInstance.post(`/api/admin/deleteId?userId=${deleteTargetId}`);
      toast.success("계정이 삭제되었습니다.");
      dispatch(fetchMembers({ page: currentpage, size: 10, keyword, searchType }));
    } catch {
      // 인터셉터에서 서버 메시지 toast 처리
    } finally {
      setDeleteTargetId(null);
    }
  };

  return (
    <>
      {deleteTargetId !== null && (
        <div className="confirm-overlay" onClick={() => setDeleteTargetId(null)}>
          <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
            <p className="confirm-message">{deleteTargetId} 계정을 삭제하시겠습니까?</p>
            <div className="confirm-btns">
              <button className="admin-action-btn danger" onClick={handleDeleteConfirm}>삭제</button>
              <button className="qna-back-btn" onClick={() => setDeleteTargetId(null)}>취소</button>
            </div>
          </div>
        </div>
      )}

      <div className="admin-content">
        <button className="admin-back-btn" onClick={() => onTabChange("dashboard")}>← 대시보드로</button>
        <div className="admin-card">
          <div className="admin-card-header">
            <span className="admin-card-title">전체 회원 목록</span>
            <div className="admin-search-wrap">
              <select
                className="admin-select"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
              >
                <option value="userId">아이디</option>
                <option value="userName">이름</option>
                <option value="email">이메일</option>
              </select>
              <input
                className="admin-search"
                type="text"
                placeholder="검색어 입력..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <button className="admin-search-btn" onClick={handleSearch}>검색</button>
              <button className="admin-search-btn" onClick={handleReset}>초기화</button>
            </div>
          </div>
          <table className="admin-table admin-members-table">
            <thead>
              <tr>
                <th>No</th>
                <th>아이디</th>
                <th>이름</th>
                <th>이메일</th>
                <th>가입일</th>
                <th>구분</th>
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
                    <span className={`admin-role-badge ${m.isSocial === "Y" ? "active" : "inactive"}`}>
                      {m.isSocial === "Y" ? "카카오" : "일반"}
                    </span>
                  </td>
                  <td>
                    <span className={`admin-role-badge ${m.status === "Y" ? "active" : "inactive"}`}>
                      {m.status === "Y" ? "활성" : "비활성"}
                    </span>
                  </td>
                  <td>
                    <button className="admin-action-btn" onClick={() => { dispatch(fetchMemberDetail(m.userId)); setSelectedMember(m); }}>상세</button>
                    <button className="admin-action-btn danger" onClick={() => setDeleteTargetId(m.userId)}>탈퇴</button>
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
        <AdminMemberModal
          member={memberDetail}
          isSocial={selectedMember.isSocial === "Y"}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </>
  );
}

export default AdminMembers;
