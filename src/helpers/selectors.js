const getAppointmentsForDay = function (state, day) {
  let apps = [];
  for (const day1 of state.days) {
    if (day1.name === day) {
      for (const appointment of day1.appointments) {
        apps.push(state.appointments[appointment]);
      }
    }
  }
  return apps;
};
// { student: 'Archie Cohen', interviewer: 2 }
const getInterview = function (state, interview) {
  if (!interview) {
    return null;
  }
  const interviewerData = {...interview, interviewer: state.interviewers[interview.interviewer]}
  return interviewerData;
  // return (interview && {...interview, interviewer: state.interviewers[interview.interviewer]})
}

const getInterviewersForDay = function (state, day) {
  let interviewers = [];
  for (const day1 of state.days) {
    if (day1.name === day) {
      for (const interviewer of day1.interviewers) {
        interviewers.push(state.interviewers[interviewer]);
      }
    }
  }
  return interviewers;
};

export { getAppointmentsForDay, getInterview, getInterviewersForDay};