import { useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import toast from "react-hot-toast";

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
  isSocial: boolean;
  onClose: () => void;
}

function AdminMemberModal({ member, isSocial, onClose }: Props) {
  const [resetConfirm, setResetConfirm] = useState(false);
  const [sending, setSending] = useState(false);

  const handleResetPwd = async () => {
    setSending(true);
    try {
      await axiosInstance.post(`/api/admin/sendTempPwd?userId=${member.userId}`);
      toast.success("임시 비밀번호가 발송되었습니다.");
      setResetConfirm(false);
      onClose();
    } catch {
      toast.error("임시 비밀번호 발송에 실패했습니다.");
    } finally {
      setSending(false);
    }
  };

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

        {!isSocial && (
          <div className="admin-modal-footer">
            <button className="admin-action-btn" onClick={() => setResetConfirm(true)}>
              비밀번호 초기화
            </button>
          </div>
        )}
      </div>

      {resetConfirm && (
        <div className="confirm-overlay" onClick={() => setResetConfirm(false)}>
          <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
            <p className="confirm-message">임시 비밀번호를 {member.email}로 발송하시겠습니까?</p>
            <div className="confirm-btns">
              <button className="admin-action-btn danger" onClick={handleResetPwd} disabled={sending}>
                {sending ? "발송 중..." : "발송"}
              </button>
              <button className="qna-back-btn" onClick={() => setResetConfirm(false)}>취소</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminMemberModal;
