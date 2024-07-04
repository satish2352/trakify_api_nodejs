const HistoryModel = require("../model/history.model");

const getFlatHistory = async (req, res, next) => {
  const { flatId } = req.params;

  try {
    const historyEntries = await HistoryModel.find(
      { flat_id: flatId },
      {
        oldState: 1,
        newState: 1,
        updatedOn: 1,
        updatedBy: 1,
        comment: 1,
        _id: 0,
      }
    );

    if (!historyEntries || historyEntries.length === 0) {
      return res.status(200).json({ message: "No history found for the flat" });
    }

    res.status(200).json({ historyEntries });
  } catch (error) {
    console.error("Error fetching flat history:", error);
    next(error);
  }
};

module.exports = { getFlatHistory };
