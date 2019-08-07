import "components/Appointment/styles.scss"
import React from "react";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";

export default function Appointment(props) {
  const last = props.id === "last"
  console.log(last)
  return (
    <>
    <Header time={props.time} />
    {!last && (props.interview ? <Show interviewer={props.interview.interviewer} student={props.interview.student}/> : <Empty/>)}
    </>
  )
}