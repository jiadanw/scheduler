import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";

export default function Application(props) {
  
  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);

  const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {}
});

  useEffect(() => {
    axios.get('/api/days')
    .then(function(response){
      setState( prev => {
       return {...prev, days: response.data}
      })
      // setDays(response.data);
    })
  }, []);
  
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
        
      </section>
    </main>
  );
}


