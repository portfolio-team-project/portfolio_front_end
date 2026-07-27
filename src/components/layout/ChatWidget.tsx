import { useEffect, useRef, useState } from "react";
import store from "../../store/store";

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
      const token = store.getState().member.user?.accessToken;
      const url = `${import.meta.env.VITE_API_URL}/api/chatbot/stream?content=${encodeURIComponent(question)}`;
      const res = await fetch(url, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        credentials: "include",
      });

      if (!res.ok || !res.body) {
        let serverMessage: string | undefined;
        try {
          serverMessage = (await res.json())?.message;
        } catch {
          // 본문이 JSON이 아닌 경우 무시
        }
        const text =
          res.status === 401 || res.status === 403
            ? "로그인한 사용자만 사용이 가능합니다."
            : serverMessage ?? "죄송해요, 지금은 답변을 가져올 수 없어요.";
        setMessages((prev) => [...prev, { role: "bot", text }]);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let answer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const events = buffer.split("\n\n");
        buffer = events.pop() ?? "";

        for (const event of events) {
          const lines = event.split("\n");
          const isDone = lines.some((line) => line.replace(/^event:\s*/, "").trim() === "done" && line.startsWith("event:"));
          if (isDone) continue;

          const dataLines = lines
            .filter((line) => line.startsWith("data:"))
            .map((line) => {
              const raw = line.slice(5).replace(/^ /, "");
              try {
                const parsed = JSON.parse(raw);
                return typeof parsed === "string" ? parsed : raw;
              } catch {
                return raw;
              }
            });
          if (dataLines.length) answer += dataLines.join("\n");
        }
      }

      const cleanAnswer = answer
        .replace(/\*\*(.+?)\*\*/g, "$1")
        .replace(/\n{3,}/g, "\n\n")
        .trim();

      setMessages((prev) => [
        ...prev,
        { role: "bot", text: cleanAnswer || "답변을 가져오지 못했어요." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "챗봇 서비스가 아직 준비 중이에요. 잠시 후 다시 시도해주세요." },
      ]);
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
