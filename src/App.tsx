import aetnaLogo from "./assets/carriers/aetna.png"
import ambetterLogo from "./assets/carriers/ambetter.png"
import americanequityLogo from "./assets/carriers/americanequity.png"
import annexusLogo from "./assets/carriers/annexus.png"
import corebridgeLogo from "./assets/carriers/corebridge.png"
import atheneLogo from "./assets/carriers/athene.png"
import anthemLogo from "./assets/carriers/anthem.png"
import humanaLogo from "./assets/carriers/humana.png"
import pennieLogo from "./assets/carriers/pennie.png"
import wellcareLogo from "./assets/carriers/wellcare.png"
import lincolnLogo from "./assets/carriers/lincoln.png"
import oscarLogo from "./assets/carriers/oscar.png"
import AmeritasLogo from "./assets/carriers/ameritas.png"
import ethosLogo from "./assets/carriers/ethos.png"
import fidelityLogo from "./assets/carriers/fidelity.png"
import nationLogo from "./assets/carriers/nation.png"
import netlawLogo from "./assets/carriers/netlaw.png"
import examLogo from "./assets/carriers/exam.png"
import neishlossLogo from "./assets/carriers/neishloss.png"
import caresourceLogo from "./assets/carriers/care.png"
import molinaLogo from "./assets/carriers/molina.png"

import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps"
import { geoCentroid } from "d3-geo"



const carriers = [
  { name: "Aetna", logo: aetnaLogo },
  { name: "Ambetter", logo: ambetterLogo },
  { name: "AmericanEquity", logo: americanequityLogo },
  { name: "Anthem", logo: anthemLogo },
  { name: "Annexus", logo: annexusLogo },
  { name: "Corebridge", logo: corebridgeLogo },
  { name: "Athene", logo: atheneLogo },
  { name: "Humana", logo: humanaLogo },
  { name: "Pennie", logo: pennieLogo },
  { name: "WellCare", logo: wellcareLogo },
  { name: "Lincoln Financial", logo: lincolnLogo },
  { name: "Oscar", logo: oscarLogo },
  { name: "Ameritas", logo: AmeritasLogo },
  { name: "Ethos", logo: ethosLogo },
  { name: "Fidelity", logo: fidelityLogo },
  { name: "Nationwide", logo: nationLogo },
  { name: "Netlaw", logo: netlawLogo },
  { name: "ExamFX", logo: examLogo },
  { name: "NeishLoss", logo: neishlossLogo },
  { name: "Caresource", logo: caresourceLogo },
  { name: "Molina", logo: molinaLogo },
]

const geoUrl =
  "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json"

  const coveredStates = [
    "42", // Pennsylvania
    "39", // Ohio
    "36", // New York
    "21", // Kentucky
    "26", // Michigan
    "51", // Virginia
    "37", // North Carolina
    "08"  // Colorado
  ]

  const stateAbbr = {
    "01":"AL","02":"AK","04":"AZ","05":"AR","06":"CA","08":"CO","09":"CT","10":"DE",
    "11":"DC","12":"FL","13":"GA","15":"HI","16":"ID","17":"IL","18":"IN","19":"IA",
    "20":"KS","21":"KY","22":"LA","23":"ME","24":"MD","25":"MA","26":"MI","27":"MN",
    "28":"MS","29":"MO","30":"MT","31":"NE","32":"NV","33":"NH","34":"NJ","35":"NM",
    "36":"NY","37":"NC","38":"ND","39":"OH","40":"OK","41":"OR","42":"PA","44":"RI",
    "45":"SC","46":"SD","47":"TN","48":"TX","49":"UT","50":"VT","51":"VA","53":"WA",
    "54":"WV","55":"WI","56":"WY"
  }

  function CoverageMap() {
    return (
      <ComposableMap projection="geoAlbersUsa" className="w-full max-w-4xl mx-auto">
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const isCovered = coveredStates.includes(geo.id)
  
              return (
                <g key={geo.rsmKey}>
                  <Geography
                    geography={geo}
                    fill={isCovered ? "#0284c7" : "#e2e8f0"}
                    stroke="#ffffff"
                    strokeWidth={0.7}
                    style={{
                      default: { outline: "none" },
                      hover: { fill: isCovered ? "#0284c7" : "#d1d5db" },
                      pressed: { outline: "none" }
                    }}
                  />
  
                  {stateAbbr[geo.id] && (
                    <Marker coordinates={geoCentroid(geo)}>
                      <text
                        textAnchor="middle"
                        style={{
                          fontSize: "9px",
                          fill: "#475569",
                          fontWeight: 600,
                          pointerEvents: "none"
                        }}
                      >
                        {stateAbbr[geo.id]}
                      </text>
                    </Marker>
                  )}
                </g>
              )
            })
          }
        </Geographies>
      </ComposableMap>
    )
  }


function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-10 py-6 lg:px-12">
          <div className="flex items-center gap-2">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-sky-600 text-white">
              <span className="text-lg font-semibold">D</span>
            </div>
            <div>
              <div className="text-base font-semibold tracking-tight text-slate-900">
                Dahal Agency LLC
              </div>
              <div className="text-xs text-slate-500">
                Independent Insurance Professionals
              </div>
            </div>
          </div>
          <nav className="flex items-center gap-8 text-base font-medium text-slate-700">
          <a href="#services" className="relative hover:text-sky-600 transition after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-sky-600 hover:after:w-full after:transition-all"
  >
  Services
</a>

<a href="#carriers" className="relative hover:text-sky-600 transition after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-sky-600 hover:after:w-full after:transition-all"
  >
  Our Carriers
</a>
<a
  href="#coverage"
  className="relative hover:text-sky-600 transition after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-sky-600 hover:after:w-full after:transition-all"
>
  Coverage
</a>
<a href="#consultation" className="relative hover:text-sky-600 transition after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-sky-600 hover:after:w-full after:transition-all"
  >
  Book a Consultation
</a>

<a href="#contact" className="relative hover:text-sky-600 transition after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-sky-600 hover:after:w-full after:transition-all"
  >
  Contact
</a>
<a
  href="tel:7178916504"
  className="bg-sky-600 text-white px-6 py-3 rounded-full text-base font-semibold shadow-md hover:bg-sky-700 transition"
>
  (717) 891-6504
</a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pt-16">
        {/* Hero Section */}
        <section
          aria-labelledby="hero-title"
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-900 via-sky-800 to-slate-900 px-6 py-12 text-white shadow-xl sm:px-10 lg:px-14"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-24 top-10 h-40 w-40 rounded-full bg-sky-500/20 blur-3xl" />
            <div className="absolute -right-10 bottom-0 h-44 w-44 rounded-full bg-sky-300/10 blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_55%)]" />
          </div>

          <div className="relative grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2.25fr)] lg:items-center">
            <div className="space-y-6 animate-fade-in-up">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-200">
                Trusted Independent Insurance Agency
              </p>
              <h1
                id="hero-title"
                className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
              >
                Protecting What Matters Most
              </h1>
              <p className="max-w-xl text-sm text-sky-100 sm:text-base">
                Dahal Agency LLC partners with leading national carriers to
                provide personalized life and health insurance solutions—so you
                can protect your family, your income, and your future with
                confidence.
              </p>
              <ul className="grid gap-2 text-xs text-sky-100/90 sm:grid-cols-2 sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="mt-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-sky-500/20 text-[10px]">
                    ✓
                  </span>
                  Tailored plans for families, individuals, and small
                  businesses
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-sky-500/20 text-[10px]">
                    ✓
                  </span>
                  Access to multiple A-rated carriers—not just one company
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-sky-500/20 text-[10px]">
                    ✓
                  </span>
                  Guidance on coverage, premiums, and benefits in plain
                  language
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-sky-500/20 text-[10px]">
                    ✓
                  </span>
                  Ongoing support when life changes or claims arise
                </li>
              </ul>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#booking"
                  className="inline-flex items-center justify-center rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-sky-900/40 transition hover:-translate-y-0.5 hover:bg-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
                >
                  Book a Consultation
                </a>
                <a
                  href="#contact"
                  className="text-xs font-medium text-sky-100 underline-offset-4 hover:text-white sm:text-sm"
                >
                  Have questions? Talk to an advisor
                </a>
              </div>
            </div>

            <div className="relative hidden h-full min-h-[260px] rounded-2xl border border-sky-200/15 bg-white/5 p-5 shadow-inner shadow-sky-950/40 backdrop-blur-sm lg:block">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-medium text-sky-100">
                    Personalized Coverage Snapshot
                  </p>
                  <p className="text-[11px] text-sky-200/80">
                    See how we layer protection for your household.
                  </p>
                </div>
                <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-200 ring-1 ring-emerald-400/30">
                  Licensed & Independent
                </span>
              </div>
              <dl className="grid grid-cols-2 gap-4 text-xs text-sky-100/90">
                <div className="rounded-xl bg-slate-900/40 p-3 ring-1 ring-sky-700/40">
                  <dt className="text-[11px] font-medium text-slate-100">
                    Life Insurance
                  </dt>
                  <dd className="mt-1 space-y-1.5 text-[11px]">
                    <p>Income replacement, mortgage protection, and legacy planning built around your budget.</p>
                  </dd>
                </div>
                <div className="rounded-xl bg-slate-900/40 p-3 ring-1 ring-sky-700/40">
                  <dt className="text-[11px] font-medium text-slate-100">
                    Health Coverage
                  </dt>
                  <dd className="mt-1 space-y-1.5 text-[11px]">
                    <p>Marketplace, Medicare, and supplemental options to keep your healthcare affordable.</p>
                  </dd>
                </div>
                <div className="col-span-2 rounded-xl bg-slate-900/40 p-3 ring-1 ring-sky-700/40">
                  <dt className="flex items-center justify-between text-[11px] font-medium text-slate-100">
                    Why work with an agency?
                    <span className="rounded-full bg-sky-500/20 px-2 py-0.5 text-[10px] font-semibold text-sky-100">
                      No extra cost
                    </span>
                  </dt>
                  <dd className="mt-1 text-[11px] text-sky-100/90">
                    We shop multiple carriers for you, explain your options, and help you enroll—at no additional cost
                    compared to going direct.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* Carriers Section */}
        <section
          id="carriers"
          aria-labelledby="carriers-title"
          className="mt-14 space-y-4"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2
                id="carriers-title"
                className="text-sm font-semibold tracking-tight text-slate-900 sm:text-base"
              >
                Our Carrier Partners
              </h2>
              <p className="max-w-xl text-xs text-slate-600 sm:text-sm">
                Dahal Agency LLC works with a broad network of respected
                insurance carriers to match you with coverage that fits your
                needs and budget.
              </p>
            </div>
            <p className="text-[11px] text-slate-500 sm:text-xs">
              Logos for illustration only. Availability may vary by state and
              product line.
            </p>
          </div>
          <div className="flex justify-end gap-2 mb-2">
</div>
          <div className="relative mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white py-4 shadow-sm">
          <button
  onClick={() =>
    document.getElementById("carrier-scroll")?.scrollBy({
      left: -300,
      behavior: "smooth",
    })
  }
  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 backdrop-blurbg-white/90 backdrop-blur shadow-md border border-slate-200 hover:bg-slate-100"
>
  ‹
</button>
<button
  onClick={() =>
    document.getElementById("carrier-scroll")?.scrollBy({
      left: 300,
      behavior: "smooth",
    })
  }
  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md border border-slate-200 hover:bg-slate-100"
>
  ›
</button>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white" />
            <div id="carrier-scroll" className="flex gap-6 overflow-x-auto scroll-smooth px-12">
              <div className="flex animate-marquee gap-6 pr-6">
              {carriers.concat(carriers).map((carrier, index) => (
  <div
    key={`${carrier.name}-${index}`}
    className="flex items-center justify-center min-w-[160px] h-[80px] rounded-xl border border-slate-200 bg-white px-4 py-2 shadow-sm"
  >
    <img
  src={carrier.logo}
  alt={carrier.name}
  className="max-h-[100px] w-auto object-contain"
/>
  </div>
))}
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section
          id="services"
          aria-labelledby="services-title"
          className="mt-16 space-y-6"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2
                id="services-title"
                className="text-sm font-semibold tracking-tight text-slate-900 sm:text-base"
              >
                Insurance Services
              </h2>
              <p className="max-w-xl text-xs text-slate-600 sm:text-sm">
                Whether you&apos;re protecting income, planning for the
                unexpected, or navigating the health marketplace, we&apos;ll
                walk you through your options step by step.
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <article className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-md">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-600/10 text-sky-700">
                  <span className="text-lg">❤</span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold tracking-tight text-slate-900">
                    Life Insurance
                  </h3>
                  <p className="text-[11px] text-slate-500 sm:text-xs">
                    Term, permanent, and final expense coverage
                  </p>
                </div>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-slate-600 sm:text-sm">
                Protect the people who rely on your income with coverage
                tailored to your stage of life. We help you compare term and
                permanent options, understand riders, and right-size protection
                for your mortgage, debt, education, and legacy goals.
              </p>
              <ul className="mt-3 grid gap-2 text-[11px] text-slate-600 sm:text-xs">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-500/70" />
                  Coverage strategies for young families, dual-income
                  households, and single-earner homes
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-500/70" />
                  Guidance on layering term policies around major milestones
                  like home purchases and college
                </li>
              </ul>
            </article>

            <article className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-md">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-600/10 text-sky-700">
                  <span className="text-lg">➕</span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold tracking-tight text-slate-900">
                    Health Insurance
                  </h3>
                  <p className="text-[11px] text-slate-500 sm:text-xs">
                    Marketplace, Medicare, and supplemental plans
                  </p>
                </div>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-slate-600 sm:text-sm">
                We simplify the health insurance process—from eligibility and
                subsidies to enrollment and renewals. We work with marketplace
                plans, Medicare Advantage and supplements, and private options
                to help keep your healthcare predictable and affordable.
              </p>
              <ul className="mt-3 grid gap-2 text-[11px] text-slate-600 sm:text-xs">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-500/70" />
                  Support with plan comparisons, networks, and prescription
                  coverage
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-500/70" />
                  Annual reviews to make sure your plan still fits as life
                  changes
                </li>
              </ul>
            </article>
          </div>
        </section>

{/* Coverage Map Section */}

<section
  id="coverage"
  aria-labelledby="coverage-title"
  className="mt-16 space-y-6"
>

<h2 className="text-xl font-semibold text-slate-900">
  States We Serve
</h2>

<div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-lg space-y-6">

<CoverageMap />

<p className="text-sm text-slate-600 text-center">
  Currently serving clients in{" "}
  <span className="text-sky-700 font-semibold tracking-wide">
    PA · OH · NY · KY · MI · VA · NC · CO
  </span>
</p>

</div>
</section>

        {/* Booking Section */}
        <section
          id="booking"
          aria-labelledby="booking-title"
          className="mt-16 space-y-5"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2
                id="booking-title"
                className="text-sm font-semibold tracking-tight text-slate-900 sm:text-base"
              >
                Schedule a Free Consultation
              </h2>
              <p className="max-w-xl text-xs text-slate-600 sm:text-sm">
                Choose a time that works for you to speak with a licensed agent
                about your life or health insurance needs. No obligation and no
                pressure—just clear answers.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 bg-slate-50/80 px-4 py-3 sm:px-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-medium text-slate-800 sm:text-sm">
                  Online Calendar
                </p>
                <p className="text-[11px] text-slate-500 sm:text-xs">
                  Integrated with our secure scheduling system.
                </p>
              </div>
            </div>
            <div className="bg-slate-900/3 px-3 pb-4 pt-3 sm:px  -">
              <div className="relative min-h-[420px] w-full overflow-hidden rounded-xl border border-slate-200/80 bg-white">
                <iframe
                  title="Book a consultation with Dahal Agency LLC"
                  src="https://calendly.com/contact-dahalagency/consultation"
                  className="h-[750px] w-full border-0"
                />
                
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          aria-labelledby="contact-title"
          className="mt-30 grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]"
        >
          <div className="space-y-5">
            <div>
              <h2
                id="contact-title"
                className="text-sm font-semibold tracking-tight text-slate-900 sm:text-base"
              >
                Contact Dahal Agency LLC
              </h2>
              <p className="max-w-xl text-xs text-slate-600 sm:text-sm">
                Send us a message and a licensed agent will follow up to answer
                your questions or prepare a personalized quote.
              </p>
            </div>

            <form
              className="space-y-4 rounded-2xl border border-slate-200 bg-white p-10 shadow-sm"
              onSubmit={(event) => {
                event.preventDefault()
                alert(
                  'Thank you for reaching out to Dahal Agency LLC. A representative will contact you shortly.'
                )
              }}
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label
                    htmlFor="name"
                    className="text-xs font-medium text-slate-700"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="block w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 shadow-sm outline-none ring-sky-500/0 transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200 sm:text-sm"
                    placeholder="Jane Doe"
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="email"
                    className="text-xs font-medium text-slate-700"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="block w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 shadow-sm outline-none ring-sky-500/0 transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200 sm:text-sm"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label
                    htmlFor="phone"
                    className="text-xs font-medium text-slate-700"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="block w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 shadow-sm outline-none ring-sky-500/0 transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200 sm:text-sm"
                    placeholder="(000) 000-0000"
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="interest"
                    className="text-xs font-medium text-slate-700"
                  >
                    What can we help with?
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    className="block w-full cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 shadow-sm outline-none ring-sky-500/0 transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200 sm:text-sm"
                    defaultValue="life"
                  >
                    <option value="life">Life Insurance</option>
                    <option value="health">Health Insurance</option>
                    <option value="both">Life &amp; Health</option>
                    <option value="other">Other Coverage Questions</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="message"
                  className="text-xs font-medium text-slate-700"
                >
                  How can we help?
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="block w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 shadow-sm outline-none ring-sky-500/0 transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200 sm:text-sm"
                  placeholder="Share a bit about your situation or the type of coverage you’re exploring."
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <p className="max-w-xs text-[11px] text-slate-500 sm:text-xs">
                  By submitting, you agree that Dahal Agency LLC may contact you
                  about insurance products by phone, text, or email. You can opt
                  out at any time.
                </p>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-sky-600 px-5 py-2 text-xs font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 sm:text-sm"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold tracking-tight text-slate-900">
              Office & Contact Details
            </h3>
            <dl className="space-y-3 text-xs text-slate-600 sm:text-sm">
              <div>
                <dt className="font-medium text-slate-800">Phone</dt>
                <dd className="mt-0.5">
                  <a href="tel:(000)%20000-0000" className="hover:text-sky-700">
                    (717) 891-6504
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-slate-800">Fax</dt>
                <dd className="mt-0.5">
                  <a href="tel:(000)%20000-0000" className="hover:text-sky-700">
                    (888) 611-3130 

                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-slate-800">Email</dt>
                <dd className="mt-0.5">
                  <a
                    href="mailto:info@dahalagency.com"
                    className="hover:text-sky-700"
                  >
                    contact@dahalagency.com
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-slate-800">Office Address</dt>
                <dd className="mt-0.5">
                  95 Shannon Rd
                  <br />
                  Suite Unit C
                  <br />
                  Harrisburg, PA 17112
                </dd>
              </div>
              <div>
                <dt className="font-medium text-slate-800">Hours</dt>
                <dd className="mt-0.5">
                  Monday–Friday: 9:00 AM – 5:00 PM
                  <br />
                  Evening & weekend appointments available by request.
                </dd>
              </div>
            </dl>
            <div className="rounded-xl overflow-hidden border border-slate-200">
  <iframe
    src="https://maps.google.com/maps?q=95%20Shannon%20Rd%20Suite%20C%20Harrisburg%20PA%2017112&t=&z=15&ie=UTF8&iwloc=&output=embed"
    width="100%"
    height="350"
    style={{ border: 0 }}
    loading="lazy"
  />
</div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 text-xs text-slate-500 sm:flex-row sm:items-start sm:justify-between sm:px-6 lg:px-8">
          <div className="space-y-2">
            <div className="text-sm font-semibold text-slate-900">
              Dahal Agency LLC
            </div>
            <p className="max-w-xs text-[11px] sm:text-xs">
              Independent insurance agency focused on helping families and
              individuals protect what matters most with thoughtful, personalized
              coverage.
            </p>
          </div>

          <div className="flex flex-wrap gap-10">
            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                Quick Links
              </h3>
              <ul className="mt-2 space-y-1 text-[11px] sm:text-xs">
                <li>
                  <a href="#services" className="hover:text-sky-700">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#carriers" className="hover:text-sky-700">
                    Our Carriers
                  </a>
                </li>
                <li>
                  <a href="#booking" className="hover:text-sky-700">
                    Book a Consultation
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-sky-700">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                Connect
              </h3>
              <div className="mt-2 flex gap-2">
                <a
                  href="#"
                  aria-label="Visit Dahal Agency on Facebook"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-[13px] text-slate-600 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
                >
                  f
                </a>
                <a
                  href="#"
                  aria-label="Visit Dahal Agency on LinkedIn"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-[13px] text-slate-600 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
                >
                  in
                </a>
                <a
                  href="#"
                  aria-label="Visit Dahal Agency on Instagram"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-[13px] text-slate-600 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
                >
                  ⌾
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 border-t border-slate-100 pt-3">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 text-[10px] text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <p>
              © {new Date().getFullYear()} Dahal Agency LLC. All rights
              reserved.
            </p>
            <p>
              Insurance products and availability vary by state. This website is
              for informational purposes only and does not constitute a guarantee
              of coverage.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
