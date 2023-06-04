import sgMail from "@sendgrid/mail";
import { setupSchema } from "./utils/validators.js";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class SengridNode {
  constructor({ name = "Sengrid Node", to, from, subject, text, html }) {
    const validation = setupSchema.validate({
      from,
      to,
      subject,
      text,
      html,
    });

    if (validation.error) {
      throw new Error(validation.error);
    }

    this.name = name;
    this.setup({ to, from, subject, text, html });

    console.log(`Created ${this.name}`);
  }

  setup({ to, from, subject, text, html }) {
    this.config = { to, from, subject, text, html };
  }

  async execute() {
    try {
      await sgMail.send(this.config);
      console.log("Email sent");
    } catch (error) {
      console.error(error);
      throw new Error("Failed to send email");
    }
  }
}

export { SengridNode };
