export type Person = {
  displayName: string;
  username?: string;
  role: string;
  image: string;
  description?: string;
};

export const game = {
  name: "Arughinara Mount",
  shortDescription:
    "Explore Arughinara Old and Arughinara New in our Roblox adventure, currently in beta.",
  description:
    "Arughinara Mount has two paths to explore: Arughinara Old and Arughinara New. The game is open to play while we continue beta development, so you may encounter bugs. To report a bug or share an idea, use the Feedback button on the left side of the screen inside the Roblox game. Thanks for playing and helping us improve Arughinara Mount!",
  heroKicker: "Our Beloved Roblox Game",
  heroNote: "A personal project that found its way into the public world.",
  originStory:
    "Originally created as a project for a partner, the game was later published publicly. Players from different countries have since found their way into its world.",
  platform: "Roblox",
  genre: "Open World / Adventure",
  createdAt: "7/21/2025",
  updatedAt: "2/12/2026",
  visits: "92.6K",
  version: "2.0.0",
  status: "Public / Playable",
  links: {
    roblox: "https://www.roblox.com/games/100129797293146/Arughinara-Mount",
    tiktok:
      "https://www.tiktok.com/@arughinara_mount?is_from_webapp=1&sender_device=pc",
    discord: "https://discord.com/invite/Azf5RrUFyb",
  },
  artwork: {
    icon: "/assets/game-icon.jpg",
    banner: "/assets/game-banner.jpg",
    bannerAlt: "Game title artwork over pink sky and layered purple mountains.",
    screenshots: [
      {
        src: "/assets/gameplay.png",
        alt: "Roblox gameplay in a warm, flower-lit garden with a large “I LOVE YOU” sign.",
        caption: "In-game view",
      },
    ],
  },
  creators: [
    {
      displayName: "Aru",
      username: "@aruell44",
      role: "Roblox Owner / Developer",
      image: "/assets/aru-owner.png",
    },
    {
      displayName: "MieAyam4Life",
      username: "ghighiia",
      role: "Co-Creator / Project Partner",
      image: "/assets/co-creator.png",
    },
  ] satisfies Person[],
  admins: [
    { displayName: "Kicaa", role: "Admin", image: "/assets/kisa-admin.png" },
    { displayName: "Nech", role: "Admin", image: "/assets/nech-admin.png" },
    {
      displayName: "Master_Rayyanka",
      role: "Admin",
      image: "/assets/rayyanka-admin.png",
    },
  ] satisfies Person[],
} as const;

export const gameMetadata = {
  title: `${game.name} | ${game.platform}`,
  description: game.shortDescription,
  image: game.artwork.icon,
};

export function formatUsername(username?: string) {
  const handle = username?.trim().replace(/^@+/, "");
  return handle ? `@${handle}` : undefined;
}
