const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: "gmail",
  secure: "true",
  auth: {
    user: "fam.bebnitz@gmail.com",
    pass: "jeyu mkmt vnhd gqeu"
  }
});

app.post('/send-email', async (req, res) => {
  const benutzerText = req.body.nachricht;

  if (!benutzerText) {
    return res.status(400).send("Fehler: Kein Text eingegeben!");
  }

  try {
    await transporter.sendMail({
      from: `fam.bebnitz@gmail.com`,
      to: "fam.bebnitz@gmail.com",
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
