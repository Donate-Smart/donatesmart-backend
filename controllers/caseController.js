
import Case from "../models/Case.js";

export const addCase = async (req, res) => {
  try {
    const { title, description, category, summary } = req.body;
    console.log("Uploaded file:", req.file);

    const image = req.file ? req.file.filename : null;

    const newCase = new Case({
      title,
      description,
      category,
      summary,
      image,
      createdBy: req.user.id,
    });

    await newCase.save();
    res.status(201).json(newCase);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getApprovedCases = async (req, res) => {
  try {
    const cases = await Case.find({ status: "approved" });
    res.json(cases);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
export const getUserCases = async (req, res) => {
  try {
    const cases = await Case.find({ createdBy: req.user.id });
    res.json(cases);
  } catch (err) {
    res.status(500).json(err.message);
  }
};