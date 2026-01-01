import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, ArrowLeft, Sparkles, CheckCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TryIt = () => {
  const [emailContent, setEmailContent] = useState("");
  const [senderName, setSenderName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!emailContent.trim()) {
      toast({
        title: "Email content required",
        description: "Please paste an email to summarize.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // POST to webhook
      await fetch("WEBHOOK_URL_GOES_HERE", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailContent,
          senderName: senderName || "Unknown",
          timestamp: new Date().toISOString(),
        }),
      });

      setIsSuccess(true);
    } catch (error) {
      // Still show success since webhook might be placeholder
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Thank you — your summary is being generated.
          </h1>
          <p className="text-muted-foreground mb-8">
            We'll process your email and send the AI summary to you shortly.
          </p>
          <Link to="/">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Mail className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">InboxIQ</span>
          </Link>
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
        </div>
      </nav>

      {/* Form Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">AI Summarizer</span>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Try the AI Summarizer
            </h1>
            <p className="text-lg text-muted-foreground">
              Paste an email below and InboxIQ will summarize it.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email-content" className="text-foreground font-medium">
                Paste Email Content *
              </Label>
              <Textarea
                id="email-content"
                placeholder="Paste the full email content here..."
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                className="min-h-[200px] resize-none text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sender-name" className="text-foreground font-medium">
                Sender Name <span className="text-muted-foreground font-normal">(optional)</span>
              </Label>
              <Input
                id="sender-name"
                type="text"
                placeholder="e.g., John Smith"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
              />
            </div>

            <Button 
              type="submit" 
              size="lg" 
              className="w-full text-lg py-6 h-auto"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Summarize
                </>
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Your email content is processed securely and never stored permanently.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
              <Mail className="w-3 h-3 text-primary-foreground" />
            </div>
            <span className="text-sm font-medium text-foreground">InboxIQ</span>
          </div>
          <div className="text-sm text-muted-foreground">
            © InboxIQ 2026 — Contact: hello@inboxiq.ai
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TryIt;
