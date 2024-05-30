const { Acara, Attendance } = require("../models");

const getEvents = async (req, res) => {
  try {
    const eventList = await Acara.findAll();
    successResponse(res, "Events fetched successfully", eventList, 200);
  } catch (err) {
    internalErrorResponse(res, err, 500);
  }
};

const createEvent = async (req, res) => {
  const { eventName, eventDate } = req.body;

  try {
    const event = await Acara.create({ eventName, eventDate });

    if (!event) {
      errorResponse(res, "Event not created", 400);
    } else {
      successResponse(res, "Event created successfully", event, 201);
    }
  } catch (err) {
    internalErrorResponse(res, err, 500);
  }
};

const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { eventName, eventDate } = req.body;

  try {
    const event = await Acara.findOne({ where: { id } });

    if (!event) {
      errorResponse(res, "Event not found", 404);
      return;
    }

    const updatedEvent = await Acara.update(
      { eventName, eventDate },
      { where: { id } }
    );

    if (!updatedEvent) {
      errorResponse(res, "Event not updated", 400);
    } else {
      successResponse(
        res,
        "Event updated successfully",
        { id, eventName, eventDate },
        200
      );
    }
  } catch (err) {
    internalErrorResponse(res, err, 500);
  }
};

const showEventById = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Acara.findOne({ where: { id } });

    if (!event) {
      errorResponse(res, "Event not found", 404);
    } else {
      successResponse(res, "Event fetched successfully", event, 200);
    }
  } catch (err) {
    internalErrorResponse(res, err, 500);
  }
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Acara.findOne({ where: { id } });

    if (!event) {
      errorResponse(res, "Event not found", 404);
      return;
    }

    const deletedEvent = await Acara.destroy({ where: { id } });

    if (!deletedEvent) {
      errorResponse(res, "Event not deleted", 400);
    } else {
      successResponse(res, "Event deleted successfully", event, 200);
    }
  } catch (err) {
    internalErrorResponse(res, err, 500);
  }
};

const recordAttendance = async (req, res) => {
  const { participant_name, event_id, attendance_date } = req.body;

  try {
    const attendance = await Attendance.create({
      participant_name,
      event_id,
      attendance_date,
    });

    if (!attendance) {
      errorResponse(res, "Attendance not recorded", 400);
    } else {
      successResponse(res, "Attendance recorded successfully", attendance, 201);
    }
  } catch (err) {
    internalErrorResponse(res, err, 500);
  }
};

const getAttendanceReport = async (req, res) => {
  try {
    const report = await Acara.findAll({
      include: [
        {
          model: Attendance,
          as: "attendance",
          required: false,
        },
      ],
    });

    successResponse(res, "Attendance report fetched successfully", report, 200);
  } catch (err) {
    internalErrorResponse(res, err, 500);
  }
};

const countAttendees = async (req, res) => {
  const { event_id } = req.params;

  try {
    const count = await Attendance.count({
      where: { event_id },
    });

    successResponse(
      res,
      `Total attendees for event ${event_id}`,
      { count },
      200
    );
  } catch (err) {
    internalErrorResponse(res, err, 500);
  }
};

module.exports = {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
  showEventById,
  recordAttendance,
  getAttendanceReport,
  countAttendees,
};
