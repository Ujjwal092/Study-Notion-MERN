const Contact = require("../models/Contact");
const mailSender = require("../utils/mailSender");

const { contactReply } = require("../mail/templates/contactAutoReply");

exports.contactUs = async (req, res) => {
  try {
    const { firstname, lastname, email, message } = req.body;

    // validation
    if (!firstname || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All required fields are missing",
      });
    }

    // save in DB
    const contact = await Contact.create({
      firstname,
      lastname,
      email,
      message,
    });

    // ADMIN MAIL
    await mailSender(
      process.env.MAIL_USER,
      "New Contact Message - StudyNotion",
      `
      <h2>New Contact Form Message</h2>

      <p><b>Name:</b> ${firstname} ${lastname}</p>

      <p><b>Email:</b> ${email}</p>

      <p><b>Message:</b></p>

      <p>${message}</p>
      `,
    );

    // USER AUTO REPLY MAIL
    await mailSender(
      email,
      "We received your message | StudyNotion",
      contactReply(firstname),
    );

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
      data: contact,
    });
  } catch (error) {
    console.log("CONTACT API ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while sending message",
    });
  }
};
