import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mail, Zap, CheckCircle, Inbox, Sparkles, Clock, Settings, MessageSquare } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Mail className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">InboxIQ</span>
          </div>
          <Link to="/try">
            <Button size="sm">Try InboxIQ</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">AI-Powered Email Intelligence</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight mb-6">
            Turn every email into a<br />
            <span className="text-primary">5-second summary.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            InboxIQ uses AI to read emails for you and give short summaries — so you focus only on what matters.
          </p>
          <Link to="/try">
            <Button size="lg" className="text-lg px-8 py-6 h-auto">
              Try InboxIQ
              <Zap className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-secondary/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground">Three simple steps to inbox clarity</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Inbox,
                step: "01",
                title: "Connect inbox",
                description: "Link your Gmail account securely with one click. Your data stays private."
              },
              {
                icon: Sparkles,
                step: "02",
                title: "AI summarizes automatically",
                description: "Our AI reads and analyzes each email, extracting the key information instantly."
              },
              {
                icon: CheckCircle,
                step: "03",
                title: "You only read what matters",
                description: "Get concise summaries so you can prioritize and respond faster than ever."
              }
            ].map((item, index) => (
              <div key={index} className="relative bg-background rounded-2xl p-8 border border-border hover:border-primary/30 transition-colors">
                <div className="text-6xl font-bold text-secondary mb-4">{item.step}</div>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why InboxIQ?</h2>
            <p className="text-lg text-muted-foreground">Everything you need for email sanity</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Clock, title: "Saves time daily", description: "Reclaim hours spent reading lengthy emails" },
              { icon: Zap, title: "Works automatically", description: "Set it and forget it — summaries appear instantly" },
              { icon: MessageSquare, title: "Summaries are clear", description: "No jargon, just the key points you need" },
              { icon: Mail, title: "Works with Gmail", description: "Seamless integration with your existing inbox" },
              { icon: Settings, title: "No coding required", description: "Simple setup in under 2 minutes" },
              { icon: CheckCircle, title: "Always accurate", description: "AI trained on millions of emails for precision" }
            ].map((feature, index) => (
              <div key={index} className="flex items-start gap-4 p-6 rounded-xl hover:bg-secondary/50 transition-colors">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Example */}
      <section className="py-20 px-6 bg-secondary/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">See It In Action</h2>
            <p className="text-lg text-muted-foreground">From cluttered to clear in seconds</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Before */}
            <div className="bg-background rounded-2xl border border-border overflow-hidden">
              <div className="px-6 py-4 bg-secondary/50 border-b border-border">
                <span className="text-sm font-medium text-muted-foreground">Original Email</span>
              </div>
              <div className="p-6">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Hi John, I hope this email finds you well. I wanted to reach out regarding our upcoming quarterly review meeting that we discussed briefly last week. After speaking with the team, we've decided to reschedule it from Thursday to Friday at 2 PM. Also, could you please prepare a brief presentation covering the Q3 sales numbers? Sarah mentioned she'll need the updated figures by Wednesday at the latest. Additionally, don't forget about the team lunch next Monday at the Italian place downtown — please RSVP by Friday. Let me know if you have any questions about any of this. Best, Michael
                </p>
              </div>
            </div>
            {/* After */}
            <div className="bg-background rounded-2xl border-2 border-primary overflow-hidden">
              <div className="px-6 py-4 bg-primary/10 border-b border-primary/20">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">AI Summary</span>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">Meeting moved to Friday 2 PM — prepare Q3 sales presentation (due Wed)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">Team lunch Monday — RSVP by Friday</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Second CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to reclaim your inbox?
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Join thousands of professionals who save hours every week with InboxIQ.
          </p>
          <Link to="/try">
            <Button size="lg" className="text-lg px-8 py-6 h-auto">
              Test InboxIQ Now
              <Zap className="w-5 h-5 ml-2" />
            </Button>
          </Link>
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

export default Landing;
