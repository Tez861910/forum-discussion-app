import React, { useState, useEffect } from 'react';
import { Typography, Button, TextField, Grid } from '@mui/material';
import axios from 'axios';

const API_URL = 'http://localhost:8081'; 

const Scheduler = ({ roleId, userId }) => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    EventTitle: '',
    EventDescription: '',
    EventDate: '',
    CourseId: '',
  });

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${API_URL}/home/events`);
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const createEvent = async () => {
    try {
      const response = await axios.post(`${API_URL}/home/events/create`, {
        ...newEvent,
        UserID: userId,
      });
      setEvents([...events, response.data]);
      setNewEvent({ EventTitle: '', EventDescription: '', EventDate: '', CourseId: '' });
    } catch (error) {
      console.error('Error creating event:', error);
    }
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
      {['1', '2'].includes(roleId) && (
        <div>
          <Typography variant="h5" sx={{ my: 2 }}>
            Create New Event
          </Typography>
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
              <TextField
                label="Date"
                type="date"
                variant="outlined"
                fullWidth
                value={newEvent.EventDate}
                onChange={(e) => setNewEvent({ ...newEvent, EventDate: e.target.value })}
                sx={{ my: 1 }}
              />
            </Grid>
            {/* Teachers can select the courseId */}
            {roleId === '2' && (
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
          <Button variant="contained" sx={{ mt: 2 }} onClick={createEvent}>
            Create Event
          </Button>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Scheduler;
