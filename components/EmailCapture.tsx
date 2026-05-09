"use client";

import { useState, FormEvent } from "react";

interface EmailCaptureProps {
  code: string;
}

export default function EmailCapture({ code }: EmailCaptureProps) {
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
        body: JSON.stringify({ email, code }),
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
        <p className="result-section-head" style={{ marginBottom: "12px" }}>Email me my result</p>
        <p className="email-capture-message">Thank you — check your inbox.</p>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: "32px" }}>
      <p className="result-section-head" style={{ marginBottom: "12px" }}>Email me my result</p>
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
          {status === "loading" ? "Sending…" : "Send"}
        </button>
      </form>
      {status === "error" && (
        <p className="email-capture-message error">{errorMsg}</p>
      )}
    </div>
  );
}
