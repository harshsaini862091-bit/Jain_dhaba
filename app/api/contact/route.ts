import { NextRequest, NextResponse } from "next/server";
import { ContactService } from "@/lib/services/contactService";
import { ContactSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = ContactSchema.parse(body);

    const message = await ContactService.submitMessage(validated);

    return NextResponse.json(
      {
        success: true,
        data: message,
        message: "Thank you for reaching out! We will connect with you shortly.",
      },
      { status: 201 }
    );
  } catch (error: any) {
    const isZod = Boolean(error.errors);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: isZod ? "VALIDATION_FAILED" : "CONTACT_SUBMIT_FAILED",
          message: isZod ? error.errors[0].message : error.message,
        },
      },
      { status: 400 }
    );
  }
}

export async function GET() {
  try {
    const messages = await ContactService.getMessages();
    return NextResponse.json({
      success: true,
      data: messages,
      message: "Contact messages retrieved",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: { code: "FETCH_FAILED", message: error.message },
      },
      { status: 500 }
    );
  }
}
