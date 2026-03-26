const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: "465",
  auth: {
    user: "lukas.bebnitz@t-online.de",
    pass: "Paul@2012"
  }
});

app.post('/send-email', async (req, res) => {
  const benutzerText = req.body.nachricht;

  if (!benutzerText) {
    return res.status(400).send("Fehler: Kein Text eingegeben!");
  }

  try {
    await transporter.sendMail({
      from: `lukas.bebnitz@t-online.de`,
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
