import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Heart, Menu, Search, Volume2, VolumeX, X } from "lucide-react";
import { img } from "@/content/content";
import { useExperience } from "@/lib/experience";
import { Wordmark } from "@/components/Wordmark";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/movies", label: "Movies" },
  { to: "/series", label: "Series" },
  { to: "/memories", label: "Memories" },
  { to: "/my-list", label: "My List" },
] as const;

export function Navbar() {
  const { setSearchOpen, setNoteOpen, muted, toggleMuted } = useExperience();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "border-b border-border/60 bg-background/85 backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <nav className="flex items-center gap-4 px-4 py-3 sm:gap-8 sm:px-10 sm:py-4">
        <Link to="/" aria-label="Home">
          <Wordmark size="sm" />
        </Link>

        <ul className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="text-sm tracking-wide text-muted-foreground transition hover:text-foreground"
                activeProps={{ className: "text-foreground font-semibold" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <button
            onClick={toggleMuted}
            aria-label={muted ? "Enable Ambient Music" : "Mute Ambient Music"}
            title={muted ? "Enable Ambient Music" : "Mute Ambient Music"}
            className="rounded-full p-2 text-muted-foreground transition hover:text-foreground"
          >
            {muted ? <VolumeX className="h-5 w-5 opacity-60" /> : <Volume2 className="h-5 w-5 text-primary" />}
          </button>
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
            className="rounded-full p-2 text-muted-foreground transition hover:text-foreground"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            onClick={() => setNoteOpen(true)}
            className="flex items-center gap-2 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold tracking-wide text-primary-foreground transition hover:bg-primary-glow sm:px-4 sm:text-sm"
          >
            <Heart className="h-4 w-4 fill-current" />
            <span className="hidden sm:inline">Mi Amor Note</span>
          </button>
          <img
            src={img.profile}
            alt="Profile"
            className="hidden h-8 w-8 rounded object-cover sm:block"
          />
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            className="rounded-full p-2 md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <ul className="animate-fade-in flex flex-col gap-1 border-t border-border/60 bg-background/95 px-4 pb-4 backdrop-blur-xl md:hidden">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="block py-2.5 text-sm text-muted-foreground"
                activeProps={{ className: "text-foreground font-semibold" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
