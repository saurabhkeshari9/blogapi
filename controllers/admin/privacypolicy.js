const Privacy = require("../../models/privacypolicy");


exports.createPrivacyPolicy = async (req, res) => {
  try {
    const { title, content, isActive } = req.body;

    const newPolicy = await Privacy.create({ title, content, isActive });
    return res.status(200).json({ 
      statusCode: 200, 
      message: "Privacy policy created successfully", 
      data: newPolicy 
    });

  } catch (err) {
    return res.status(500).json({ statusCode: 500, message: err.message });
  }
};


exports.updatePrivacyPolicy = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, isActive } = req.body;

    const policy = await Privacy.findOneAndUpdate(
      { _id: id, isDeleted: false }, 
      { title, content, isActive }, 
      { new: true }
    );

    if (!policy) {
      return res.status(400).json({ statusCode: 400, message: "Privacy policy not found or deleted" });
    }

    return res.status(200).json({ 
      statusCode: 200, 
      message: "Privacy policy updated successfully", 
      data: policy 
    });

  } catch (err) {
    return res.status(500).json({ statusCode: 500, message: err.message });
  }
};


exports.getPrivacyPolicy = async (req, res) => {
  try {
    const policy = await Privacy.findOne({ isActive: true, isDeleted: false }).sort({ updatedAt: -1 });

    if (!policy) {
      return res.status(400).json({ statusCode: 400, message: "No active privacy policy found" });
    }

    return res.status(200).json({ statusCode: 200, message: "Privacy policy fetched", data: policy });

  } catch (err) {
    return res.status(500).json({ statusCode: 500, message: err.message });
  }
};


exports.deletePrivacyPolicy = async (req, res) => {
  try {
    const policy = await Privacy.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false }, 
      { isDeleted: true },
      { new: true }
    );

    if (!policy) {
      return res.status(400).json({ statusCode: 400, message: "Privacy policy not found or already deleted" });
    }

    return res.status(200).json({ statusCode: 200, message: "Privacy policy deleted (soft delete)" });

  } catch (err) {
    return res.status(500).json({ statusCode: 500, message: err.message });
  }
};
