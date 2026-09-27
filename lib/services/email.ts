export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
}

export interface IEmailProvider {
  sendEmail(options: SendEmailOptions): Promise<{ success: boolean; id?: string }>;
}

export class ConsoleEmailProvider implements IEmailProvider {
  async sendEmail(options: SendEmailOptions): Promise<{ success: boolean; id?: string }> {
    console.log(`[EMAIL DISPATCH - DEV/CONSOLE] To: ${options.to} | Subject: ${options.subject}`);
    return { success: true, id: `msg_console_${Date.now()}` };
  }
}

export class ResendEmailProvider implements IEmailProvider {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.RESEND_API_KEY || '';
  }

  async sendEmail(options: SendEmailOptions): Promise<{ success: boolean; id?: string }> {
    if (!this.apiKey) {
      console.warn("Resend API key not set, fallback to ConsoleEmailProvider");
      return new ConsoleEmailProvider().sendEmail(options);
    }

    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          from: "Jain Dhaba <reservations@jaindhaba.com>",
          to: [options.to],
          subject: options.subject,
          html: options.html,
        }),
      });

      const data = await res.json();
      return { success: res.ok, id: data.id };
    } catch (err) {
      console.error("Resend delivery failed:", err);
      return { success: false };
    }
  }
}

export function getEmailProvider(): IEmailProvider {
  if (process.env.RESEND_API_KEY) {
    return new ResendEmailProvider();
  }
  return new ConsoleEmailProvider();
}
