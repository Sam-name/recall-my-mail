import { useState } from "react";
import { 
  Inbox, 
  Send, 
  FileText, 
  Trash2, 
  Star, 
  Tag,
  PenSquare,
  X,
  Sparkles,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeFolder: string;
  onFolderChange: (folder: string) => void;
  isOpen: boolean;
  onClose: () => void;
  unreadCount: number;
  onCompose: () => void;
}

const folders = [
  { id: "inbox", label: "Inbox", icon: Inbox, showCount: true },
  { id: "starred", label: "Starred", icon: Star },
  { id: "sent", label: "Sent", icon: Send },
  { id: "drafts", label: "Drafts", icon: FileText },
  { id: "trash", label: "Trash", icon: Trash2 },
];

const labels = [
  { id: "work", label: "Work", color: "bg-[hsl(220,85%,50%)]" },
  { id: "finance", label: "Finance", color: "bg-[hsl(160,70%,45%)]" },
  { id: "family", label: "Family", color: "bg-[hsl(270,70%,60%)]" },
  { id: "social", label: "Social", color: "bg-[hsl(45,100%,50%)]" },
];

export const Sidebar = ({ activeFolder, onFolderChange, isOpen, onClose, unreadCount, onCompose }: SidebarProps) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-foreground/20 z-40 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}
      
      <aside className={cn(
        "fixed lg:relative inset-y-0 left-0 z-50 w-64 bg-sidebar-background border-r border-sidebar-border flex flex-col transform transition-transform duration-200 ease-in-out lg:transform-none",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="p-4 flex items-center justify-between lg:justify-center">
          <Button onClick={onCompose} className="w-full gap-2 rounded-xl h-11">
            <PenSquare className="h-4 w-4" />
            Compose
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden ml-2"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <nav className="flex-1 px-2 overflow-y-auto">
          <div className="space-y-1">
            {folders.map((folder) => (
              <button
                key={folder.id}
                onClick={() => {
                  onFolderChange(folder.id);
                  onClose();
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                  activeFolder === folder.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
                )}
              >
                <folder.icon className="h-4 w-4" />
                <span className="flex-1 text-left">{folder.label}</span>
                {folder.showCount && unreadCount > 0 && (
                  <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* AI Chat Section */}
          <div className="mt-6">
            <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="h-3 w-3" />
              AI Features
            </div>
            <div className="space-y-1 mt-2">
              <button
                onClick={() => {
                  onFolderChange("ai-chat");
                  onClose();
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                  activeFolder === "ai-chat"
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
                )}
              >
                <MessageSquare className="h-4 w-4" />
                <span className="flex-1 text-left">AI Chat</span>
                <span className="text-[10px] px-1.5 py-0.5 bg-primary/10 text-primary rounded font-medium">
                  NEW
                </span>
              </button>
            </div>
          </div>

          <div className="mt-6">
            <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <Tag className="h-3 w-3" />
              Labels
            </div>
            <div className="space-y-1 mt-2">
              {labels.map((label) => (
                <button
                  key={label.id}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-muted-foreground hover:bg-sidebar-accent hover:text-foreground transition-colors"
                >
                  <span className={cn("w-2.5 h-2.5 rounded-full", label.color)} />
                  <span>{label.label}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="text-xs text-muted-foreground text-center">
            Powered by InboxIQ AI
          </div>
        </div>
      </aside>
    </>
  );
};