const Event = require('../models/event');
const {
  internalErrorResponse,
} = require("../config/responseJson");

// Create new event
exports.createEvent = async (req, res) => {
  try {
    const { eventName, eventDate } = req.body;
    const event = await Event.create({ eventName, eventDate });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get event by ID
exports.getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findOne({ where: { id } });
    if (!event) {
      res.status(404).json({ error: "Event not found" });
    } else {
      res.status(200).json(event);
    }
  } catch (error) {
    console.log(error);
    internalErrorResponse(res, error);
  }
};

// Update event by ID
exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { eventName, eventDate } = req.body;
    const event = await Event.findOne({ where: { id } });
    if (!event) {
      res.status(404).json({ error: 'Event not found' });
      return;
    }
    await Event.update({ eventName, eventDate }, { where: { id } });
    res.status(200).json({ message: 'Event updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete event by ID
exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findOne({ where: { id } });
    if (!event) {
      res.status(404).json({ error: 'Event not found' });
      return;
    }
    await Event.destroy({ where: { id } });
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
