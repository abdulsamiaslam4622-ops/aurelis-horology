import { Link } from "@tanstack/react-router";

const dev = [
  { label: "Portfolio", href: "https://6a4b3fdd1749878b7ea9c5d6--glowing-mooncake-e46788.netlify.app/" },
  { label: "GitHub", href: "https://github.com/abdulsamiaslam4622-ops" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/abdul-sami-aa0381388/" },
  { label: "WhatsApp", href: "https://wa.me/923370437883" },
  { label: "Gmail", href: "mailto:abdulsamiaslam.4622@gmail.com" },
];

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border/60 bg-onyx/60 pb-10 pt-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-14 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="font-display text-3xl tracking-[0.2em] text-gold-gradient">AURELIS</div>
            <div className="mt-1 text-[10px] tracking-[0.4em] text-muted-foreground">HOROLOGY · GENEVA</div>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
              Exceptional timepieces engineered in Switzerland. Each Aurelis is finished by a single master watchmaker
              and delivered with a lifetime guarantee.
            </p>
          </div>
          <div>
            <h4 className="mb-5 text-[10px] tracking-[0.3em] text-gold">MAISON</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/collections" className="hover:text-gold">Collections</Link></li>
              <li><Link to="/limited" className="hover:text-gold">Limited Edition</Link></li>
              <li><Link to="/story" className="hover:text-gold">Our Story</Link></li>
              <li><Link to="/craftsmanship" className="hover:text-gold">Craftsmanship</Link></li>
              <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-5 text-[10px] tracking-[0.3em] text-gold">CLIENT SERVICES</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>Global Shipping</li>
              <li>Lifetime Guarantee</li>
              <li>Servicing & Repair</li>
              <li>Private Viewings</li>
            </ul>
          </div>
        </div>

        <div className="divider-gold my-14" />

        <div className="rounded-sm border border-border/60 bg-charcoal/60 p-8">
          <div className="text-center">
            <div className="text-[10px] tracking-[0.4em] text-gold">DESIGNED & DEVELOPED BY</div>
            <div className="mt-2 font-display text-2xl tracking-[0.15em] text-gold-gradient">ABDUL SAMI</div>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {dev.map((d) => (
              <a
                key={d.label}
                href={d.href}
                target="_blank"
                rel="noreferrer"
                className="text-xs uppercase tracking-[0.25em] text-muted-foreground transition hover:text-gold"
              >
                {d.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 text-xs text-muted-foreground sm:flex-row">
          <div>© {new Date().getFullYear()} Aurelis Horology SA. All rights reserved.</div>
          <div className="tracking-[0.2em]">SWISS MADE · SINCE 1962</div>
        </div>
      </div>
    </footer>
  );
}
