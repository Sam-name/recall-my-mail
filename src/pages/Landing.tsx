import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  Mail, 
  Search, 
  MessageSquare,
  CheckCircle,
  ArrowRight,
  Zap
} from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <div className="flex gap-0.5">
                <div className="w-1.5 h-1.5 bg-primary-foreground rounded-full" />
                <div className="w-1.5 h-1.5 bg-primary-foreground rounded-full" />
              </div>
            </div>
            <span className="text-xl font-bold font-['Space_Grotesk']">InboxIQ</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
          </div>
          
          <div className="flex items-center gap-3">
            <Link to="/signup">
              <Button variant="ghost">Sign in</Button>
            </Link>
            <Link to="/signup">
              <Button className="rounded-full px-6">Get demo</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 gradient-hero relative overflow-hidden">
        {/* Floating Elements */}
        <div className="absolute top-32 left-[10%] transform -rotate-6 z-10">
          <div className="bg-[hsl(45,100%,80%)] p-4 rounded-lg shadow-lg w-48 transform hover:scale-105 transition-transform">
            <p className="text-sm italic text-foreground/80 font-medium">
              Read emails faster with AI summaries and smart search.
            </p>
          </div>
          <div className="absolute -bottom-4 left-8 w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-lg">
            <CheckCircle className="w-5 h-5 text-primary-foreground" />
          </div>
        </div>

        <div className="absolute top-28 right-[8%] z-10">
          <div className="bg-card p-4 rounded-xl shadow-lg w-56">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-destructive/10 rounded-full flex items-center justify-center">
                <span className="text-destructive">⏰</span>
              </div>
              <span className="font-semibold text-sm">Reminders</span>
            </div>
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <span>📅</span>
                <span>Today's Meeting</span>
              </div>
              <div className="text-primary text-[10px]">🕐 13:00 - 13:45</div>
            </div>
          </div>
        </div>

        {/* Main Hero Content */}
        <div className="max-w-4xl mx-auto text-center relative z-20">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-card rounded-2xl shadow-lg flex items-center justify-center">
              <div className="grid grid-cols-2 gap-1">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <div className="w-2 h-2 bg-primary rounded-full" />
                <div className="w-2 h-2 bg-primary rounded-full" />
                <div className="w-2 h-2 bg-primary rounded-full" />
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-4 font-['Space_Grotesk'] leading-tight">
            Read, search, and reply
            <span className="block text-muted-foreground/50">all in one place</span>
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Your AI-powered email client that summarizes, searches naturally, and helps you respond faster.
          </p>
          
          <Link to="/signup">
            <Button size="lg" className="rounded-full px-8 py-6 text-lg gap-2">
              Get free demo
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>

        {/* Bottom Floating Cards */}
        <div className="max-w-5xl mx-auto mt-16 flex flex-wrap justify-center gap-6 px-4">
          <div className="bg-card p-4 rounded-xl shadow-lg w-72">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              Today's emails
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-2 bg-secondary/50 rounded-lg">
                <span className="text-xs text-destructive">🔴</span>
                <span className="text-sm flex-1 truncate">New Ideas for campaign</span>
                <span className="text-xs text-muted-foreground">60%</span>
              </div>
              <div className="flex items-center gap-3 p-2 bg-secondary/50 rounded-lg">
                <span className="text-xs text-primary">📎</span>
                <span className="text-sm flex-1 truncate">Design PPT #4</span>
                <span className="text-xs text-muted-foreground">112%</span>
              </div>
            </div>
          </div>

          <div className="bg-card p-4 rounded-xl shadow-lg w-56">
            <h3 className="font-semibold mb-3">100+ Integrations</h3>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center text-xl">📧</div>
              <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center text-xl">📅</div>
              <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center text-xl">📝</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-card">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 font-['Space_Grotesk']">
            Supercharge your inbox
          </h2>
          <p className="text-center text-muted-foreground mb-16 max-w-xl mx-auto">
            InboxIQ brings AI to your everyday email experience
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-background rounded-2xl border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 font-['Space_Grotesk']">AI Summarization</h3>
              <p className="text-muted-foreground">
                Get instant summaries of long emails. Extract key points, action items, and deadlines automatically.
              </p>
            </div>

            <div className="p-6 bg-background rounded-2xl border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 font-['Space_Grotesk']">Smart Search</h3>
              <p className="text-muted-foreground">
                Search naturally like "John's email about the 20 million shares deal" and find it instantly.
              </p>
            </div>

            <div className="p-6 bg-background rounded-2xl border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 font-['Space_Grotesk']">AI Assistant</h3>
              <p className="text-muted-foreground">
                Chat with your inbox. Ask questions, draft replies, and get insights from your email history.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 font-['Space_Grotesk']">
            How It Works
          </h2>

          <div className="space-y-12">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 font-['Space_Grotesk']">Connect your Gmail</h3>
                <p className="text-muted-foreground">
                  Securely connect your email account. We use OAuth2 and never store your password.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 font-['Space_Grotesk']">AI indexes your inbox</h3>
                <p className="text-muted-foreground">
                  Our AI processes your emails to enable smart search and instant summaries.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 font-['Space_Grotesk']">Experience inbox zero</h3>
                <p className="text-muted-foreground">
                  Read summaries, search naturally, and respond faster than ever before.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 gradient-warm">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-6">
            <Zap className="w-6 h-6 text-primary-foreground" />
          </div>
          <h2 className="text-4xl font-bold mb-4 font-['Space_Grotesk']">
            Ready to revolutionize your inbox?
          </h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of professionals who've already transformed their email workflow.
          </p>
          <Link to="/signup">
            <Button size="lg" className="rounded-full px-8 py-6 text-lg gap-2">
              Get started free
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
              <div className="flex gap-0.5">
                <div className="w-1 h-1 bg-primary-foreground rounded-full" />
                <div className="w-1 h-1 bg-primary-foreground rounded-full" />
              </div>
            </div>
            <span className="font-semibold font-['Space_Grotesk']">InboxIQ</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <span>/</span>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <span>/</span>
            <a href="#" className="hover:text-foreground transition-colors">Help center</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;