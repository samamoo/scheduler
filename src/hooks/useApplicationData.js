import { useState, useEffect } from "react";
const axios = require("axios").default;

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      // console.log(days[0].spots)
      setState((prev) => ({ ...prev, days, appointments, interviewers }));
    });
  }, []);

  const getSpots = function (id, appointments) {
    const days = state.days.map((day) => {
      if (day.appointments.includes(id)) {
        const freeSpotsArray = day.appointments.filter(
          (appointmentID) => !appointments[appointmentID].interview
        );
        day.spots = freeSpotsArray.length;
      }
      return day;
    });
    return days;
  };

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = getSpots(id, appointments);
    return axios.put(`/api/appointments/${id}`, appointment).then((res) => {
      console.log(res);
      setState({ ...state, appointments, days });
    });
  }

  const cancelInterview = function (id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = getSpots(id, appointments);
    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState({ ...state, appointments, days });
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
}
