import React, { useState, useEffect, useCallback } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useApi } from "../home-page/Api";

export const Events = ({ selectedCourse: courseId }) => {
  const [events, setEvents] = useState([]);
  const [newEventTitle, setNewEventTitle] = useState("");
  const { api } = useApi();
  const userId = localStorage.getItem("userId");
  const roleId = localStorage.getItem("roleId");
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newEvent, setNewEvent] = useState({
    EventTitle: "",
    EventDescription: "",
    EventDate: "",
    Location: "",
  });
  const [selectedEventId, setSelectedEventId] = useState(null);

  useEffect(() => {
    // Fetch events from the backend when the component mounts
    fetchEvents();
  }, []);

  const fetchEvents = useCallback(async () => {
    try {
      if (!courseId) {
        console.error("Error fetching events: courseId is undefined");
        return;
      }

      const response = await api.get("/events/events/get", {
        params: {
          courseId: parseInt(courseId),
        },
      });
      setEvents(response.data.events);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  }, [api, courseId]);

  const createEvent = useCallback(async () => {
    try {
      const response = await api.post("/events/events/create", {
        EventTitle: newEvent.EventTitle,
        EventDescription: newEvent.EventDescription,
        EventDate: selectedDate.toISOString(),
        Location: newEvent.Location,
        courseId: parseInt(courseId),
        userId: parseInt(userId),
      });

      if (response.data.success) {
        setEvents([...events, response.data.event]);
        setNewEvent({
          EventTitle: "",
          EventDescription: "",
          EventDate: "",
          Location: "",
          userId: parseInt(userId),
          courseId: parseInt(courseId),
        });
        handleClose();
      } else {
        console.error("Error creating event:", response.data.error);
      }
    } catch (error) {
      console.error("Error creating event:", error);
    }
  }, [api, courseId, events, newEvent, selectedDate, userId]);

  const editEvent = useCallback(async () => {
    try {
      const response = await api.put(`/events/events/edit/${selectedEventId}`, {
        EventTitle: newEvent.EventTitle,
        EventDescription: newEvent.EventDescription,
        EventDate: selectedDate.toISOString(),
        Location: newEvent.Location,
        userId: parseInt(userId),
      });

      if (response.data.success) {
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.EventID === selectedEventId ? response.data.event : event
          )
        );
        setNewEvent({
          EventTitle: "",
          EventDescription: "",
          EventDate: "",
          Location: "",
        });
        handleClose();
      } else {
        console.error("Error editing event:", response.data.error);
      }
    } catch (error) {
      console.error("Error editing event:", error);
    }
  }, [api, courseId, newEvent, selectedDate, selectedEventId, userId]);

  const deleteEvent = useCallback(
    async (eventId) => {
      try {
        await api.delete(`/events/events/delete/${eventId}`);
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event.EventID !== eventId)
        );
        handleClose();
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    },
    [api]
  );

  const handleEditClick = (eventId) => {
    const selectedEvent = events.find((event) => event.EventID === eventId);
    setSelectedEventId(eventId);
    setNewEvent({
      EventTitle: selectedEvent.EventTitle,
      EventDescription: selectedEvent.EventDescription,
      EventDate: selectedEvent.EventDate,
      Location: selectedEvent.Location,
    });
    setSelectedDate(new Date(selectedEvent.EventDate));
    handleClickOpen();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEventId(null);
  };

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Events
      </Typography>

      {/* Event creation form */}
      <TextField
        label="New Event Title"
        value={newEventTitle}
        onChange={(e) => setNewEventTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={createEvent}>
        Create Event
      </Button>

      {/* Display existing events */}
      <ul>
        {events.map((event) => (
          <li key={event.EventID}>{event.EventTitle}</li>
        ))}
      </ul>
    </Container>
  );
};

export default Events;
