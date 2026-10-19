
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

const app = express();

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

// Free Quote / Contact form endpoint
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

    // Save the enquiry to MongoDB
    const contact = await Contact.create({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      service: service.trim(),
      contactMethod,
      message: message.trim(),
    });

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
