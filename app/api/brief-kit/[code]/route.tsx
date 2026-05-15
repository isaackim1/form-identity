import { renderToBuffer } from "@react-pdf/renderer";
import { BuildBriefDocument } from "@/components/pdf/BuildBriefDocument";
import { assembleBuildBriefData, type AssetType } from "@/lib/brief/brief-data";

export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const { searchParams } = new URL(request.url);

  const asset = (searchParams.get("asset") ?? "linkedin-banner") as AssetType;
  const services = (searchParams.get("services") ?? "").split("|").filter(Boolean);

  const data = assembleBuildBriefData(code, asset, {
    businessName: searchParams.get("name") ?? "",
    headline: searchParams.get("headline") ?? "",
    offer: searchParams.get("offer") ?? "",
    cta: searchParams.get("cta") ?? "",
    website: searchParams.get("website") ?? "",
    services,
  });

  if (!data) return new Response("Not found", { status: 404 });

  const buffer = await renderToBuffer(<BuildBriefDocument data={data} />);
  const filename = `build-brief-${data.code.toLowerCase()}-${asset}.pdf`;

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
