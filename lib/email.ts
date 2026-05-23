import nodemailer from "nodemailer";

function createTransporter() {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function sendConfirmationEmail(rsvp: any) {
  const transporter = createTransporter();
  if (!transporter) {
    console.log("[RSVP] Email skipped — SMTP not configured");
    return { sent: false };
  }

  const attending = rsvp.attendanceStatus === "attending";
  const subject = attending
    ? "Your RSVP is confirmed — Kerala Vivah"
    : "We received your response — Kerala Vivah";

  const html = `
    <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; padding: 32px; background: #1a0f0a; color: #fef3c7;">
      <h1 style="color: #d4af37; font-weight: normal; letter-spacing: 0.15em; text-transform: uppercase; font-size: 14px;">Kerala Vivah</h1>
      <h2 style="color: #fef3c7; font-weight: 300; margin-top: 8px;">
        ${attending ? "We look forward to celebrating with you" : "Thank you for letting us know"}
      </h2>
      <p style="color: rgba(254,243,199,0.75); line-height: 1.7;">
        Dear ${rsvp.name},<br/><br/>
        ${
          attending
            ? `Your RSVP for <strong>${rsvp.guestCount}</strong> guest(s) has been recorded.`
            : "Your response has been recorded. We will miss you on this special day."
        }
      </p>
      ${
        attending && rsvp.events?.length
          ? `<p style="color: #d4af37;">Events: ${rsvp.events.join(", ")}</p>`
          : ""
      }
      <p style="color: rgba(254,243,199,0.5); font-size: 12px; margin-top: 32px;">With love, Priya & Arjun</p>
    </div>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: rsvp.email,
    subject,
    html,
  });

  return { sent: true };
}
