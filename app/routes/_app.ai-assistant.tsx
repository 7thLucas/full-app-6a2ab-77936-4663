import { Sparkles, Send, Bot, User, Trash2, Plus } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { invokeLLM } from "@qb/agentic";
import { useConfigurables } from "~/modules/configurables";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const SUGGESTED_PROMPTS = [
  "Summarize the NovaForgeAI project status",
  "What are the active tasks this week?",
  "How many blockchains are in the ecosystem?",
  "List all AI agents and their roles",
  "What are the upcoming roadmap milestones?",
  "Generate a treasury summary",
];

export default function AIAssistantPage() {
  const { config, loading } = useConfigurables();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const aiName = loading ? "NovaStack AI" : (config?.aiAssistantName ?? "NovaStack AI");
  const ecosystemName = loading ? "NovaSphere" : (config?.ecosystemName ?? "NovaSphere");

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend(text?: string) {
    const query = (text ?? input).trim();
    if (!query || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const result = await invokeLLM({
        message: query,
        schema: {
          type: "object",
          properties: { answer: { type: "string" } },
          required: ["answer"],
        },
        systemPrompt: `You are ${aiName}, an AI assistant for the ${ecosystemName} ecosystem command center. You help the founder manage 15 blockchains, 10+ projects, 15 tokens, AI agents, treasury, wallets, documents, and more. Be concise, professional, and precise. Always refer to NovaSphere ecosystem entities by their correct names.`,
      } as any);

      const answer =
        (result.response as any)?.answer ??
        "I'm having trouble connecting to the AI backend. Please ensure QB_SCAFFOLDER_KEY is configured in your environment variables.";

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: answer,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          `${aiName} is not fully configured. Please set up QB_SCAFFOLDER_KEY in your environment variables to enable AI-powered responses.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }

  function clearConversation() {
    setMessages([]);
  }

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-56px)]">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
            <Sparkles size={18} className="text-primary" />
          </div>
          <div>
            <h1 className="text-base font-semibold text-foreground">{aiName}</h1>
            <p className="text-xs text-muted-foreground">
              AI assistant for the {ecosystemName} ecosystem
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {messages.length > 0 && (
            <button
              onClick={clearConversation}
              className="flex items-center gap-1.5 h-8 px-3 text-xs text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
            >
              <Trash2 size={13} />
              Clear
            </button>
          )}
          <button className="flex items-center gap-1.5 h-8 px-3 text-xs font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
            <Plus size={13} />
            New chat
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
              <Sparkles size={28} className="text-primary" />
            </div>
            <h2 className="text-base font-semibold text-foreground mb-2">{aiName}</h2>
            <p className="text-sm text-muted-foreground mb-8 max-w-md">
              Your AI assistant for the {ecosystemName} ecosystem. Ask me anything about your projects, blockchains, tokens, treasury, agents, or documents.
            </p>

            {/* Suggested prompts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-lg w-full">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSend(prompt)}
                  className="text-left p-3 rounded-lg border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-all text-xs text-muted-foreground hover:text-foreground"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles size={15} className="text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border text-foreground"
                  }`}
                >
                  <p>{message.content}</p>
                  <p
                    className={`text-[10px] mt-1.5 ${
                      message.role === "user" ? "text-primary-foreground/60" : "text-muted-foreground"
                    }`}
                  >
                    {message.timestamp}
                  </p>
                </div>
                {message.role === "user" && (
                  <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-0.5">
                    <User size={15} className="text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Sparkles size={15} className="text-primary" />
                </div>
                <div className="bg-card border border-border rounded-xl px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </>
        )}
      </div>

      {/* Input */}
      <div className="px-6 py-4 border-t border-border shrink-0">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
              placeholder={`Ask ${aiName} anything about your ecosystem...`}
              className="w-full h-11 px-4 pr-12 text-sm rounded-xl border border-input bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="h-11 w-11 flex items-center justify-center rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0"
          >
            <Send size={16} />
          </button>
        </div>
        <p className="text-[10px] text-muted-foreground mt-2 text-center">
          {aiName} can make mistakes. Always verify important information.
        </p>
      </div>
    </div>
  );
}
