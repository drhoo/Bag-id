// /api/contact.js
export default async function handler(req,res){
  if(req.method!=="POST")return res.status(405).end();
  const {name,email,message}=req.body;
  await fetch("https://api.resend.com/emails",{
    method:"POST",
    headers:{Authorization:`Bearer ${process.env.RESEND_KEY}`,"Content-Type":"application/json"},
    body:JSON.stringify({
      from:"Bag.ID <no-reply@bag.id>",
      to:"support@bag.id",
      subject:`New contact form message from ${name}`,
      html:`<p>From: ${name} (${email})</p><p>${message}</p>`
    })
  });
  res.status(200).json({ok:true});
}
