import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header"

export default function Appointment(props) {
  return <>
    <Header time={props.time} />
  

  </>;
}