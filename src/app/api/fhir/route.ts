import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import FhirResource from "@/models/FhirResource";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    if (!body.resourceType || !body.id) {
      return NextResponse.json(
        { error: "Invalid FHIR Resource" },
        { status: 400 }
      );
    }

    const saved = await FhirResource.create({
      resourceType: body.resourceType,
      resourceId: body.id,
      data: body,
    });

    return NextResponse.json(saved);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}