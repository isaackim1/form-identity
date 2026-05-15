"use client";

import { useState } from "react";
import Link from "next/link";
import { ASSET_SPECS, assembleBuildBriefData, type AssetType } from "@/lib/brief/brief-data";
import { buildAIPrompt, buildFreelancerBrief } from "@/lib/brief/brief-templates";

interface Props {
  code: string;
  typeName: string;
  typeColor: string;
}

async function copyText(text: string, setter: (v: boolean) => void) {
  try {
    await navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  } catch {}
}

export default function BriefClient({ code, typeName }: Props) {
  const [asset, setAsset] = useState<AssetType>("linkedin-banner");
  const [businessName, setBusinessName] = useState("");
  const [headline, setHeadline] = useState("");
  const [offer, setOffer] = useState("");
  const [cta, setCta] = useState("");
  const [website, setWebsite] = useState("");
  const [services, setServices] = useState<[string, string, string]>(["", "", ""]);
  const [aiCopied, setAiCopied] = useState(false);
  const [briefCopied, setBriefCopied] = useState(false);

  const briefData = assembleBuildBriefData(code, asset, {
    businessName,
    headline,
    offer,
    cta,
    website,
    services,
  });

  const aiPrompt = briefData ? buildAIPrompt(briefData) : "";
  const freelancerBrief = briefData ? buildFreelancerBrief(briefData) : "";
  const pdfUrl = `/api/brief-kit/${code}?asset=${asset}&name=${encodeURIComponent(businessName)}&headline=${encodeURIComponent(headline)}&offer=${encodeURIComponent(offer)}&cta=${encodeURIComponent(cta)}&website=${encodeURIComponent(website)}&services=${encodeURIComponent(services.filter(Boolean).join("|"))}`;

  return (
    <div className="brief-root">
      <header className="brief-top">
        <Link href="/" className="t-overline" style={{ color: "var(--stone)", textDecoration: "none" }}>
          Form Identity
        </Link>
        <Link href={`/result/${code}`} className="brief-back-link">
          ← Back to result
        </Link>
      </header>

      <main className="brief-main">
        <div className="brief-header">
          <span className="brief-header-eyebrow t-overline">Brief Builder</span>
          <h1 className="brief-header-type">{typeName}</h1>
          <p className="brief-header-sub">
            Choose an asset, fill in your content. The system protects the design.
          </p>
        </div>

        {/* Asset Picker */}
        <section className="brief-section">
          <span className="brief-section-label">01 — Choose your asset</span>
          <div className="brief-asset-grid">
            {Object.values(ASSET_SPECS).map((spec) => (
              <button
                key={spec.id}
                className={`brief-asset-card ${asset === spec.id ? "brief-asset-card--active" : ""}`}
                onClick={() => setAsset(spec.id)}
              >
                <span className="brief-asset-name">{spec.name}</span>
                <span className="brief-asset-dims">{spec.dimensions}</span>
                <span className="brief-asset-desc">{spec.description}</span>
              </button>
            ))}
          </div>
        </section>

        <div className="brief-divider" />

        {/* Form */}
        <section className="brief-section">
          <span className="brief-section-label">02 — Your content</span>
          <div className="brief-form">
            <div className="brief-field">
              <label className="brief-label">Business name</label>
              <input
                className="brief-input"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g. Meridian Advisory"
              />
            </div>
            <div className="brief-field">
              <label className="brief-label">Headline / tagline</label>
              <input
                className="brief-input"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="e.g. Credibility that opens the room"
              />
            </div>
            <div className="brief-field">
              <label className="brief-label">
                Core offer <span className="brief-label-note">1–2 sentences</span>
              </label>
              <textarea
                className="brief-textarea"
                rows={2}
                value={offer}
                onChange={(e) => setOffer(e.target.value)}
                placeholder="e.g. I help B2B consultants turn expertise into a client pipeline"
              />
            </div>
            <div className="brief-field">
              <label className="brief-label">CTA / contact detail</label>
              <input
                className="brief-input"
                value={cta}
                onChange={(e) => setCta(e.target.value)}
                placeholder="e.g. Book a call · hello@meridian.co"
              />
            </div>
            <div className="brief-field">
              <label className="brief-label">Website</label>
              <input
                className="brief-input"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="e.g. meridian.co"
              />
            </div>
            {asset === "one-pager" && (
              <div className="brief-field">
                <label className="brief-label">
                  Services <span className="brief-label-note">up to 3</span>
                </label>
                {[0, 1, 2].map((i) => (
                  <input
                    key={i}
                    className="brief-input brief-input--service"
                    value={services[i]}
                    onChange={(e) => {
                      const next = [...services] as [string, string, string];
                      next[i] = e.target.value;
                      setServices(next);
                    }}
                    placeholder={`Service ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        <div className="brief-divider" />

        {/* Outputs */}
        <section className="brief-section">
          <span className="brief-section-label">03 — Your brief</span>

          {/* PDF */}
          <div className="brief-output">
            <div className="brief-output-head">
              <span className="brief-output-title">Brief PDF</span>
              <span className="brief-output-desc">
                One-page spec sheet. Share with a designer or keep as reference.
              </span>
            </div>
            <a href={pdfUrl} download className="brief-download-btn">
              Download Brief PDF
            </a>
          </div>

          <div className="brief-output-divider" />

          {/* AI Prompt */}
          <div className="brief-output">
            <div className="brief-output-head">
              <span className="brief-output-title">AI Prompt</span>
              <span className="brief-output-desc">
                Paste into Claude or ChatGPT to generate copy for each slot.
              </span>
            </div>
            <pre className="brief-pre">{aiPrompt}</pre>
            <button
              className="brief-copy-btn"
              onClick={() => copyText(aiPrompt, setAiCopied)}
            >
              {aiCopied ? "Copied" : "Copy prompt"}
            </button>
          </div>

          <div className="brief-output-divider" />

          {/* Freelancer Brief */}
          <div className="brief-output">
            <div className="brief-output-head">
              <span className="brief-output-title">Freelancer Brief</span>
              <span className="brief-output-desc">
                Paste into Upwork, email, or Notion when briefing a designer.
              </span>
            </div>
            <pre className="brief-pre">{freelancerBrief}</pre>
            <button
              className="brief-copy-btn"
              onClick={() => copyText(freelancerBrief, setBriefCopied)}
            >
              {briefCopied ? "Copied" : "Copy brief"}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
