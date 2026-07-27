import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Aurelis Horology" },
      { name: "description", content: "Complete your Aurelis Horology purchase securely with PayPal or card." },
    ],
  }),
  component: CheckoutPage,
});

// PayPal sandbox demo client id ("sb") — replace with your live client ID for production.
const PAYPAL_CLIENT_ID = (import.meta as any).env?.VITE_PAYPAL_CLIENT_ID || "sb";

declare global {
  interface Window { paypal?: any }
}

function loadPayPalSdk(currency = "USD"): Promise<any> {
  if (typeof window === "undefined") return Promise.reject("no window");
  if (window.paypal) return Promise.resolve(window.paypal);
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>("script[data-paypal-sdk]");
    if (existing) {
      existing.addEventListener("load", () => resolve(window.paypal));
      existing.addEventListener("error", reject);
      return;
    }
    const s = document.createElement("script");
    s.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(PAYPAL_CLIENT_ID)}&currency=${currency}&intent=capture`;
    s.async = true;
    s.dataset.paypalSdk = "true";
    s.onload = () => resolve(window.paypal);
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

function CheckoutPage() {
  const { detailed, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const shipping = subtotal > 0 ? 250 : 0;
  const total = subtotal + shipping;
  const [placed, setPlaced] = useState(false);
  const [paypalError, setPaypalError] = useState<string | null>(null);
  const paypalRef = useRef<HTMLDivElement>(null);

  const finalize = (method: string) => {
    console.log("Order placed via", method);
    setPlaced(true);
    clear();
    setTimeout(() => navigate({ to: "/" }), 3600);
  };

  useEffect(() => {
    if (placed || total <= 0 || !paypalRef.current) return;
    let cancelled = false;
    let buttonsInstance: any;
    loadPayPalSdk("USD")
      .then((paypal) => {
        if (cancelled || !paypal || !paypalRef.current) return;
        paypalRef.current.innerHTML = "";
        buttonsInstance = paypal.Buttons({
          style: { layout: "vertical", color: "gold", shape: "rect", label: "paypal", height: 48 },
          createOrder: (_data: any, actions: any) =>
            actions.order.create({
              purchase_units: [{
                amount: { value: total.toFixed(2), currency_code: "USD" },
                description: `Aurelis Horology — ${detailed.length} item(s)`,
              }],
            }),
          onApprove: async (_data: any, actions: any) => {
            try {
              const order = await actions.order.capture();
              console.log("PayPal capture", order);
              finalize("paypal");
            } catch (err) {
              console.error(err);
              setPaypalError("Payment capture failed. Please try again.");
            }
          },
          onError: (err: any) => {
            console.error(err);
            setPaypalError("PayPal encountered an error. Please try card instead.");
          },
        });
        buttonsInstance.render(paypalRef.current).catch((e: any) => console.error(e));
      })
      .catch(() => setPaypalError("Could not load PayPal. Check your connection."));
    return () => { cancelled = true; try { buttonsInstance?.close?.(); } catch {} };
  }, [total, placed, detailed.length]);

  if (placed) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6 pt-32 text-center">
        <div>
          <div className="text-[10px] tracking-[0.4em] text-gold">ORDER CONFIRMED</div>
          <h1 className="mt-4 font-display text-5xl">Thank you.</h1>
          <p className="mt-4 text-muted-foreground">Your Aurelis is being prepared with the utmost care.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-32">
      <section className="mx-auto max-w-6xl px-6">
        <div className="text-[10px] tracking-[0.4em] text-gold">SECURE CHECKOUT</div>
        <h1 className="mt-4 font-display text-5xl md:text-6xl">Checkout</h1>
        <div className="divider-gold my-12" />

        <div className="grid gap-14 lg:grid-cols-[1fr_400px]">
          <form
            onSubmit={(e) => { e.preventDefault(); finalize("card"); }}
            className="space-y-10"
          >
            <Section title="Contact">
              <Field label="Full Name" name="name" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="Phone Number" name="phone" required />
            </Section>
            <Section title="Shipping Address">
              <Field label="Country" name="country" required />
              <Field label="City" name="city" required />
              <Field label="Address" name="address" full required />
              <Field label="Postal Code" name="postal" required />
            </Section>
            <Section title="Payment">
              <div className="col-span-2 space-y-4">
                <div className="rounded-sm border border-gold/30 bg-charcoal/40 p-4">
                  <div className="mb-3 text-[10px] tracking-[0.3em] text-gold">PAY WITH PAYPAL</div>
                  {total > 0 ? (
                    <div ref={paypalRef} className="min-h-[52px]" />
                  ) : (
                    <div className="text-xs text-muted-foreground">Add items to your bag to enable PayPal.</div>
                  )}
                  {paypalError && (
                    <div className="mt-2 text-xs text-red-400">{paypalError}</div>
                  )}
                  <p className="mt-3 text-center text-[10px] tracking-[0.25em] text-muted-foreground">
                    SECURE · ENCRYPTED · TRUSTED
                  </p>
                </div>

                <div className="flex items-center gap-3 text-[10px] tracking-[0.3em] text-muted-foreground">
                  <div className="h-px flex-1 bg-border" /> OR PAY BY CARD <div className="h-px flex-1 bg-border" />
                </div>
                <Field label="Card Number" name="card" full />
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Expiry (MM/YY)" name="exp" />
                  <Field label="CVC" name="cvc" />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gold-gradient py-4 text-xs font-semibold tracking-[0.3em] text-onyx transition hover:scale-[1.01]"
                >
                  PLACE ORDER · {formatPrice(total)}
                </button>
              </div>
            </Section>
          </form>

          <aside className="h-fit border border-border bg-charcoal/40 p-8">
            <div className="text-[10px] tracking-[0.3em] text-gold">ORDER SUMMARY</div>
            <div className="mt-6 space-y-4">
              {detailed.map(({ product, qty }) => (
                <div key={product.id} className="flex gap-3">
                  <img src={product.image} alt={product.name} className="h-16 w-16 rounded-sm object-cover" />
                  <div className="flex-1">
                    <div className="text-sm">{product.name}</div>
                    <div className="text-xs text-muted-foreground">Qty {qty}</div>
                  </div>
                  <div className="text-sm text-gold">{formatPrice(product.price * qty)}</div>
                </div>
              ))}
              {detailed.length === 0 && (
                <div className="text-sm text-muted-foreground">
                  Your bag is empty. <Link to="/collections" className="text-gold">Browse.</Link>
                </div>
              )}
            </div>
            <div className="mt-6 space-y-2 border-t border-border pt-6 text-sm text-muted-foreground">
              <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>{formatPrice(shipping)}</span></div>
              <div className="mt-3 flex justify-between font-display text-lg text-foreground">
                <span>Total</span><span>{formatPrice(total)}</span>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-6 font-display text-2xl">{title}</h2>
      <div className="grid grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

function Field({ label, name, type = "text", full, required }: { label: string; name: string; type?: string; full?: boolean; required?: boolean }) {
  return (
    <label className={`block ${full ? "col-span-2" : ""}`}>
      <span className="text-[10px] tracking-[0.3em] text-muted-foreground">{label.toUpperCase()}</span>
      <input
        type={type}
        name={name}
        required={required}
        className="mt-2 w-full border border-border bg-transparent px-4 py-3 text-sm focus:border-gold focus:outline-none"
      />
    </label>
  );
}
