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
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  if (!target) return null;

  const submit = () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    // TODO: 실제 전송 로직
    setForm({ name: "", email: "", message: "" });
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
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="modal-input"
            placeholder="이메일"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <textarea
            className="modal-textarea"
            placeholder="메시지를 입력하세요"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
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
