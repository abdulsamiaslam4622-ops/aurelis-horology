import { createFileRoute, Link, useNavigate, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { formatPrice, getProduct, products } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Aurelis Horology` },
          { name: "description", content: loaderData.product.shortDescription },
          { property: "og:title", content: `${loaderData.product.name} — Aurelis Horology` },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [{ title: "Timepiece — Aurelis Horology" }],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const navigate = useNavigate();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <main className="pt-28">
      <section className="mx-auto max-w-7xl px-6">
        <Link to="/collections" className="text-xs tracking-[0.3em] text-muted-foreground hover:text-gold">
          ← BACK TO COLLECTION
        </Link>

        <div className="mt-8 grid gap-14 lg:grid-cols-2">
          <div>
            <motion.div
              key={activeImg}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative aspect-square overflow-hidden rounded-sm bg-charcoal"
            >
              <img src={product.gallery[activeImg]} alt={product.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-onyx/60 to-transparent" />
            </motion.div>
            {product.gallery.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3">
                {product.gallery.map((g: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`aspect-square overflow-hidden rounded-sm border ${
                      activeImg === i ? "border-gold" : "border-border/50"
                    }`}
                  >
                    <img src={g} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="text-[10px] tracking-[0.4em] text-gold">{product.collection.toUpperCase()}</div>
            <h1 className="mt-3 font-display text-5xl md:text-6xl">{product.name}</h1>
            <div className="mt-4 font-display text-3xl text-gold-gradient">{formatPrice(product.price)}</div>
            {product.isLimited && product.edition && (
              <div className="mt-3 inline-block border border-gold/40 px-3 py-1 text-[10px] tracking-[0.3em] text-gold">
                {product.edition} · {product.remaining} REMAINING
              </div>
            )}

            <div className="divider-gold my-8" />

            <p className="text-muted-foreground leading-relaxed">{product.description}</p>

            <div className="mt-10">
              <div className="mb-4 text-[10px] tracking-[0.3em] text-gold">QUANTITY</div>
              <div className="inline-flex items-center border border-border">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 text-lg hover:text-gold">−</button>
                <div className="w-12 text-center">{qty}</div>
                <button onClick={() => setQty(qty + 1)} className="px-4 py-3 text-lg hover:text-gold">+</button>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => add(product.id, qty)}
                className="border border-gold px-8 py-4 text-xs font-semibold tracking-[0.3em] text-gold transition hover:bg-gold hover:text-onyx"
              >
                ADD TO CART
              </button>
              <button
                onClick={() => { add(product.id, qty); navigate({ to: "/checkout" }); }}
                className="bg-gold-gradient px-8 py-4 text-xs font-semibold tracking-[0.3em] text-onyx transition hover:scale-[1.02]"
              >
                BUY NOW
              </button>
              <button className="border border-border px-5 py-4 text-xs tracking-[0.3em] text-muted-foreground hover:text-gold">
                ♡ WISHLIST
              </button>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-border pt-8 text-sm">
              <Spec label="Material" value={product.material} />
              <Spec label="Movement" value={product.movement} />
              <Spec label="Case Size" value={product.caseSize} />
              <Spec label="Water Resistance" value={product.waterResistance} />
              <Spec label="Strap" value={product.strap} />
              <Spec label="Gender" value={product.gender} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-32 max-w-7xl px-6">
        <div className="text-[10px] tracking-[0.4em] text-gold">MECHANICS</div>
        <h2 className="mt-3 font-display text-4xl md:text-5xl">The heart of precision</h2>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Every component is machined, assembled, and regulated by hand — from the balance wheel oscillating 28,800
          times per hour to the mainspring storing 72 hours of energy.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { t: "Balance Wheel", d: "28,800 vph oscillation." },
            { t: "Mainspring", d: "72h power reserve." },
            { t: "Rotor", d: "22k gold micro-rotor." },
            { t: "Gear Train", d: "Hand-beveled bridges." },
            { t: "Escapement", d: "Swiss lever, in-house." },
          ].map((c, i) => (
            <motion.div
              key={c.t}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="border border-border/60 bg-charcoal/40 p-6"
            >
              <div className="font-display text-2xl text-gold">0{i + 1}</div>
              <div className="mt-3 font-display text-lg">{c.t}</div>
              <div className="mt-1 text-xs text-muted-foreground">{c.d}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-32 max-w-7xl px-6">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-4xl">You may also appreciate</h2>
          <Link to="/collections" className="text-xs tracking-[0.3em] text-muted-foreground hover:text-gold">VIEW ALL →</Link>
        </div>
        <div className="divider-gold my-8" />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </main>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] tracking-[0.3em] text-muted-foreground">{label.toUpperCase()}</div>
      <div className="mt-1 text-foreground">{value}</div>
    </div>
  );
}
