import { useEffect, useRef, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

interface ChatMessage {
  role: "user" | "bot";
  text: string;
}

const POLL_INTERVAL_MS = 1500;
const MAX_POLL_ATTEMPTS = 80;

function cleanAnswerText(text: string) {
  return text
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "bot", text: "안녕하세요! 이 포트폴리오에 대해 궁금한 점을 물어보세요." },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const pollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isOpen]);

  useEffect(() => {
    return () => {
      if (pollTimerRef.current) clearTimeout(pollTimerRef.current);
    };
  }, []);

  const describeError = (error: any) => {
    const status = error.response?.status;
    const serverMessage = error.response?.data?.message;
    return status === 401 || status === 403
      ? "로그인한 사용자만 사용이 가능합니다."
      : serverMessage
      ? serverMessage
      : error.response
      ? "죄송해요, 지금은 답변을 가져올 수 없어요."
      : "챗봇 서비스가 아직 준비 중이에요. 잠시 후 다시 시도해주세요.";
  };

  const pollResult = (jobId: string, attempt: number) => {
    pollTimerRef.current = setTimeout(async () => {
      try {
        const res = await axiosInstance.get(`/api/chatbot/${jobId}`);
        const { status, answer } = res.data.data as { status: string; answer?: string };

        if (status === "processing") {
          if (attempt >= MAX_POLL_ATTEMPTS) {
            setMessages((prev) => [
              ...prev,
              { role: "bot", text: "답변이 너무 오래 걸리고 있어요. 잠시 후 다시 시도해주세요." },
            ]);
            setIsLoading(false);
            return;
          }
          pollResult(jobId, attempt + 1);
          return;
        }

        const text =
          status === "done"
            ? cleanAnswerText(answer || "답변을 가져오지 못했어요.")
            : answer || "죄송해요, 지금은 답변을 가져올 수 없어요.";
        setMessages((prev) => [...prev, { role: "bot", text }]);
        setIsLoading(false);
      } catch (error: any) {
        setMessages((prev) => [...prev, { role: "bot", text: describeError(error) }]);
        setIsLoading(false);
      }
    }, POLL_INTERVAL_MS);
  };

  const sendMessage = async () => {
    const question = input.trim();
    if (!question || isLoading) return;

    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await axiosInstance.get("/api/chatbot", { params: { content: question } });
      const jobId = res.data.data.jobId as string;
      pollResult(jobId, 0);
    } catch (error: any) {
      setMessages((prev) => [...prev, { role: "bot", text: describeError(error) }]);
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
