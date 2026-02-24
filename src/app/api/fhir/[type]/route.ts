import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import FhirResource from "@/models/FhirResource";

export async function GET(
  req: NextRequest,
  { params }: { params: { type: string } }
) {
  await connectDB();

  const data = await FhirResource.find({
    resourceType: params.type,
  });

  return NextResponse.json(data);
}