// import React from "react";
import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment/index";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


const axios = require('axios').default;


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  console.log(state.interviewers)

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
      setState(prev => ({...prev, days, appointments, interviewers}));
    })
  },[]);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, appointment).then(() => setState({...state, appointments})
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
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {setState({...state, appointments})
    })

  }
  // const handleErrorDelete = function(err) {
  //   if(err.response) {
  //     console.log("Error in the RESPONSE!!!", err.response.status)
  //   } else if (err.request) {
  //     console.log("Error in REQUEST!!!")
  //   } else {
  //     console.log("Error", err.message)
  //   }
  // }

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

  const appointments = getAppointmentsForDay(state, state.day);
  const appointmentList = appointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state, state.day);
    return (
      <Appointment 
      key={appointment.id} 
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={interviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
      editInterview={editInterview}/>
    )
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"/>
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"/>
      </section>
      <section className="schedule">
        {appointmentList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}


   // [
        //   {
        //     id: 1,
        //     time: "12pm",
        //   },
        //   {
        //     id: 2,
        //     time: "1pm",
        //     interview: {
        //       student: "Lydia Miller-Jones",
        //       interviewer: {
        //         id: 1,
        //         name: "Sylvia Palmer",
        //         avatar: "https://i.imgur.com/LpaY82x.png",
        //       }
        //     }
        //   },
        //   {
        //     id: 3,
        //     time: "2pm",
        //   },
        //   {
        //     id: 4,
        //     time: "3pm",
        //     interview: {
        //       student: "Samantha Fok",
        //       interviewer: {
        //         id: 2,
        //         name: "Tori Malcolm",
        //         avatar: "https://i.imgur.com/Nmx0Qxo.png",
        //       }
        //     }
        //   },
        //   {
        //     id: 5,
        //     time: "4pm",
        //     interview: {
        //       student: "Nicholas Cage",
        //       interviewer: {
        //         id: 4,
        //         name: "Cohana Roy",
        //         avatar: "https://i.imgur.com/FK8V841.jpg",
        //       }
        //     }
        //   },
        // ];