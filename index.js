const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

app.use(cors()); // <-- Wichtig!

app.use(cors({
  origin: "*"
}));

app.use(express.json());


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "fam.bebnitz@gmail.com",
    pass: "jeyu mkmt vnhd gqeu"
  }
});

app.post("/sendmail", async (req, res) => {
  try {
    const info = await transporter.sendMail({
      from: "fam.bebnitz@gmail.com",
      to: "lukas.bebnitz@gmail.com",
      subject: "Testmail über Fetch",
      text: "Diese Mail wurde über einen Fetch-Request ausgelöst."
    });

    res.json({ success: true, id: info.messageId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server läuft auf Port " + PORT));
