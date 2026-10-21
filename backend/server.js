const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const { Resend } = require("resend");

require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

// Middleware
app.use(cors());
app.use(express.json());

// Contact form schema
const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 254,
    },
    service: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    contactMethod: {
      type: String,
      required: true,
      enum: ["Phone", "Email", "Text"],
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 3000,
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);

// Backend health check
app.get("/", (req, res) => {
  res.send("Rosey Landscaping backend is running!");
});

// Contact form endpoint
app.post("/api/contact", async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      service,
      contactMethod,
      message,
    } = req.body;

    // Validate required fields
    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof phone !== "string" ||
      !phone.trim() ||
      typeof email !== "string" ||
      !email.trim() ||
      typeof service !== "string" ||
      !service.trim() ||
      typeof contactMethod !== "string" ||
      !["Phone", "Email", "Text"].includes(contactMethod) ||
      typeof message !== "string" ||
      !message.trim()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please complete all required fields and select a valid contact method.",
      });
    }

    // Save the enquiry to MongoDB first
    const contact = await Contact.create({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      service: service.trim(),
      contactMethod,
      message: message.trim(),
    });

    console.log("Quote saved to MongoDB:", contact._id);

    // Send email notification using Resend
    try {
      if (!process.env.RESEND_API_KEY) {
        throw new Error(
          "RESEND_API_KEY is missing from Render Environment."
        );
      }

      if (!process.env.NOTIFY_EMAIL) {
        throw new Error(
          "NOTIFY_EMAIL is missing from Render Environment."
        );
      }

      console.log("Starting Resend email notification...");

      const { data, error } = await resend.emails.send({
        from: "Rosey Landscaping <quotes@roseylandscaping.com>",
        to: [process.env.NOTIFY_EMAIL],
        replyTo: contact.email,
        subject: `New Quote Request - ${contact.service}`,
        text: `
New quote request received on the Rosey Landscaping website.

Name: ${contact.name}
Phone: ${contact.phone}
Email: ${contact.email}
Service: ${contact.service}
Preferred Contact Method: ${contact.contactMethod}

Message:
${contact.message}

Quote ID: ${contact._id}
        `,
      });

      if (error) {
        console.error("Resend API rejected the email:", error);
      } else {
        console.log(
          "Resend accepted the email request. Email ID:",
          data?.id
        );
      }
    } catch (emailError) {
      console.error(
        "Email notification failed:",
        emailError.message || emailError
      );
    }

    // Keep the saved enquiry even if email notification fails
    return res.status(201).json({
      success: true,
      message: "Your enquiry has been submitted successfully!",
      id: contact._id,
    });
  } catch (error) {
    console.error("Contact submission failed:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to save your enquiry. Please try again.",
    });
  }
});

// Connect to MongoDB and start the server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully!");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });
