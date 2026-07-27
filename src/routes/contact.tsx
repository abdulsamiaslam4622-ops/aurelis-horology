import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Aurelis Horology" },
      { name: "description", content: "Contact the Aurelis Horology maison for private viewings, servicing, and enquiries." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <main className="pt-32">
      <section className="mx-auto max-w-6xl px-6">
        <div className="text-[10px] tracking-[0.4em] text-gold">CONTACT</div>
        <h1 className="mt-4 font-display text-6xl md:text-7xl">Speak with the maison.</h1>
        <div className="divider-gold my-12" />

        <div className="grid gap-14 lg:grid-cols-2">
          <div className="space-y-8">
            <div>
              <div className="text-[10px] tracking-[0.3em] text-gold">ATELIER</div>
              <div className="mt-2 font-display text-2xl">Rue du Rhône 42<br />1204 Geneva, Switzerland</div>
            </div>
            <div>
              <div className="text-[10px] tracking-[0.3em] text-gold">EMAIL</div>
              <a href="mailto:concierge@aurelis-horology.com" className="mt-2 block font-display text-2xl hover:text-gold">
                concierge@aurelis-horology.com
              </a>
            </div>
            <div>
              <div className="text-[10px] tracking-[0.3em] text-gold">WHATSAPP</div>
              <a href="https://wa.me/923370437883" target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-3 border border-gold px-6 py-3 text-xs tracking-[0.3em] text-gold hover:bg-gold hover:text-onyx">
                WHATSAPP CONCIERGE
              </a>
            </div>

            <div className="border-t border-border pt-8">
              <div className="text-[10px] tracking-[0.3em] text-gold">DESIGNED & DEVELOPED BY</div>
              <div className="mt-2 font-display text-3xl text-gold-gradient">Abdul Sami</div>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-[0.25em]">
                <a className="text-muted-foreground hover:text-gold" href="https://6a4b3fdd1749878b7ea9c5d6--glowing-mooncake-e46788.netlify.app/" target="_blank" rel="noreferrer">Portfolio</a>
                <a className="text-muted-foreground hover:text-gold" href="https://github.com/abdulsamiaslam4622-ops" target="_blank" rel="noreferrer">GitHub</a>
                <a className="text-muted-foreground hover:text-gold" href="https://www.linkedin.com/in/abdul-sami-aa0381388/" target="_blank" rel="noreferrer">LinkedIn</a>
                <a className="text-muted-foreground hover:text-gold" href="mailto:abdulsamiaslam.4622@gmail.com">Gmail</a>
              </div>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const f = e.currentTarget as HTMLFormElement;
              const data = new FormData(f);
              const name = String(data.get("name") || "");
              const email = String(data.get("email") || "");
              const subject = String(data.get("subject") || "Aurelis Horology Enquiry");
              const message = String(data.get("message") || "");
              const body = `Name: ${name}%0AEmail: ${email}%0A%0A${encodeURIComponent(message)}`;
              window.location.href = `mailto:abdulsamiaslam.4622@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
              setSent(true);
            }}
            className="border border-border bg-charcoal/40 p-8 space-y-5"
          >
            <Field label="Your Name" name="name" required />
            <Field label="Email" name="email" type="email" required />
            <Field label="Subject" name="subject" />
            <label className="block">
              <span className="text-[10px] tracking-[0.3em] text-muted-foreground">MESSAGE</span>
              <textarea
                name="message"
                rows={6}
                required
                className="mt-2 w-full border border-border bg-transparent px-4 py-3 text-sm focus:border-gold focus:outline-none"
              />
            </label>
            <button className="w-full bg-gold-gradient py-4 text-xs font-semibold tracking-[0.3em] text-onyx transition hover:scale-[1.01]">
              {sent ? "OPENING YOUR MAIL APP…" : "SEND MESSAGE"}
            </button>
            <p className="text-[10px] tracking-[0.25em] text-muted-foreground">
              Your message will open in your email app and be sent to abdulsamiaslam.4622@gmail.com
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-[10px] tracking-[0.3em] text-muted-foreground">{label.toUpperCase()}</span>
      <input name={name} type={type} required={required} className="mt-2 w-full border border-border bg-transparent px-4 py-3 text-sm focus:border-gold focus:outline-none" />
    </label>
  );
}
