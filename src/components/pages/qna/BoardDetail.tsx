import { Fragment, useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosInstance from "../../../api/axiosInstance";
import type { RootState } from "../../../store/store";
import type { boardDetailItem, commentItem } from "../../../types/BoardList";
import toast from "react-hot-toast";

function BoardDetail() {
  const { localId } = useParams<{ localId: string }>();
  const [board, setBoard] = useState<boardDetailItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ title: "", content: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const [comments, setComments] = useState<commentItem[]>([]);
  const [commentInput, setCommentInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editCommentText, setEditCommentText] = useState("");
  const [commentDeleteId, setCommentDeleteId] = useState<number | null>(null);
  const [commentDeletePassword, setCommentDeletePassword] = useState("");
  const [isDeletingComment, setIsDeletingComment] = useState(false);

  const commentInputRef = useRef<HTMLTextAreaElement>(null);
  const fetchedRef = useRef(false);

  const user = useSelector((state: RootState) => state.member.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    axiosInstance.get(`/api/board/${localId}`).then((res) => {
      const data: boardDetailItem = res.data.data;
      setBoard(data);
      setEditForm({ title: data.title, content: data.content });
    });
    axiosInstance.get(`/api/board/${localId}/comments`).then((res) => {
      setComments(res.data.data ?? []);
    }).catch(() => {});
  }, [localId]);

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setEditForm({ title: board!.title, content: board!.content });
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!editForm.title.trim() || !editForm.content.trim()) {
      toast.error("제목과 내용을 입력해주세요.");
      return;
    }
    setIsLoading(true);
    try {
      await axiosInstance.put(`/api/board/${localId}`, editForm);
      setBoard((prev) => prev ? { ...prev, title: editForm.title, content: editForm.content } : prev);
      toast.success("수정되었습니다.");
      setIsEditing(false);
    } catch {
      // 인터셉터에서 서버 메시지 toast 처리
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletePassword.trim()) {
      toast.error("비밀번호를 입력해주세요.");
      return;
    }
    setIsDeleting(true);
    try {
      await axiosInstance.delete(`/api/board/${localId}`, {
        data: { password: deletePassword },
      });
      toast.success("게시글이 삭제되었습니다.");
      navigate("/boardList");
    } catch {
      // 인터셉터에서 백엔드 메시지로 toast 처리
    } finally {
      setIsDeleting(false);
      setDeletePassword("");
    }
  };

  const handleModalClose = () => {
    setShowDeleteModal(false);
    setDeletePassword("");
  };

  const handleCommentSubmit = async () => {
    if (!commentInput.trim()) {
      toast.error("댓글을 입력해주세요.");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await axiosInstance.post(`/api/board/${localId}/comments`, { content: commentInput });
      setComments((prev) => [...prev, res.data.data]);
      setCommentInput("");
    } catch {
      // 인터셉터 처리
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCommentEditStart = (comment: commentItem) => {
    setEditingCommentId(comment.localId);
    setEditCommentText(comment.content);
  };

  const handleCommentEditCancel = () => {
    setEditingCommentId(null);
    setEditCommentText("");
  };

  const handleCommentEditSave = async (commentId: number) => {
    if (!editCommentText.trim()) {
      toast.error("내용을 입력해주세요.");
      return;
    }
    try {
      await axiosInstance.put(`/api/board/${localId}/comments/${commentId}`, { content: editCommentText });
      setComments((prev) =>
        prev.map((c) => c.localId === commentId ? { ...c, content: editCommentText } : c)
      );
      setEditingCommentId(null);
    } catch {
      // 인터셉터 처리
    }
  };

  const handleCommentDeleteOpen = (commentId: number) => {
    setCommentDeleteId(commentId);
    setCommentDeletePassword("");
  };

  const handleCommentDeleteClose = () => {
    setCommentDeleteId(null);
    setCommentDeletePassword("");
  };

  const handleCommentDeleteConfirm = async () => {
    if (!commentDeletePassword.trim()) {
      toast.error("비밀번호를 입력해주세요.");
      return;
    }
    setIsDeletingComment(true);
    try {
      await axiosInstance.delete(`/api/board/${localId}/comments/${commentDeleteId}`, {
        data: { password: commentDeletePassword },
      });
      setComments((prev) => prev.filter((c) => c.localId !== commentDeleteId));
      toast.success("댓글이 삭제되었습니다.");
      handleCommentDeleteClose();
    } catch {
      // 인터셉터 처리
    } finally {
      setIsDeletingComment(false);
    }
  };

  if (!board) return null;

  const isAuthor = user?.userId === board.userId;

  return (
    <Fragment>
      <section className="qna-section">
        <div className="qna-wrap">
          <h2 className="qna-title">{isEditing ? "게시글 수정" : "게시글 상세"}</h2>

          <div className="qna-form">
            <input
              className="qna-input"
              placeholder="작성자"
              value={board.userId}
              readOnly
            />
            <input
              className="qna-input"
              placeholder="제목"
              value={isEditing ? editForm.title : board.title}
              readOnly={!isEditing}
              onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
            />
            <textarea
              className="qna-textarea"
              value={isEditing ? editForm.content : board.content}
              readOnly={!isEditing}
              onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
            />
            <div className="board-detail-meta">
              <span>작성일 : {board.createdDate?.slice(0, 10)}</span>
              <span>조회수 : {board.viewCnt}</span>
            </div>
            <div className="qna-btn-group">
              <button className="qna-back-btn" onClick={() => navigate("/boardList")}>목록</button>
              {isAuthor && !isEditing && (
                <button className="qna-submit-btn" onClick={handleEdit}>수정</button>
              )}
              {isEditing && (
                <>
                  <button className="board-delete-btn" onClick={() => setShowDeleteModal(true)}>삭제</button>
                  <button className="qna-back-btn" onClick={handleCancel}>취소</button>
                  <button className="qna-submit-btn" onClick={handleSave} disabled={isLoading}>
                    {isLoading ? "저장 중..." : "저장"}
                  </button>
                </>
              )}
            </div>
          </div>

          {/* 댓글 섹션 */}
          <div className="comment-section">
            <div className="comment-header">
              <span className="comment-header-label">댓글</span>
              <span className="comment-count">{comments.length}</span>
            </div>

            <div className="comment-list">
              {comments.length === 0 && (
                <p className="comment-empty">아직 댓글이 없습니다.</p>
              )}
              {comments.map((comment) => {
                const isMine = user?.userId === comment.userId;
                const isEditingThis = editingCommentId === comment.localId;
                return (
                  <div key={comment.localId} className={`comment-item${isMine ? " is-mine" : ""}`}>
                    <div className="comment-body">
                      <div className="comment-author-row">
                        <span className="comment-author">{comment.userId}</span>
                        <span className="comment-date">{comment.createdDate?.slice(0, 10)}</span>
                        {isMine && <span className="comment-mine-badge">내 댓글</span>}
                      </div>
                      {isEditingThis ? (
                        <>
                          <textarea
                            className="comment-edit-textarea"
                            value={editCommentText}
                            onChange={(e) => setEditCommentText(e.target.value)}
                            maxLength={500}
                            autoFocus
                          />
                          <div className="comment-edit-actions">
                            <button className="comment-cancel-btn" onClick={handleCommentEditCancel}>취소</button>
                            <button className="comment-save-btn" onClick={() => handleCommentEditSave(comment.localId)}>저장</button>
                          </div>
                        </>
                      ) : (
                        <p className="comment-text">{comment.content}</p>
                      )}
                    </div>
                    {isMine && !isEditingThis && (
                      <div className="comment-actions">
                        <button className="comment-action-btn" onClick={() => handleCommentEditStart(comment)}>수정</button>
                        <button className="comment-action-btn delete" onClick={() => handleCommentDeleteOpen(comment.localId)}>삭제</button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {user ? (
              <div className="comment-form">
                <textarea
                  ref={commentInputRef}
                  className="comment-input"
                  placeholder="댓글을 입력하세요."
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  maxLength={500}
                />
                <div className="comment-form-footer">
                  <span className="comment-char-count">{commentInput.length} / 500</span>
                  <button className="comment-submit-btn" onClick={handleCommentSubmit} disabled={isSubmitting}>
                    {isSubmitting ? "등록 중..." : "등록"}
                  </button>
                </div>
              </div>
            ) : (
              <p className="comment-login-notice">
                댓글을 작성하려면 <span className="comment-login-link" onClick={() => navigate("/login")}>로그인</span>이 필요합니다.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 게시글 삭제 모달 */}
      {showDeleteModal && (
        <div className="board-modal-overlay" onClick={handleModalClose}>
          <div className="board-modal" onClick={(e) => e.stopPropagation()}>
            <p className="board-modal-title">게시글 삭제</p>
            <p className="board-modal-desc">비밀번호를 입력하면 게시글이 삭제됩니다.</p>
            <input
              className="board-modal-input"
              type="password"
              placeholder="비밀번호"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleDeleteConfirm()}
              autoFocus
            />
            <div className="board-modal-btns">
              <button className="qna-back-btn" onClick={handleModalClose}>취소</button>
              <button className="board-delete-btn" onClick={handleDeleteConfirm} disabled={isDeleting}>
                {isDeleting ? "삭제 중..." : "삭제"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 댓글 삭제 모달 */}
      {commentDeleteId !== null && (
        <div className="board-modal-overlay" onClick={handleCommentDeleteClose}>
          <div className="board-modal" onClick={(e) => e.stopPropagation()}>
            <p className="board-modal-title">댓글 삭제</p>
            <p className="board-modal-desc">비밀번호를 입력하면 댓글이 삭제됩니다.</p>
            <input
              className="board-modal-input"
              type="password"
              placeholder="비밀번호"
              value={commentDeletePassword}
              onChange={(e) => setCommentDeletePassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCommentDeleteConfirm()}
              autoFocus
            />
            <div className="board-modal-btns">
              <button className="qna-back-btn" onClick={handleCommentDeleteClose}>취소</button>
              <button className="board-delete-btn" onClick={handleCommentDeleteConfirm} disabled={isDeletingComment}>
                {isDeletingComment ? "삭제 중..." : "삭제"}
              </button>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default BoardDetail;
