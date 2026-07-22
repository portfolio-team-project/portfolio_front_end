import { useEffect, useRef, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

interface ChatMessage {
  role: "user" | "bot";
  text: string;
}

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "bot", text: "안녕하세요! 이 포트폴리오에 대해 궁금한 점을 물어보세요." },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isOpen]);

  const sendMessage = async () => {
    const question = input.trim();
    if (!question || isLoading) return;

    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/api/chat", { message: question });
      setMessages((prev) => [...prev, { role: "bot", text: res.data.answer }]);
    } catch (error: any) {
      const text = error.response
        ? "죄송해요, 지금은 답변을 가져올 수 없어요."
        : "챗봇 서비스가 아직 준비 중이에요. 잠시 후 다시 시도해주세요.";
      setMessages((prev) => [...prev, { role: "bot", text }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="chat-widget">
      {isOpen && (
        <div className="chat-panel">
          <div className="chat-panel-header">
            <span>포트폴리오 챗봇</span>
            <button className="chat-panel-close" onClick={() => setIsOpen(false)}>✕</button>
          </div>
          <div className="chat-panel-messages" ref={listRef}>
            {messages.map((m, i) => (
              <div key={i} className={`chat-bubble chat-bubble-${m.role}`}>
                {m.text}
              </div>
            ))}
            {isLoading && (
              <div className="chat-bubble chat-bubble-bot chat-bubble-loading">답변 작성 중...</div>
            )}
          </div>
          <div className="chat-panel-input">
            <input
              type="text"
              placeholder="질문을 입력하세요"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
            <button onClick={sendMessage} disabled={isLoading}>전송</button>
          </div>
        </div>
      )}
      <button className="chat-fab" onClick={() => setIsOpen((prev) => !prev)} aria-label="챗봇 열기">
        {isOpen ? "✕" : "💬"}
      </button>
    </div>
  );
}

export default ChatWidget;
