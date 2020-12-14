import { useState, useEffect } from "react";
const axios = require('axios').default;

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  // console.log(state.days[0].spots)

  const setDay = day => setState({ ...state, day });

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
      setState(prev => ({...prev, days, appointments, interviewers}));
    })
  },[]);

  const getSpots = function (id, appointments) {

    const days = state.days.map((day) => {
        if (day.appointments.includes(id)){
          const freeSpotsArray = day.appointments.filter(appointmentID => !appointments[appointmentID].interview)
          day.spots = freeSpotsArray.length;
        }
        return day;
    }) 
    return days
  }
  // const changeSpotsforDay = function (state, day, action) {
  //   console.log("calling changeSpotsForDay")

  //   let spots = 0;
  //   for (const day1 of state.days) {
  //     if (day1.name === day) {
  //       spots = day1.appointments.length;
  //       if (action === "Subtract") {
  //         spots -= 1;
  //         console.log(spots, "spots subtract")
  //       } else if (action === "Add") {
  //         spots += 1;
  //         console.log(spots, "spots add")
  //       }
  //     }
  //   }
  // }
// build a days array to update the state
// in the days array, i'm updating the # of spots based on creating/deleting an appointmnet
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = getSpots(id, appointments)
    return axios.put(`/api/appointments/${id}`, appointment).then(() => setState({...state, appointments, days})
    )
  }

  const cancelInterview = function(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    const days = getSpots(id, appointments)
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {setState({...state, appointments, days})
    })
  }

  const editInterview = function(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, appointment)
    .then(() => setState({...state, appointments}))
  }

  return { state, setDay, bookInterview, cancelInterview, editInterview  }
}