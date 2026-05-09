"use client";

import { useState } from "react";

interface ShareButtonProps {
  code: string;
  typeName: string;
  tagline: string;
}

export default function ShareButton({ code, typeName, tagline }: ShareButtonProps) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "fallback">("idle");
  const [fallbackUrl, setFallbackUrl] = useState("");

  const resultUrl = `https://formidentity.com/result/${code}`;

  function handleCopyLink() {
    const url = (typeof window !== "undefined" ? window.location.origin : "https://formidentity.com") + `/result/${code}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopyState("copied");
        setTimeout(() => setCopyState("idle"), 2000);
      }).catch(() => {
        setFallbackUrl(url);
        setCopyState("fallback");
      });
    } else {
      setFallbackUrl(url);
      setCopyState("fallback");
    }
  }

  const tweetText = encodeURIComponent(`I'm ${typeName} — "${tagline}" — Find your brand type:`);
  const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}&url=${encodeURIComponent(resultUrl)}`;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(resultUrl)}`;
  const mailtoUrl = `mailto:?subject=${encodeURIComponent(`My brand type is ${typeName}`)}&body=${encodeURIComponent(`I just found my brand type on Form Identity: ${typeName}. "${tagline}" Find yours: ${resultUrl}`)}`;

  return (
    <div className="result-share">
      <p className="result-section-head result-share-head">Share</p>
      <div className="share-options">
        <button className="share-option" onClick={handleCopyLink} type="button">
          <span>Copy link</span>
          {copyState === "copied" && <span className="share-feedback">Copied</span>}
        </button>
        {copyState === "fallback" && (
          <input
            type="text"
            readOnly
            value={fallbackUrl}
            className="email-capture-input"
            style={{ marginBottom: "8px" }}
            onFocus={e => e.currentTarget.select()}
          />
        )}
        <div className="share-option">
          <a href={tweetUrl} target="_blank" rel="noopener noreferrer">
            <span>Share on X</span>
            <span>↗</span>
          </a>
        </div>
        <div className="share-option">
          <a href={linkedInUrl} target="_blank" rel="noopener noreferrer">
            <span>Share on LinkedIn</span>
            <span>↗</span>
          </a>
        </div>
        <div className="share-option">
          <a href={mailtoUrl}>
            <span>Share via email</span>
            <span>↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}
