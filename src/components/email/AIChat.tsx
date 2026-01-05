import { useState } from "react";
import { Send, Sparkles, Paperclip, Globe, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const exampleQueries = [
  "Summarize my unread emails",
  "Find emails about project deadlines",
  "Draft a reply to John's last email",
  "What meetings do I have this week?",
];

export const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses: Record<string, string> = {
        "summarize": "📬 **Your Inbox Summary:**\n\n• 2 unread emails requiring action\n• John Doe is waiting for confirmation on the $910M share deal\n• Sarah Chen needs sign-off on Q4 roadmap by Wednesday\n\nWould you like me to draft responses for any of these?",
        "john": "📧 Found John Doe's email about the **20M shares acquisition**:\n\n• Total value: $910 million at $45.50/share\n• Documents needed: transfer agreement, board resolution, SEC filings\n• Action required: Confirm receipt and schedule Thursday call\n\nShall I draft a confirmation reply?",
        "draft": "✍️ Here's a draft reply:\n\n---\n\nHi John,\n\nThank you for confirming the share acquisition details. I've received the terms and they look good.\n\nI'm available for a call on Thursday. Please share your preferred time slots.\n\nBest regards",
        "meeting": "📅 **This Week's Meetings:**\n\n• Investment Committee - Monday 2pm EST\n• Q4 Roadmap Review - Friday (pending)\n• Dad's Birthday - Saturday 6pm (personal)\n\nWant me to prepare any briefing notes?",
      };

      let response = "I can help you search your emails, summarize threads, draft replies, and more. What would you like to do?";
      
      const lowerInput = input.toLowerCase();
      if (lowerInput.includes("summarize") || lowerInput.includes("unread")) {
        response = responses["summarize"];
      } else if (lowerInput.includes("john") || lowerInput.includes("share")) {
        response = responses["john"];
      } else if (lowerInput.includes("draft") || lowerInput.includes("reply")) {
        response = responses["draft"];
      } else if (lowerInput.includes("meeting") || lowerInput.includes("week")) {
        response = responses["meeting"];
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleExampleClick = (query: string) => {
    setInput(query);
  };

  return (
    <div className="flex-1 flex flex-col bg-background h-full">
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold font-['Space_Grotesk'] mb-2 text-center">
              What can I help with?
            </h2>
            
            {/* Input Box */}
            <form onSubmit={handleSubmit} className="w-full max-w-xl mt-6">
              <div className="relative bg-card border border-border rounded-2xl shadow-sm">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask AI anything"
                  rows={2}
                  className="w-full bg-transparent px-4 pt-4 pb-12 text-foreground placeholder:text-muted-foreground focus:outline-none resize-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button 
                      type="button"
                      className="flex items-center gap-1 px-2 py-1 text-xs text-muted-foreground hover:bg-secondary rounded-lg transition-colors"
                    >
                      <Sparkles className="w-3 h-3" />
                      AI-powered
                      <ChevronDown className="w-3 h-3" />
                    </button>
                    <button 
                      type="button"
                      className="p-1.5 text-muted-foreground hover:bg-secondary rounded-lg transition-colors"
                    >
                      <Globe className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      type="button"
                      className="p-1.5 text-muted-foreground hover:bg-secondary rounded-lg transition-colors"
                    >
                      <Paperclip className="w-4 h-4" />
                    </button>
                    <Button 
                      type="submit" 
                      size="icon" 
                      className="h-8 w-8 rounded-full"
                      disabled={!input.trim()}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </form>

            {/* Example Queries */}
            <div className="mt-6 w-full max-w-xl">
              <p className="text-xs text-muted-foreground mb-3">Examples of queries:</p>
              <div className="space-y-2">
                {exampleQueries.map((query) => (
                  <button
                    key={query}
                    onClick={() => handleExampleClick(query)}
                    className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-secondary rounded-lg transition-colors flex items-center justify-between group"
                  >
                    {query}
                    <ChevronDown className="w-4 h-4 text-muted-foreground -rotate-90 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-3",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground"
                  )}
                >
                  <div className="text-sm whitespace-pre-line">{message.content}</div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-secondary rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Input (when messages exist) */}
      {messages.length > 0 && (
        <div className="p-4 border-t border-border">
          <form onSubmit={handleSubmit}>
            <div className="relative bg-secondary rounded-xl">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a follow-up..."
                className="w-full bg-transparent px-4 py-3 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <Button 
                type="submit" 
                size="icon" 
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full"
                disabled={!input.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};