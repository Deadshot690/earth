/**
 * CENTRAL CONTENT CONFIGURATION
 * -----------------------------
 * The complete Vaidehi media library is imported from src/VCJ. Photos are
 * grouped by their renamed category files so every frame has the right story.
 */

const imageFiles = import.meta.glob("../VCJ/*.jpeg", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const videoFiles = import.meta.glob("../VCJ/*.mp4", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

function assetUrl(files: Record<string, string>, filename: string) {
  const url = files[`../VCJ/${filename}`];
  if (!url) throw new Error(`Missing Vaidehi asset: ${filename}`);
  return url;
}

const imageAsset = (filename: string) => assetUrl(imageFiles, filename);
const videoAsset = (filename: string) => assetUrl(videoFiles, filename);

export const brand = {
  name: "Vaidehi",
  sub: "ORIGINALS",
  tagline: "MY EARTH, MI AMOR",
  universe: "Vaidehi's Earth",
  personName: "Vaidehi",
  nickname: "Vadu",
  year: 2026,
};

export const music = {
  theme: "/media/music/theme.weba",
};

export const img = {
  intro: imageAsset("main.jpeg"),
  hero: imageAsset("main.jpeg"),
  profile: imageAsset("closeup (1).jpeg"),
  mainCharacter: imageAsset("hot (1).jpeg"),
};

export const videos = {
  closeup: videoAsset("closeup (1).mp4"),
  cuteOne: videoAsset("cute (1).mp4"),
  cuteTwo: videoAsset("cute (2).mp4"),
  cuteThree: videoAsset("cute (3).mp4"),
  cuteFour: videoAsset("cute (4).mp4"),
  others: videoAsset("others (1).mp4"),
};

export type MediaType = "movie" | "episode" | "memory";

export interface MediaItem {
  id: string;
  type: MediaType;
  title: string;
  image: string;
  backdrop: string;
  video?: string;
  reel?: string[];
  description: string;
  duration: number;
  durationLabel: string;
  year: number;
  genre: string;
  rating: string;
  categories: string[];
  season?: number;
  episode?: number;
  related?: string[];
}

export interface MemoryMoment {
  id: string;
  title: string;
  date: string;
  caption: string;
  image: string;
  section: string;
  filename: string;
}

type MemorySectionDefinition = {
  key: string;
  title: string;
  eyebrow: string;
  description: string;
  files: string[];
  captions: string[];
};

const category = (
  key: string,
  title: string,
  eyebrow: string,
  description: string,
  files: string[],
  captions: string[],
): MemorySectionDefinition => ({ key, title, eyebrow, description, files, captions });

const memoryCategories: MemorySectionDefinition[] = [
  category(
    "main",
    "The Main Character",
    "THE ONE THAT SETS THE TONE",
    "One frame to hold the whole feeling: effortless, cinematic and completely Vaidehi.",
    ["main.jpeg"],
    ["The frame the whole archive quietly revolves around."],
  ),
  category(
    "blue-outdoor",
    "Blue Outdoors",
    "18 FRAMES / OPEN AIR",
    "Blue fabric, old stone and bright daylight turning a simple outing into a full visual chapter.",
    [
      "blue_outdoor (1).jpeg",
      "blue_outdoor (2).jpeg",
      "blue_outdoor (3).jpeg",
      "blue_outdoor (4).jpeg",
      "blue_outdoor (5).jpeg",
      "blue_outdoor (6).jpeg",
      "blue_outdoor (7).jpeg",
      "blue_outdoor (8).jpeg",
      "blue_outdoor (9).jpeg",
      "blue_outdoor (10).jpeg",
      "blue_outdoor (11).jpeg",
      "blue_outdoor (12).jpeg",
      "blue_outdoor (13).jpeg",
      "blue_outdoor (14).jpeg",
      "blue_outdoor (15).jpeg",
      "blue_outdoor (16).jpeg",
      "blue_outdoor (17).jpeg",
      "blue_outdoor (18).jpeg",
    ],
    [
      "Blue dress, warm stone, perfect timing.",
      "A doorway into Vaidehi's brightest kind of day.",
      "The architecture knew to make room for her.",
      "Sunlight found its favourite subject.",
      "A little smile under a very good ceiling.",
      "The softest pose in the open air.",
      "Blue hour, even in the middle of the day.",
      "A full scene in one confident stance.",
      "The kind of frame that feels like a postcard.",
      "Her laugh belongs in the sunlight.",
      "A turn, a glance, and the whole mood changes.",
      "Old stone. New memory.",
      "The camera caught the exact second it became a story.",
      "Mi Amor in her favourite colour.",
      "A little mischief between two poses.",
      "The wide shot that proves the day was worth leaving home for.",
      "Just Vaidehi and the light doing their thing.",
      "The final outdoor frame, still full of movement.",
    ],
  ),
  category(
    "blue-indoor",
    "Blue Indoors",
    "7 FRAMES / ELECTRIC BLUE",
    "A more intimate blue chapter: bright walls, playful expressions and close-room energy.",
    [
      "blue_indoor (1).jpeg",
      "blue_indoor (2).jpeg",
      "blue_indoor (3).jpeg",
      "blue_indoor (4).jpeg",
      "blue_indoor (6).jpeg",
      "blue_indoor (7).jpeg",
      "blue_indoor (8).jpeg",
    ],
    [
      "Blue looks better when the room is this cheerful.",
      "A quiet smile with a whole sky behind it.",
      "Soft eyes, strong colour, no extra explanation.",
      "The denim chapter starts here.",
      "A little sparkle in a very blue room.",
      "Playful, polished and perfectly at home.",
      "The last indoor blue note, held just right.",
    ],
  ),
  category(
    "closeup",
    "Close-Up",
    "11 FRAMES / NO DISTANCE",
    "The details say everything: eyes, expressions and the tiny moods that never need a caption.",
    [
      "closeup (1).jpeg",
      "closeup (2).jpeg",
      "closeup (3).jpeg",
      "closeup (4).jpeg",
      "closeup (5).jpeg",
      "closeup (6).jpeg",
      "closeup (7).jpeg",
      "closeup (8).jpeg",
      "closeup (9).jpeg",
      "closeup (10).jpeg",
      "closeup (12).jpeg",
    ],
    [
      "A quiet look with a loud effect.",
      "Somewhere between thoughtful and unforgettable.",
      "The camera got close and she stayed completely herself.",
      "A little leopard print, a lot of presence.",
      "Soft light on an even softer moment.",
      "Black and white, but never simple.",
      "A playful filter for a very real smile.",
      "One hand in her hair, one whole story in her eyes.",
      "The almost-smile that makes the frame.",
      "Close enough to catch the calm.",
      "The final close-up: stillness with a heartbeat.",
    ],
  ),
  category(
    "cute",
    "Cute, Obviously",
    "13 FRAMES / PURE CHARM",
    "Heart filters, bright colours and the kind of sweetness that refuses to be accidental.",
    [
      "cute.jpeg",
      "cute (1).jpeg",
      "cute (2).jpeg",
      "cute (3).jpeg",
      "cute (4).jpeg",
      "cute (5).jpeg",
      "cute (6).jpeg",
      "cute (7).jpeg",
      "cute (8).jpeg",
      "cute (9).jpeg",
      "cute (10).jpeg",
      "cute (11).jpeg",
      "cute (12).jpeg",
    ],
    [
      "The first cute frame is already enough to make the day better.",
      "Sunlight, soft focus and that familiar little smile.",
      "A pink filter cannot compete with the real thing.",
      "Colourful, effortless and impossible not to keep.",
      "A flower in her hair, a whole garden in the frame.",
      "The gentlest kind of confidence.",
      "A bright outfit for an even brighter mood.",
      "Mi Amor, caught between a laugh and a pose.",
      "Red looks good when she makes it look easy.",
      "A tiny heart filter, a very big personality.",
      "The candid one that feels like a secret.",
      "A little tilt of the head, a lot of warmth.",
      "The final cute frame, still smiling at us.",
    ],
  ),
  category(
    "full",
    "Full Story",
    "11 FRAMES / DRESSED FOR THE MOMENT",
    "Full-length portraits, traditional colour and the graceful confidence of seeing the whole picture.",
    [
      "full (1).jpeg",
      "full (2).jpeg",
      "full (3).jpeg",
      "full (4).jpeg",
      "full (5).jpeg",
      "full (6).jpeg",
      "full (7).jpeg",
      "full (8).jpeg",
      "full (9).jpeg",
      "full (10).jpeg",
      "full (11).jpeg",
    ],
    [
      "A monochrome opening with movie-credit energy.",
      "Blue embroidery and a very calm kind of power.",
      "The full look, framed by old-world light.",
      "A little turn that lets every detail speak.",
      "Grace looks especially good in motion.",
      "Colour, texture and a smile that stays.",
      "A playful pose in the middle of a full story.",
      "Traditional colour, modern confidence.",
      "A bright chapter with no quiet corners.",
      "The portrait that feels like it belongs on a wall.",
      "The last full-length frame, and still no bad angle.",
    ],
  ),
  category(
    "hot",
    "Hot Takes",
    "16 FRAMES / MAIN CHARACTER ENERGY",
    "The grey-and-denim chapter: sharp silhouettes, confident poses and a little bit of fire.",
    [
      "hot.jpeg",
      "hot (1).jpeg",
      "hot (2).jpeg",
      "hot (3).jpeg",
      "hot (4).jpeg",
      "hot (5).jpeg",
      "hot (6).jpeg",
      "hot (7).jpeg",
      "hot (8).jpeg",
      "hot (9).jpeg",
      "hot (10).jpeg",
      "hot (11).jpeg",
      "hot (12).jpeg",
      "hot (13).jpeg",
      "hot (14).jpeg",
      "hot (15).jpeg",
    ],
    [
      "The opening look says she already knows the angle.",
      "A close-up with absolutely no need to try harder.",
      "Hands up, confidence on.",
      "The room changes when she takes the centre.",
      "A little attitude in the cleanest silhouette.",
      "The softest expression in the hottest chapter.",
      "Denim, grey and a very good reason to look twice.",
      "A pose that makes ordinary walls feel editorial.",
      "Unbothered, perfectly styled, completely Vaidehi.",
      "The side glance that steals the scene.",
      "A relaxed frame with serious main-character energy.",
      "One hand, one look, one unforgettable outfit.",
      "The camera asked for drama and she delivered.",
      "A thoughtful pause in the middle of the heat.",
      "Close enough to see the confidence.",
      "The final hot take, still turning heads.",
    ],
  ),
  category(
    "soft",
    "Soft Hours",
    "14 FRAMES / WARM LIGHT",
    "Yellow, cream and bedroom light make this the gentlest chapter in Vaidehi's Earth.",
    [
      "soft (1).jpeg",
      "soft (2).jpeg",
      "soft (3).jpeg",
      "soft (4).jpeg",
      "soft (5).jpeg",
      "soft (6).jpeg",
      "soft (6)-Lappy.jpeg",
      "soft (7).jpeg",
      "soft (8).jpeg",
      "soft (9).jpeg",
      "soft (10).jpeg",
      "soft (11).jpeg",
      "soft (12).jpeg",
      "soft (13).jpeg",
    ],
    [
      "A soft beginning with the whole afternoon ahead.",
      "Warm light makes a familiar room feel brand new.",
      "The relaxed pose that started the little sequence.",
      "A sunny sweatshirt and a quieter kind of joy.",
      "Comfort looks this good when she wears it.",
      "A little stretch, a lot of softness.",
      "The Lappy cut: the same mood, a different texture.",
      "A pause beneath the chandelier light.",
      "The room is still, but the frame is alive.",
      "A gentle look over the shoulder.",
      "Even the shadows feel kind here.",
      "The softest smile in the archive.",
      "A warm close-up from a very good day.",
      "The final soft hour, held onto for later.",
    ],
  ),
  category(
    "others",
    "The Other Side",
    "3 FRAMES / UNEXPECTED MOODS",
    "Three frames that do not need a matching set: different, surprising and worth keeping.",
    ["others (1).jpeg", "others (2).jpeg", "others (3).jpeg"],
    [
      "A quiet hand over the heart.",
      "The unexpected frame that changes the rhythm.",
      "Sometimes the side story becomes the favourite.",
    ],
  ),
];

const captionsByKey = new Map(memoryCategories.map((section) => [section.key, section.captions]));

export const memories: MemoryMoment[] = memoryCategories.flatMap((section) =>
  section.files.map((filename, index) => ({
    id: `vaidehi-${section.key}-${index + 1}`,
    title: `${section.title} ${String(index + 1).padStart(2, "0")}`,
    date: `${section.eyebrow} / FRAME ${String(index + 1).padStart(2, "0")}`,
    caption: captionsByKey.get(section.key)?.[index] ?? `${section.title}, frame ${index + 1}.`,
    image: imageAsset(filename),
    section: section.key,
    filename,
  })),
);

export const memorySections = memoryCategories.map((section) => ({
  key: section.key,
  title: section.title,
  eyebrow: section.eyebrow,
  description: section.description,
  items: memories.filter((memory) => memory.section === section.key),
}));

const imagesFor = (key: string) =>
  memorySections.find((section) => section.key === key)?.items.map((item) => item.image) ?? [];

const memoryItems: MediaItem[] = memories.map((memory) => ({
  id: memory.id,
  type: "memory",
  title: memory.title,
  image: memory.image,
  backdrop: memory.image,
  reel: [memory.image],
  description: memory.caption,
  duration: 12,
  durationLabel: "Frame",
  year: 2026,
  genre: memorySections.find((section) => section.key === memory.section)?.title ?? "Memory",
  rating: "For her",
  categories: ["memories", memory.section],
}));

export const hero = {
  label: "VAIDEHI ORIGINAL",
  kicker: "WELCOME TO VAIDEHI'S EARTH",
  title: "MY EARTH, MI AMOR",
  meta: "2026 • 6 VIDEO CHAPTERS • 94 PHOTOS",
  description:
    "A living collection of portraits, colour, movement and the small details that make Vaidehi impossible to forget.",
  image: img.hero,
  video: videos.closeup,
  playId: "s01e01",
};

export const movies: MediaItem[] = [
  {
    id: "m-blue-outdoors",
    type: "movie",
    title: "BLUE OUTDOORS",
    image: imageAsset("blue_outdoor (8).jpeg"),
    backdrop: imageAsset("blue_outdoor (8).jpeg"),
    reel: imagesFor("blue-outdoor"),
    description: "Eighteen outdoor frames of blue fabric, old stone and open-air confidence.",
    duration: 101,
    durationLabel: "1h 41m",
    year: 2026,
    genre: "Open Air Portraits",
    rating: "For her",
    categories: ["movies", "blue-outdoor"],
  },
  {
    id: "m-hot-takes",
    type: "movie",
    title: "HOT TAKES",
    image: imageAsset("hot (8).jpeg"),
    backdrop: imageAsset("hot (8).jpeg"),
    reel: imagesFor("hot"),
    description: "Sixteen frames of denim, grey and unmistakable main-character energy.",
    duration: 78,
    durationLabel: "1h 18m",
    year: 2026,
    genre: "Style Film",
    rating: "For her",
    categories: ["movies", "hot"],
  },
  {
    id: "m-full-story",
    type: "movie",
    title: "THE FULL STORY",
    image: imageAsset("full (8).jpeg"),
    backdrop: imageAsset("full (8).jpeg"),
    reel: imagesFor("full"),
    description: "Traditional colour, full-length portraits and every detail getting its moment.",
    duration: 88,
    durationLabel: "1h 28m",
    year: 2026,
    genre: "Portrait Film",
    rating: "For her",
    categories: ["movies", "full"],
  },
  {
    id: "m-soft-hours",
    type: "movie",
    title: "SOFT HOURS",
    image: imageAsset("soft (6)-Lappy.jpeg"),
    backdrop: imageAsset("soft (6)-Lappy.jpeg"),
    reel: imagesFor("soft"),
    description: "Fourteen warm frames for the days that deserve to move slowly.",
    duration: 120,
    durationLabel: "2h 00m",
    year: 2026,
    genre: "Warm Light",
    rating: "For her",
    categories: ["movies", "soft"],
  },
];

export const series = {
  id: "the-vaidehi-story",
  title: "THE VAIDEHI STORY",
  description:
    "Six video chapters moving through close-ups, cute moments and every unexpected side of Vaidehi's Earth.",
  backdrop: imageAsset("main.jpeg"),
  seasons: [1],
};

const ep = (
  n: number,
  title: string,
  description: string,
  image: string,
  video: string,
  duration: number,
  categories: string[] = [],
): MediaItem => ({
  id: `s01e0${n}`,
  type: "episode",
  title,
  image,
  backdrop: image,
  video,
  reel: [image],
  description,
  duration,
  durationLabel: "Full Video",
  year: 2026,
  genre: "Original Series",
  rating: "For her",
  season: 1,
  episode: n,
  categories: ["series", ...categories],
});

export const episodes: MediaItem[] = [
  ep(1, "Close Enough", "The archive opens with the expressions that say everything without saying a word.", imageAsset("closeup (1).jpeg"), videos.closeup, 62, ["closeup"]),
  ep(2, "Cute, Obviously", "Heart filters, bright colours and the kind of charm that cannot be staged.", imageAsset("cute (3).jpeg"), videos.cuteOne, 54, ["cute"]),
  ep(3, "Mi Amor In Motion", "A second cute chapter for the little looks and accidental masterpieces.", imageAsset("cute (7).jpeg"), videos.cuteTwo, 48, ["cute"]),
  ep(4, "The Sweetest Take", "Soft smiles, flowers and a frame that makes the whole room warmer.", imageAsset("cute (9).jpeg"), videos.cuteThree, 57, ["cute"]),
  ep(5, "One More Smile", "The final cute cut, full of colour and Vaidehi's easy magic.", imageAsset("cute (12).jpeg"), videos.cuteFour, 64, ["cute"]),
  ep(6, "The Other Side", "An unexpected final chapter for the frames that never belonged anywhere else.", imageAsset("others (2).jpeg"), videos.others, 59, ["others"]),
];

export const miAmorSpecial: MediaItem = {
  id: "mi-amor-special",
  type: "movie",
  title: "MI AMOR, IN FRAMES",
  image: img.profile,
  backdrop: img.profile,
  reel: [imageAsset("main.jpeg"), imageAsset("closeup (1).jpeg"), imageAsset("hot (1).jpeg")],
  description: "A private cut for every mood, every glance and every little piece of Vaidehi's Earth.",
  duration: 0,
  durationLabel: "Special",
  year: 2026,
  genre: "Love Letter",
  rating: "For her only",
  categories: ["mi-amor", "movies"],
};

export const rows: { key: string; title: string }[] = [
  { key: "series", title: "The Six Video Chapters" },
  { key: "movies", title: "Feature Cuts From Vaidehi's Earth" },
  ...memoryCategories.map((section) => ({ key: section.key, title: section.title })),
];

export const miAmorNote = {
  lines: [
    "Some people enter your life...",
    "...and make every ordinary frame feel intentional.",
    "...then leave you with an archive worth replaying.",
    "Every chapter here carries a little bit of your light.",
    "This one is yours, Mi Amor.",
  ],
  title: "MI AMOR, ALWAYS",
  photo: img.profile,
  message: `Vaidehi,

Every category in this collection has a different mood, but the same unmistakable centre. The blue outdoor frames, the close-ups, the cute moments, the full looks, the hot takes and the soft hours all say the same thing: you make a moment worth keeping.

This little streaming service is a home for every side of you — my Earth, my Mi Amor, and the person who makes ordinary days look cinematic.

Keep making the world feel more like yours. There is always another beautiful frame waiting.`,
  signature: "— With everything, always.",
};

export const credits: { role: string; name: string }[] = [
  { role: "A STORY ABOUT", name: brand.personName },
  { role: "Directed by", name: "Everyday Life" },
  { role: "Written by", name: "The Camera Roll" },
  { role: "Produced by", name: "Fate & Good Lighting" },
  { role: "Starring", name: brand.personName },
  { role: "Featuring", name: "94 Original Frames" },
  { role: "Cinematography", name: "Vaidehi's Earth" },
  { role: "Edited by", name: "Time" },
  { role: "Soundtrack", name: "Six Moving Chapters" },
  { role: "Special Thanks To", name: "Every Little Moment" },
];

export const castCredits = [
  { role: "Starring", name: brand.personName },
  { role: "Directed by", name: "Everyday Life" },
  { role: "Produced by", name: "Fate" },
  { role: "Cinematography", name: "Vaidehi's Earth" },
  { role: "Written by", name: "Memories" },
];

export const allItems: MediaItem[] = [...episodes, ...movies, miAmorSpecial, ...memoryItems];

export const byId = (id: string) => allItems.find((item) => item.id === id);

export const byCategory = (key: string) => allItems.filter((item) => item.categories.includes(key));
