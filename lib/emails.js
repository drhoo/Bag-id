// 1. Owner Confirmation Email
export function ownerConfirmationEmail({ tag_code }) {
  return `
  <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;max-width:600px;margin:0 auto;color:#1f2937;background:#ffffff;padding:32px;">
    <h2 style="margin-top:0;color:#0e2a38;">Your Bag.ID tag is active</h2>
    <p>Thank you for registering your Bag.ID tag. It’s now securely linked to your email address and ready to protect your luggage.</p>
    <div style="border:1px solid #e5e7eb;border-radius:12px;padding:16px;margin:20px 0;background:#f7fafc;">
      <p style="margin:0;font-size:16px;">Tag code: <strong>${tag_code}</strong></p>
    </div>
    <p>If your bag is ever found, the finder can contact you through a private relay. Finder details are automatically deleted after 7 days — always.</p>
    <p>Thank you for choosing a system built on trust and simplicity.</p>
    <p style="margin-top:32px;font-size:14px;color:#6b7280;">© 2025 Bag.ID — A Pebble System</p>
  </div>
  `;
}

// 2. Finder Report Alert
export function finderReportEmail({ tag_code, message, photo_url }) {
  return `
  <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;max-width:600px;margin:0 auto;color:#1f2937;background:#ffffff;padding:32px;">
    <h2 style="margin-top:0;color:#0e2a38;">Someone found your bag</h2>
    <p>A finder has submitted a report for your Bag.ID tag <strong>${tag_code}</strong>.</p>
    <div style="border:1px solid #e5e7eb;border-radius:12px;padding:16px;margin:20px 0;background:#f7fafc;">
      <p style="margin:0;white-space:pre-line;">${message || "No message provided."}</p>
    </div>
    ${photo_url ? `<div style="margin-bottom:20px;"><img src="${photo_url}" alt="Finder photo" style="max-width:100%;border-radius:12px;border:1px solid #e5e7eb;" /></div>` : ""}
    <p>You can reply directly to this message if you wish to contact the finder. Their details are kept private and will be automatically deleted after 7 days.</p>
    <p>We hope this helps your bag find its way home soon.</p>
    <p style="margin-top:32px;font-size:14px;color:#6b7280;">© 2025 Bag.ID — A Pebble System</p>
  </div>
  `;
}

// 3. Support Notification
export function supportNotificationEmail({ name, email, message }) {
  return `
  <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;max-width:600px;margin:0 auto;color:#1f2937;background:#ffffff;padding:32px;">
    <h2 style="margin-top:0;color:#0e2a38;">New message from Bag.ID contact form</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <div style="border:1px solid #e5e7eb;border-radius:12px;padding:16px;margin:20px 0;background:#f7fafc;">
      <p style="margin:0;white-space:pre-line;">${message}</p>
    </div>
    <p style="font-size:14px;color:#6b7280;">This message was sent via the Bag.ID website contact form.</p>
    <p style="margin-top:32px;font-size:14px;color:#6b7280;">© 2025 Bag.ID — A Pebble System</p>
  </div>
  `;
}

// 4. Test Confirmation Email
export function testConfirmationEmail({ bagid }) {
  return `
  <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;max-width:600px;margin:0 auto;color:#1f2937;background:#ffffff;padding:32px;">
    <h2 style="margin-top:0;color:#0e2a38;">Your Bag.ID test was successful</h2>
    <p>This is a quick confirmation that your Bag.ID tag <strong>${bagid}</strong> is active and registered in our system.</p>
    <p>No tracking, no logs — this is simply a reassurance that your tag is ready if ever needed.</p>
    <p>Thank you for trusting Bag.ID — a quiet system built on clarity and care.</p>
    <p style="margin-top:20px;">
      You can view your test confirmation here:<br />
      <a href="https://bag.id/test-confirmed.html" target="_blank" style="color:#b64c1b;text-decoration:none;font-weight:500;">
        bag.id/test-confirmed.html
      </a>
    </p>
    <p style="margin-top:32px;font-size:14px;color:#6b7280;">© 2025 Bag.ID — A Pebble System</p>
  </div>
  `;
}
