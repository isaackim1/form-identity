import { describe, expect, it, vi } from "vitest";
import { QUESTIONS } from "../questions";
import { scoreQuiz, type Answers } from "../quiz-state";
import {
  buildQuizResultSavePayload,
  buildResultUrl,
  saveQuizResult,
  type QuizResultSavePayload,
} from "../quiz-result-save";

function completeAnswers(): Answers {
  return Object.fromEntries(
    QUESTIONS.map(q => [q.id, { answer: "A", strength: "definitely" }]),
  ) as Answers;
}

describe("buildQuizResultSavePayload", () => {
  it("builds the API payload from the completed quiz result", () => {
    const answers = completeAnswers();
    const result = scoreQuiz(answers);

    expect(buildQuizResultSavePayload({ result, answers })).toEqual({
      brand_type_code: result.code,
      answers,
      axis_scores: result.axes,
    });
  });

  it("includes industry only when provided", () => {
    const answers = completeAnswers();
    const result = scoreQuiz(answers);

    expect(buildQuizResultSavePayload({
      result,
      answers,
      industry: "consulting-coaching",
    })).toMatchObject({
      industry: "consulting-coaching",
    });
  });
});

describe("buildResultUrl", () => {
  it("keeps the existing answers query and appends result_slug", () => {
    expect(buildResultUrl({
      code: "OCLD",
      encodedAnswers: "E1:A:d,S1:B:l",
      resultSlug: "r_abc12345",
    })).toBe("/result/OCLD?answers=E1%3AA%3Ad%2CS1%3AB%3Al&result_slug=r_abc12345");
  });

  it("keeps industry and result_slug when both are present", () => {
    expect(buildResultUrl({
      code: "ICRF",
      encodedAnswers: "E1:B:l",
      industry: "retail-ecommerce",
      resultSlug: "r_xyz98765",
    })).toBe("/result/ICRF?answers=E1%3AB%3Al&industry=retail-ecommerce&result_slug=r_xyz98765");
  });
});

describe("saveQuizResult", () => {
  const payload: QuizResultSavePayload = {
    brand_type_code: "OCLD",
    answers: { E1: { answer: "A", strength: "definitely" } },
    axis_scores: {
      E: { score: 6, direction: "Outward", code: "O", strength: "Strong", distance: 18, pct: 100 },
      S: { score: 6, direction: "Concrete", code: "C", strength: "Strong", distance: 18, pct: 100 },
      O: { score: 6, direction: "Logic", code: "L", strength: "Strong", distance: 18, pct: 100 },
      T: { score: 6, direction: "Defined", code: "D", strength: "Strong", distance: 18, pct: 100 },
    },
  };

  it("posts to /api/results and returns the saved response", async () => {
    const fetcher = vi.fn().mockResolvedValue(new Response(JSON.stringify({
      success: true,
      result_slug: "r_abc12345",
      result_url: "/result/OCLD",
    }), { status: 200 }));

    await expect(saveQuizResult(payload, { fetcher })).resolves.toEqual({
      success: true,
      result_slug: "r_abc12345",
      result_url: "/result/OCLD",
    });

    expect(fetcher).toHaveBeenCalledWith("/api/results", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  });

  it("returns null instead of throwing when the request fails", async () => {
    const fetcher = vi.fn().mockRejectedValue(new Error("offline"));

    await expect(saveQuizResult(payload, { fetcher })).resolves.toBeNull();
  });

  it("returns null for an unsuccessful API response", async () => {
    const fetcher = vi.fn().mockResolvedValue(new Response(JSON.stringify({
      success: false,
      error: "Failed to save result.",
    }), { status: 500 }));

    await expect(saveQuizResult(payload, { fetcher })).resolves.toBeNull();
  });
});
