// /api/ccv.js
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
export default async function handler(req, res){
  if(req.method!=="POST")return res.status(405).end();
  const { ccv, finder_email, message } = req.body;
  const { data: tag } = await supabase.from("tags").select("tag_code,email").eq("ccv", ccv).single();
  if(!tag) return res.status(404).json({ error: "Not found" });

  await supabase.from("found_reports").insert([{
    tag_code: tag.tag_code, finder_email, message,
    created_at: new Date(),
    expires_at: new Date(Date.now() + 7*24*60*60*1000)
  }]);

  await fetch("https://api.resend.com/emails", {
    method:"POST",
    headers:{Authorization:`Bearer ${process.env.RESEND_KEY}`,"Content-Type":"application/json"},

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
  res.status(200).json({ ok:true });
}
