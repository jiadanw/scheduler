import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment/index";
import {getAppointmentsForDay, getInterview,getInterviewersForDay} from "helpers/selectors";
import useApplicationData, { INIT_DATA } from "hooks/useApplicationData";


if(process.env.REACT_APP_API_BASE_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL
}

export default function Application(props) {
 const {state,
    dispatch,
    bookInterview,
    deleteInterview,
    editInterview} = useApplicationData();



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
      setDay={day => dispatch({type: "SET_DAY", day})}
    />
  </nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
      
      {getAppointmentsForDay(state,state.day).map(appointment => {
       const interviewers = getInterviewersForDay({days: state.days, interviewers: state.interviewers}, state.day)
       let interview = '';

       if (appointment.interview) {
         interview = getInterview(state, appointment.interview);
       } else {
         interview = appointment.interview;
       }

        return <Appointment 
        key={appointment.id} 
        id={appointment.id} 
        bookInterview={bookInterview}
        deleteInterview={deleteInterview} 
        editInterview={editInterview}
        interview={interview} 
        key ={appointment.id} 
        id={appointment.id} 
        time={appointment.time}  
        interviewers={interviewers} ></Appointment>
      })}      
      </section>
    </main>
  );
}


