import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { collections, products } from "@/lib/products";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Collections — Aurelis Horology" },
      { name: "description", content: "Explore Aurelis Horology's collections of Swiss mechanical watches." },
    ],
  }),
  component: CollectionsPage,
});

const sorts = ["Featured", "New Arrivals", "Price: Low to High", "Price: High to Low"] as const;

function CollectionsPage() {
  const [col, setCol] = useState<string>("All");
  const [gender, setGender] = useState<string>("All");
  const [sort, setSort] = useState<(typeof sorts)[number]>("Featured");
  const [maxPrice, setMaxPrice] = useState(200000);

  const list = useMemo(() => {
    let l = [...products];
    if (col !== "All") l = l.filter((p) => p.collection === col);
    if (gender !== "All") l = l.filter((p) => p.gender === gender);
    l = l.filter((p) => p.price <= maxPrice);
    if (sort === "New Arrivals") l.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
    if (sort === "Price: Low to High") l.sort((a, b) => a.price - b.price);
    if (sort === "Price: High to Low") l.sort((a, b) => b.price - a.price);
    return l;
  }, [col, gender, sort, maxPrice]);

  return (
    <main className="pt-32">
      <section className="mx-auto max-w-7xl px-6">
        <div className="text-[10px] tracking-[0.4em] text-gold">THE COLLECTION</div>
        <h1 className="mt-4 font-display text-6xl md:text-7xl">All Timepieces</h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Each piece is finished by hand in our Geneva atelier and delivered with a lifetime guarantee.
        </p>
        <div className="divider-gold my-12" />

        <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
          <aside className="space-y-8">
            <FilterGroup title="Collection">
              <FilterButton active={col === "All"} onClick={() => setCol("All")}>All</FilterButton>
              {collections.map((c) => (
                <FilterButton key={c} active={col === c} onClick={() => setCol(c)}>{c}</FilterButton>
              ))}
            </FilterGroup>
            <FilterGroup title="Gender">
              {["All", "Men", "Women", "Unisex"].map((g) => (
                <FilterButton key={g} active={gender === g} onClick={() => setGender(g)}>{g}</FilterButton>
              ))}
            </FilterGroup>
            <FilterGroup title="Max Price">
              <input
                type="range"
                min={5000}
                max={200000}
                step={1000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[color:var(--gold)]"
              />
              <div className="mt-2 text-xs text-muted-foreground">Up to ${maxPrice.toLocaleString()}</div>
            </FilterGroup>
          </aside>

          <div>
            <div className="mb-8 flex items-center justify-between">
              <div className="text-xs text-muted-foreground">{list.length} pieces</div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as (typeof sorts)[number])}
                className="border border-border bg-charcoal px-4 py-2 text-xs tracking-widest focus:border-gold focus:outline-none"
              >
                {sorts.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
              {list.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
            {list.length === 0 && (
              <div className="py-20 text-center text-muted-foreground">No pieces match your filters.</div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-3 text-[10px] tracking-[0.3em] text-gold">{title.toUpperCase()}</div>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function FilterButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`block w-full text-left text-sm transition ${
        active ? "text-gold" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
