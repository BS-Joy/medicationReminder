import Medication from "../models/medicationModel.js";

// creating medication
// post request
export const createMedication = async (req, res) => {
  try {
    const { medicineName, duration, userId } = req.body;
    const medication = {
      medicineName,
      duration,
      userId,
    };

    const medicineExist = await Medication.findOne({
      medicineName: medicineName,
      userId: userId
    });

    if (medicineExist) {
      console.log('medicine exist')
      res.status(403).json({ error: "Medicine already exist" });
    } else {
      const result = await Medication.create(medication);
      res.status(200).json(result);
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error!" });
  }
};

// get medication
// get request
export const getMedications = async (req, res) => {
  const {userId} = req.params;
  const result = await Medication.find({userId: userId});
  res.send(result);
};
