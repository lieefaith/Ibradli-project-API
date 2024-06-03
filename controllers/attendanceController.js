const Attendance = require("../models/attendance");

// Catat kehadiran peserta di acara
exports.recordAttendance = async (req, res) => {
  try {
    const { participant_name, event_id, attendance_date } = req.body;
    const attendance = await Attendance.create({
      participant_name,
      event_id,
      attendance_date,
    });
    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Hitung jumlah peserta yang hadir di acara
exports.countAttendees = async (req, res) => {
  try {
    const { event_id } = req.params;
    const count = await Attendance.count({ where: { event_id } });
    res.status(200).json({ event_id, attendees: count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Hasilkan laporan kehadiran acara
exports.getAttendanceReport = async (req, res) => {
  try {
    const { event_id } = req.params;
    const attendances = await Attendance.findAll({ where: { event_id } });
    res.status(200).json(attendances);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
