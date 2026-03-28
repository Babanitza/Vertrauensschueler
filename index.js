const express = require("express");
const cors = require("cors");
const path = require("path");
const { Resend } = require("resend");

const app = express();
app.use(cors());
app.use(express.json());

// Static Files (Frontend)
app.use(express.static(path.join(__dirname, "public")));

// Resend initialisieren
const resend = new Resend(process.env.RESEND_API_KEY);

// Test-Route
app.get("/", (req, res) => {
  res.send("Backend läuft mit RESEND!");
});

// Mail-Route
app.post("/sendmail", async (req, res) => {
  const { name, klasse, problem, pause, vertrauens } = req.body;

  try {
    const email = await resend.emails.send({
      from: "Lukas.Bebnitz@t-online.de",
      to: "lukas.bebnitz@isarnwohld.org",
      subject: "Neue Nachricht vom Vertrauensschüler-Formular",
      text: `
Name: ${name}
Klasse: ${klasse}

Problem:
${problem}

Pausenwunsch:
${pause}

Anwesende Vertrauensschüler:
${vertrauens}
      `
    });

    res.json({ success: true, id: email.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Server starten
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server läuft auf Port " + PORT));
