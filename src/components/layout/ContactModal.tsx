import { useState } from "react";

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

  if (!target) return null;

  const submit = () => {
    if (!name.trim() || !email.trim() || !message.trim()) return;
    // TODO: 실제 전송 로직
    setName("");
    setEmail("");
    setMessage("");
    onClose();
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
          <button className={`modal-submit ${target.theme}`} onClick={submit}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default ContactModal;
