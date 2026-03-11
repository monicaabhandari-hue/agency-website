import { useState } from "react"
import { Link } from "react-router-dom"
import logo from "./assets/logo.png"

type FormItem = {
  category: string
  title: string
  file: string
}

const forms: FormItem[] = [
  {
    category: "Medicare Forms",
    title: "CMS Appointment of Representative",
    file: "/forms/UHC Representative Appointment Form.pdf",
  },
  {
    category: "Consent Forms",
    title: "Consumer Consent Form",
    file: "/forms/CONSUMER CONSENT 2026  - Original.docx",
  },
  {
    category: "Carrier Forms",
    title: "Aetna SSBCI Eligibility Form",
    file: "/forms/SSBCI Aetna.pdf",
  },
  {
    category: "Carrier Forms",
    title: "AmeriHealth SSBCI Eligibility Form",
    file: "/forms/SSBCI Amerihealth VIP care.pdf",
  },
  {
    category: "Carrier Forms",
    title: "CareSource SSBCI Eligibility Form",
    file: "/forms/SSBCI CareSource.pdf",
  },
  {
    category: "Carrier Forms",
    title: "Highmark SSBCI Attestation Form",
    file: "/forms/SSBCI Highmark Diamond Assured.pdf",
  },
  {
    category: "Carrier Forms",
    title: "UnitedHealthcare SSBCI Verification Form",
    file: "/forms/SSBCI United Health Care.pdf",
  },
  {
    category: "Authorization Forms",
    title: "Highmark Wholecare PHI Authorization",
    file: "/forms/Highmark Wholecare PHI form.pdf",
  },
]

const categoryMeta: Record<string, { emoji: string; subtitle: string }> = {
  "Medicare Forms":      { emoji: "🏥", subtitle: "Federal program documentation" },
  "Consent Forms":       { emoji: "✍️", subtitle: "Client authorization & agreement" },
  "Carrier Forms":       { emoji: "📋", subtitle: "Insurance carrier-specific forms" },
  "Authorization Forms": { emoji: "🔐", subtitle: "Privacy & data release forms" },
}

function DocIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
        stroke="#0369a1" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="14 2 14 8 20 8"
        stroke="#0369a1" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="8" y1="13" x2="16" y2="13" stroke="#0369a1" strokeWidth="1.75" strokeLinecap="round" />
      <line x1="8" y1="17" x2="13" y2="17" stroke="#0369a1" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  )
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; }

  .fr-root {
    min-height: 100vh;
    background: #f0f6ff;
    font-family: 'DM Sans', sans-serif;
    padding: 0 0 80px;
  }
  .fr-inner { max-width: 1080px; margin: 0 auto; padding: 0 24px; }

  /* Top bar */
  .fr-topbar {
    background: #fff;
    border-bottom: 1px solid #e2e8f0;
    padding: 20px 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 20;
  }
  .fr-topbar-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
  }
  .fr-topbar-logo img {
    height: 64px;
    width: auto;
    object-fit: contain;
  }
  .fr-topbar-name {
    font-size: 20px;
    font-weight: 700;
    color: #0369a1;
    line-height: 1.2;
  }
  .fr-topbar-sub {
    font-size: 12px;
    color: #94a3b8;
    margin-top: 1px;
  }
  .fr-back {
    font-size: 13px;
    font-weight: 600;
    color: #0369a1;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 6px 12px;
    border-radius: 8px;
    border: 1.5px solid #bae6fd;
    background: #f0f9ff;
    transition: all 0.15s;
  }
  .fr-back:hover {
    background: #e0f2fe;
    border-color: #7dd3fc;
  }

  /* Page header */
  .fr-page-header {
    padding: 40px 0 0;
    margin-bottom: 36px;
  }
  .fr-eyebrow {
    font-size: 11px; font-weight: 600; letter-spacing: 0.2em;
    text-transform: uppercase; color: #0369a1; margin: 0 0 10px;
  }
  .fr-title {
    font-family: 'Lora', Georgia, serif;
    font-size: clamp(1.9rem, 4vw, 2.75rem);
    font-weight: 700; color: #0c2a3e; line-height: 1.12;
    margin: 0 0 12px; letter-spacing: -0.02em;
  }
  .fr-sub {
    font-size: 15px; color: #64748b; max-width: 440px;
    line-height: 1.65; margin: 0 0 32px;
  }

  .fr-search-wrap { position: relative; max-width: 380px; margin-bottom: 52px; }
  .fr-search-icon {
    position: absolute; left: 14px; top: 50%;
    transform: translateY(-50%); color: #94a3b8; pointer-events: none;
  }
  .fr-search {
    width: 100%; padding: 11px 16px 11px 42px;
    border-radius: 10px; border: 1.5px solid #cbd5e1;
    background: #fff; font-size: 14px;
    font-family: 'DM Sans', sans-serif; color: #1e293b; outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .fr-search:focus { border-color: #0ea5e9; box-shadow: 0 0 0 3px rgba(14,165,233,0.12); }
  .fr-search::placeholder { color: #94a3b8; }

  /* Singles row */
  .fr-singles-row {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 16px;
    margin-bottom: 48px;
  }
  .fr-single-label {
    display: flex; align-items: flex-start; gap: 9px; margin-bottom: 10px;
  }
  .fr-single-emoji { font-size: 16px; line-height: 1.4; }
  .fr-single-name {
    font-size: 13px; font-weight: 600; color: #0c2a3e; letter-spacing: -0.01em;
  }
  .fr-single-sub { font-size: 11px; color: #94a3b8; font-style: italic; margin-top: 1px; }

  .fr-divider-section {
    height: 1.5px; background: #e2e8f0; margin-bottom: 48px;
  }

  /* Multi-form category */
  .fr-cat { margin-bottom: 52px; }
  .fr-cat-header {
    display: flex; align-items: center; gap: 13px;
    margin-bottom: 20px; padding-bottom: 14px;
    border-bottom: 1.5px solid #e2e8f0;
  }
  .fr-cat-emoji { font-size: 21px; line-height: 1; }
  .fr-cat-title {
    font-family: 'Lora', serif; font-size: 17px; font-weight: 600;
    color: #0c2a3e; margin: 0; letter-spacing: -0.01em;
  }
  .fr-cat-sub { font-size: 12px; color: #94a3b8; margin: 2px 0 0; font-style: italic; }
  .fr-cat-badge {
    margin-left: auto; font-size: 11px; font-weight: 600;
    color: #0369a1; background: #e0f2fe;
    border-radius: 20px; padding: 3px 11px; letter-spacing: 0.04em;
  }
  .fr-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
  }

  /* Card */
  .fr-card {
    background: #fff;
    border: 1.5px solid #e2e8f0;
    border-radius: 16px;
    padding: 22px 22px 18px;
    display: flex; flex-direction: column;
    position: relative; overflow: hidden;
    transition:
      transform 0.22s cubic-bezier(.22,.68,0,1.2),
      box-shadow 0.22s ease,
      border-color 0.22s ease;
  }
  .fr-card::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(14,165,233,0.05) 0%, transparent 55%);
    border-radius: 16px; opacity: 0;
    transition: opacity 0.22s; pointer-events: none;
  }
  .fr-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 16px 36px rgba(3,105,161,0.14), 0 2px 8px rgba(0,0,0,0.05);
    border-color: #7dd3fc;
  }
  .fr-card:hover::after { opacity: 1; }

  .fr-card-top {
    display: flex; align-items: flex-start;
    justify-content: space-between; margin-bottom: 14px;
  }
  .fr-icon-wrap {
    width: 42px; height: 42px; border-radius: 11px; background: #e0f2fe;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.2s, transform 0.2s; flex-shrink: 0;
  }
  .fr-card:hover .fr-icon-wrap { background: #bae6fd; transform: scale(1.07); }
  .fr-filetype {
    font-size: 10px; font-weight: 700; letter-spacing: 0.1em;
    color: #64748b; background: #f1f5f9;
    border: 1px solid #e2e8f0; border-radius: 5px;
    padding: 3px 7px; font-family: monospace;
  }
  .fr-card-title {
    font-size: 14px; font-weight: 600; color: #0f172a;
    line-height: 1.45; margin: 0 0 18px; flex: 1;
  }
  .fr-card-divider { height: 1px; background: #f1f5f9; margin-bottom: 16px; }

  .fr-actions { display: flex; gap: 8px; margin-top: auto; }
  .fr-btn {
    flex: 1; padding: 8px 10px; font-size: 12.5px; font-weight: 500;
    border-radius: 8px; cursor: pointer;
    transition: all 0.15s ease; text-align: center;
    text-decoration: none; display: inline-block;
    font-family: 'DM Sans', sans-serif; line-height: 1;
  }
  .fr-btn-outline {
    border: 1.5px solid #bae6fd; background: #f0f9ff; color: #0369a1;
  }
  .fr-btn-outline:hover { background: #e0f2fe; border-color: #7dd3fc; }
  .fr-btn-primary {
    border: none; background: #0369a1; color: #fff; font-weight: 600;
  }
  .fr-btn-primary:hover {
    background: #0284c7;
    box-shadow: 0 4px 14px rgba(3,105,161,0.32);
    transform: translateY(-1px);
  }

  /* Empty */
  .fr-empty { text-align: center; padding: 80px 0; color: #94a3b8; }
  .fr-empty-icon { font-size: 36px; margin-bottom: 12px; }
  .fr-empty-text { font-size: 15px; }

  /* Mobile */
  @media (max-width: 480px) {
    .fr-topbar { padding: 10px 16px; }
    .fr-topbar-logo img { height: 36px; }
    .fr-topbar-name { font-size: 13px; }
    .fr-inner { padding: 0 16px; }
    .fr-page-header { padding-top: 28px; }
    .fr-singles-row { grid-template-columns: 1fr; }
    .fr-grid { grid-template-columns: 1fr; }
    .fr-search-wrap { max-width: 100%; }
  }
`

function FormCard({ form }: { form: FormItem }) {
  const ext = form.file.split(".").pop()?.toUpperCase() ?? "FILE"
  return (
    <div className="fr-card">
      <div className="fr-card-top">
        <div className="fr-icon-wrap"><DocIcon /></div>
        <span className="fr-filetype">{ext}</span>
      </div>
      <p className="fr-card-title">{form.title}</p>
      <div className="fr-card-divider" />
      <div className="fr-actions">
        <a className="fr-btn fr-btn-outline" href={form.file} target="_blank" rel="noopener noreferrer">View</a>
        <a className="fr-btn fr-btn-primary" href={form.file} download>↓ Save</a>
      </div>
    </div>
  )
}

export default function Forms() {
  const [search, setSearch] = useState("")

  const filtered = forms.filter((f) =>
    f.title.toLowerCase().includes(search.toLowerCase()) ||
    f.category.toLowerCase().includes(search.toLowerCase())
  )

  const allCategories = [...new Set(forms.map((f) => f.category))]
  const singleCats = allCategories.filter((cat) => forms.filter((f) => f.category === cat).length === 1)
  const multiCats  = allCategories.filter((cat) => forms.filter((f) => f.category === cat).length > 1)

  const visibleSingleCats = singleCats.filter((cat) => filtered.some((f) => f.category === cat))
  const hasVisibleMulti   = multiCats.some((cat) => filtered.some((f) => f.category === cat))

  return (
    <>
      <style>{css}</style>
      <div className="fr-root">

        {/* ── Sticky top bar with logo + back link ── */}
        <div className="fr-topbar">
          <Link to="/" className="fr-topbar-logo">
            <img src={logo} alt="Dahal Agency LLC Logo" />
            <div>
              <div className="fr-topbar-name">Dahal Agency LLC</div>
              <div className="fr-topbar-sub">Independent Insurance Professionals</div>
            </div>
          </Link>
          <Link to="/" className="fr-back">← Back to Home</Link>
        </div>

        <div className="fr-inner">

          {/* ── Page header ── */}
          <div className="fr-page-header">
            <h1 className="fr-title">Forms &amp; Documents</h1>
            <p className="fr-sub">
              Download or preview forms required for Medicare, Marketplace,
              and insurance enrollment.
            </p>
          </div>

          {/* ── Search ── */}
          <div className="fr-search-wrap">
            <span className="fr-search-icon">
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
            </span>
            <input
              className="fr-search"
              type="text"
              placeholder="Search forms..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {filtered.length === 0 ? (
            <div className="fr-empty">
              <div className="fr-empty-icon">🔍</div>
              <p className="fr-empty-text">No forms match &ldquo;{search}&rdquo;</p>
            </div>
          ) : (
            <>
              {/* Single-form categories — side by side */}
              {visibleSingleCats.length > 0 && (
                <>
                  <div className="fr-singles-row">
                    {visibleSingleCats.map((cat) => {
                      const form = filtered.find((f) => f.category === cat)!
                      const meta = categoryMeta[cat] || { emoji: "📄", subtitle: "" }
                      return (
                        <div key={cat}>
                          <div className="fr-single-label">
                            <span className="fr-single-emoji">{meta.emoji}</span>
                            <div>
                              <div className="fr-single-name">{cat}</div>
                              <div className="fr-single-sub">{meta.subtitle}</div>
                            </div>
                          </div>
                          <FormCard form={form} />
                        </div>
                      )
                    })}
                  </div>
                  {hasVisibleMulti && <div className="fr-divider-section" />}
                </>
              )}

              {/* Multi-form categories */}
              {multiCats.map((cat) => {
                const catForms = filtered.filter((f) => f.category === cat)
                if (catForms.length === 0) return null
                const meta = categoryMeta[cat] || { emoji: "📄", subtitle: "" }
                return (
                  <div key={cat} className="fr-cat">
                    <div className="fr-cat-header">
                      <span className="fr-cat-emoji">{meta.emoji}</span>
                      <div>
                        <h2 className="fr-cat-title">{cat}</h2>
                        <p className="fr-cat-sub">{meta.subtitle}</p>
                      </div>
                      <span className="fr-cat-badge">
                        {catForms.length} form{catForms.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <div className="fr-grid">
                      {catForms.map((form, i) => (
                        <FormCard key={i} form={form} />
                      ))}
                    </div>
                  </div>
                )
              })}
            </>
          )}

        </div>
      </div>
    </>
  )
}