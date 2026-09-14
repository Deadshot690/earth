import { createFileRoute, Link } from "@tanstack/react-router";
import { byId } from "@/content/content";
import { useExperience } from "@/lib/experience";
import { MediaCard } from "@/components/MediaCard";

export const Route = createFileRoute("/my-list")({
  head: () => ({
    meta: [
      { title: "My List — Vaidehi Originals" },
      {
        name: "description",
        content: "The Vaidehi chapters and frames you saved to watch again on this device.",
      },
      { property: "og:title", content: "My List — Vaidehi Originals" },
      {
        property: "og:description",
        content: "Your saved chapters, films and frames from Vaidehi Originals.",
      },
    ],
  }),
  component: MyListPage,
});

function MyListPage() {
  const { myList } = useExperience();
  const items = myList.map(byId).filter(Boolean);

  return (
    <div className="min-h-[70svh] px-4 pt-28 pb-20 sm:px-10 sm:pt-36">
      <p className="text-[0.65rem] tracking-[0.5em] text-primary uppercase">Saved For Later</p>
      <h1 className="mt-3 font-title text-4xl tracking-[0.06em] sm:text-6xl">MY LIST</h1>

      {items.length === 0 ? (
        <div className="mt-14 max-w-md">
          <p className="font-display text-xl">Nothing saved yet.</p>
          <p className="mt-2 text-muted-foreground">
            Add a film or a chapter and it'll wait for you right here.
          </p>
          <Link
            to="/movies"
            className="mt-6 inline-block rounded bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary-glow"
          >
            Browse Movies
          </Link>
        </div>
      ) : (
        <div className="mt-10 flex flex-wrap gap-4">
          {items.map((item, i) => item && <MediaCard key={item.id} item={item} index={i} />)}
        </div>
      )}
    </div>
  );
}
