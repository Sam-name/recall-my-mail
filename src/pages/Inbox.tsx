import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/email/Sidebar";
import { EmailList } from "@/components/email/EmailList";
import { EmailView } from "@/components/email/EmailView";
import { SearchBar } from "@/components/email/SearchBar";
import { AIChat } from "@/components/email/AIChat";
import { Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Email {
  id: string;
  from: string;
  fromEmail: string;
  subject: string;
  preview: string;
  body: string;
  date: string;
  read: boolean;
  starred: boolean;
  labels: string[];
}

const mockEmails: Email[] = [
  {
    id: "1",
    from: "John Doe",
    fromEmail: "john.doe@acmecorp.com",
    subject: "RE: Acquisition of 20 million shares - Final Terms",
    preview: "Hi, I wanted to follow up on our discussion regarding the share acquisition...",
    body: `Hi,

I wanted to follow up on our discussion regarding the share acquisition. After careful consideration with our board, we've decided to proceed with the purchase of 20 million shares at the agreed price point of $45.50 per share.

The total transaction value comes to $910 million. We'll need the following documents prepared:
- Share transfer agreement
- Board resolution
- Regulatory filings (SEC Form 4)
- Escrow arrangements

Our legal team will be in touch by end of week. Please confirm receipt and availability for a call on Thursday.

Best regards,
John Doe
Chief Investment Officer
ACME Corporation`,
    date: "10:34 AM",
    read: false,
    starred: true,
    labels: ["Important", "Finance"]
  },
  {
    id: "2",
    from: "Sarah Chen",
    fromEmail: "sarah.chen@techstart.io",
    subject: "Q4 Product Roadmap - Review Required",
    preview: "Team, please review the attached Q4 roadmap before our Friday sync...",
    body: `Team,

Please review the attached Q4 roadmap before our Friday sync. Key highlights:

1. Mobile app v2.0 launch - October 15th
2. AI features rollout - November 1st
3. Enterprise dashboard - December 1st

We need sign-off from all department heads by Wednesday EOD. Let me know if you have any concerns or resource constraints.

The engineering estimates are tight but achievable with current headcount. Marketing will need an additional $50k budget for the launch campaign.

Thanks,
Sarah`,
    date: "9:15 AM",
    read: false,
    starred: false,
    labels: ["Work"]
  },
  {
    id: "3",
    from: "LinkedIn",
    fromEmail: "notifications@linkedin.com",
    subject: "You have 5 new connection requests",
    preview: "Michael Scott and 4 others want to connect with you on LinkedIn...",
    body: `You have new connection requests waiting for you.

Michael Scott - Regional Manager at Dunder Mifflin
wants to connect.

Jim Halpert - Sales Representative at Dunder Mifflin
wants to connect.

And 3 more people want to connect with you.

Log in to LinkedIn to view and respond to these requests.`,
    date: "8:42 AM",
    read: true,
    starred: false,
    labels: ["Social"]
  },
  {
    id: "4",
    from: "Amazon",
    fromEmail: "ship-confirm@amazon.com",
    subject: "Your order has shipped!",
    preview: "Your package is on its way. Track your delivery...",
    body: `Hello,

Great news! Your order #112-4567890-1234567 has shipped.

Items:
- Apple AirPods Pro (2nd Generation) - $249.00
- USB-C Cable 3-Pack - $12.99

Estimated delivery: Tomorrow by 9 PM

Track your package: https://amazon.com/tracking/...

Thank you for shopping with Amazon!`,
    date: "Yesterday",
    read: true,
    starred: false,
    labels: ["Shopping"]
  },
  {
    id: "5",
    from: "David Park",
    fromEmail: "david.park@investco.com",
    subject: "Investment Committee Meeting - Agenda",
    preview: "The IC meeting is scheduled for Monday at 2pm. Agenda items include...",
    body: `Hi all,

The Investment Committee meeting is scheduled for Monday at 2pm EST. Here's the agenda:

1. Portfolio performance review (Q3)
2. New investment proposals
   - TechCorp Series B ($15M)
   - GreenEnergy seed round ($5M)
3. Risk assessment updates
4. Regulatory compliance check

Please come prepared with your sector analyses. Meeting will be in Conference Room A with Zoom link for remote attendees.

David Park
Managing Director`,
    date: "Yesterday",
    read: true,
    starred: true,
    labels: ["Finance", "Meetings"]
  },
  {
    id: "6",
    from: "Mom",
    fromEmail: "mom@gmail.com",
    subject: "Dad's 50th Birthday Party!!",
    preview: "Hi sweetie! Don't forget about dad's surprise party next Saturday...",
    body: `Hi sweetie!

Don't forget about dad's surprise party next Saturday at 6pm! We're having it at Uncle Bob's house.

Can you please bring:
- The cake (I ordered it at Sweet Delights, just pick it up)
- Paper plates and napkins
- Your famous guacamole

Also, your sister is flying in Friday night. Can you pick her up from the airport? Flight lands at 8:45pm.

Love you!
Mom

P.S. - Remember, it's a SURPRISE! Don't mention it to dad!`,
    date: "Mar 15",
    read: true,
    starred: true,
    labels: ["Family"]
  },
  {
    id: "7",
    from: "GitHub",
    fromEmail: "noreply@github.com",
    subject: "[repo] Pull request #234: Fix authentication bug",
    preview: "alexdev opened a pull request in your-project/main...",
    body: `alexdev wants to merge 3 commits into main from fix-auth-bug

This PR fixes the authentication timeout issue reported in #233.

Changes:
- Updated token refresh logic
- Added retry mechanism for failed auth attempts
- Improved error messages

Files changed: 4
Additions: 156
Deletions: 42

View this pull request on GitHub: https://github.com/...`,
    date: "Mar 14",
    read: true,
    starred: false,
    labels: ["GitHub"]
  }
];

const Inbox = () => {
  const navigate = useNavigate();
  const [emails, setEmails] = useState<Email[]>(mockEmails);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [activeFolder, setActiveFolder] = useState("inbox");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("inboxiq_user");
    if (user) {
      const parsed = JSON.parse(user);
      setUserName(parsed.name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("inboxiq_user");
    navigate("/");
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedEmail(null);
  };

  const filteredEmails = emails.filter(email => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      email.from.toLowerCase().includes(q) ||
      email.subject.toLowerCase().includes(q) ||
      email.body.toLowerCase().includes(q) ||
      email.preview.toLowerCase().includes(q)
    );
  });

  const handleToggleStar = (id: string) => {
    setEmails(emails.map(e => 
      e.id === id ? { ...e, starred: !e.starred } : e
    ));
  };

  const handleMarkRead = (id: string) => {
    setEmails(emails.map(e => 
      e.id === id ? { ...e, read: true } : e
    ));
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="h-16 border-b border-border flex items-center px-4 gap-4 flex-shrink-0 bg-card">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <div className="flex gap-0.5">
              <div className="w-1.5 h-1.5 bg-primary-foreground rounded-full" />
              <div className="w-1.5 h-1.5 bg-primary-foreground rounded-full" />
            </div>
          </div>
          <span className="text-xl font-bold font-['Space_Grotesk'] text-foreground hidden sm:block">InboxIQ</span>
        </div>
        <div className="flex-1 max-w-2xl mx-4">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="flex items-center gap-3">
          {userName && (
            <span className="text-sm text-muted-foreground hidden md:block">
              Hi, {userName}
            </span>
          )}
          <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar 
          activeFolder={activeFolder} 
          onFolderChange={setActiveFolder}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          unreadCount={emails.filter(e => !e.read).length}
        />

        {/* Show AI Chat or Email */}
        {activeFolder === "ai-chat" ? (
          <div className="flex-1 overflow-hidden">
            <AIChat />
          </div>
        ) : (
          <>
            {/* Email List */}
            <div className={`w-full md:w-96 border-r border-border flex-shrink-0 overflow-hidden ${selectedEmail ? 'hidden md:flex' : 'flex'} flex-col bg-card`}>
              <EmailList 
                emails={filteredEmails}
                selectedId={selectedEmail?.id}
                onSelect={(email) => {
                  setSelectedEmail(email);
                  handleMarkRead(email.id);
                }}
                onToggleStar={handleToggleStar}
              />
            </div>

            {/* Email View */}
            <div className={`flex-1 overflow-hidden ${selectedEmail ? 'flex' : 'hidden md:flex'}`}>
              <EmailView 
                email={selectedEmail}
                onBack={() => setSelectedEmail(null)}
                onToggleStar={handleToggleStar}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Inbox;