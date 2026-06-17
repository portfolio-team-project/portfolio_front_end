import { useState } from "react";

const NOTICE_KEY = "noticeSeen";

const NOTICE_MESSAGE = "현재 개발중인 웹사이트이므로 동작이 안되는 기능이 존재합니다.";

function NoticeModal() {
  const [open, setOpen] = useState(() => !sessionStorage.getItem(NOTICE_KEY));

  if (!open) return null;

  const handleClose = () => {
    sessionStorage.setItem(NOTICE_KEY, "true");
    setOpen(false);
  };

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
    }}>
      <div style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "32px 28px",
        maxWidth: "380px",
        width: "90%",
        textAlign: "center",
        boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
      }}>
        <div style={{ fontSize: "2rem", marginBottom: "12px" }}>🚧</div>
        <h3 style={{ margin: "0 0 12px", fontSize: "1.1rem", color: "#1a1a1a" }}>
          개발 중 안내
        </h3>
        <p style={{ margin: "0 0 24px", fontSize: "0.95rem", color: "#555", lineHeight: 1.6 }}>
          {NOTICE_MESSAGE}
        </p>
        <button
          onClick={handleClose}
          style={{
            background: "#1a1a1a",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "10px 32px",
            fontSize: "0.95rem",
            cursor: "pointer",
          }}
        >
          확인
        </button>
      </div>
    </div>
  );
}

export default NoticeModal;
