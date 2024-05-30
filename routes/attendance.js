const express = require("express");
const router = express.Router();
const {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
  showEventById,
  recordAttendance,
  getAttendanceReport,
  countAttendees,
} = require("../controllers/attendanceController");

router.get("/events", getEvents);
router.post("/events", createEvent);
router.put("/events/:id", updateEvent);
router.get("/events/:id", showEventById);
router.delete("/events/:id", deleteEvent);

router.post("/attendance", recordAttendance);
router.get("/attendance/report", getAttendanceReport);
router.get("/attendance/count/:event_id", countAttendees);

module.exports = router;
