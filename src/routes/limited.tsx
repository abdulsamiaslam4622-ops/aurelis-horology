import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { formatPrice, products } from "@/lib/products";

export const Route = createFileRoute("/limited")({
  head: () => ({
    meta: [
      { title: "Limited Edition — Aurelis Horology" },
      { name: "description", content: "Rare, numbered timepieces available only to those who reserve." },
    ],
  }),
  component: LimitedPage,
});

function LimitedPage() {
  const list = products.filter((p) => p.isLimited);
  return (
    <main className="pt-32">
      <section className="mx-auto max-w-5xl px-6 text-center">
        <div className="text-[10px] tracking-[0.4em] text-gold">BY INVITATION</div>
        <h1 className="mt-6 font-display text-6xl md:text-8xl leading-[0.95]">
          Limited <span className="italic text-gold-gradient">Edition</span>
        </h1>
        <p className="mx-auto mt-8 max-w-xl text-muted-foreground">
          A private collection of numbered timepieces, released once and never again. Available only to clients who
          request a reservation.
        </p>
      </section>

      <div className="mx-auto mt-20 max-w-6xl space-y-24 px-6 pb-16">
        {list.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className={`grid gap-10 lg:grid-cols-2 lg:items-center ${i % 2 ? "lg:[&>div:first-child]:order-2" : ""}`}
          >
            <div className="relative aspect-square overflow-hidden rounded-sm">
              <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-onyx via-transparent to-transparent" />
              <div className="absolute left-6 top-6 border border-gold/60 bg-onyx/70 px-3 py-1 text-[10px] tracking-[0.3em] text-gold">
                {p.edition}
              </div>
            </div>
            <div>
              <div className="text-[10px] tracking-[0.4em] text-gold">{p.collection.toUpperCase()}</div>
              <h2 className="mt-3 font-display text-5xl">{p.name}</h2>
              <div className="mt-3 font-display text-2xl text-gold-gradient">{formatPrice(p.price)}</div>
              <p className="mt-6 max-w-md text-muted-foreground leading-relaxed">{p.description}</p>
              <div className="mt-6 inline-block border border-gold/40 px-4 py-2 text-[10px] tracking-[0.3em] text-gold">
                {p.remaining} PIECES REMAINING
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/product/$id" params={{ id: p.id }} className="bg-gold-gradient px-8 py-4 text-xs font-semibold tracking-[0.3em] text-onyx">
                  RESERVE YOUR TIMEPIECE
                </Link>
                <Link to="/contact" className="border border-gold px-8 py-4 text-xs tracking-[0.3em] text-gold hover:bg-gold hover:text-onyx">
                  PRIVATE VIEWING
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
