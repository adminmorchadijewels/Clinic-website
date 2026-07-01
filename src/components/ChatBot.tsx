"use client";

import { useEffect, useRef, useState } from "react";
import { CLINIC_CONFIG } from "@/lib/config";

// Brand teal used by the widget (matches teal.bright in tailwind.config.ts).
const TEAL = "#1D9E75";

type Msg = { role: "user" | "assistant"; content: string };

const GREETING =
  "Hi! I am the Elavive Physio assistant. I can help with questions about our services, Dr. Ajay Agarwal, clinic hours, and booking appointments. How can I help you today?";

const QUICK_REPLIES = [
  "What conditions do you treat?",
  "How do I book an appointment?",
  "What are your clinic hours?",
  "Tell me about Dr. Ajay Agarwal",
];

// Opened directly (not sent to the API) when the WhatsApp quick-reply is tapped.
const WHATSAPP_QUICK_LINK =
  "https://wa.me/918955032437?text=Hi%2C%20I%20found%20you%20on%20your%20website%20and%20would%20like%20to%20book%20an%20appointment";

const FALLBACK = `I am having trouble connecting right now. Please call us at ${CLINIC_CONFIG.contact.phone} or WhatsApp us directly.`;

/* ---------- Inline SVG icons ---------- */
function ChatIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.9-.9L3 21l1.9-5.6A8.5 8.5 0 0 1 4 11.5 8.38 8.38 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RobotIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="8" width="16" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 8V4M12 4h-1.5M12 4h1.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="9" cy="13" r="1.2" fill="currentColor" />
      <circle cx="15" cy="13" r="1.2" fill="currentColor" />
      <path d="M9.5 16.5h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M4 12H2.5M20 12h1.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12h13M12 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 px-1 py-1" aria-label="Assistant is typing">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="inline-block h-2 w-2 rounded-full bg-teal/60 motion-safe:animate-dot-bounce"
          style={{ animationDelay: `${i * 0.16}s` }}
        />
      ))}
    </div>
  );
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: GREETING },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  // Quick replies show only until the first user message is sent.
  const [showQuickReplies, setShowQuickReplies] = useState(true);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to the latest message / typing indicator.
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading, open]);

  // Focus the input when the panel opens.
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function sendMessage(text: string) {
    const content = text.trim();
    if (!content || loading) return;

    setShowQuickReplies(false);
    const nextMessages: Msg[] = [...messages, { role: "user", content }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Send only user/assistant turns; the API caps to the last 8 itself.
        body: JSON.stringify({ messages: nextMessages.slice(-8) }),
      });
      const data = await res.json().catch(() => null);
      const reply = data?.reply || FALLBACK;
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: FALLBACK }]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  return (
    <>
      {/* Floating launcher — bottom-RIGHT (natural position for chat widgets). */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open Elavive Physio chat assistant"
          className="group fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full text-white shadow-lift transition-transform duration-300 hover:scale-110 active:scale-95 motion-safe:animate-breathe"
          style={{ backgroundColor: TEAL }}
        >
          <ChatIcon />
          <span className="pointer-events-none absolute right-16 hidden whitespace-nowrap rounded-full bg-charcoal px-3 py-1.5 text-xs font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:block">
            Ask us anything
          </span>
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Elavive Physio chat assistant"
          className="fixed bottom-0 right-0 z-50 flex h-[70vh] w-screen flex-col overflow-hidden bg-white shadow-lift motion-safe:animate-chat-in sm:bottom-5 sm:right-5 sm:h-[500px] sm:w-[360px] sm:rounded-2xl sm:border sm:border-teal/10"
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-4 py-3 text-white"
            style={{ backgroundColor: TEAL }}
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/15">
              <RobotIcon />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold leading-tight">
                Elavive Physio Assistant
              </p>
              <p className="truncate text-xs text-white/70">
                Typically replies instantly
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-white transition-colors hover:bg-white/15"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto bg-background px-4 py-4"
          >
            {messages.map((m, i) => {
              const isFirstAssistant =
                m.role === "assistant" &&
                messages.findIndex((x) => x.role === "assistant") === i;
              return (
                <div key={i} className="animate-fade-in">
                  {isFirstAssistant && (
                    <span className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-muted">
                      Elavive Physio
                    </span>
                  )}
                  <div
                    className={
                      m.role === "user"
                        ? "flex justify-end"
                        : "flex justify-start"
                    }
                  >
                    <div
                      className={
                        m.role === "user"
                          ? "max-w-[80%] rounded-2xl rounded-br-sm px-3.5 py-2.5 text-sm leading-relaxed text-white"
                          : "max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-bl-sm px-3.5 py-2.5 text-sm leading-relaxed text-charcoal"
                      }
                      style={
                        m.role === "user"
                          ? { backgroundColor: TEAL }
                          : { backgroundColor: "#F0F9F5" }
                      }
                    >
                      {m.content}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Quick reply chips — only before the first user message. */}
            {showQuickReplies && !loading && (
              <div className="flex flex-wrap gap-2 pt-1">
                {QUICK_REPLIES.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => sendMessage(q)}
                    className="rounded-full border border-teal/30 bg-white px-3 py-1.5 text-left text-xs font-medium text-teal transition-colors hover:bg-teal hover:text-white"
                  >
                    {q}
                  </button>
                ))}
                {/* Opens WhatsApp directly instead of sending to the API. */}
                <button
                  type="button"
                  onClick={() =>
                    window.open(
                      WHATSAPP_QUICK_LINK,
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                  className="inline-flex items-center gap-1.5 rounded-full border border-teal/30 bg-white px-3 py-1.5 text-left text-xs font-medium text-teal transition-colors hover:bg-teal hover:text-white"
                >
                  Chat with us on WhatsApp
                </button>
              </div>
            )}

            {/* Typing indicator */}
            {loading && (
              <div className="flex justify-start">
                <div
                  className="rounded-2xl rounded-bl-sm px-3 py-2"
                  style={{ backgroundColor: "#F0F9F5" }}
                >
                  <TypingDots />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-teal/10 bg-white px-3 py-3"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              placeholder="Type your question..."
              aria-label="Type your question"
              className="min-w-0 flex-1 rounded-full border border-teal/15 bg-white px-4 py-2.5 text-sm text-charcoal outline-none transition-colors duration-300 placeholder:text-muted/60 focus:border-teal focus:ring-2 focus:ring-teal/15 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send message"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-white transition-transform duration-200 hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
              style={{ backgroundColor: TEAL }}
            >
              <SendIcon />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
