interface MemberDetailResponse {
  userId: string;
  userName: string;
  email: string;
  status: string;
  createdDate: string;
  cpName: string;
  rank: string;
  department: string;
  work: string;
}

interface Props {
  member: MemberDetailResponse;
  onClose: () => void;
}

function AdminMemberModal({ member, onClose }: Props) {
  return (
    <div className="admin-modal-backdrop" onClick={onClose}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <span className="admin-modal-title">회원 상세</span>
          <button className="admin-modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="admin-modal-body">
          <div className="admin-modal-row">
            <span className="admin-modal-label">아이디</span>
            <span className="admin-modal-value">{member.userId}</span>
          </div>
          <div className="admin-modal-row">
            <span className="admin-modal-label">이름</span>
            <span className="admin-modal-value">{member.userName}</span>
          </div>
          <div className="admin-modal-row">
            <span className="admin-modal-label">이메일</span>
            <span className="admin-modal-value">{member.email}</span>
          </div>
          <div className="admin-modal-row">
            <span className="admin-modal-label">가입일</span>
            <span className="admin-modal-value">{member.createdDate?.slice(0, 10)}</span>
          </div>
          <div className="admin-modal-row">
            <span className="admin-modal-label">상태</span>
            <span className={`admin-role-badge ${member.status === "Y" ? "active" : "inactive"}`}>
              {member.status === "Y" ? "활성" : "비활성"}
            </span>
          </div>
          <div className="admin-modal-row">
            <span className="admin-modal-label">회사명</span>
            <span className="admin-modal-value">{member.cpName}</span>
          </div>
          <div className="admin-modal-row">
            <span className="admin-modal-label">직급</span>
            <span className="admin-modal-value">{member.rank}</span>
          </div>
          <div className="admin-modal-row">
            <span className="admin-modal-label">부서</span>
            <span className="admin-modal-value">{member.department}</span>
          </div>
          <div className="admin-modal-row">
            <span className="admin-modal-label">담당업무</span>
            <span className="admin-modal-value">{member.work}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminMemberModal;
