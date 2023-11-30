import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  TextField,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { DatePicker } from '@mui/lab';
import axios from 'axios';

const API_URL = 'http://localhost:8081';

const Scheduler = ({ roleId, userId , selectedCourse: courseId }) => {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newEvent, setNewEvent] = useState({
    EventTitle: '',
    EventDescription: '',
    EventDate: '',
    CourseId: '',
  });

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${API_URL}/events/events/get`);
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const createEvent = async () => {
    try {
      const response = await axios.post(`${API_URL}/events/events/create`, {
        ...newEvent,
        EventDate: selectedDate,
        UserID: userId,
        CourseID:courseId,
      });
      setEvents([...events, response.data]);
      setNewEvent({ EventTitle: '', EventDescription: '', EventDate: '', CourseId: '' });
      handleClose();
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const editEvent = async (eventId) => {
    try {
      const response = await axios.put(`${API_URL}/events/events/edit/${eventId}`, {
        ...newEvent,
        EventDate: selectedDate,
        UserID: userId,
      });
      setEvents(events.map(event => event.EventID === eventId ? response.data : event));
      setNewEvent({ EventTitle: '', EventDescription: '', EventDate: '', CourseId: '' });
      handleClose();
    } catch (error) {
      console.error('Error editing event:', error);
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      await axios.delete(`${API_URL}/events/events/delete/${eventId}`);
      setEvents(events.filter(event => event.EventID !== eventId));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      <Typography variant="h4" sx={{ my: 3 }}>
        University Events Scheduler
      </Typography>

      {/* Admins and Teachers can create events */}
      {[1, 2].includes(roleId) && (
        <div>
          <Button variant="contained" sx={{ mt: 2 }} onClick={handleClickOpen}>
            Create Event
          </Button>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Create New Event</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please fill out the form below to create a new event.
              </DialogContentText>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Title"
                    variant="outlined"
                    fullWidth
                    value={newEvent.EventTitle}
                    onChange={(e) => setNewEvent({ ...newEvent, EventTitle: e.target.value })}
                    sx={{ my: 1 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={3}
                    value={newEvent.EventDescription}
                    onChange={(e) => setNewEvent({ ...newEvent, EventDescription: e.target.value })}
                    sx={{ my: 1 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    label="Date"
                    value={selectedDate}
                    onChange={(newValue) => {
                      setSelectedDate(newValue);
                      setNewEvent({ ...newEvent, EventDate: newValue.toISOString() });
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Grid>
                {/* Teachers can select the courseId */}
                {roleId === 2 && (
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Course ID"
                      variant="outlined"
                      fullWidth
                      value={newEvent.CourseId}
                      onChange={(e) => setNewEvent({ ...newEvent, CourseId: e.target.value })}
                      sx={{ my: 1 }}
                    />
                  </Grid>
                )}
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={createEvent} color="primary">
                Create
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}

      {/* Display all events */}
      <div sx={{ my: 3 }}>
        <Typography variant="h5">Upcoming Events</Typography>
        {events.map((event) => (
          <div key={event.EventID} sx={{ my: 2 }}>
            <Typography variant="h6">{event.EventTitle}</Typography>
            <Typography>{event.EventDescription}</Typography>
            <Typography>Date: {event.EventDate}</Typography>
            {roleId === 1 && (
              <div>
                <Button variant="contained" color="primary" onClick={() => editEvent(event.EventID)}>
                  Edit
                </Button>
                <Button variant="contained" color="secondary" onClick={() => deleteEvent(event.EventID)}>
                  Delete
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Scheduler;
