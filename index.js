const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const transporter = nodemailer.createTransport({
  host: "isarnwohld.org",
  port: 587,
  secure: false,
  auth: {
    user: "lukas.bebnitz",
    pass: "Paul.Iserv"
  }
});

app.post('/send-email', async (req, res) => {
  const benutzerText = req.body.nachricht;

  if (!benutzerText) {
    return res.status(400).send("Fehler: Kein Text eingegeben!");
  }

  try {
    await transporter.sendMail({
      from: `"Lukas Bebnitz" <lukas.bebnitz@isarnwohld.org>`,
      to: "lukas.bebnitz@isarnwohld.org",
      subject: "Neues Anliegen von der Vertrauensschüler-Seite",
      text: benutzerText
    });

    res.status(200).send("E-Mail wurde erfolgreich versendet!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Senden fehlgeschlagen: " + error.message);
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log("Server läuft auf Port " + PORT));
