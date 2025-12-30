import Case from "../models/Case.js";
import User from "../models/User.js";

/* =========================
   Pending Cases
========================= */
export const getPendingCases = async (req, res) => {
  try {
    const cases = await Case.find({ status: "pending" })
      .populate("createdBy", "name email");
    res.json(cases);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

/* =========================
   Approve Case
========================= */
export const approveCase = async (req, res) => {
  try {
    const caseId = req.params.id;
    const updated = await Case.findByIdAndUpdate(
      caseId,
      { status: "approved" },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

/* =========================
   Reject Case
========================= */
export const rejectCase = async (req, res) => {
  try {
    const caseId = req.params.id;
    const updated = await Case.findByIdAndUpdate(
      caseId,
      { status: "rejected" },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

/* =========================
   Delete Case
========================= */
export const deleteCase = async (req, res) => {
  try {
    const caseId = req.params.id;

    const existing = await Case.findById(caseId);
    if (!existing) return res.status(404).json("Case not found");

    await Case.findByIdAndDelete(caseId);
    res.json("Case deleted");
  } catch (err) {
    res.status(500).json(err.message);
  }
};

/* =========================
   Users
========================= */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

/* =========================
   Admin Analytics
========================= */
export const getAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalCases = await Case.countDocuments();
    const totalPendingCases = await Case.countDocuments({ status: "pending" });

    //  مجموع التبرعات + الهدف
    const donationStats = await Case.aggregate([
      {
        $group: {
          _id: null,
          totalDonated: { $sum: "$donations" },
          totalGoal: { $sum: "$goal" },
        },
      },
    ]);

    const totalDonated = donationStats[0]?.totalDonated || 0;
    const donationTarget = donationStats[0]?.totalGoal || 1;

    res.json({
      totalUsers,
      totalCases,
      totalPendingCases,
      totalDonated,
      donationTarget,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};
