import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense, useState } from "react";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

const WatchScene = lazy(() => import("@/components/WatchScene").then((m) => ({ default: m.WatchScene })));

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <main className="relative">
      <Hero />
      <FeaturedCollection />
      <ArtOfHorology />
      <Categories />
      <ExperienceSection />
      <Newsletter />
    </main>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, oklch(0.20 0.02 70) 0%, oklch(0.09 0.005 60) 65%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-40 shimmer" />

      <div className="absolute inset-0">
        <Suspense fallback={<div className="h-full w-full" />}>
          <WatchScene />
        </Suspense>
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-16 px-6 pt-32 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="text-[10px] tracking-[0.5em] text-gold">SWISS HOROLOGY · SINCE 1962</div>
          <h1 className="mt-6 font-display text-6xl leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
            <span className="block">Time,</span>
            <span className="block text-gold-gradient italic">redefined.</span>
          </h1>
          <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">
            A collection of exceptional timepieces engineered for those who appreciate the extraordinary.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/collections"
              className="group relative overflow-hidden bg-gold-gradient px-8 py-4 text-xs font-semibold tracking-[0.3em] text-onyx transition hover:scale-[1.02]"
            >
              EXPLORE COLLECTION
            </Link>
            <Link
              to="/craftsmanship"
              className="border border-gold/50 px-8 py-4 text-xs font-semibold tracking-[0.3em] text-gold transition hover:bg-gold hover:text-onyx"
            >
              DISCOVER THE CRAFT
            </Link>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-[10px] tracking-[0.4em] text-muted-foreground"
      >
        SCROLL TO EXPLORE
      </motion.div>
    </section>
  );
}

function FeaturedCollection() {
  const featured = products.slice(0, 4);
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-32">
      <div className="flex flex-col items-end justify-between gap-6 md:flex-row md:items-end">
        <div>
          <div className="text-[10px] tracking-[0.4em] text-gold">01 · THE COLLECTION</div>
          <h2 className="mt-4 font-display text-5xl md:text-6xl">Featured Timepieces</h2>
        </div>
        <Link to="/collections" className="text-xs tracking-[0.3em] text-muted-foreground hover:text-gold">
          VIEW ALL →
        </Link>
      </div>
      <div className="divider-gold my-12" />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

function ArtOfHorology() {
  const items = [
    { n: "01", t: "Swiss Craftsmanship", d: "Assembled in Geneva by master watchmakers with decades of practice." },
    { n: "02", t: "Mechanical Precision", d: "In-house calibres regulated to chronometer-grade tolerances." },
    { n: "03", t: "Hand-finished Details", d: "Anglage, Côtes de Genève, and perlage — all executed by hand." },
    { n: "04", t: "Premium Materials", d: "18k gold, platinum 950, forged carbon, aventurine, sapphire." },
  ];
  return (
    <section className="relative overflow-hidden bg-charcoal/60 py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
        >
          <div className="text-[10px] tracking-[0.4em] text-gold">02 · THE ART OF HOROLOGY</div>
          <h2 className="mt-4 font-display text-5xl leading-tight md:text-6xl">
            Sixty years <br /><span className="italic text-gold-gradient">of obsession</span>
          </h2>
          <p className="mt-6 max-w-md text-muted-foreground">
            Every Aurelis begins as a sketch and ends as an heirloom. Between those points lies the entire history
            of Swiss watchmaking — condensed into a case no wider than a coin.
          </p>
          <div className="mt-10 space-y-6">
            {items.map((it) => (
              <div key={it.n} className="flex gap-6 border-t border-border/60 pt-6">
                <div className="font-display text-2xl text-gold">{it.n}</div>
                <div>
                  <div className="font-display text-xl">{it.t}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{it.d}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="relative aspect-[4/5] overflow-hidden rounded-sm"
        >
          <img
            src="https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?auto=format&fit=crop&w=1200&q=80"
            alt="Watch craftsmanship"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-onyx/80 via-transparent to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}

function Categories() {
  const cats = [
    { name: "Classic", img: "1524592094714-0f0654e20314" },
    { name: "Chronograph", img: "1548171245-a1e4a15d1c48" },
    { name: "Skeleton", img: "1509048191080-d2984bad6ae5" },
    { name: "Tourbillon", img: "1614703418452-f7f21b325a24" },
    { name: "Diver", img: "1533139502658-0198f920d8e8" },
    { name: "Limited Edition", img: "1547996160-81dfa63595aa" },
    { name: "Women", img: "1595923533867-9ffa89aabe1c" },
    { name: "Men", img: "1587836374828-4dbafa94cf0e" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-32">
      <div className="text-[10px] tracking-[0.4em] text-gold">03 · COLLECTIONS</div>
      <h2 className="mt-4 font-display text-5xl md:text-6xl">Explore by category</h2>
      <div className="divider-gold my-12" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cats.map((c) => (
          <Link
            key={c.name}
            to="/collections"
            search={{ collection: c.name } as never}
            className="group relative aspect-square overflow-hidden rounded-sm bg-charcoal"
          >
            <img
              src={`https://images.unsplash.com/photo-${c.img}?auto=format&fit=crop&w=800&q=80`}
              alt={c.name}
              className="h-full w-full object-cover opacity-60 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <div className="text-[10px] tracking-[0.3em] text-gold">COLLECTION</div>
              <div className="mt-1 font-display text-2xl text-foreground">{c.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section className="relative overflow-hidden py-40">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1548171245-a1e4a15d1c48?auto=format&fit=crop&w=2000&q=80"
          alt=""
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-onyx/70 to-background" />
      </div>
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="font-display text-4xl leading-tight md:text-6xl"
        >
          A watch is not simply worn.
          <br />
          <span className="italic text-gold-gradient">It is experienced.</span>
        </motion.h2>
        <p className="mx-auto mt-8 max-w-xl text-muted-foreground">
          Every Aurelis is a companion for the moments that matter — measured in seconds, remembered for a lifetime.
        </p>
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <section className="mx-auto max-w-4xl px-6 py-32 text-center">
      <div className="text-[10px] tracking-[0.4em] text-gold">JOIN THE MAISON</div>
      <h2 className="mt-4 font-display text-5xl md:text-6xl">Enter the world of Aurelis.</h2>
      <p className="mx-auto mt-4 max-w-md text-muted-foreground">
        Private previews, new releases, and invitations to our Geneva atelier.
      </p>
      <form
        onSubmit={(e) => { e.preventDefault(); setSent(true); }}
        className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          className="flex-1 border border-border/80 bg-transparent px-5 py-4 text-sm placeholder:text-muted-foreground focus:border-gold focus:outline-none"
        />
        <button className="bg-gold-gradient px-6 py-4 text-xs font-semibold tracking-[0.3em] text-onyx transition hover:scale-[1.02]">
          {sent ? "SUBSCRIBED" : "SUBSCRIBE"}
        </button>
      </form>
    </section>
  );
}
