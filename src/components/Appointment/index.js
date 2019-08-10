import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header"
import {useVisualMode} from "hooks/userVisualMode"
import Empty from "components/Appointment/Empty"
import Show from "components/Appointment/Show"
import Form from "components/Appointment/Form"
import { func } from "prop-types";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const mode = useVisualMode(props.interview ? SHOW: EMPTY)
  console.log('mode')
  console.log(mode)

  const onSave = function (name, interviewer, id) {
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(id, interview).then(() => {
      mode.transition(SHOW)
    })
  }
  console.log('props------------------')

  console.log(props)
  return <>
    <Header time={props.time} />
    {mode.mode === EMPTY && <Empty onAdd={() => {
      console.log('qeqweqeqweqe')
      mode.transition(CREATE)
      }}/>}
    {mode.mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer.name}
      />
    )}
    {mode.mode === CREATE && 
    <Form 
      interviewers={props.interviewers}
      Cancel ={ ()=>{
        mode.back()
      }}
      onSave ={onSave}
      id={props.id}
    
    />}

  </>;
}