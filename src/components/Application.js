import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment/index";
import {getAppointmentsForDay, getInterview,getInterviewersForDay} from "helpers/selectors";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers:{}
});

  const bookInterview = function (id, interview) {
    console.log('-------for id and interview-----------')
    console.log(id, interview)
    // sql save
    //axios
    return axios.put(`/api/appointments/${id}`, {
      interview: interview
    }).then(() => {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      setState({
        ...state,
        appointments
      });
    })
    


    // state save 
    // setstate

  }


  useEffect(() => {
    Promise.all([
    axios.get('/api/days'),
    axios.get('/api/appointments'),
    axios.get('/api/interviewers')
    ])
    .then(function(response){
      // console.log("DAYS: ", response[0].data)
      // console.log("APPOINTMENTS: ", response[1].data)
      // console.log("INTERVIEWERS: ", response[2].data)
     
      setState( prev => {return {...prev, days: response[0].data, appointments:response[1].data,
      interviewers:response[2].data}})
      // console.log(state)
      // console.log(getAppointmentsForDay(state, "Monday"))
    })
  }, []);
  
  console.log('state-------------------')
  console.log(state)


  return (
    <main className="layout">
      <section className="sidebar">
        <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
    <DayList
      days={state.days}
      day={state.day}
      setDay={day => setState( (prev) => {return {...prev, day:day}})}
    />
  </nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
      {/* {console.log(state)} */}
      {getAppointmentsForDay(state,state.day).map(appointment => {
       console.log('-------------------------------')
       console.log(appointment)

       const interviewers = getInterviewersForDay({days: state.days, interviewers: state.interviewers}, state.day)
       let interview = '';

       if (appointment.interview) {
         interview = getInterview(state, appointment.interview);
       } else {
         interview = appointment.interview;
       }

        return <Appointment key={appointment.id} id={appointment.id} bookInterview={bookInterview} interview={interview} key ={appointment.id} id={appointment.id} time={appointment.time}  interviewers={interviewers} ></Appointment>
      })}
      {/* {console.log(getInterviewersForDay(state,state.day))} */}
      
      </section>
    </main>
  );
}


