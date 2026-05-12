import type { ScoringResult } from "./brand-type-engine";
import type { Answers } from "./quiz-state";

export interface QuizResultSavePayload {
  brand_type_code: string;
  answers: Answers;
  axis_scores: ScoringResult["axes"];
  industry?: string;
}

export interface QuizResultSaveResponse {
  success: boolean;
  result_slug?: string;
  result_url?: string;
  error?: string;
}

type FetchLike = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

export function buildQuizResultSavePayload({
  result,
  answers,
  industry,
}: {
  result: ScoringResult;
  answers: Answers;
  industry?: string;
}): QuizResultSavePayload {
  return {
    brand_type_code: result.code,
    answers,
    axis_scores: result.axes,
    ...(industry ? { industry } : {}),
  };
}

export function buildResultUrl({
  code,
  encodedAnswers,
  resultSlug,
  industry,
}: {
  code: string;
  encodedAnswers?: string;
  resultSlug?: string;
  industry?: string;
}): string {
  const params = new URLSearchParams();
  if (encodedAnswers) params.set("answers", encodedAnswers);
  if (industry) params.set("industry", industry);
  if (resultSlug) params.set("result_slug", resultSlug);

  const query = params.toString();
  return `/result/${code}${query ? `?${query}` : ""}`;
}

function warnResultSaveFailure(message: string, detail?: unknown) {
  if (process.env.NODE_ENV !== "development") return;
  console.warn(`[Form Identity] ${message}`, detail ?? "");
}

export async function saveQuizResult(
  payload: QuizResultSavePayload,
  options: { fetcher?: FetchLike } = {},
): Promise<QuizResultSaveResponse | null> {
  const fetcher = options.fetcher ?? fetch;

  try {
    const response = await fetcher("/api/results", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      warnResultSaveFailure("Could not save quiz result.", response.status);
      return null;
    }

    const data = await response.json() as QuizResultSaveResponse;
    if (!data.success || !data.result_slug) {
      warnResultSaveFailure("Result save returned an unsuccessful response.", data.error);
      return null;
    }

    return data;
  } catch (error) {
    warnResultSaveFailure("Could not connect to save quiz result.", error);
    return null;
  }
}
