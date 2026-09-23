import Link from "next/link";
import { Reveal, Eyebrow } from "@/components/home";
import {
  ATELIER_CUTTING,
  ATELIER_CHECK,
  ATELIER_FITTING,
} from "@/lib/products";
import { IconArrowRight, IconScissors, IconThread, IconRuler, IconPin } from "@/components/icons";

const TIMELINE = [
  {
    year: "1934",
    text: "Arthur Hartwell opens a single room on Mayfair with two tailors, one press, and a standard he never lowers.",
  },
  {
    year: "1952",
    text: "The first made-to-measure ledger is bound in green leather. It is still in use; so is his first client.",
  },
  {
    year: "1968",
    text: "The house moves to No. 1 Mayfair — the address it has kept, unbroken, ever since.",
  },
  {
    year: "1987",
    text: "The leather workshop joins the tailoring floor, and every briefcase, card case and glove is born under one roof.",
  },
  {
    year: "2011",
    text: "The fourth generation takes the bench. The cloth is new; the half-inch is not a tradition but a rule.",
  },
  {
    year: "2026",
    text: "Six collections, one standard. The house ships to forty countries and still fits by the hand.",
  },
];

const VALUES = [
  {
    icon: IconScissors,
    title: "The Hand",
    text: "Lapels padded, buttonholes finished and hems turned by people who have done nothing else for a lifetime. Machines assist; they never decide.",
  },
  {
    icon: IconThread,
    title: "The Cloth",
    text: "English flannels, Italian super-fines and Egyptian cotton — bought from three mills the family has shopped at for decades, and nothing anonymous.",
  },
  {
    icon: IconRuler,
    title: "The Fitting",
    text: "Every suit is cut on the half-inch to your measure. First fitting within the week, second when you are ready. The garment is finished when you are.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Opening */}
      <section className="relative overflow-hidden bg-charcoal">
        <img
          src={ATELIER_CUTTING}
          alt="The Hartwell & Co. cutting table"
          className="animate-kenburns absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/60 to-charcoal/70" />
        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-44 sm:pt-52">
          <Reveal>
            <Eyebrow tone="cream" className="text-gold">
              Discover the House
            </Eyebrow>
            <h1 className="mt-6 max-w-3xl font-display text-5xl font-medium leading-[1.05] text-alabaster sm:text-7xl">
              Ninety years,
              <br />
              <span className="italic text-gold-pale">one address, one standard.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base font-light leading-relaxed text-alabaster/75">
              Hartwell &amp; Co. has dressed the men of this city since 1934 —
              the barrister and the banker, the cellist and the captain. What
              has changed is the fabric. What has not is the method, the
              patience, and the address.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Story + image */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 sm:py-28 lg:grid-cols-2">
        <Reveal>
          <div className="relative">
            <div className="overflow-hidden">
              <img
                src={ATELIER_FITTING}
                alt="A fitting in progress"
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -left-4 hidden w-56 overflow-hidden border-4 border-cream shadow-xl sm:block lg:-left-10">
              <img
                src={ATELIER_CHECK}
                alt="A blazer on the fitting stand"
                loading="lazy"
                decoding="async"
                className="aspect-square w-full object-cover"
              />
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <Eyebrow>The Story</Eyebrow>
          <h2 className="mt-5 font-display text-4xl font-medium leading-tight text-ink sm:text-5xl">
            It began with a room,
            <br />
            <span className="italic text-gold-deep">and a rule.</span>
          </h2>
          <div className="mt-7 space-y-5 text-[15px] font-light leading-relaxed text-ink-soft">
            <p>
              The rule was simple: a garment leaves the house only when its
              maker would wear it. Arthur Hartwell, a quiet man of few
              sentences, kept it for forty-one years. His sons kept it for
              thirty-five after. The tailors who work the floor today were
              taught it by the men who were taught it by Arthur.
            </p>
            <p>
              We are not the biggest house in London, and we do not intend to
              be. We are the one that remembers how a lapel is padded, how a
              trouser is pressed, and how a client should be greeted — by
              name, with tea, and without a queue.
            </p>
          </div>
          <div className="mt-9 flex flex-wrap gap-8 border-t border-line pt-7">
            {[
              ["41", "Years at the bench, the first master"],
              ["4th", "Generation of Hartwell tailors"],
              ["1,900+", "Made-to-measure ledgers bound"],
            ].map(([n, l]) => (
              <div key={l}>
                <p className="font-display text-4xl text-gold-deep">{n}</p>
                <p className="mt-1 max-w-[16ch] text-[10px] uppercase tracking-[0.2em] text-mist">
                  {l}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Values */}
      <section className="border-y border-line bg-cream-deep">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <Reveal className="mb-14 text-center">
            <p className="text-[10px] uppercase tracking-[0.4em] text-gold-deep">
              The Method
            </p>
            <h2 className="mt-4 font-display text-4xl font-medium text-ink sm:text-5xl">
              Three things we <span className="italic">refuse</span> to hurry.
            </h2>
          </Reveal>
          <div className="grid gap-px bg-line md:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.12} className="bg-cream">
                <div className="group h-full p-10 transition-colors duration-500 hover:bg-cream-deep">
                  <v.icon className="h-9 w-9 text-gold-deep" />
                  <h3 className="mt-6 font-display text-2xl text-ink">
                    {v.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                    {v.text}
                  </p>
                  <span className="mt-6 block h-px w-10 bg-gold transition-all duration-700 group-hover:w-20" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-4xl px-6 py-24">
        <Reveal className="mb-14">
          <Eyebrow>A Century, Kept</Eyebrow>
          <h2 className="mt-5 font-display text-4xl font-medium text-ink sm:text-5xl">
            The house, <span className="italic text-gold-deep">year by year.</span>
          </h2>
        </Reveal>
        <div className="relative border-l border-line pl-10 sm:pl-14">
          {TIMELINE.map((t, i) => (
            <Reveal key={t.year} delay={i * 0.05} className="relative pb-12 last:pb-0">
              <span className="absolute -left-[45px] top-1.5 flex h-4 w-4 items-center justify-center sm:-left-[63px]">
                <span className="absolute h-4 w-4 rotate-45 border border-gold bg-cream" />
                <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
              </span>
              <p className="font-display text-3xl text-gold-deep">{t.year}</p>
              <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-ink-soft">
                {t.text}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Visit */}
      <section className="border-t border-line bg-charcoal">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 sm:py-24 lg:grid-cols-3">
          <Reveal>
            <div className="flex h-full flex-col justify-between gap-8 border border-alabaster/15 p-9">
              <div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-gold">
                  The Atelier
                </p>
                <p className="mt-4 font-display text-3xl leading-snug text-alabaster">
                  No. 1 Mayfair
                  <br />
                  London W1K 2QT
                </p>
              </div>
              <div className="flex items-start gap-3 text-sm text-alabaster/60">
                <IconPin className="mt-0.5 h-5 w-5 text-gold" />
                <p>
                  Two minutes from the Green Park tube.
                  <br />
                  Look for the green door.
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col justify-between gap-8 border border-alabaster/15 p-9">
              <div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-gold">
                  Hours
                </p>
                <p className="mt-4 font-display text-3xl leading-snug text-alabaster">
                  10:00 – 18:00
                  <br />
                  Monday to Saturday
                </p>
              </div>
              <p className="text-sm text-alabaster/60">
                Fittings and made-to-measure consultations by appointment
                only. The shop floor is open to all, tea included.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex h-full flex-col justify-between gap-8 border border-alabaster/15 p-9">
              <div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-gold">
                  The Concierge
                </p>
                <p className="mt-4 font-display text-3xl leading-snug text-alabaster">
                  +44 (0)20 7946 0934
                </p>
              </div>
              <div>
                <p className="text-sm text-alabaster/60">
                  support@hartwell-luxury.com
                </p>
                <Link
                  href="/collection"
                  className="btn-sheen group mt-6 inline-flex w-full items-center justify-center gap-3 bg-gold px-8 py-4 text-[11px] font-medium uppercase tracking-[0.3em] text-charcoal transition-colors hover:bg-gold-pale"
                >
                  Shop the Collection
                  <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
