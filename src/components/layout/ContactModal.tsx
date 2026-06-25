import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

interface ContactTarget {
  name: string;
  theme: "ca" | "cb";
}

interface Props {
  target: ContactTarget | null;
  onClose: () => void;
}

function ContactModal({ target, onClose }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!target) return null;

  const submit = async () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      return toast.error("모든 항목을 입력해주세요.");
    }

    try {
      setIsLoading(true);
      await axios.post(`${import.meta.env.VITE_API_URL}/api/mail/contact`, {
        fromName: name,
        fromEmail: email,
        message: message,
        recipient: target.theme,
      });

      setName("");
      setEmail("");
      setMessage("");
      onClose();
      toast.success("메시지가 전송되었습니다.");
    } catch (error: any) {
      const msg = error.response?.data?.message;
      toast.error(msg ?? "전송에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }

  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className={`modal-box ${target.theme}`} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <p className="modal-label">CONTACT</p>
        <div className="modal-fields">
          <input
            className="modal-input"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="modal-input"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            className="modal-textarea"
            placeholder="메시지를 입력하세요"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className="modal-footer-row">
          <button className={`modal-submit ${target.theme}`} onClick={submit} disabled={isLoading}>{isLoading ? "발송 중" : "send"}</button>
        </div>
      </div>
    </div>
  );
}

export default ContactModal;
