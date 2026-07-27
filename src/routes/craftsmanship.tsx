import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createFileRoute("/craftsmanship")({
  head: () => ({
    meta: [
      { title: "Craftsmanship — Aurelis Horology" },
      { name: "description", content: "Hand-polished cases, sapphire crystal, precision Swiss movements — the craft behind every Aurelis." },
    ],
  }),
  component: CraftPage,
});

const items = [
  { t: "Hand-polished Cases", d: "Every case is polished for up to 14 hours by a single artisan, producing surfaces that reflect like still water." },
  { t: "Sapphire Crystal", d: "Domed and anti-reflective on both sides. Second only to diamond in hardness — invisible in daylight." },
  { t: "Precision Movements", d: "In-house calibres regulated to +/− 2 seconds per day, exceeding COSC chronometer standards." },
  { t: "Swiss Engineering", d: "Every screw, every bridge, every jewel is manufactured within 40 kilometers of our Geneva atelier." },
  { t: "Alligator Leather Straps", d: "Sourced from a single Louisiana tannery. Hand-cut, hand-stitched, aged to perfection." },
  { t: "Precious Metals", d: "18k gold in three tones. Platinum 950. Grade 5 titanium. Forged carbon. Chosen for the piece, never the price." },
  { t: "Quality Control", d: "312 individual inspections per watch. If a single one fails, the movement returns to the bench." },
  { t: "Limited Production", d: "Fewer than 1,200 Aurelis timepieces leave our atelier each year. Deliberately." },
];

function CraftPage() {
  return (
    <main className="pt-32">
      <section className="mx-auto max-w-4xl px-6 text-center">
        <div className="text-[10px] tracking-[0.4em] text-gold">THE CRAFT</div>
        <h1 className="mt-6 font-display text-6xl md:text-8xl leading-[0.95]">
          Made by hand.<br /><span className="italic text-gold-gradient">Made to last.</span>
        </h1>
        <p className="mx-auto mt-8 max-w-xl text-muted-foreground">
          Nothing about an Aurelis is automated. Every surface, every finish, every regulation — the work of a human hand.
        </p>
      </section>

      <div className="mx-auto mt-24 max-w-6xl px-6">
        <div className="grid gap-8 sm:grid-cols-2">
          {items.map((it, i) => (
            <motion.div
              key={it.t}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 2) * 0.1 }}
              className="border border-border/60 bg-charcoal/40 p-10"
            >
              <div className="font-display text-3xl text-gold">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="mt-4 font-display text-2xl">{it.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{it.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
