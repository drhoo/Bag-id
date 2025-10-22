// /api/register.js
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { tag_code, email, ccv } = req.body;
  const { data, error } = await supabase.from("tags")
    .insert([{ tag_code, email, ccv, active: true }]);
  if (error) return res.status(400).json({ error });
  // Send confirmation via Resend
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "Bag.ID <no-reply@bag.id>",
      to: email,
      subject: "Your Bag.ID tag is active",
      html: `<p>Your Bag.ID code <strong>${tag_code}</strong> is now active.</p>`
    })
  });
  res.status(200).json({ ok: true });
}
