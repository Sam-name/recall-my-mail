import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Email } from "@/pages/Inbox";

interface EmailListProps {
  emails: Email[];
  selectedId?: string;
  onSelect: (email: Email) => void;
  onToggleStar: (id: string) => void;
}

export const EmailList = ({ emails, selectedId, onSelect, onToggleStar }: EmailListProps) => {
  if (emails.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="text-muted-foreground mb-2">No emails found</div>
          <div className="text-sm text-muted-foreground/70">Try a different search query</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {emails.map((email) => (
        <div
          key={email.id}
          onClick={() => onSelect(email)}
          className={cn(
            "flex items-start gap-3 p-4 border-b border-border cursor-pointer transition-colors",
            selectedId === email.id 
              ? "bg-primary/5" 
              : "hover:bg-secondary/50",
            !email.read && "bg-primary/5"
          )}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleStar(email.id);
            }}
            className="flex-shrink-0 mt-1"
          >
            <Star 
              className={cn(
                "h-4 w-4 transition-colors",
                email.starred 
                  ? "fill-yellow-400 text-yellow-400" 
                  : "text-muted-foreground hover:text-yellow-400"
              )} 
            />
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className={cn(
                "text-sm truncate",
                !email.read ? "font-semibold text-foreground" : "text-foreground"
              )}>
                {email.from}
              </span>
              <span className="text-xs text-muted-foreground flex-shrink-0">
                {email.date}
              </span>
            </div>
            <div className={cn(
              "text-sm truncate mb-1",
              !email.read ? "font-medium text-foreground" : "text-muted-foreground"
            )}>
              {email.subject}
            </div>
            <div className="text-xs text-muted-foreground truncate">
              {email.preview}
            </div>
            {email.labels.length > 0 && (
              <div className="flex gap-1 mt-2">
                {email.labels.slice(0, 2).map((label) => (
                  <span 
                    key={label}
                    className="text-[10px] px-1.5 py-0.5 bg-secondary text-muted-foreground rounded"
                  >
                    {label}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
