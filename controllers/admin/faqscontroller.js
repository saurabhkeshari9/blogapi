const FAQ = require("../../models/faqsmodel");

// Get all FAQs
exports.getAllFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find();
    return res.status(200).json({ statusCode: 200, message: "FAQs List", data: faqs });
  } catch (err) {
    return res.status(500).json({ statusCode: 500, message: err.message });
  }
};

// Create a new FAQ
exports.createFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const newFAQ = new FAQ({ question, answer });
    await newFAQ.save();

    return res.status(200).json({ statusCode: 200, message: "FAQ created successfully", data: newFAQ });
  } catch (err) {
    return res.status(500).json({ statusCode: 500, message: err.message });
  }
};

// Update an FAQ
exports.updateFAQ = async (req, res) => {
  try {
    const { faqId } = req.params;
    const { question, answer } = req.body;

    const updatedFAQ = await FAQ.findByIdAndUpdate(faqId, { question, answer }, { new: true });

    if (!updatedFAQ) return res.status(400).json({ statusCode: 400, message: "FAQ not found" });

    return res.status(200).json({ statusCode: 200, message: "FAQ updated successfully", data: updatedFAQ });
  } catch (err) {
    return res.status(500).json({ statusCode: 500, message: err.message });
  }
};

// Delete an FAQ
exports.deleteFAQ = async (req, res) => {
  try {
    const { faqId } = req.params;

    const deletedFAQ = await FAQ.findByIdAndDelete(faqId);

    if (!deletedFAQ) return res.status(400).json({ statusCode: 400, message: "FAQ not found" });

    return res.status(200).json({ statusCode: 200, message: "FAQ deleted successfully" });
  } catch (err) {
    return res.status(500).json({ statusCode: 500, message: err.message });
  }
};