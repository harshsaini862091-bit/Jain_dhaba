import { connectToDatabase } from "@/lib/db/mongodb";
import { ContactMessage } from "@/models";
import { getEmailProvider } from "./email";

export class ContactService {
  static async submitMessage(data: { name: string; email: string; phone: string; message: string }) {
    await connectToDatabase();

    const created = await ContactMessage.create(data);

    // Alert staff via email abstraction
    const emailProvider = getEmailProvider();
    await emailProvider.sendEmail({
      to: "management@jaindhaba.com",
      subject: `New Guest Inquiry: ${data.name}`,
      html: `
        <p><strong>From:</strong> ${data.name} (${data.phone}, ${data.email})</p>
        <p><strong>Message:</strong></p>
        <blockquote>${data.message}</blockquote>
      `,
    });

    return created;
  }

  static async getMessages() {
    await connectToDatabase();
    return ContactMessage.find().sort({ createdAt: -1 }).lean();
  }
}
