import { renderToBuffer } from "@react-pdf/renderer";
import { BrandKitDocument } from "@/components/pdf/BrandKitDocument";
import { assembleBrandKitData } from "@/lib/pdf/brand-kit-data";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ code: string }> },
) {
  const { code } = await params;
  const { searchParams } = new URL(request.url);
  const industry = searchParams.get("industry") ?? undefined;

  const data = assembleBrandKitData(code, industry);
  if (!data) {
    return new Response("Brand type not found", { status: 404 });
  }

  const buffer = await renderToBuffer(<BrandKitDocument data={data} />);
  const body = new Uint8Array(buffer);

  const filename = `brand-kit-${data.code.toLowerCase()}.pdf`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
