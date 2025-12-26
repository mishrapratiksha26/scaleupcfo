import { useState } from "react";
import { Send, Mic } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const ChatInput = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <div className="glass-card rounded-lg p-3 border-t border-border/50">
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask about your financial performance..."
            className="bg-secondary/50 border-border/50 pr-10 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary/50"
          />
        </div>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="text-muted-foreground hover:text-foreground hover:bg-secondary"
        >
          <Mic className="w-4 h-4" />
        </Button>
        <Button
          type="submit"
          size="icon"
          className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary"
          disabled={!message.trim()}
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
};