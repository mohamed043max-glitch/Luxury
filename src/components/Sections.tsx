"use client";

import { useReveal } from "@/lib/useReveal";
import { useStore } from "@/lib/store";

export function Atelier() {
  const revealRef = useReveal<HTMLElement>();
  return (
    <section id="atelier" ref={revealRef} className="reveal py-24 md:py-36">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
        <div>
          <div className="text-[10px] tracking-[0.5em] uppercase text-gold-deep mb-4 font-medium">
            The Atelier
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-ink leading-tight mb-8">
            Made in England.
            <br />
            <em className="text-gold-deep">Worn the world over.</em>
          </h2>
          <p className="text-sm md:text-base text-graphite leading-relaxed font-light mb-6">
            Every Hartwell &amp; Co. garment begins life in our Mayfair studio,
            where our head cutter drafts each pattern by hand. From there, the
            work travels to the finest workshops in Savile Row, Northampton and
            the Scottish borders — makers whose own histories stretch back
            centuries.
          </p>
          <p className="text-sm md:text-base text-graphite leading-relaxed font-light mb-10">
            We do not chase seasons. We make clothes that outlast them.
          </p>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="text-[10px] tracking-[0.4em] uppercase text-gold-deep mb-2 font-medium">
                Materials
              </div>
              <div className="font-serif text-base text-ink leading-snug">
                Sourced from mills in Yorkshire, Biella and the Scottish
                Highlands.
              </div>
            </div>
            <div>
              <div className="text-[10px] tracking-[0.4em] uppercase text-gold-deep mb-2 font-medium">
                Craft
              </div>
              <div className="font-serif text-base text-ink leading-snug">
                Over eighty hours of handwork in every signature suit.
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-[4/5] overflow-hidden">
            <img
              src="/collection-tailoring.jpg"
              alt="The Hartwell atelier"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 bg-ink text-cream p-6 md:p-8 max-w-[240px]">
            <div className="text-[9px] tracking-[0.4em] uppercase text-gold mb-2 font-medium">
              Est. 1934
            </div>
            <div className="font-serif text-lg leading-snug">
              &ldquo;A gentleman is known by his tailor.&rdquo;
            </div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-cream/60 mt-3">
              — E. Hartwell, Founder
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Makers() {
  const revealRef = useReveal<HTMLElement>();
  const makers = [
    {
      name: "Vitale Barberis Canonico",
      place: "Biella, Italy · est. 1663",
      craft: "Super 150s worsteds for our signature suits.",
    },
    {
      name: "Fox Brothers",
      place: "Wellington, Somerset · est. 1772",
      craft: "Chalkstripe flannels woven on the River Tone.",
    },
    {
      name: "Johnstons of Elgin",
      place: "Hawick, Scotland · est. 1797",
      craft: "Two-ply cashmere and our registered tartan.",
    },
    {
      name: "J. & F.J. Baker",
      place: "Colyton, Devon · est. 1862",
      craft: "England's last commercial oak-bark tannery.",
    },
    {
      name: "Halley Stevensons",
      place: "Dundee, Scotland · est. 1864",
      craft: "Waxed cotton for our field jackets.",
    },
    {
      name: "Turnbull & Asser",
      place: "Jermyn Street, London",
      craft: "Benchmarks for our shirting construction.",
    },
  ];
  return (
    <section ref={revealRef} className="reveal py-24 md:py-32 bg-cream">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <div className="text-center mb-16">
          <div className="text-[10px] tracking-[0.5em] uppercase text-gold-deep mb-4 font-medium">
            The Makers
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-ink leading-tight max-w-2xl mx-auto">
            A house built on <em className="text-gold-deep">other houses.</em>
          </h2>
          <p className="text-sm text-graphite font-light max-w-xl mx-auto mt-6">
            Every Hartwell garment is realised in partnership with mills and
            workshops whose own histories predate ours — often by centuries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gold/20 border border-gold/20">
          {makers.map((m) => (
            <div key={m.name} className="bg-cream dark:bg-[#151820] p-8 md:p-10">
              <div className="font-serif text-xl text-ink dark:text-[#fbf9f5] mb-1">{m.name}</div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-gold-deep dark:text-gold mb-4 font-medium">
                {m.place}
              </div>
              <p className="text-sm text-graphite dark:text-[#b0b4be] font-light leading-relaxed">
                {m.craft}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PriceGuide() {
  const revealRef = useReveal<HTMLElement>();
  const bands = [
    {
      label: "The Essentials",
      range: "£45 – £495",
      items: "Socks, ties, shirts, grooming, fragrances",
    },
    {
      label: "The Foundation",
      range: "£595 – £1,295",
      items: "Knitwear, leather goods, shoes, travel",
    },
    {
      label: "The Signature",
      range: "£1,395 – £2,595",
      items: "Outerwear, briefcases, suits, holdalls",
    },
    {
      label: "The Heirloom",
      range: "£3,195 – £24,500",
      items: "Dinner suits, cashmere overcoats, Swiss watches",
    },
  ];
  return (
    <section ref={revealRef} className="reveal py-24 md:py-32 bg-ink text-cream">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="text-center mb-16">
          <div className="text-[10px] tracking-[0.5em] uppercase text-gold mb-4 font-medium">
            The Investment
          </div>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight max-w-2xl mx-auto">
            Priced as <em className="gold-shimmer">made.</em>
          </h2>
          <p className="text-sm text-cream/70 font-light max-w-xl mx-auto mt-6">
            Every price reflects the cost of British and Italian craftsmanship —
            no discounting, no outlet, no compromise.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bands.map((b) => (
            <div
              key={b.label}
              className="border border-gold/30 p-6 md:p-8 text-center hover:border-gold transition-colors duration-500"
            >
              <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-4 font-medium">
                {b.label}
              </div>
              <div className="font-serif text-3xl md:text-4xl text-cream mb-4 gold-shimmer">
                {b.range}
              </div>
              <p className="text-xs text-cream/70 font-light leading-relaxed">
                {b.items}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Marquee() {
  const items = [
    "Bespoke Tailoring",
    "Mayfair · London",
    "Est. MCMXXXIV",
    "Hand-Cut in England",
    "Savile Row Tradition",
    "Northampton Shoemaking",
    "Scottish Cashmere",
    "Italian Shirting",
    "Swiss Horology",
    "Grasse Fragrance",
    "58 Pieces · 12 Collections",
    "Free UK Delivery",
  ];
  const row = [...items, ...items];

  return (
    <div className="py-10 border-y border-gold/20 bg-cream-warm overflow-hidden">
      <div className="marquee flex gap-16 whitespace-nowrap">
        {row.map((t, i) => (
          <div key={i} className="flex items-center gap-16">
            <span className="font-serif text-2xl md:text-3xl text-ink italic">
              {t}
            </span>
            <span className="w-2 h-2 bg-gold rotate-45" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Newsletter() {
  const revealRef = useReveal<HTMLElement>();
  return (
    <section ref={revealRef} className="reveal py-24 md:py-36 bg-ink text-cream">
      <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
        <div className="text-[10px] tracking-[0.5em] uppercase text-gold mb-4 font-medium">
          The House Journal
        </div>
        <h2 className="font-serif text-4xl md:text-6xl mb-6 leading-tight">
          Letters from <em className="gold-shimmer">Mayfair.</em>
        </h2>
        <p className="text-cream/70 font-light mb-10 max-w-xl mx-auto">
          A considered dispatch on new collections, atelier notes, and the art
          of dressing well. Never more than twice a month.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const input = (e.currentTarget.elements.namedItem("email") as HTMLInputElement);
            input.value = "";
            alert("Thank you — your first letter is on its way.");
          }}
          className="flex flex-col sm:flex-row gap-0 max-w-lg mx-auto border-b border-gold"
        >
          <input
            name="email"
            type="email"
            placeholder="your.email@example.com"
            required
            className="flex-1 bg-transparent px-0 py-4 text-cream placeholder:text-cream/40 focus:outline-none text-sm tracking-wider"
          />
          <button
            type="submit"
            className="text-[10px] tracking-[0.4em] uppercase text-gold hover:text-cream transition-colors font-medium py-4 sm:pl-6 sm:border-l border-gold"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}

export function Footer() {
  const { openTracking, openAuth, user } = useStore();
  return (
    <footer className="bg-cream dark:bg-[#0c0d11] text-ink dark:text-[#f3f0e8] pt-20 pb-8 border-t border-gold/20">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-16">
          <div className="md:col-span-2">
            <div className="font-serif text-3xl mb-2 text-ink dark:text-[#fbf9f5]">HARTWELL</div>
            <div className="text-[10px] tracking-[0.5em] text-gold-deep dark:text-gold mb-6 font-semibold">
              &amp; CO. &middot; MDCCCXXXIV
            </div>
            <p className="text-sm text-graphite dark:text-[#b0b4be] font-light max-w-sm leading-relaxed">
              Modern British menswear, crafted with heritage and worn with
              confidence. From our Mayfair atelier since 1934.
            </p>
          </div>

          <FooterCol title="The House">
            <FooterLink href="#heritage">Our Heritage</FooterLink>
            <FooterLink href="#atelier">The Atelier</FooterLink>
            <FooterLink href="#collections">Collections</FooterLink>
            <FooterLink href="#">Journal</FooterLink>
          </FooterCol>

          <FooterCol title="Services">
            <button
              onClick={openTracking}
              className="block text-sm text-graphite dark:text-[#b0b4be] hover:text-ink dark:hover:text-gold transition-colors py-1 luxury-link"
            >
              Order Tracking
            </button>
            <FooterLink href="#">Bespoke Commissions</FooterLink>
            <FooterLink href="#">Private Appointments</FooterLink>
            <FooterLink href="#">Alterations</FooterLink>
          </FooterCol>

          <FooterCol title="Contact">
            <div className="text-sm text-graphite dark:text-[#b0b4be] font-light leading-relaxed">
              12 Savile Row
              <br />
              Mayfair, London
              <br />
              W1S 3PR
            </div>
            <a
              href="mailto:concierge@hartwell.co"
              className="block text-sm text-graphite dark:text-[#b0b4be] hover:text-ink dark:hover:text-gold transition-colors py-1 mt-2 luxury-link"
            >
              concierge@hartwell.co
            </a>
            {!user && (
              <button
                onClick={() => openAuth("login")}
                className="block text-sm text-graphite dark:text-[#b0b4be] hover:text-ink dark:hover:text-gold transition-colors py-1 luxury-link"
              >
                Member Sign In
              </button>
            )}
          </FooterCol>
        </div>

        <div className="pt-8 border-t border-gold/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[10px] tracking-[0.3em] uppercase text-graphite dark:text-[#8d929e]">
          <div>© MCMXXXIV–MMXXVI Hartwell &amp; Co. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-ink dark:hover:text-gold transition-colors">Privacy</a>
            <a href="#" className="hover:text-ink dark:hover:text-gold transition-colors">Terms</a>
            <a href="#" className="hover:text-ink dark:hover:text-gold transition-colors">Shipping</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-[10px] tracking-[0.4em] uppercase text-gold-deep mb-5 font-medium">
        {title}
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="block text-sm text-graphite dark:text-[#b0b4be] hover:text-ink dark:hover:text-gold transition-colors py-1 luxury-link"
    >
      {children}
    </a>
  );
}
