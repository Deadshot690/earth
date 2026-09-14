# Vaidehi Originals

A cinematic, Netflix-inspired personal media archive built around Vaidehi's Earth, Mi Amor, and Vadu. The experience combines an animated opening sequence, profile selection, curated photo collections, playable video chapters, saved progress, ambient audio, and a full-screen media player.

## Highlights

- **Cinematic intro** with a full-screen image treatment and animated Vaidehi Originals branding.
- **Who's watching?** profile selector with dedicated Vaidehi and The Main Character profiles.
- **Hero experience** with a responsive video preview, metadata, Play, and More Info actions.
- **The Vaidehi Story** series with six playable MP4 chapters.
- **Netflix-style episode player** with:
  - All six episodes available inside the player.
  - Episode thumbnails, descriptions, chapter numbers, and watch progress.
  - Direct episode switching without leaving the player.
  - Play Next prompts after non-final episodes.
  - Fullscreen, seek, volume, pause, and resume controls.
- **Curated photo archive** using every image from `src/VCJ`, organized into:
  - The Main Character
  - Blue Outdoors
  - Blue Indoors
  - Close-Up
  - Cute
  - Full Story
  - Hot Takes
  - Soft Hours
  - Others
- **Memories gallery** with category sections, captions, lightbox viewing, and slideshow navigation.
- **Feature movie cuts** that turn grouped photo collections into playable visual reels.
- **Mi Amor Note** for a private message experience.
- **Ambient audio** with global mute and automatic video-player integration.
- **Persistent progress and My List** stored in the browser.
- **Animated credits sequence** and responsive layouts for desktop and mobile.

## Media Library

The current media source of truth is [`src/VCJ`](./src/VCJ/). It contains:

- 94 JPEG photographs.
- 6 MP4 videos.
- Category-based filenames used by the content configuration.

All media is imported through Vite's eager `import.meta.glob` support in [`src/content/content.ts`](./src/content/content.ts). If a configured asset is missing, the application throws an explicit error instead of silently rendering a broken card.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Home page with the hero, video chapters, feature cuts, and curated rows. |
| `/movies` | Photo-based feature cuts and visual reels. |
| `/series` | The Vaidehi Story, episode cards, and season playback. |
| `/memories` | Full categorized photo archive and lightbox gallery. |
| `/my-list` | Saved media and continue-watching items. |

## Project Structure

```text
.
├── public/
│   ├── favicon.svg
│   └── media/
│       └── music/              # Optional ambient audio asset
├── src/
│   ├── VCJ/                    # 94 JPEGs and 6 MP4 source assets
│   ├── components/
│   │   ├── AmbientAudio.tsx    # Global ambient audio and mute state
│   │   ├── AppShell.tsx        # Shared application overlays and layout
│   │   ├── ContentRow.tsx      # Horizontal media rows
│   │   ├── CreditsSequence.tsx # Animated closing credits
│   │   ├── DetailModal.tsx     # Media detail overlay
│   │   ├── EpisodeCard.tsx     # Series episode card
│   │   ├── Hero.tsx            # Responsive hero video composition
│   │   ├── IntroSequence.tsx   # Opening animation
│   │   ├── MediaCard.tsx       # Reusable media thumbnail card
│   │   ├── MemoriesGallery.tsx # Categorized image gallery and lightbox
│   │   ├── MiAmorExperience.tsx # Personal note overlay
│   │   ├── Navbar.tsx          # Navigation and global controls
│   │   ├── ProfileSelector.tsx # Who's watching? screen
│   │   └── VideoPlayer.tsx     # Full-screen video and episode browser
│   ├── content/
│   │   └── content.ts          # Brand, media, episode, and gallery configuration
│   ├── lib/
│   │   └── experience.tsx      # Global playback, progress, and UI state
│   ├── routes/                 # TanStack Router pages
│   └── styles.css              # Tailwind theme and shared visual utilities
├── package.json
└── README.md
```

## Getting Started

### Requirements

- Node.js 18 or newer.
- npm.

### Install

```sh
git clone https://github.com/Deadshot690/ayushuu-streaming.git
cd ayushuu-streaming
npm install
```

### Start the development server

```sh
npm run dev
```

Vite will print the local URL in the terminal. Open that URL in a browser and complete the intro/profile flow to enter the app.

### Build for production

```sh
npm run build
```

### Preview a production build

```sh
npm run preview
```

### Run linting

```sh
npm run lint
```

## Customization

Most content changes belong in [`src/content/content.ts`](./src/content/content.ts):

- Update `brand` to change the visible name, tagline, universe, and nickname.
- Update `img` to change intro, hero, and profile artwork.
- Update `videos` and `episodes` to change the six video chapters.
- Update `memoryCategories` to add or reorder photo categories and captions.
- Update `movies` to create or edit feature cuts from grouped image reels.
- Update `hero` to change the homepage title, description, poster, and featured episode.
- Update `miAmorNote` to change the personal note content.

When adding or renaming files in `src/VCJ`, update the matching filename in the content configuration. Filenames are case-sensitive in production builds.

## Browser Storage

The app stores lightweight experience state locally in the browser:

- Saved media in the My List collection.
- Playback position and duration for videos and visual reels.
- Whether the intro/profile flow has already been completed for the current session.

Clearing site data resets this state and shows the intro flow again.

## Technical Stack

- React 19
- TypeScript
- Vite
- TanStack Start and TanStack Router
- Tailwind CSS
- Framer Motion
- Lucide React

## License

This is a private, personal media experience. The included photographs and videos are not licensed for redistribution.
