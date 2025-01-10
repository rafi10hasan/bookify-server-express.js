const {
  updateRoomInAccommodation,
} = require("../../services/acommodation-services/update-accommodation");

const updateAccController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { newTotalRooms } = req.body;

    const updatedAccommodation = await updateRoomInAccommodation(id, newTotalRooms);

    if (!updatedAccommodation) {
      return res.status(404).json({ message: "Accommodation not found" });
    }

    res.status(200).json({
      message: "Accommodation updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateAccController,
};
