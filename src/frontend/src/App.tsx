import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { Check, Copy, Heart, Pencil, Printer, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

// ── Types ────────────────────────────────────────────────────────────────────

interface ApologyCard {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  salutation: string;
  body: string;
  closing: string;
}

// ── Default apology messages ─────────────────────────────────────────────────

const DEFAULT_APOLOGIES: ApologyCard[] = [
  {
    id: "video",
    index: "01",
    title: "Not making a video",
    subtitle: "For the missed opportunity to connect face to face.",
    salutation: "Dear {name},",
    body: "I am genuinely sorry for missing our scheduled video chat. It was my fault entirely, and I feel awful that I let you down. Connecting with you is important to me, and I deeply regret my lack of communication. I value our connection and look forward to truly listening next time.",
    closing: "With love,",
  },
  {
    id: "study",
    index: "02",
    title: "Not calling on time for study",
    subtitle: "For leaving you waiting when it mattered.",
    salutation: "Dear {name},",
    body: "Please accept my sincere apology for not calling you on time for our study session. I got delayed unexpectedly, and that is no excuse. I deeply regret leaving you waiting and for disrupting your schedule. Your commitment to our sessions means a lot to me, and it won't happen again.",
    closing: "Sincerely,",
  },
  {
    id: "time",
    index: "03",
    title: "Not respecting someone's time",
    subtitle: "For taking what is precious for granted.",
    salutation: "Dear {name},",
    body: "I am truly sorry for my tardiness and for not respecting your valuable time. It was deeply inconsiderate of me to keep you waiting, and I feel terribly about it. Time is precious, and yours is no exception. I promise to be more mindful and intentional moving forward.",
    closing: "Warmly,",
  },
];

const MAX_CHARS = 600;

// ── ApologyCardEditor ─────────────────────────────────────────────────────────

function ApologyCardEditor({
  card,
  recipientName,
  index,
  onSave,
}: {
  card: ApologyCard;
  recipientName: string;
  index: number;
  onSave: (id: string, body: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(card.body);
  const displayName = recipientName.trim() || "[Name]";
  const signName = recipientName.trim() || "[Your Name]";

  const handleSave = () => {
    onSave(card.id, draft.trim() || card.body);
    setEditing(false);
  };

  const handleCancel = () => {
    setDraft(card.body);
    setEditing(false);
  };

  const salutation = card.salutation.replace("{name}", displayName);

  return (
    <article
      data-ocid={`apology-card-${card.id}`}
      className="bg-card rounded-2xl shadow-card border border-border overflow-hidden animate-slide-up"
      style={{ animationDelay: `${index * 0.12}s` }}
    >
      {/* Card header */}
      <div className="bg-accent/30 border-b border-border px-6 py-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-body text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">
              Apology {card.index}
            </p>
            <h2 className="font-display text-xl font-semibold text-foreground leading-snug">
              {card.title}
            </h2>
            <p className="font-body text-sm text-muted-foreground mt-0.5 italic">
              {card.subtitle}
            </p>
          </div>
          <Badge
            variant="outline"
            className="shrink-0 border-primary/30 text-primary font-body text-xs"
          >
            {card.index}
          </Badge>
        </div>
      </div>

      {/* Card body */}
      <div className="px-6 py-5">
        {editing ? (
          <div className="space-y-3">
            <p className="font-display italic text-foreground/80 text-sm">
              {salutation}
            </p>
            <div className="relative">
              <Textarea
                data-ocid={`textarea-${card.id}`}
                value={draft}
                onChange={(e) => setDraft(e.target.value.slice(0, MAX_CHARS))}
                rows={7}
                className="font-body text-sm resize-none bg-background border-input focus:ring-ring rounded-xl leading-relaxed"
                placeholder="Write your heartfelt apology here…"
                autoFocus
              />
              <span
                className={`absolute bottom-2 right-3 text-xs font-body ${
                  draft.length >= MAX_CHARS
                    ? "text-destructive"
                    : "text-muted-foreground"
                }`}
              >
                {draft.length}/{MAX_CHARS}
              </span>
            </div>
            <p className="font-display italic text-foreground/80 text-sm">
              {card.closing}
              <br />
              <span className="not-italic font-body text-sm">{signName}</span>
            </p>
            <div className="flex gap-2 pt-1">
              <Button
                data-ocid={`save-${card.id}`}
                size="sm"
                onClick={handleSave}
                className="gap-1.5 font-body"
              >
                <Check className="w-3.5 h-3.5" /> Save
              </Button>
              <Button
                data-ocid={`cancel-${card.id}`}
                size="sm"
                variant="outline"
                onClick={handleCancel}
                className="gap-1.5 font-body"
              >
                <X className="w-3.5 h-3.5" /> Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="font-display italic text-foreground/80 text-sm">
              {salutation}
            </p>
            <p className="font-body text-sm text-foreground leading-relaxed whitespace-pre-wrap">
              {card.body}
            </p>
            <p className="font-display italic text-foreground/80 text-sm">
              {card.closing}
              <br />
              <span className="not-italic font-body text-sm">{signName}</span>
            </p>
          </div>
        )}
      </div>

      {/* Card footer */}
      {!editing && (
        <div className="px-6 pb-5">
          <Button
            data-ocid={`edit-${card.id}`}
            variant="default"
            className="w-full font-body gap-2 rounded-xl"
            onClick={() => {
              setDraft(card.body);
              setEditing(true);
            }}
          >
            <Pencil className="w-4 h-4" />
            Customize &amp; Send
          </Button>
        </div>
      )}
    </article>
  );
}

// ── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [recipientName, setRecipientName] = useState("");
  const [apologies, setApologies] = useState<ApologyCard[]>(DEFAULT_APOLOGIES);
  const printRef = useRef<HTMLDivElement>(null);
  const displayName = recipientName.trim() || "[Name]";
  const signName = recipientName.trim() || "[Your Name]";

  const handleSave = (id: string, body: string) => {
    setApologies((prev) => prev.map((a) => (a.id === id ? { ...a, body } : a)));
    toast.success("Apology message updated", {
      description: "Your heartfelt words have been saved.",
    });
  };

  const handleCopyAll = () => {
    const separator = `\n\n${"─".repeat(40)}\n\n`;
    const text = apologies
      .map(
        (a) =>
          `— ${a.title.toUpperCase()} —\n\n${a.salutation.replace("{name}", displayName)}\n\n${a.body}\n\n${a.closing}\n${signName}`,
      )
      .join(separator);
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Copied to clipboard!", {
        description: "All three apologies are ready to share.",
      });
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const currentYear = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined"
      ? encodeURIComponent(window.location.hostname)
      : "";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Toaster richColors position="top-center" />

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="bg-card border-b border-border shadow-soft sticky top-0 z-20 print:hidden">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-primary fill-primary/20" />
            <span className="font-display text-lg font-semibold text-foreground tracking-tight">
              Sincere Notes
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              data-ocid="copy-all-btn"
              variant="outline"
              size="sm"
              onClick={handleCopyAll}
              className="font-body gap-1.5 hidden sm:flex"
            >
              <Copy className="w-3.5 h-3.5" />
              Copy All
            </Button>
            <Button
              data-ocid="print-btn"
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="font-body gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              Print
            </Button>
          </div>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden bg-card border-b border-border print:hidden"
        style={{ minHeight: "280px" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('/assets/generated/apology-hero.dim_1200x500.jpg')",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-2xl mx-auto px-4 py-14 text-center animate-fade-in">
          <p className="font-body text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">
            A sincere apology toolkit
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground leading-tight mb-4 text-balance">
            A Hard-to-Find Way
            <br />
            <span className="italic font-medium">to Say I'm Sorry.</span>
          </h1>
          <p className="font-body text-base text-muted-foreground max-w-sm mx-auto leading-relaxed">
            Find the words when yours aren't easy to find. Crafted with
            sincerity — customize each message for yourself.
          </p>
        </div>
      </section>

      {/* ── Personalization strip ───────────────────────────────────────────── */}
      <section className="bg-muted/40 border-b border-border print:bg-transparent">
        <div className="max-w-2xl mx-auto px-4 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <label
              htmlFor="recipient-name"
              className="font-display italic text-sm text-foreground/70 shrink-0"
            >
              Personalise with a name:
            </label>
            <Input
              id="recipient-name"
              data-ocid="recipient-name-input"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder="e.g. Sarah, my friend, you…"
              className="font-body text-sm bg-card border-input rounded-xl max-w-xs focus:ring-ring"
            />
            {recipientName && (
              <span className="font-body text-xs text-muted-foreground italic animate-fade-in">
                Each card will address "{recipientName}"
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ── Cards ──────────────────────────────────────────────────────────── */}
      <main className="flex-1 bg-background">
        <div
          ref={printRef}
          className="max-w-2xl mx-auto px-4 py-8 space-y-5"
          data-ocid="apology-cards-list"
        >
          {/* Print-only header */}
          <div className="hidden print:block mb-8 text-center border-b border-border pb-6">
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              A Sincere Apology
            </h1>
            {recipientName && (
              <p className="font-body text-base text-muted-foreground">
                For {recipientName}
              </p>
            )}
          </div>

          {apologies.map((card, i) => (
            <ApologyCardEditor
              key={card.id}
              card={card}
              recipientName={recipientName}
              index={i}
              onSave={handleSave}
            />
          ))}

          {/* Mobile action buttons */}
          <div
            className="flex gap-3 pt-3 sm:hidden print:hidden"
            data-ocid="mobile-actions"
          >
            <Button
              variant="outline"
              className="flex-1 font-body gap-2"
              onClick={handleCopyAll}
              data-ocid="mobile-copy-btn"
            >
              <Copy className="w-4 h-4" />
              Copy All
            </Button>
            <Button
              variant="outline"
              className="flex-1 font-body gap-2"
              onClick={handlePrint}
              data-ocid="mobile-print-btn"
            >
              <Printer className="w-4 h-4" />
              Print
            </Button>
          </div>

          {/* Guidance note */}
          <p
            className="font-body text-xs text-center text-muted-foreground pt-2 italic print:hidden"
            data-ocid="guidance-note"
          >
            Click "Customize &amp; Send" on any card to rewrite the message in
            your own voice.
          </p>
        </div>
      </main>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="bg-card border-t border-border print:hidden">
        <div className="max-w-2xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-body text-muted-foreground">
          <span>
            © {currentYear}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground transition-smooth"
            >
              caffeine.ai
            </a>
          </span>
          <span className="italic opacity-60">Words matter. Yours do too.</span>
        </div>
      </footer>

      {/* ── Print styles ───────────────────────────────────────────────────── */}
      <style>{`
        @media print {
          body { background: white; }
          .shadow-card { box-shadow: none; }
          .border-border { border-color: #e5e0d8; }
        }
      `}</style>
    </div>
  );
}
