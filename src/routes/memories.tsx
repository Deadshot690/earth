import { createFileRoute } from "@tanstack/react-router";
import { MemoriesGallery } from "@/components/MemoriesGallery";

export const Route = createFileRoute("/memories")({
  head: () => ({
    meta: [
      { title: "The Archive — Vaidehi Originals" },
      {
        name: "description",
        content: "Ninety-four original frames sorted into six visual chapters.",
      },
      { property: "og:title", content: "The Archive — Vaidehi Originals" },
      {
        property: "og:description",
        content: "Photographs, captions and visual chapters from Vaidehi's Earth.",
      },
    ],
  }),
  component: MemoriesPage,
});

function MemoriesPage() {
  return (
    <div className="pt-28 pb-20 sm:pt-36">
      <div className="px-4 sm:px-10">
        <p className="text-[0.65rem] tracking-[0.5em] text-primary uppercase">The Camera Roll</p>
        <h1 className="mt-3 font-title text-4xl tracking-[0.06em] sm:text-6xl">MEMORIES</h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Tap any frame to see it the way it deserves to be seen, then move through each visual chapter.
        </p>
      </div>
      <div className="mt-10">
        <MemoriesGallery />
      </div>
    </div>
  );
}
