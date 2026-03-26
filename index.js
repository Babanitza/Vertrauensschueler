const express = require("express");
const cors = require("cors");
const Mailjet = require("node-mailjet");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const mailjet = Mailjet.apiConnect(
  process.env.MAILJET_API_KEY,
  process.env.MAILJET_SECRET_KEY
);

app.post('/send-email', async (req, res) => {
  const benutzerText = req.body.nachricht;

  if (!benutzerText) {
    return res.status(400).send("Fehler: Kein Text eingegeben!");
  }

  try {
    await mailjet
      .post("send", { version: "v3.1" })
      .request({
        Messages: [
          {
            From: {
              Email: "Lukas.Bebnitz@t-online.de",
              Name: "Vertrauensschüler"
            },
            To: [
              {
                Email: "lukas.bebnitz@isarnwohld.org"
              }
            ],
            Subject: "Neues Anliegen von der Vertrauensschüler-Seite",
            TextPart: benutzerText
          }
        ]
      });

    res.status(200).send("E-Mail wurde erfolgreich versendet!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Senden fehlgeschlagen: " + error.message);
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log("Server läuft auf Port " + PORT));