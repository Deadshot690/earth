import { createFileRoute } from "@tanstack/react-router";
import { movies } from "@/content/content";
import { MediaCard } from "@/components/MediaCard";

export const Route = createFileRoute("/movies")({
  head: () => ({
    meta: [
      { title: "Feature Cuts — Vaidehi Originals" },
      {
        name: "description",
        content:
          "Four feature cuts shaped from the visual chapters of Vaidehi's Earth.",
      },
      { property: "og:title", content: "Feature Cuts — Vaidehi Originals" },
      {
        property: "og:description",
        content: "Four original films made from portraits, colour, style and movement.",
      },
    ],
  }),
  component: MoviesPage,
});

function MoviesPage() {
  return (
    <div className="px-4 pt-28 pb-20 sm:px-10 sm:pt-36">
      <p className="text-[0.65rem] tracking-[0.5em] text-primary uppercase">Vaidehi Originals</p>
      <h1 className="mt-3 font-title text-4xl tracking-[0.06em] sm:text-6xl">MOVIES</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        Feature-length moments. Some vivid, some quiet, all of them hers.
      </p>

      <div className="mt-10 flex flex-wrap gap-4">
        {movies.map((m, i) => (
          <MediaCard key={m.id} item={m} index={i} />
        ))}
      </div>
    </div>
  );
}
