import { useState, useEffect } from "react"

import logo from "./assets/logo.png"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Forms from "./Forms"

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
import integrityLogo from "./assets/carriers/integrity.png"

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
  { name: "Integrity", logo: integrityLogo },
]

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json"

const coveredStates = [
  "42", "39", "36", "21", "26", "51", "37", "08"
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
                  stroke="#0ea5e9"
                  strokeWidth={0.7}
                  style={{
                    default: { outline: "none" },
                    hover: { fill: isCovered ? "#0369a1" : "#d1d5db" },
                    pressed: { outline: "none" }
                  }}
                />
                {stateAbbr[geo.id as keyof typeof stateAbbr] && (
                  <Marker coordinates={geoCentroid(geo)}>
                    <text textAnchor="middle" style={{ fontSize: "9px", fill: "#475569", fontWeight: 600, pointerEvents: "none" }}>
                      {stateAbbr[geo.id as keyof typeof stateAbbr]}
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
  const [status, setStatus] = useState("")
  const [showBooking, setShowBooking] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowBooking(false)
        setMenuOpen(false)
      }
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [])

  useEffect(() => {
    document.body.style.overflow = (menuOpen || showBooking) ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen, showBooking])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const response = await fetch("https://formspree.io/f/xkoqnvky", {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    })
    if (response.ok) {
      setStatus("SUCCESS")
      form.reset()
    } else {
      setStatus("ERROR")
    }
  }

  const navLinks = (mobile = false) => (
    <>
      <a
        href="#services"
        onClick={() => setMenuOpen(false)}
        className={mobile
          ? "block py-3 px-4 text-base font-semibold text-slate-700 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition"
          : "relative text-slate-700 hover:text-sky-600 transition after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-sky-600 hover:after:w-full after:transition-all"
        }
      >Services</a>
      <a
        href="#carriers"
        onClick={() => setMenuOpen(false)}
        className={mobile
          ? "block py-3 px-4 text-base font-semibold text-slate-700 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition"
          : "relative text-slate-700 hover:text-sky-600 transition after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-sky-600 hover:after:w-full after:transition-all"
        }
      >Our Partners</a>
      <a
        href="#coverage"
        onClick={() => setMenuOpen(false)}
        className={mobile
          ? "block py-3 px-4 text-base font-semibold text-slate-700 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition"
          : "relative text-slate-700 hover:text-sky-600 transition after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-sky-600 hover:after:w-full after:transition-all"
        }
      >Service Area</a>
      <button
        onClick={() => { setShowBooking(true); setMenuOpen(false) }}
        className={mobile
          ? "block w-full text-left py-3 px-4 text-base font-semibold text-slate-700 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition"
          : "relative text-slate-700 hover:text-sky-600 transition after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-sky-600 hover:after:w-full after:transition-all"
        }
      >Book a Consultation</button>
      <Link
        to="/forms"
        onClick={() => setMenuOpen(false)}
        className={mobile
          ? "block py-3 px-4 text-base font-semibold text-slate-700 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition"
          : "relative text-slate-700 hover:text-sky-600 transition after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-sky-600 hover:after:w-full after:transition-all"
        }
      >Forms</Link>
      <a
        href="#contact"
        onClick={() => setMenuOpen(false)}
        className={mobile
          ? "block py-3 px-4 text-base font-semibold text-slate-700 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition"
          : "relative text-slate-700 hover:text-sky-600 transition after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-sky-600 hover:after:w-full after:transition-all"
        }
      >Contact</a>
      <a
        href="tel:7178916504"
        className={mobile
          ? "block text-center mt-2 bg-sky-600 text-white px-6 py-3 rounded-full text-base font-semibold shadow-md hover:bg-sky-700 transition"
          : "bg-sky-600 text-white px-6 py-3 rounded-full text-base font-semibold shadow-md hover:bg-sky-700 transition"
        }
      >(717) 891-6504</a>
    </>
  )

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-slate-50 text-slate-900">

              {/* ── Header ── */}
              <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-12 lg:py-4">
                  <div className="flex items-center gap-2">
                    <img src={logo} alt="Dahal Agency LLC Logo" className="h-12 w-auto object-contain sm:h-16 lg:h-20" />
                    <div>
                      <div className="text-lg font-bold text-sky-700 sm:text-xl lg:text-2xl">Dahal Agency LLC</div>
                      <div className="text-[10px] text-slate-500 sm:text-xs">Independent Insurance Professionals</div>
                    </div>
                  </div>

                  {/* Desktop nav */}
                  <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm xl:text-base font-semibold text-slate-700">
                    {navLinks(false)}
                  </nav>

                  {/* Hamburger */}
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="lg:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-slate-100 transition"
                    aria-label="Toggle menu"
                  >
                    <span className={`block h-0.5 w-6 bg-slate-700 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
                    <span className={`block h-0.5 w-6 bg-slate-700 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
                    <span className={`block h-0.5 w-6 bg-slate-700 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                  </button>
                </div>

                {/* Mobile menu */}
                {menuOpen && (
                  <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-1 shadow-lg">
                    {navLinks(true)}
                  </div>
                )}
              </header>

              <main className="w-full px-4 sm:px-6 lg:px-16 pb-16 pt-6 sm:pt-10">

                {/* ── Hero ── */}
                <section aria-labelledby="hero-title" className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-sky-900 via-sky-800 to-sky-700 px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14 text-white shadow-xl">
                  <p className="text-sm sm:text-base lg:text-xl font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-sky-200 text-center mb-6 sm:mb-8 lg:mb-10">
                    Trusted Independent Insurance Agency
                  </p>
                  <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12">
                    <div className="w-full lg:max-w-2xl space-y-4 sm:space-y-6">
                      <h1 id="hero-title" className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">Protecting What Matters Most</h1>
                      <p className="text-sm sm:text-base text-sky-100 leading-relaxed">Dahal Agency LLC partners with leading national carriers to provide personalized life and health insurance solutions so you can protect your family, your income, and your future with confidence.</p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-sm text-sky-100 pt-1">
                        <li className="flex items-start gap-2"><span className="text-sky-300 mt-0.5">✓</span>Tailored plans for families, individuals, and small businesses</li>
                        <li className="flex items-start gap-2"><span className="text-sky-300 mt-0.5">✓</span>Access to multiple A-rated carriers</li>
                        <li className="flex items-start gap-2"><span className="text-sky-300 mt-0.5">✓</span>Guidance on coverage, premiums, and benefits</li>
                        <li className="flex items-start gap-2"><span className="text-sky-300 mt-0.5">✓</span>Ongoing support when life changes or claims arise</li>
                      </ul>
                    </div>
                    <div className="hidden lg:grid grid-cols-2 gap-4 mt-28 shrink-0">
                      <div className="flex items-center gap-3 rounded-lg bg-white/10 px-4 py-2 backdrop-blur border border-white/20 hover:bg-white/20 transition"><span className="text-lg">❤</span><span className="text-sm font-medium">Life Insurance</span></div>
                      <div className="flex items-center gap-3 rounded-lg bg-white/10 px-4 py-2 backdrop-blur border border-white/20 hover:bg-white/20 transition"><span className="text-lg">+</span><span className="text-sm font-medium">Health Coverage</span></div>
                      <div className="flex items-center gap-3 rounded-lg bg-white/10 px-4 py-2 backdrop-blur border border-white/20 hover:bg-white/20 transition"><span className="text-lg">🚗</span><span className="text-sm font-medium">Auto Insurance</span></div>
                      <div className="flex items-center gap-3 rounded-lg bg-white/10 px-4 py-2 backdrop-blur border border-white/20 hover:bg-white/20 transition"><span className="text-lg">🏠</span><span className="text-sm font-medium">Home Insurance</span></div>
                      <div className="col-span-2 text-center mt-4">
                        <div className="h-px w-20 bg-white/30 mx-auto mb-3"></div>
                        <p className="text-xs text-sky-200 tracking-wide">One agency. Multiple carriers. Personalized protection for every stage of life.</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 w-full lg:hidden">
                      <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 backdrop-blur border border-white/20"><span>❤</span><span className="text-xs font-medium">Life Insurance</span></div>
                      <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 backdrop-blur border border-white/20"><span>+</span><span className="text-xs font-medium">Health Coverage</span></div>
                      <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 backdrop-blur border border-white/20"><span>🚗</span><span className="text-xs font-medium">Auto Insurance</span></div>
                      <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 backdrop-blur border border-white/20"><span>🏠</span><span className="text-xs font-medium">Home Insurance</span></div>
                    </div>
                  </div>
                </section>

                {/* ── Carriers ── */}
                <section id="carriers" aria-labelledby="carriers-title" className="mt-10 sm:mt-14 space-y-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <h2 id="carriers-title" className="text-sm font-semibold tracking-tight text-sky-900 sm:text-base">Our Carrier Partners</h2>
                      <p className="max-w-xl text-xs text-slate-600 sm:text-sm">Dahal Agency LLC works with a broad network of top-rated insurance carriers to match you with coverage that fits your needs and budget.</p>
                    </div>
                    <p className="text-[10px] text-slate-400 sm:text-[11px] sm:text-slate-500">Logos for illustration only. Availability may vary by state and product line.</p>
                  </div>
                  <div className="relative mt-2 overflow-hidden rounded-xl sm:rounded-2xl border border-slate-200 bg-white py-4 shadow-sm">
                    <button onClick={() => document.getElementById("carrier-scroll")?.scrollBy({ left: -300, behavior: "smooth" })} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white/90 backdrop-blur shadow-md border border-slate-200 hover:bg-slate-100 text-lg">‹</button>
                    <button onClick={() => document.getElementById("carrier-scroll")?.scrollBy({ left: 300, behavior: "smooth" })} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white shadow-md border border-slate-200 hover:bg-slate-100 text-lg">›</button>
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white" />
                    <div id="carrier-scroll" className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth px-10 sm:px-12 touch-pan-x">
                      <div className="flex animate-marquee gap-4 sm:gap-6 pr-4 sm:pr-6">
                        {carriers.concat(carriers).map((carrier, index) => (
                          <div key={`${carrier.name}-${index}`} className="flex items-center justify-center min-w-[120px] sm:min-w-[160px] h-[64px] sm:h-[80px] rounded-xl border border-slate-200 bg-white px-3 sm:px-4 py-2 shadow-sm shrink-0">
                            <img src={carrier.logo} alt={carrier.name} className="max-h-[48px] sm:max-h-[60px] w-auto object-contain" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* ── Services ── */}
                <section id="services" aria-labelledby="services-title" className="mt-12 sm:mt-16 space-y-4 sm:space-y-6">
                  <div>
                    <h2 id="services-title" className="text-sm font-semibold tracking-tight text-sky-900 sm:text-base">Insurance Services</h2>
                    <p className="max-w-xl text-xs text-slate-600 sm:text-sm">Whether you're protecting income, planning for the unexpected, or navigating the health marketplace, we'll walk you through your options step by step.</p>
                  </div>
                  <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
                    <article className="group rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-sky-600/10 text-sky-700 shrink-0"><span className="text-lg">❤</span></div>
                        <div>
                          <h3 className="text-sm font-semibold tracking-tight text-sky-900">Life Insurance</h3>
                          <p className="text-[11px] text-slate-500">Term, permanent, and final expense coverage</p>
                        </div>
                      </div>
                      <p className="mt-3 text-xs leading-relaxed text-slate-600 sm:text-sm">Protect the people who rely on your income with coverage tailored to your stage of life. We help you compare term and permanent options, understand riders, and right-size protection for your mortgage, debt, education, and legacy goals.</p>
                      <ul className="mt-3 grid gap-2 text-[11px] text-slate-600 sm:text-xs">
                        <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-500/70 shrink-0" />Coverage strategies for young families, dual-income households, and single-earner homes</li>
                        <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-500/70 shrink-0" />Guidance on layering term policies around major milestones like home purchases and college</li>
                      </ul>
                    </article>
                    <article className="group rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-sky-600/10 text-sky-700 shrink-0"><span className="text-lg">➕</span></div>
                        <div>
                          <h3 className="text-sm font-semibold tracking-tight text-sky-900">Health Insurance</h3>
                          <p className="text-[11px] text-slate-500">Marketplace, Medicare, and supplemental plans</p>
                        </div>
                      </div>
                      <p className="mt-3 text-xs leading-relaxed text-slate-600 sm:text-sm">We simplify the health insurance process—from eligibility and subsidies to enrollment and renewals. We work with marketplace plans, Medicare Advantage and supplements, and private options to help keep your healthcare predictable and affordable.</p>
                      <ul className="mt-3 grid gap-2 text-[11px] text-slate-600 sm:text-xs">
                        <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-500/70 shrink-0" />Support with plan comparisons, networks, and prescription coverage</li>
                        <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-500/70 shrink-0" />Annual reviews to make sure your plan still fits as life changes</li>
                      </ul>
                    </article>
                  </div>
                </section>

                {/* ── Other Coverage ── */}
                <section id="additional" className="mt-12 sm:mt-16 space-y-4 sm:space-y-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-sky-900">Other Coverage Options</h2>
                  <p className="text-sm text-slate-600 max-w-xl">Looking for auto, home, renters, or business insurance? Visit our partner platform to explore additional coverage options and get a quote.</p>
                  <div className="grid gap-4 grid-cols-2 sm:gap-5 lg:grid-cols-4">
                    {[
                      { emoji: "🚗", label: "Auto Insurance", sub: "Compare coverage and rates." },
                      { emoji: "🏠", label: "Home Insurance", sub: "Protect your property and belongings." },
                      { emoji: "🏢", label: "Renters Insurance", sub: "Coverage for renters and apartments." },
                      { emoji: "💼", label: "Business Insurance", sub: "Protection for small businesses." },
                    ].map(({ emoji, label, sub }) => (
                      <a key={label} href="https://brightway.com/agencies/pa/harrisburg/0735" target="_blank" rel="noopener noreferrer" className="group rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm hover:-translate-y-1 hover:shadow-md hover:border-sky-200 transition">
                        <div className="text-xl sm:text-2xl mb-2">{emoji}</div>
                        <h3 className="font-semibold text-sky-900 text-sm sm:text-base">{label}</h3>
                        <p className="text-xs text-slate-500 mt-1 hidden sm:block">{sub}</p>
                      </a>
                    ))}
                  </div>
                </section>

                {/* ── Coverage Map ── */}
                <section id="coverage" aria-labelledby="coverage-title" className="mt-12 sm:mt-16 space-y-4 sm:space-y-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-sky-900">States We Serve</h2>
                  <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 lg:p-10 shadow-lg space-y-4 sm:space-y-6">
                    <CoverageMap />
                    <p className="text-xs sm:text-sm text-slate-600 text-center">
                      Currently serving clients in{" "}
                      <span className="text-sky-700 font-semibold tracking-wide">PA · OH · NY · KY · MI · VA · NC · CO</span>
                    </p>
                  </div>
                </section>

                {/* ── Contact ── */}
                <section id="contact" aria-labelledby="contact-title" className="mt-12 sm:mt-16 grid gap-6 sm:gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
                  <div className="space-y-4 sm:space-y-5">
                    <div>
                      <h2 id="contact-title" className="text-sm font-semibold tracking-tight text-sky-900 sm:text-base">Contact Dahal Agency LLC</h2>
                      <p className="max-w-xl text-xs text-slate-600 sm:text-sm">Send us a message and a licensed agent will follow up to answer your questions or prepare a personalized quote.</p>
                    </div>
                    {status === "SUCCESS" && (
                      <div className="rounded-lg border border-green-300 bg-green-100 p-3 text-sm text-green-800">✅ Thank you! A Dahal Agency representative will contact you shortly.</div>
                    )}
                    {status === "ERROR" && (
                      <div className="rounded-lg border border-red-300 bg-red-100 p-3 text-sm text-red-800">❌ Something went wrong. Please try again.</div>
                    )}
                    <form className="space-y-3 sm:space-y-4 rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 lg:p-10 shadow-sm" onSubmit={handleSubmit}>
                      <input type="hidden" name="_subject" value="New Dahal Agency Website Lead" />
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="space-y-1.5">
                          <label htmlFor="name" className="text-xs font-medium text-slate-700">Full Name</label>
                          <input id="name" name="name" type="text" required className="block w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 shadow-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200 sm:text-sm" placeholder="Jane Doe" />
                        </div>
                        <div className="space-y-1.5">
                          <label htmlFor="email" className="text-xs font-medium text-slate-700">Email Address</label>
                          <input id="email" name="email" type="email" required className="block w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 shadow-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200 sm:text-sm" placeholder="you@example.com" />
                        </div>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="space-y-1.5">
                          <label htmlFor="phone" className="text-xs font-medium text-slate-700">Phone Number</label>
                          <input id="phone" name="phone" type="tel" className="block w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 shadow-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200 sm:text-sm" placeholder="(000) 000-0000" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-slate-700">Best Time to Call</label>
                          <select name="call_time" className="block w-full h-[38px] sm:h-[42px] cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 shadow-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200 sm:text-sm">
                            <option value="">Select preferred time</option>
                            <option value="morning">Morning (8AM – 12PM)</option>
                            <option value="afternoon">Afternoon (12PM – 5PM)</option>
                            <option value="evening">Evening (5PM – 8PM)</option>
                            <option value="anytime">Anytime</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label htmlFor="interest" className="text-xs font-medium text-slate-700">What can we help with?</label>
                          <select id="interest" name="interest" className="block w-full h-[38px] sm:h-[42px] cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 shadow-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200 sm:text-sm" defaultValue="Life">
                            <option value="life">Life Insurance</option>
                            <option value="health">Health Insurance</option>
                            <option value="both">Life &amp; Health</option>
                            <option value="other">Other Coverage Questions</option>
                          </select>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="message" className="text-xs font-medium text-slate-700">How can we help?</label>
                        <textarea id="message" name="message" rows={5} className="block w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 shadow-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200 sm:text-sm" placeholder="Share a bit about your situation or the type of coverage you're exploring." />
                      </div>
                      <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-between gap-3 pt-1">
                        <p className="text-[11px] text-slate-500 sm:max-w-xs sm:text-xs">By submitting, you agree that Dahal Agency LLC may contact you about insurance products by phone, text, or email. You can opt out at any time.</p>
                        <button type="submit" className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-sky-700">Send Message</button>
                      </div>
                    </form>
                  </div>

                  <div className="space-y-4 rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
                    <h3 className="text-sm font-semibold tracking-tight text-sky-900">Office & Contact Details</h3>
                    <dl className="space-y-3 text-xs text-slate-600 sm:text-sm">
                      <div><dt className="font-medium text-slate-800">Phone</dt><dd className="mt-0.5"><a href="tel:7178916504" className="hover:text-sky-700">(717) 891-6504</a></dd></div>
                      <div><dt className="font-medium text-slate-800">Fax</dt><dd className="mt-0.5"><a href="tel:8886113130" className="hover:text-sky-700">(888) 611-3130</a></dd></div>
                      <div><dt className="font-medium text-slate-800">Email</dt><dd className="mt-0.5"><a href="mailto:contact@dahalagency.com" className="hover:text-sky-700">contact@dahalagency.com</a></dd></div>
                      <div><dt className="font-medium text-slate-800">Office Address</dt><dd className="mt-0.5">95 Shannon Rd<br />Suite Unit C<br />Harrisburg, PA 17112</dd></div>
                      <div><dt className="font-medium text-slate-800">Hours</dt><dd className="mt-0.5">Monday–Friday: 9:00 AM – 5:00 PM<br />Evening & weekend appointments available by request.</dd></div>
                    </dl>
                    <div className="rounded-xl overflow-hidden border border-slate-200">
                      <iframe src="https://maps.google.com/maps?q=95%20Shannon%20Rd%20Suite%20C%20Harrisburg%20PA%2017112&t=&z=15&ie=UTF8&iwloc=&output=embed" width="100%" height="280" style={{ border: 0 }} loading="lazy" />
                    </div>
                  </div>
                </section>

              </main>

              <footer className="border-t border-slate-200 bg-white py-6 sm:py-8 mt-12 sm:mt-16">
                <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 text-xs text-slate-500 sm:flex-row sm:items-start sm:justify-between sm:px-6 lg:px-8">
                  <div className="space-y-2">
                    <div className="text-sm font-semibold text-slate-900">Dahal Agency LLC</div>
                    <p className="max-w-xs text-[11px] sm:text-xs">Independent insurance agency focused on helping families and individuals protect what matters most with thoughtful, personalized coverage.</p>
                  </div>
                  <div className="flex flex-wrap gap-8 sm:gap-10">
                    <div>
                      <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">Quick Links</h3>
                      <ul className="mt-2 space-y-1 text-[11px] sm:text-xs">
                        <li><a href="#services" className="hover:text-sky-700">Services</a></li>
                        <li><a href="#carriers" className="hover:text-sky-700">Our Carriers</a></li>
                        <li><button onClick={() => setShowBooking(true)} className="hover:text-sky-700">Book a Consultation</button></li>
                        <li><a href="#contact" className="hover:text-sky-700">Contact</a></li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">Connect</h3>
                      <div className="mt-2 flex gap-2">
                        <a href="https://www.facebook.com/profile.php?id=61552252583671" aria-label="Visit Dahal Agency on Facebook" className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-[13px] text-slate-600 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700">f</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 border-t border-slate-100 pt-3">
                  <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 text-[10px] text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
                    <p>© {new Date().getFullYear()} Dahal Agency LLC. All rights reserved.</p>
                    <p className="sm:text-right">Insurance products and availability vary by state. This website is for informational purposes only and does not constitute a guarantee of coverage.</p>
                  </div>
                </div>
              </footer>

            </div>
          }
        />

        <Route path="/forms" element={<Forms />} />

      </Routes>

      {/* Booking modal — outside <Routes> so it overlays any page */}
      {showBooking && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-3 sm:p-6"
          onClick={() => setShowBooking(false)}
        >
          <div
            className="relative w-full max-w-5xl bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden max-h-[95vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-6 border-b border-slate-200 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-base sm:text-xl font-semibold text-sky-900">Schedule a Free Consultation</h2>
                <p className="text-xs sm:text-sm text-slate-600">Choose a time that works best for you.</p>
              </div>
              <button onClick={() => setShowBooking(false)} className="text-slate-400 hover:text-red-500 text-xl leading-none shrink-0">✕</button>
            </div>
            <iframe
              title="Book a consultation"
              src="https://calendly.com/contact-dahalagency/consultation"
              className="w-full flex-1 border-0"
              style={{ minHeight: "500px" }}
            />
          </div>
        </div>
      )}

    </Router>
  )
}

export default App