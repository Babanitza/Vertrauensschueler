const cors = require('cors');
app.use(cors());
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

// WICHTIG: Damit der Server den Text aus dem Button-Klick lesen kann
app.use(express.json()); 
app.use(express.static('public'));

const transporter = nodemailer.createTransport({
  host: 'isarnwohld.org', // Deine IServ-Adresse
  port: 465,
  secure: true,
  auth: {
    user: 'lukas.bebnitz',
    pass: 'Paul.Iserv'
  }
});

app.post('/send-email', (req, res) => {
  // Hier wird der Text übernommen, den der Nutzer getippt hat
  // 'nachricht' muss exakt so im JSON-Body deiner index.html stehen
  const benutzerText = req.body.nachricht; 

  if (!benutzerText) {
    return res.status(400).send("Fehler: Kein Text eingegeben!");
  }

  const mailOptions = {
    from: 'lukas.bebnitz@isarnwohld.org',
    to: 'lukas.bebnitz@isarnwohld.org',
    subject: 'Neues Anliegen von der Vertrauensschüler-Seite',
    text: benutzerText // Hier landet der getippte Text in der E-Mail
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Senden fehlgeschlagen: " + error.message);
    }
    res.status(200).send("E-Mail wurde erfolgreich versendet!");
  });
});

app.listen(3000, () => console.log('Server läuft auf http://localhost:3000'));