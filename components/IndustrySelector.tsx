"use client";

import { useRouter } from "next/navigation";
import { INDUSTRY_OPTIONS, type IndustryValue } from "@/lib/industry-assets";

interface Props {
  code: string;
  answers?: string;
  current: string;
}

export default function IndustrySelector({ code, answers, current }: Props) {
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams();
    if (answers) params.set("answers", answers);
    if (e.target.value) params.set("industry", e.target.value);
    const qs = params.toString();
    router.push(`/result/${code}${qs ? `?${qs}` : ""}`, { scroll: false });
  }

  return (
    <div className="industry-selector">
      <label className="industry-selector-label" htmlFor="industry-select">
        What kind of business are you building?
      </label>
      <div className="industry-select-wrap">
        <select
          id="industry-select"
          className="industry-select"
          value={current}
          onChange={handleChange}
        >
          <option value="">Select an industry…</option>
          {INDUSTRY_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className="industry-select-arrow" aria-hidden="true">↓</span>
      </div>
    </div>
  );
}

// Exported for type safety in the result page
export type { IndustryValue };
