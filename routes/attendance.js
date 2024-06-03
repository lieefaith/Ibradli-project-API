const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendanceController");

// Routes for attendance feature
router.post("/attendance", attendanceController.recordAttendance); // Catat kehadiran peserta di acara
router.get("/attendance/:event_id/count", attendanceController.countAttendees); // Hitung jumlah peserta yang hadir
router.get(
  "/attendance/:event_id/report",
  attendanceController.getAttendanceReport
); // Hasilkan laporan kehadiran acara

module.exports = router;
