// /api/found.js
import { createClient } from "@supabase/supabase-js";
import formidable from "formidable";
import fs from "fs/promises";

export const config = { api: { bodyParser: false } };
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const form = formidable();
  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => err ? reject(err) : resolve({ fields, files }));
  });

  let photo_url = null;
  if (files.photo) {
    const buffer = await fs.readFile(files.photo[0].filepath);
    const upload = await supabase.storage.from("found-photos")
      .upload(`photo_${Date.now()}.jpg`, buffer, { contentType: "image/jpeg" });
    photo_url = upload?.data?.path ? `${process.env.SUPABASE_URL}/storage/v1/object/public/found-photos/${upload.data.path}` : null;
  }

  const record = {
    tag_code: fields.tag_code,
    finder_email: fields.finder_email || null,
    message: fields.message || null,
    photo_url,
    created_at: new Date(),
    expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  };
  const { error } = await supabase.from("found_reports").insert([record]);
  if (error) return res.status(400).json({ error });

  // Notify owner
  const { data: owner } = await supabase.from("tags").select("email").eq("tag_code", fields.tag_code).single();
  if (owner) {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_KEY}`, "Content-Type": "application/json" },

body: JSON.stringify({
  from: "Bag.ID <no-reply@bag.id>",
  to: owner.email,
  subject: "Someone found your bag",
  html: finderReportEmail({
    tag_code: fields.tag_code,
    message: fields.message,
    photo_url
  })
})

      
    });
  }

  res.status(200).json({ ok: true });
}
