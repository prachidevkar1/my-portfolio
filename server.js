const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();


const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Replace with your Gmail & App Password
const transporter = nodemailer.createTransport({
  service: "gmail",

    auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  
});

app.post("/send-email", (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: "prachidevkar1328@gmail.com",  // your email where you want to receive msgs
    subject: `Portfolio Contact Form: Message from ${name}`,
    text: `You got a new message from your portfolio:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Failed to send email." });
    }
    res.status(200).json({ message: "Message sent successfully!" });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

