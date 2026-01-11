import { useState } from "react";
import { X, Send, Paperclip, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface ComposeModalProps {
  open: boolean;
  onClose: () => void;
}

export const ComposeModal = ({ open, onClose }: ComposeModalProps) => {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (!to.trim()) {
      toast.error("Please enter a recipient");
      return;
    }
    if (!subject.trim()) {
      toast.error("Please enter a subject");
      return;
    }

    setIsSending(true);
    
    // Simulate sending
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success("Email sent successfully!");
    setTo("");
    setSubject("");
    setBody("");
    setIsSending(false);
    onClose();
  };

  const handleAISuggest = () => {
    toast.info("AI is drafting a response...", { duration: 2000 });
    setTimeout(() => {
      setBody(`Hi,

Thank you for reaching out. I wanted to follow up on our previous conversation and provide you with the requested information.

Please let me know if you have any questions or need further clarification.

Best regards`);
      toast.success("AI draft generated!");
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-4 py-3 border-b border-border bg-muted/30">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-base font-semibold">New Message</DialogTitle>
          </div>
        </DialogHeader>

        <div className="flex flex-col">
          {/* To Field */}
          <div className="flex items-center border-b border-border">
            <label className="px-4 py-3 text-sm text-muted-foreground w-16">To</label>
            <Input
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="recipient@email.com"
              className="border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          {/* Subject Field */}
          <div className="flex items-center border-b border-border">
            <label className="px-4 py-3 text-sm text-muted-foreground w-16">Subject</label>
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter subject"
              className="border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          {/* Body */}
          <div className="relative">
            <Textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Compose your email..."
              className="min-h-[250px] border-0 rounded-none resize-none focus-visible:ring-0 focus-visible:ring-offset-0 p-4"
            />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-muted/30">
            <div className="flex items-center gap-2">
              <Button 
                onClick={handleSend} 
                disabled={isSending}
                className="gap-2 rounded-xl"
              >
                <Send className="h-4 w-4" />
                {isSending ? "Sending..." : "Send"}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-xl"
                onClick={handleAISuggest}
                title="AI Draft Suggestion"
              >
                <Sparkles className="h-4 w-4 text-primary" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-xl">
                <Paperclip className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-xl">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
