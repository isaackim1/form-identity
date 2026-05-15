import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBrandType, isBrandTypeCode } from "@/lib/brand-types";
import BriefClient from "./BriefClient";

export async function generateMetadata({ params }: { params: Promise<{ code: string }> }): Promise<Metadata> {
  const { code } = await params;
  if (!isBrandTypeCode(code)) return { title: "Form Identity" };
  const type = getBrandType(code);
  return { title: `Brief Builder — ${type?.name ?? code} — Form Identity` };
}

export default async function BriefPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  if (!isBrandTypeCode(code)) notFound();
  const type = getBrandType(code);
  if (!type) notFound();
  return <BriefClient code={code} typeName={type.name} typeColor={type.color} />;
}
