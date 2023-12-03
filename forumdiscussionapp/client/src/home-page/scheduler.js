import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Box,
  Paper,
  Container,
} from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

const API_URL = 'http://localhost:8081';

const Scheduler = ({ selectedCourse: courseId }) => {
  const userId = localStorage.getItem('userId');
  const roleId = localStorage.getItem('roleId');
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newEvent, setNewEvent] = useState({
    EventTitle: '',
    EventDescription: '',
    EventDate: '',
  });
  const [selectedEventId, setSelectedEventId] = useState(null);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${API_URL}/events/events/get`);
      setEvents(response.data.events);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const createEvent = async () => {
    try {
      const response = await axios.post(`${API_URL}/events/events/create`, {
        EventTitle: newEvent.EventTitle,
        EventDescription: newEvent.EventDescription,
        EventDate: selectedDate.toISOString(),
        courseId: parseInt(courseId), 
        userId: parseInt(userId),
      });

      if (response.data.success) {
        setEvents([...events, response.data.event]);
        setNewEvent({
          EventTitle: '',
          EventDescription: '',
          EventDate: '',
        });
        handleClose();
      } else {
        console.error('Error creating event:', response.data.error);
      }
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const editEvent = async () => {
    try {
      const response = await axios.put(
        `${API_URL}/events/events/edit/${selectedEventId}`,
        {
          EventTitle: newEvent.EventTitle,
          EventDescription: newEvent.EventDescription,
          EventDate: selectedDate.toISOString(),
          courseId: parseInt(courseId), 
          userd: parseInt(userId),
        }
      );

      if (response.data.success) {
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.EventID === selectedEventId ? response.data.event : event
          )
        );
        setNewEvent({
          EventTitle: '',
          EventDescription: '',
          EventDate: '',
        });
        handleClose();
      } else {
        console.error('Error editing event:', response.data.error);
      }
    } catch (error) {
      console.error('Error editing event:', error);
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      await axios.delete(`${API_URL}/events/events/delete/${eventId}`);
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.EventID !== eventId)
      );
      handleClose();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleEditClick = (eventId) => {
    const selectedEvent = events.find((event) => event.EventID === eventId);
    setSelectedEventId(eventId);
    setNewEvent({
      EventTitle: selectedEvent.EventTitle,
      EventDescription: selectedEvent.EventDescription,
      EventDate: selectedEvent.EventDate,
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
  }, []);

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 3 }}>
        University Events Scheduler
      </Typography>

      {roleId === '1' || roleId === '2' ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            mb: 2,
          }}
        >
          <Button variant="contained" onClick={handleClickOpen}>
            Create Event
          </Button>
        </Box>
      ) : null}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexDirection: 'row',
          mt: 4,
        }}
      >
        <Paper elevation={3} sx={{ width: '60%', p: 2 }}>
          <Typography variant="h6">Calendar</Typography>
          <Calendar />
        </Paper>

        <Paper elevation={3} sx={{ width: '35%', p: 2 }}>
          <Typography variant="h6">Events</Typography>
          {events.length > 0 ? (
            events.map((event) => (
              <Box key={event.EventID} sx={{ my: 2 }}>
                <Typography variant="subtitle1">{event.EventTitle}</Typography>
                <Typography variant="body2">{event.EventDescription}</Typography>
                <Typography variant="body2">
                  {new Date(event.EventDate).toLocaleDateString()}
                </Typography>
                <Box>
                  {(roleId === '1' || (roleId === '2' && userId === event.UserID)) && (
                    <>
                      <Button onClick={() => handleEditClick(event.EventID)}>Edit</Button>
                      <Button onClick={() => deleteEvent(event.EventID)}>Delete</Button>
                    </>
                  )}
                </Box>
              </Box>
            ))
          ) : (
            <Typography variant="body2">No events to show</Typography>
          )}
        </Paper>
      </Box>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          {selectedEventId ? 'Edit Event' : 'Create New Event'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new event, please enter the event title, description, and date here.
          </DialogContentText>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoFocus
                margin="dense"
                id="title"
                label="Event Title"
                type="text"
                fullWidth
                value={newEvent.EventTitle}
                onChange={(e) => setNewEvent({ ...newEvent, EventTitle: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                id="description"
                label="Event Description"
                type="text"
                fullWidth
                value={newEvent.EventDescription}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, EventDescription: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={selectedEventId ? editEvent : createEvent}>
            {selectedEventId ? 'Edit Event' : 'Create Event'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Scheduler;
