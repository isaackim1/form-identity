"use client";

import { useState, FormEvent } from "react";

interface EmailCaptureProps {
  code: string;
  answers?: string;
  industry?: string;
  resultSlug?: string;
}

export default function EmailCapture({ code, answers, industry, resultSlug }: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          brand_type_code: code,
          answers,
          industry,
          result_slug: resultSlug,
          source: "result_page",
        }),
      });
      const data = await res.json() as { ok: boolean; error?: string };
      if (data.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(data.error ?? "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Could not connect. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div style={{ marginBottom: "32px" }}>
        <p className="report-section-label" style={{ marginBottom: "12px" }}>Email me my result</p>
        <p className="email-capture-message">
          Your Brand Direction has been saved. Use this result as the starting point for your visual identity system.
        </p>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: "32px" }}>
      <p className="report-section-label" style={{ marginBottom: "12px" }}>Email me my result</p>
      <form className="email-capture-form" onSubmit={handleSubmit}>
        <input
          className="email-capture-input"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={e => setEmail(e.currentTarget.value)}
          required
          disabled={status === "loading"}
        />
        <button
          className="email-capture-submit"
          type="submit"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Saving…" : "Save"}
        </button>
      </form>
      {status === "error" && (
        <p className="email-capture-message error">{errorMsg}</p>
      )}
    </div>
  );
}
