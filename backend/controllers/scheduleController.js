import Schedule from "../models/scheduleModel.js";

// creating medication schedule
// post request
export const createMedicationSchedule = async (req, res) => {
  try {
    const {
      userId,
      medicineId,
      medicineName,
      duration,
      time,
      frequency,
      enabled,
    } = req.body;

    const scheduleData = {
      userId,
      medicineId,
      medicineName,
      duration,
      time,
      frequency,
      enabled,
    };

    const scheduleExist = await Schedule.findOne({
      medicineName: medicineName,
      userId: userId,
    });

    if (scheduleExist) {
      res.status(403).json({ error: "Schedule already exist" });
    } else {
      const result = await Schedule.create(scheduleData);
      res.status(200).send(scheduleData);
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error!" });
  }
};

// get medication schedule
// get request
export const getMedicationsSchedule = async (req, res) => {
    const {userId} = req.params;
    const result = await Schedule.find({userId: userId});
    console.log(result)
    res.send(result);
  };
