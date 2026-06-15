import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Tutti i campi sono obbligatori." });
  }

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    return res.status(500).json({ error: "Configurazione email mancante." });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: `"Félinia Contact" <${user}>`,
      to: user,
      replyTo: email,
      subject: `Nuovo messaggio da ${name} – Félinia`,
      text: `Nome: ${name}\nEmail: ${email}\n\nMessaggio:\n${message}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#0C7463">Nuovo messaggio – Félinia</h2>
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <hr style="border:none;border-top:1px solid #eee"/>
          <p style="white-space:pre-wrap">${message}</p>
        </div>
      `,
    });

    res.json({ ok: true });
  } catch (err) {
    console.error("Email error:", err.message);
    res.status(500).json({ error: "Errore nell'invio dell'email." });
  }
});

app.listen(PORT, "localhost", () => {
  console.log(`Backend Félinia in ascolto su http://localhost:${PORT}`);
});
