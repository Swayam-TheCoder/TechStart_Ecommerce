import Contact from "../models/Contact.js";

// =========================
// SEND MESSAGE
// =========================

export const sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newMessage = await Contact.create({
      name,
      email,
      message,
    });

    res.status(201).json({
      message: "Message Sent Successfully",
      data: newMessage,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =========================
// GET ALL MESSAGES
// =========================

export const getMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({
      createdAt: -1,
    });

    res.json(messages);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
