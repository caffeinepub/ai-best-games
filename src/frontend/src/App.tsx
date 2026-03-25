import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChevronRight,
  Cpu,
  Flame,
  Gamepad2,
  Github,
  Mail,
  Search,
  Star,
  Trophy,
  Twitch,
  Twitter,
  Youtube,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";

// ─── Data ───────────────────────────────────────────────────────────────────

const GAMES = [
  {
    id: 1,
    title: "Grand Theft Auto V",
    shortTitle: "GTA V",
    letter: "G",
    developer: "Rockstar Games",
    year: 2013,
    rating: 9.8,
    aiMatch: 98,
    genres: ["Action", "Adventure"],
    description:
      "AI's top pick for open-world mayhem. Explore Los Santos in this record-breaking masterpiece.",
    gradient: "from-blue-900 via-purple-800 to-orange-600",
    glowColor: "oklch(0.5 0.18 270)",
    rank: 2,
  },
  {
    id: 2,
    title: "Minecraft",
    shortTitle: "Minecraft",
    letter: "M",
    developer: "Mojang",
    year: 2011,
    rating: 9.7,
    aiMatch: 97,
    genres: ["Sandbox", "Survival"],
    description:
      "Unleash unlimited creativity. The AI-ranked #1 all-time best-selling game ever made.",
    gradient: "from-green-800 via-green-600 to-yellow-500",
    glowColor: "oklch(0.65 0.22 145)",
    rank: 3,
  },
  {
    id: 3,
    title: "Free Fire",
    shortTitle: "Free Fire",
    letter: "F",
    developer: "Garena",
    year: 2017,
    rating: 8.9,
    aiMatch: 90,
    genres: ["Battle Royale"],
    description:
      "The world's most downloaded mobile battle royale. AI-optimized survival on 50-player islands.",
    gradient: "from-orange-700 via-red-600 to-yellow-500",
    glowColor: "oklch(0.65 0.22 40)",
  },
  {
    id: 4,
    title: "Call of Duty: Warzone",
    shortTitle: "Warzone",
    letter: "W",
    developer: "Activision",
    year: 2020,
    rating: 9.1,
    aiMatch: 93,
    genres: ["FPS", "Battle Royale"],
    description:
      "AI recommends this for intense tactical combat and massive free-to-play battles.",
    gradient: "from-gray-800 via-green-700 to-gray-900",
    glowColor: "oklch(0.55 0.18 150)",
  },
  {
    id: 5,
    title: "Fortnite",
    shortTitle: "Fortnite",
    letter: "F",
    developer: "Epic Games",
    year: 2017,
    rating: 8.8,
    aiMatch: 89,
    genres: ["Battle Royale"],
    description:
      "Cross-platform phenomenon. AI notes its ever-evolving map keeps players hooked for years.",
    gradient: "from-purple-700 via-blue-600 to-cyan-500",
    glowColor: "oklch(0.6 0.22 280)",
  },
  {
    id: 6,
    title: "PUBG: Battlegrounds",
    shortTitle: "PUBG",
    letter: "P",
    developer: "Krafton",
    year: 2017,
    rating: 9.0,
    aiMatch: 91,
    genres: ["Battle Royale"],
    description: "The original battle royale that changed gaming forever.",
    gradient: "from-yellow-700 via-orange-600 to-red-700",
    glowColor: "oklch(0.7 0.2 55)",
  },
  {
    id: 7,
    title: "Red Dead Redemption 2",
    shortTitle: "RDR2",
    letter: "R",
    developer: "Rockstar Games",
    year: 2018,
    rating: 9.9,
    aiMatch: 99,
    genres: ["Action", "Adventure"],
    description:
      "AI's highest-rated narrative game. A cinematic open-world western unlike any other.",
    gradient: "from-red-900 via-orange-800 to-yellow-700",
    glowColor: "oklch(0.6 0.22 30)",
    featured: true,
  },
  {
    id: 8,
    title: "The Legend of Zelda: Breath of the Wild",
    shortTitle: "Zelda: BotW",
    letter: "Z",
    developer: "Nintendo",
    year: 2017,
    rating: 9.8,
    aiMatch: 97,
    genres: ["Adventure", "RPG"],
    description:
      "Reinvented open-world exploration. AI rates it the best adventure game ever.",
    gradient: "from-green-700 via-teal-600 to-blue-500",
    glowColor: "oklch(0.65 0.2 185)",
    rank: 1,
  },
  {
    id: 9,
    title: "Among Us",
    shortTitle: "Among Us",
    letter: "A",
    developer: "InnerSloth",
    year: 2018,
    rating: 8.5,
    aiMatch: 86,
    genres: ["Action", "Adventure"],
    description:
      "The viral social deduction hit. AI loves its simple but deeply strategic gameplay.",
    gradient: "from-red-600 via-purple-700 to-indigo-800",
    glowColor: "oklch(0.55 0.22 310)",
  },
  {
    id: 10,
    title: "Cyberpunk 2077",
    shortTitle: "Cyberpunk",
    letter: "C",
    developer: "CD Projekt Red",
    year: 2020,
    rating: 9.2,
    aiMatch: 94,
    genres: ["RPG", "Action"],
    description:
      "Night City awaits. AI picks this for the most immersive futuristic RPG experience.",
    gradient: "from-yellow-500 via-cyan-500 to-blue-700",
    glowColor: "oklch(0.7 0.22 200)",
  },
  {
    id: 11,
    title: "Elden Ring",
    shortTitle: "Elden Ring",
    letter: "E",
    developer: "FromSoftware",
    year: 2022,
    rating: 9.6,
    aiMatch: 96,
    genres: ["RPG", "Action"],
    description:
      "Game of the Year legend. AI ranks it the hardest and most rewarding RPG of this era.",
    gradient: "from-yellow-800 via-amber-700 to-stone-800",
    glowColor: "oklch(0.65 0.18 75)",
    rank: 1,
  },
  {
    id: 12,
    title: "Valorant",
    shortTitle: "Valorant",
    letter: "V",
    developer: "Riot Games",
    year: 2020,
    rating: 9.0,
    aiMatch: 92,
    genres: ["FPS"],
    description:
      "Precision FPS meets unique agent abilities. AI's top pick for competitive shooters.",
    gradient: "from-red-700 via-rose-600 to-pink-500",
    glowColor: "oklch(0.6 0.24 15)",
  },
];

const GENRES = [
  "All",
  "Action",
  "Battle Royale",
  "RPG",
  "Sandbox",
  "FPS",
  "Adventure",
];

const TRENDING = [
  GAMES.find((g) => g.id === 8)!, // Zelda #1
  GAMES.find((g) => g.id === 1)!, // GTA #2
  GAMES.find((g) => g.id === 11)!, // Elden Ring #3
];

const AI_PICKS = [
  GAMES.find((g) => g.id === 7)!,
  GAMES.find((g) => g.id === 10)!,
  GAMES.find((g) => g.id === 11)!,
];

const FEATURED_GAME = GAMES.find((g) => g.featured)!;

// ─── Sub-components ─────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-1">
      <Star className="w-3.5 h-3.5 fill-warning text-warning" />
      <span className="text-warning text-sm font-semibold">{rating}</span>
    </span>
  );
}

function AiMatchBadge({ percent }: { percent: number }) {
  return (
    <span
      className="text-xs font-bold px-2 py-0.5 rounded-full"
      style={{
        background: "oklch(0.82 0.22 155 / 15%)",
        color: "oklch(0.82 0.22 155)",
      }}
    >
      🤖 AI Match: {percent}%
    </span>
  );
}

function GameCoverArt({
  game,
  className = "",
  showLetter = true,
}: { game: (typeof GAMES)[0]; className?: string; showLetter?: boolean }) {
  return (
    <div
      className={`bg-gradient-to-br ${game.gradient} ${className} relative overflow-hidden flex items-center justify-center`}
    >
      {showLetter && (
        <span
          className="font-display font-black select-none"
          style={{
            fontSize: "clamp(3rem, 8vw, 6rem)",
            color: "rgba(255,255,255,0.15)",
            textShadow: "0 2px 20px rgba(0,0,0,0.5)",
            lineHeight: 1,
          }}
        >
          {game.letter}
        </span>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
    </div>
  );
}

function GenrePill({ genre }: { genre: string }) {
  return (
    <span
      className="text-xs px-2 py-0.5 rounded-full font-medium"
      style={{
        background: "oklch(0.58 0.2 255 / 15%)",
        color: "oklch(0.75 0.18 255)",
      }}
    >
      {genre}
    </span>
  );
}

function GameCard({ game, index }: { game: (typeof GAMES)[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="rounded-2xl overflow-hidden card-border card-border-hover transition-all duration-300 cursor-pointer group"
      style={{ background: "oklch(0.13 0.022 255)" }}
      data-ocid={`games.item.${index + 1}`}
    >
      <GameCoverArt game={game} className="h-40 w-full" />
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-display font-bold text-foreground text-sm leading-tight group-hover:text-primary transition-colors">
            {game.title}
          </h3>
          <p className="text-muted-foreground text-xs mt-0.5">
            {game.developer} · {game.year}
          </p>
        </div>
        <AiMatchBadge percent={game.aiMatch} />
        <div className="flex flex-wrap gap-1">
          {game.genres.map((g) => (
            <GenrePill key={g} genre={g} />
          ))}
        </div>
        <div className="flex items-center justify-between pt-1">
          <StarRating rating={game.rating} />
          <Button
            size="sm"
            className="text-xs h-7 px-3"
            style={{ background: "oklch(0.58 0.2 255)", color: "white" }}
            data-ocid={`games.edit_button.${index + 1}`}
          >
            View Game
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

function TrendingCard({
  game,
  rank,
}: { game: (typeof GAMES)[0]; rank: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: rank * 0.1 }}
      className="rounded-2xl overflow-hidden card-border transition-all duration-300 cursor-pointer group relative"
      style={{ background: "oklch(0.13 0.022 255)" }}
      data-ocid={`trending.item.${rank}`}
    >
      <GameCoverArt game={game} className="h-56 w-full" />
      {/* Rank badge */}
      <div
        className="absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center font-display font-black text-lg"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.58 0.2 255), oklch(0.45 0.22 270))",
          boxShadow: "0 0 16px oklch(0.58 0.2 255 / 50%)",
        }}
      >
        #{rank}
      </div>
      {/* Score badge */}
      <div
        className="absolute top-4 right-4 w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm score-ring"
        style={{
          background: "oklch(0.1 0.02 255)",
          color: "oklch(0.82 0.22 155)",
        }}
      >
        {game.rating}
      </div>
      <div className="p-5">
        <h3 className="font-display font-bold text-foreground text-lg leading-tight">
          {game.title}
        </h3>
        <p className="text-muted-foreground text-sm mt-1">
          {game.developer} · {game.year}
        </p>
        <p className="text-muted-foreground text-xs mt-2 line-clamp-2">
          {game.description}
        </p>
        <div className="flex flex-wrap gap-1 mt-3">
          {game.genres.map((g) => (
            <GenrePill key={g} genre={g} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main App ────────────────────────────────────────────────────────────────

export default function App() {
  const [activeGenre, setActiveGenre] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");

  const filteredGames = useMemo(() => {
    return GAMES.filter((game) => {
      const matchesGenre =
        activeGenre === "All" || game.genres.includes(activeGenre);
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        game.title.toLowerCase().includes(q) ||
        game.developer.toLowerCase().includes(q) ||
        game.genres.some((g) => g.toLowerCase().includes(q));
      return matchesGenre && matchesSearch;
    });
  }, [activeGenre, searchQuery]);

  return (
    <div
      className="min-h-screen text-foreground"
      style={{
        background: "linear-gradient(135deg, #070B12, #0B1423, #0E1D2F)",
      }}
    >
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{
          background: "oklch(0.09 0.018 255 / 90%)",
          backdropFilter: "blur(20px)",
          borderColor: "oklch(0.58 0.2 255 / 15%)",
        }}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2" data-ocid="nav.link">
            <Gamepad2 className="w-6 h-6 text-primary" />
            <span className="font-display font-bold text-lg text-foreground">
              AI GameRank
            </span>
          </div>
          {/* Nav */}
          <nav
            className="hidden md:flex items-center gap-6"
            aria-label="Main navigation"
          >
            {["Discover", "Top Rated", "AI Picks", "Genres"].map((item) => (
              <a
                key={item}
                href="/"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
                data-ocid={`nav.${item.toLowerCase().replace(" ", "_")}.link`}
              >
                {item}
              </a>
            ))}
          </nav>
          {/* Right */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Search"
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
              data-ocid="nav.search_input"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section
          className="relative overflow-hidden py-24 sm:py-32"
          data-ocid="hero.section"
        >
          {/* Radial glow BG */}
          <div className="absolute inset-0 hero-glow pointer-events-none" />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, oklch(0.58 0.2 255 / 8%), transparent 70%)",
            }}
          />
          {/* Floating particles */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 4 + i * 2,
                height: 4 + i * 2,
                background: `oklch(0.58 0.2 255 / ${20 + i * 10}%)`,
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.4,
              }}
            />
          ))}
          <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Badge
                className="mb-6 border px-4 py-1.5 text-sm font-semibold"
                style={{
                  background: "oklch(0.58 0.2 255 / 15%)",
                  borderColor: "oklch(0.58 0.2 255 / 30%)",
                  color: "oklch(0.75 0.18 255)",
                }}
              >
                <Cpu className="w-3.5 h-3.5 mr-1.5 inline" />
                AI-Powered Game Rankings
              </Badge>
              <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl leading-tight mb-6">
                Discover the Definitive{" "}
                <span className="text-gradient-hero block sm:inline">
                  BEST GAMES OF ALL TIME.
                </span>
                <br className="hidden sm:block" />
                <span className="text-foreground">Powered by AI.</span>
              </h1>
              <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                Our AI analyzes millions of player reviews, critic scores, and
                gameplay data to rank the greatest games ever created.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="px-8 h-12 font-bold glow-blue transition-all duration-300 hover:glow-blue-strong"
                  style={{ background: "oklch(0.58 0.2 255)", color: "white" }}
                  data-ocid="hero.primary_button"
                >
                  Explore Top Games <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 h-12 font-bold transition-all duration-300"
                  style={{
                    borderColor: "oklch(0.58 0.2 255 / 40%)",
                    color: "oklch(0.75 0.18 255)",
                    background: "transparent",
                  }}
                  data-ocid="hero.secondary_button"
                >
                  <Zap className="mr-2 w-4 h-4" /> AI Picks for Me
                </Button>
              </div>
              {/* Stats */}
              <div className="mt-16 flex flex-wrap justify-center gap-8 sm:gap-16">
                {[
                  { value: "12+", label: "Top Games" },
                  { value: "99.8%", label: "AI Accuracy" },
                  { value: "50M+", label: "Reviews Analyzed" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="font-display font-black text-3xl text-gradient-blue">
                      {stat.value}
                    </div>
                    <div className="text-muted-foreground text-sm mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── AI Pick of the Day ──────────────────────────────────────────── */}
        <section className="py-16" data-ocid="featured.section">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl overflow-hidden relative card-border"
              style={{ background: "oklch(0.11 0.022 255)" }}
            >
              <div className="flex flex-col md:flex-row">
                {/* Cover */}
                <div
                  className={`bg-gradient-to-br ${FEATURED_GAME.gradient} md:w-2/5 h-64 md:h-auto relative flex items-center justify-center`}
                >
                  <span
                    className="font-display font-black select-none"
                    style={{
                      fontSize: "8rem",
                      color: "rgba(255,255,255,0.15)",
                      lineHeight: 1,
                    }}
                  >
                    {FEATURED_GAME.letter}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/50 hidden md:block" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
                </div>
                {/* Content */}
                <div className="p-8 md:p-12 flex flex-col justify-center md:w-3/5">
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider"
                      style={{
                        background: "oklch(0.82 0.22 155 / 15%)",
                        color: "oklch(0.82 0.22 155)",
                        border: "1px solid oklch(0.82 0.22 155 / 30%)",
                      }}
                    >
                      🤖 AI PICK OF THE DAY
                    </span>
                    <StarRating rating={FEATURED_GAME.rating} />
                  </div>
                  <h2 className="font-display font-black text-3xl sm:text-4xl text-foreground mb-3">
                    {FEATURED_GAME.title}
                  </h2>
                  <p className="text-muted-foreground text-base sm:text-lg mb-2">
                    {FEATURED_GAME.developer} · {FEATURED_GAME.year}
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-6 max-w-lg">
                    {FEATURED_GAME.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {FEATURED_GAME.genres.map((g) => (
                      <GenrePill key={g} genre={g} />
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <Button
                      size="lg"
                      className="font-bold glow-blue"
                      style={{
                        background: "oklch(0.58 0.2 255)",
                        color: "white",
                      }}
                      data-ocid="featured.primary_button"
                    >
                      Play Now <ChevronRight className="ml-1 w-4 h-4" />
                    </Button>
                    <Button
                      size="lg"
                      variant="ghost"
                      className="font-bold"
                      style={{ color: "oklch(0.75 0.18 255)" }}
                      data-ocid="featured.secondary_button"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Trending All-Time Classics ──────────────────────────────────── */}
        <section className="py-16" data-ocid="trending.section">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-8"
            >
              <Trophy className="w-6 h-6 text-warning" />
              <h2 className="font-display font-black text-2xl sm:text-3xl text-foreground uppercase tracking-wide">
                Trending All-Time Classics
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {TRENDING.map((game, i) => (
                <TrendingCard key={game.id} game={game} rank={i + 1} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Genre Filter + Game Grid ────────────────────────────────────── */}
        <section className="py-16" data-ocid="games.section">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
            >
              <div className="flex items-center gap-3">
                <Flame className="w-6 h-6 text-primary" />
                <h2 className="font-display font-black text-2xl sm:text-3xl text-foreground uppercase tracking-wide">
                  Curate Your Legend
                </h2>
              </div>
              {/* Search */}
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search games..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-10"
                  style={{
                    background: "oklch(0.13 0.022 255)",
                    borderColor: "oklch(0.58 0.2 255 / 25%)",
                  }}
                  data-ocid="games.search_input"
                />
              </div>
            </motion.div>

            {/* Filter chips */}
            <fieldset
              className="flex flex-wrap gap-2 mb-8 border-0 p-0 m-0"
              aria-label="Genre filters"
            >
              {GENRES.map((genre) => (
                <button
                  type="button"
                  key={genre}
                  onClick={() => setActiveGenre(genre)}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                    activeGenre === genre ? "chip-active" : "chip-inactive"
                  }`}
                  data-ocid={`games.${genre.toLowerCase().replace(" ", "_")}.tab`}
                  aria-pressed={activeGenre === genre}
                >
                  {genre}
                </button>
              ))}
            </fieldset>

            {/* Games grid */}
            <AnimatePresence mode="sync">
              {filteredGames.length > 0 ? (
                <motion.div
                  key="grid"
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
                >
                  {filteredGames.map((game, i) => (
                    <GameCard key={game.id} game={game} index={i} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                  data-ocid="games.empty_state"
                >
                  <Gamepad2 className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-30" />
                  <p className="text-muted-foreground text-lg">
                    No games found for &ldquo;{searchQuery}&rdquo;
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setActiveGenre("All");
                    }}
                    className="mt-4 text-primary text-sm hover:underline"
                  >
                    Clear filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* ── AI Recommendations Strip ────────────────────────────────────── */}
        <section className="py-16" data-ocid="recommendations.section">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-8"
            >
              <Cpu className="w-6 h-6 text-primary" />
              <h2 className="font-display font-black text-2xl sm:text-3xl text-foreground uppercase tracking-wide">
                AI-Powered Recommendations
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {AI_PICKS.map((game, i) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="rounded-2xl overflow-hidden card-border card-border-hover transition-all duration-300 cursor-pointer"
                  style={{ background: "oklch(0.13 0.022 255)" }}
                  data-ocid={`recommendations.item.${i + 1}`}
                >
                  <GameCoverArt game={game} className="h-44 w-full" />
                  <div className="p-4">
                    <h3 className="font-display font-bold text-sm text-foreground leading-tight">
                      {game.shortTitle}
                    </h3>
                    <AiMatchBadge percent={game.aiMatch} />
                    <StarRating rating={game.rating} />
                  </div>
                </motion.div>
              ))}
              {/* CTA Card */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.3 }}
                className="rounded-2xl flex flex-col items-center justify-center p-8 text-center card-border glow-blue transition-all duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.13 0.035 255), oklch(0.11 0.025 255))",
                }}
                data-ocid="recommendations.card"
              >
                <Zap className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-display font-bold text-foreground text-lg mb-2">
                  Generate My Personalized List
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Let AI curate the perfect game lineup just for you.
                </p>
                <Button
                  className="font-bold w-full"
                  style={{ background: "oklch(0.58 0.2 255)", color: "white" }}
                  data-ocid="recommendations.primary_button"
                >
                  Generate Now
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer
        className="border-t mt-8 py-16"
        style={{ borderColor: "oklch(0.58 0.2 255 / 15%)" }}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Gamepad2 className="w-6 h-6 text-primary" />
                <span className="font-display font-bold text-xl text-foreground">
                  AI GameRank
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-sm">
                The world&apos;s most intelligent game ranking platform. Powered
                by cutting-edge AI that analyzes millions of reviews to find the
                greatest games ever made.
              </p>
              {/* Email signup */}
              <div className="flex gap-2 max-w-sm">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                  style={{
                    background: "oklch(0.13 0.022 255)",
                    borderColor: "oklch(0.58 0.2 255 / 25%)",
                  }}
                  data-ocid="footer.input"
                />
                <Button
                  style={{ background: "oklch(0.58 0.2 255)", color: "white" }}
                  data-ocid="footer.submit_button"
                >
                  <Mail className="w-4 h-4" />
                </Button>
              </div>
              {/* Social */}
              <div className="flex gap-4 mt-6">
                {[
                  { icon: Twitter, label: "Twitter" },
                  { icon: Github, label: "GitHub" },
                  { icon: Twitch, label: "Twitch" },
                  { icon: Youtube, label: "YouTube" },
                ].map(({ icon: Icon, label }) => (
                  <a
                    key={label}
                    href="/"
                    aria-label={label}
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                    style={{ background: "oklch(0.16 0.025 255)" }}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
            {/* Links */}
            <div>
              <h4 className="font-display font-bold text-foreground mb-4">
                Rankings
              </h4>
              <ul className="space-y-3">
                {[
                  "Top 100 Games",
                  "All-Time Classics",
                  "New Releases",
                  "Hidden Gems",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="/"
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-display font-bold text-foreground mb-4">
                Company
              </h4>
              <ul className="space-y-3">
                {["About", "Contact", "Privacy Policy", "Terms of Use"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href="/"
                        className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
          <div
            className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ borderColor: "oklch(0.58 0.2 255 / 10%)" }}
          >
            <p className="text-muted-foreground text-xs">
              © {new Date().getFullYear()} AI GameRank. Powered by AI.
            </p>
            <p className="text-muted-foreground text-xs">
              Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                className="hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
