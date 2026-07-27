import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Shopping Bag — Aurelis Horology" }] }),
  component: CartPage,
});

function CartPage() {
  const { detailed, setQty, remove, subtotal } = useCart();
  const shipping = subtotal > 0 ? 250 : 0;

  return (
    <main className="pt-32">
      <section className="mx-auto max-w-6xl px-6">
        <div className="text-[10px] tracking-[0.4em] text-gold">YOUR SELECTION</div>
        <h1 className="mt-4 font-display text-6xl">Shopping Bag</h1>
        <div className="divider-gold my-12" />

        {detailed.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-muted-foreground">Your bag is empty.</p>
            <Link to="/collections" className="mt-6 inline-block border border-gold px-8 py-4 text-xs tracking-[0.3em] text-gold hover:bg-gold hover:text-onyx">
              EXPLORE COLLECTION
            </Link>
          </div>
        ) : (
          <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
            <div className="space-y-6">
              {detailed.map(({ product, qty }) => (
                <div key={product.id} className="flex gap-6 border-b border-border pb-6">
                  <img src={product.image} alt={product.name} className="h-32 w-32 rounded-sm object-cover" />
                  <div className="flex flex-1 flex-col">
                    <div className="text-[10px] tracking-[0.3em] text-muted-foreground">{product.collection.toUpperCase()}</div>
                    <Link to="/product/$id" params={{ id: product.id }} className="mt-1 font-display text-xl hover:text-gold">
                      {product.name}
                    </Link>
                    <div className="mt-1 text-xs text-muted-foreground">{product.material}</div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="inline-flex items-center border border-border">
                        <button onClick={() => setQty(product.id, qty - 1)} className="px-3 py-2 hover:text-gold">−</button>
                        <div className="w-10 text-center text-sm">{qty}</div>
                        <button onClick={() => setQty(product.id, qty + 1)} className="px-3 py-2 hover:text-gold">+</button>
                      </div>
                      <div className="text-right">
                        <div className="font-display text-lg text-gold-gradient">{formatPrice(product.price * qty)}</div>
                        <button onClick={() => remove(product.id)} className="mt-1 text-[10px] tracking-[0.3em] text-muted-foreground hover:text-gold">
                          REMOVE
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <aside className="h-fit border border-border bg-charcoal/40 p-8">
              <div className="text-[10px] tracking-[0.3em] text-gold">ORDER SUMMARY</div>
              <div className="mt-6 space-y-3 text-sm">
                <Row label="Subtotal" value={formatPrice(subtotal)} />
                <Row label="Shipping" value={formatPrice(shipping)} />
                <div className="my-4 h-px bg-border" />
                <Row label="Total" value={formatPrice(subtotal + shipping)} bold />
              </div>
              <Link
                to="/checkout"
                className="mt-8 block bg-gold-gradient py-4 text-center text-xs font-semibold tracking-[0.3em] text-onyx transition hover:scale-[1.02]"
              >
                PROCEED TO CHECKOUT
              </Link>
              <p className="mt-4 text-center text-[10px] tracking-[0.2em] text-muted-foreground">
                COMPLIMENTARY GLOBAL SHIPPING OVER $50,000
              </p>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex justify-between ${bold ? "font-display text-lg text-foreground" : "text-muted-foreground"}`}>
      <span>{label}</span><span>{value}</span>
    </div>
  );
}
