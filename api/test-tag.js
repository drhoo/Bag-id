import { testConfirmationEmail } from "../lib/emails.js";
import { Resend } from "resend";

// initialise resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Basic in-memory rate limiter (per deployment container)
let lastTest = {};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { bagid } = req.body || {};
  if (!bagid || !/^BAG-[A-Z0-9-]{5,}$/.test(bagid)) {
    return res.status(400).json({ message: "Invalid Bag.ID format" });
  }

  // Basic rate limiting (1 test per hour per code)
  const now = Date.now();
  if (lastTest[bagid] && now - lastTest[bagid] < 60 * 60 * 1000) {
    return res
      .status(429)
      .json({ message: "This tag was tested recently. Please wait before retrying." });
  }
  lastTest[bagid] = now;

  try {
    // 🔹 Look up owner’s email in Supabase
    const response = await fetch(
      `${process.env.SUPABASE_URL}/rest/v1/tags?select=email&code=eq.${bagid}`,
      {
        headers: {
          apikey: process.env.SUPABASE_KEY,
          Authorization: `Bearer ${process.env.SUPABASE_KEY}`,
        },
      }
    );

    const data = await response.json();
    if (!data || !data.length) {
      return res.status(404).json({ message: "No tag found for that code." });
    }

    const ownerEmail = data[0].email;

    // 🔹 Send test confirmation email (using new shared template)
    await resend.emails.send({
      from: "Bag.ID <noreply@bag.id>",
      to: ownerEmail,
      subject: `Bag.ID Test Confirmation — ${bagid}`,
      html: testConfirmationEmail({ bagid }),
    });

    return res.status(200).json({ message: "Confirmation email sent" });
  } catch (error) {
    console.error("Test error:", error);
    return res.status(500).json({ message: "Server error sending test email" });
  }
}
