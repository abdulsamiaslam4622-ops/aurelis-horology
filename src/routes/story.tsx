import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "Our Story — Aurelis Horology" },
      { name: "description", content: "Six decades of Swiss watchmaking, from a single Geneva atelier to a global maison." },
    ],
  }),
  component: StoryPage,
});

const sections = [
  { year: "1962", t: "The Beginning", d: "Auguste Lefèvre opens a small atelier in Geneva. His first watch — six pieces, made entirely by hand — sells to a single collector who insists on ordering the seventh." },
  { year: "1978", t: "The Philosophy", d: "Luxury, we come to believe, is not about excess. It is about the pursuit of perfection in things most people never see. Every bridge is beveled by hand. Every screw is polished." },
  { year: "1994", t: "The Craft", d: "We refuse industrial scale. Production stays under 1,200 pieces a year. A single watchmaker follows each timepiece from movement to case-back." },
  { year: "Today", t: "The Future", d: "Traditional horology meets modern engineering. New materials — forged carbon, aventurine, sapphire cases — extend a language that began sixty years ago." },
];

function StoryPage() {
  return (
    <main className="pt-32">
      <section className="mx-auto max-w-4xl px-6 text-center">
        <div className="text-[10px] tracking-[0.4em] text-gold">SINCE 1962</div>
        <h1 className="mt-6 font-display text-6xl md:text-8xl leading-[0.95]">
          Passion, precision,<br /><span className="italic text-gold-gradient">and time.</span>
        </h1>
        <p className="mx-auto mt-8 max-w-xl text-muted-foreground">
          The story of Aurelis Horology is written one heartbeat at a time — 28,800 of them per hour.
        </p>
      </section>

      <div className="mx-auto mt-24 max-w-5xl space-y-32 px-6 pb-16">
        {sections.map((s, i) => (
          <motion.div
            key={s.year}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className={`grid gap-10 lg:grid-cols-2 lg:items-center ${i % 2 ? "lg:[&>div:first-child]:order-2" : ""}`}
          >
            <div>
              <div className="font-display text-6xl text-gold-gradient">{s.year}</div>
              <h2 className="mt-4 font-display text-5xl">{s.t}</h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{s.d}</p>
            </div>
            <div className="aspect-[4/5] overflow-hidden rounded-sm">
              <img
                src={`https://images.unsplash.com/photo-${["1509048191080-d2984bad6ae5","1548171245-a1e4a15d1c48","1587836374828-4dbafa94cf0e","1614703418452-f7f21b325a24"][i]}?auto=format&fit=crop&w=1200&q=80`}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
