import { ImageResponse } from "next/og";
import { getBrandTypeData } from "@/components/BrandCard";
import { AXES } from "@/lib/brand-type-engine";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Which pole letter maps to which side for each axis position
const AXIS_SIDES = [
  { A: "O", B: "I" },
  { A: "C", B: "A" },
  { A: "L", B: "R" },
  { A: "D", B: "F" },
] as const;

function getAxisPole(code: string, axisIndex: number): string {
  const letter = code[axisIndex];
  const sides = AXIS_SIDES[axisIndex];
  const ax = AXES[axisIndex];
  return letter === sides.A ? ax.poleA : ax.poleB;
}

export default async function Image(
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  const type = getBrandTypeData(code);

  // Fallback for unknown codes
  const typeName = type?.name ?? "Form Identity";
  const tagline = type?.line ?? "Find your brand type.";
  const typeColor = type?.color ?? "#3D3D3A";

  const axisPoles = AXES.map((ax, i) => ({
    name: ax.name,
    pole: type ? getAxisPole(code, i) : ax.poleA,
    oppPole: type ? (getAxisPole(code, i) === ax.poleA ? ax.poleB : ax.poleA) : ax.poleB,
  }));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          background: "#F5F2EA",
        }}
      >
        {/* Left panel — colored */}
        <div
          style={{
            width: "40%",
            height: "100%",
            background: typeColor,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "48px",
          }}
        >
          {/* Code overline */}
          <div
            style={{
              fontSize: "14px",
              fontWeight: 500,
              letterSpacing: "0.20em",
              textTransform: "uppercase",
              color: "rgba(245,242,234,0.7)",
              marginBottom: "16px",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            {code}
          </div>

          {/* Type name */}
          <div
            style={{
              fontSize: "72px",
              fontWeight: 300,
              lineHeight: 0.95,
              letterSpacing: "-0.025em",
              color: "#F5F2EA",
              marginBottom: "24px",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            {typeName}
          </div>

          {/* Character line */}
          <div
            style={{
              fontSize: "18px",
              fontStyle: "italic",
              fontWeight: 400,
              lineHeight: 1.4,
              color: "rgba(245,242,234,0.85)",
              fontFamily: "Georgia, serif",
            }}
          >
            &ldquo;{tagline}&rdquo;
          </div>
        </div>

        {/* Right panel — warm white */}
        <div
          style={{
            flex: 1,
            height: "100%",
            background: "#F5F2EA",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "48px",
          }}
        >
          {/* Wordmark top-right */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#1A1A18",
                fontFamily: "system-ui, sans-serif",
              }}
            >
              FORM IDENTITY
            </div>
          </div>

          {/* Axis rows */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0px",
            }}
          >
            {axisPoles.map((ax, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  borderBottom: "1px solid #E0DBD0",
                  padding: "18px 0",
                  borderTop: i === 0 ? "1px solid #E0DBD0" : undefined,
                }}
              >
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 400,
                    color: "#8C8880",
                    fontFamily: "system-ui, sans-serif",
                  }}
                >
                  {ax.name}
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#1A1A18",
                    fontFamily: "system-ui, sans-serif",
                  }}
                >
                  {ax.pole}{" "}
                  <span style={{ color: "#8C8880", fontWeight: 400 }}>
                    vs {ax.oppPole}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom label */}
          <div
            style={{
              fontSize: "11px",
              fontWeight: 400,
              letterSpacing: "0.08em",
              color: "#8C8880",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            formidentity.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
