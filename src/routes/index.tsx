import { createFileRoute } from "@tanstack/react-router";
import { byCategory, rows } from "@/content/content";
import { useExperience } from "@/lib/experience";
import { Hero } from "@/components/Hero";
import { ContentRow } from "@/components/ContentRow";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vaidehi Originals — Home" },
      {
        name: "description",
        content:
          "Browse Vaidehi's Earth: six video chapters, feature cuts and 94 sorted original frames.",
      },
      { property: "og:title", content: "Vaidehi Originals — Home" },
      {
        property: "og:description",
        content: "Original films, chapters and memories from Vaidehi's Earth.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { continueWatching } = useExperience();

  return (
    <>
      <Hero />
      <div className="relative z-10 -mt-4 sm:-mt-8">
        {continueWatching.length > 0 && (
          <ContentRow title="Continue Watching" items={continueWatching} wide />
        )}
        {rows.map((r) => (
          <ContentRow key={r.key} title={r.title} items={byCategory(r.key)} />
        ))}
      </div>
    </>
  );
}
