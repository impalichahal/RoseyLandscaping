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

// Email settings
const SENDER_EMAIL = "Rosey Landscaping <quotes@roseylandscaping.com>";
const BUSINESS_EMAIL = "roseylandscaping@gmail.com";
const WEBSITE_URL = "https://www.roseylandscaping.com";
const LOGO_URL = "https://www.roseylandscaping.com/favicon.png";

// Middleware
app.use(cors());
app.use(express.json());

// Escape user-provided text before inserting it into HTML.
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

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
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
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
          "Please complete all required fields and enter a valid email address.",
      });
    }

    // Save the enquiry to MongoDB first.
    // Email failures will not delete or undo the saved quote.
    const contact = await Contact.create({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      service: service.trim(),
      contactMethod,
      message: message.trim(),
    });

    console.log("Quote saved to MongoDB:", contact._id.toString());

    // Prepare safe values for HTML emails
    const safeName = escapeHtml(contact.name);
    const safePhone = escapeHtml(contact.phone);
    const safeEmail = escapeHtml(contact.email);
    const safeService = escapeHtml(contact.service);
    const safeContactMethod = escapeHtml(contact.contactMethod);
    const safeMessage = escapeHtml(contact.message).replace(
      /\r?\n/g,
      "<br>"
    );
    const safeQuoteId = escapeHtml(contact._id.toString());
    const safeWebsiteUrl = escapeHtml(WEBSITE_URL);

    // Shared branding for both emails
    const emailHeader = `
      <tr>
        <td
          align="center"
          style="padding:28px 20px;background-color:#ffffff;border-bottom:4px solid #3f7045;"
        >
          <img
            src="${LOGO_URL}"
            alt="Rosey Landscaping Logo"
            width="100"
            style="display:block;width:100px;max-width:100%;height:auto;margin:0 auto 16px;border:0;"
          >
          <h1
            style="margin:0;color:#285b32;font-size:24px;line-height:1.3;"
          >
            Rosey Landscaping
          </h1>
          <p
            style="margin:8px 0 0;color:#667466;font-size:14px;"
          >
            Professional Landscaping Services
          </p>
        </td>
      </tr>
    `;

    const emailFooter = `
      <tr>
        <td
          align="center"
          style="padding:20px;background-color:#285b32;color:#ffffff;"
        >
          <p style="margin:0;font-size:13px;line-height:1.8;">
            <strong>Rosey Landscaping</strong><br>
            Professional landscaping for your outdoor space.<br>
            <a
              href="${WEBSITE_URL}"
              style="color:#ffffff;text-decoration:underline;"
            >
              www.roseylandscaping.com
            </a>
          </p>
        </td>
      </tr>
    `;

    // Email 1: Notify the business about the new quote
    if (!process.env.RESEND_API_KEY) {
      console.error(
        "RESEND_API_KEY is missing. Emails cannot be sent."
      );
    } else if (!process.env.NOTIFY_EMAIL) {
      console.error(
        "NOTIFY_EMAIL is missing. Business notification cannot be sent."
      );
    } else {
      try {
        const { data, error } = await resend.emails.send({
          from: SENDER_EMAIL,
          to: [process.env.NOTIFY_EMAIL],
          replyTo: contact.email,
          subject: `New Quote Request - ${contact.service}`,

          text:
            "New quote request received on the Rosey Landscaping website.\n\n" +
            "Name: " + contact.name + "\n" +
            "Phone: " + contact.phone + "\n" +
            "Email: " + contact.email + "\n" +
            "Service: " + contact.service + "\n" +
            "Preferred Contact Method: " + contact.contactMethod + "\n\n" +
            "Message:\n" + contact.message + "\n\n" +
            "Quote ID: " + contact._id + "\n\n" +
            "Website: " + WEBSITE_URL,

          html: `
            <!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>New Quote Request - Rosey Landscaping</title>
              </head>
              <body style="margin:0;padding:0;background-color:#f4f7f2;font-family:Arial,Helvetica,sans-serif;color:#263328;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f4f7f2;padding:24px 10px;">
                  <tr>
                    <td align="center">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;background-color:#ffffff;border-radius:12px;overflow:hidden;">
                        ${emailHeader}

                        <tr>
                          <td style="padding:26px 24px;">
                            <h2 style="margin:0 0 18px;color:#285b32;font-size:20px;">
                              A new enquiry has arrived!
                            </h2>

                            <p style="margin:0 0 20px;color:#4c594d;font-size:14px;line-height:1.6;">
                              Someone has submitted a quote request through your website.
                              Their details are below.
                            </p>

                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;font-size:14px;">
                              <tr>
                                <td style="padding:12px;background-color:#f3f7f1;border-bottom:1px solid #e2e9df;font-weight:bold;width:38%;">Name</td>
                                <td style="padding:12px;border-bottom:1px solid #e2e9df;">${safeName}</td>
                              </tr>
                              <tr>
                                <td style="padding:12px;background-color:#f3f7f1;border-bottom:1px solid #e2e9df;font-weight:bold;">Phone</td>
                                <td style="padding:12px;border-bottom:1px solid #e2e9df;">${safePhone}</td>
                              </tr>
                              <tr>
                                <td style="padding:12px;background-color:#f3f7f1;border-bottom:1px solid #e2e9df;font-weight:bold;">Email</td>
                                <td style="padding:12px;border-bottom:1px solid #e2e9df;">
                                  <a href="mailto:${safeEmail}" style="color:#285b32;text-decoration:underline;">${safeEmail}</a>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding:12px;background-color:#f3f7f1;border-bottom:1px solid #e2e9df;font-weight:bold;">Service</td>
                                <td style="padding:12px;border-bottom:1px solid #e2e9df;">${safeService}</td>
                              </tr>
                              <tr>
                                <td style="padding:12px;background-color:#f3f7f1;border-bottom:1px solid #e2e9df;font-weight:bold;">Preferred Contact</td>
                                <td style="padding:12px;border-bottom:1px solid #e2e9df;">${safeContactMethod}</td>
                              </tr>
                            </table>

                            <h3 style="margin:24px 0 10px;color:#285b32;font-size:16px;">
                              Customer Message
                            </h3>

                            <div style="padding:16px;background-color:#f7f9f6;border-left:4px solid #3f7045;border-radius:4px;font-size:14px;line-height:1.7;overflow-wrap:anywhere;">
                              ${safeMessage}
                            </div>

                            <p style="margin:22px 0 0;color:#667466;font-size:12px;line-height:1.6;">
                              <strong>Quote ID:</strong> ${safeQuoteId}
                            </p>

                            <p style="margin:20px 0 0;font-size:14px;line-height:1.6;">
                              Reply directly to this email to respond to the customer.
                            </p>
                          </td>
                        </tr>

                        ${emailFooter}
                      </table>
                    </td>
                  </tr>
                </table>
              </body>
            </html>
          `,
        });

        if (error) {
          console.error(
            "Business notification email failed:",
            error
          );
        } else {
          console.log(
            "Business notification email accepted by Resend:",
            data?.id
          );
        }
      } catch (emailError) {
        console.error(
          "Business notification email error:",
          emailError.message || emailError
        );
      }

      // Email 2: Send an automatic confirmation to the customer
      try {
        const { data, error } = await resend.emails.send({
          from: SENDER_EMAIL,
          to: [contact.email],

          // Customer replies go to the business Gmail inbox.
          replyTo: BUSINESS_EMAIL,

          subject: "Thank You for Your Quote Request | Rosey Landscaping",

          text:
            `Dear ${contact.name},\n\n` +
            "Thank you for contacting Rosey Landscaping!\n\n" +
            "We have successfully received your quote request. " +
            "We appreciate your interest in our landscaping services " +
            "and the opportunity to help you improve your outdoor space.\n\n" +
            "WHAT HAPPENS NEXT?\n\n" +
            "1. Our team will review the details you submitted.\n" +
            "2. We will contact you to discuss your landscaping needs " +
            "and any additional details.\n" +
            "3. We will follow up with information about your quote.\n\n" +
            "If you have additional information about your project, " +
            "simply reply to this email. Your reply will reach our team.\n\n" +
            "Thank you for considering Rosey Landscaping. " +
            "We look forward to working with you!\n\n" +
            "Visit our website: " + WEBSITE_URL + "\n\n" +
            "Warm regards,\n" +
            "Rosey Landscaping Team\n" +
            "Website: " + WEBSITE_URL + "\n\n" +
            "This is an automatic confirmation that we received your request.",

          html: `
            <!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Quote Request Received - Rosey Landscaping</title>
              </head>

              <body style="margin:0;padding:0;background-color:#f4f7f2;font-family:Arial,Helvetica,sans-serif;color:#263328;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f4f7f2;padding:24px 10px;">
                  <tr>
                    <td align="center">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;background-color:#ffffff;border-radius:12px;overflow:hidden;">
                        ${emailHeader}

                        <tr>
                          <td style="padding:28px 24px;">
                            <h2 style="margin:0 0 18px;color:#285b32;font-size:22px;line-height:1.4;">
                              Thank You for Your Quote Request!
                            </h2>

                            <p style="margin:0 0 16px;color:#4c594d;font-size:15px;line-height:1.8;">
                              Dear ${safeName},
                            </p>

                            <p style="margin:0 0 16px;color:#4c594d;font-size:14px;line-height:1.8;">
                              Thank you for contacting
                              <strong style="color:#285b32;">Rosey Landscaping!</strong>
                              We have successfully received your quote request.
                              We appreciate your interest in our landscaping services
                              and the opportunity to help you transform and maintain
                              your outdoor space.
                            </p>

                            <div style="margin:22px 0;padding:18px;background-color:#f3f7f1;border-left:4px solid #3f7045;border-radius:4px;">
                              <h3 style="margin:0 0 12px;color:#285b32;font-size:17px;">
                                What happens next?
                              </h3>

                              <p style="margin:0 0 10px;color:#4c594d;font-size:14px;line-height:1.7;">
                                <strong>1.</strong> Our team will review the details you submitted.
                              </p>

                              <p style="margin:0 0 10px;color:#4c594d;font-size:14px;line-height:1.7;">
                                <strong>2.</strong> We will contact you to discuss your landscaping needs and any additional details.
                              </p>

                              <p style="margin:0;color:#4c594d;font-size:14px;line-height:1.7;">
                                <strong>3.</strong> We will follow up with information about your quote.
                              </p>
                            </div>

                            <p style="margin:0 0 18px;color:#4c594d;font-size:14px;line-height:1.8;">
                              If you have any additional information about your project,
                              simply reply to this email. Our team can receive your reply
                              and follow up with you.
                            </p>

                            <p style="margin:0 0 22px;color:#4c594d;font-size:14px;line-height:1.8;">
                              Thank you for considering Rosey Landscaping.
                              We look forward to working with you!
                            </p>

                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto 24px;">
                              <tr>
                                <td align="center" style="background-color:#285b32;border-radius:6px;">
                                  <a
                                    href="${WEBSITE_URL}"
                                    target="_blank"
                                    style="display:inline-block;padding:13px 24px;color:#ffffff;text-decoration:none;font-size:14px;font-weight:bold;"
                                  >
                                    Visit Our Website
                                  </a>
                                </td>
                              </tr>
                            </table>

                            <p style="margin:0;color:#4c594d;font-size:14px;line-height:1.8;">
                              Warm regards,<br>
                              <strong style="color:#285b32;">Rosey Landscaping Team</strong>
                            </p>

                            <p style="margin:22px 0 0;color:#667466;font-size:12px;line-height:1.6;">
                              This is an automatic confirmation that we received your quote request.
                            </p>
                          </td>
                        </tr>

                        ${emailFooter}
                      </table>
                    </td>
                  </tr>
                </table>
              </body>
            </html>
          `,
        });

        if (error) {
          console.error(
            "Customer confirmation email failed:",
            error
          );
        } else {
          console.log(
            "Customer confirmation email accepted by Resend:",
            data?.id
          );
        }
      } catch (emailError) {
        console.error(
          "Customer confirmation email error:",
          emailError.message || emailError
        );
      }
    }

    // The quote remains saved even if one or both emails fail.
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