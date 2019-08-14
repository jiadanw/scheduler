import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header"
import {useVisualMode} from "hooks/userVisualMode"
import Empty from "components/Appointment/Empty"
import Show from "components/Appointment/Show"
import Form from "components/Appointment/Form"
import Confirm from "components/Appointment/Confirm"
import Status from "components/Appointment/Status"
import Error from "components/Appointment/Error"

import { func } from "prop-types";


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFRIM";
  const ERROR_DELETE = "ERROR_DELETE";
  const ERROR_SAVING = "ERROR_SAVING";


  const mode = useVisualMode(props.interview ? SHOW: EMPTY)
  const onSave = function (name, interviewer) {
    if (name && interviewer) {
      const interview = {
        student:name,
        interviewer
      }
      mode.transition(SAVING)
      props.bookInterview(props.id, interview).then(() => {
      mode.transition(SHOW)
    })
  }
  }

  const Delete = function (){
    mode.transition(DELETING)
    props.deleteInterview(props.id)
      .then(()=>{
        mode.transition(EMPTY)
      })
      .catch(error => mode.transition(ERROR_DELETE, true));
  }
  const onDelete =function (){
    mode.transition(CONFIRM);

  }

  const onEdit = function (){
    mode.transition(CREATE)
  }

  return <>
    <Header time={props.time} />
    {mode.mode === EMPTY && <Empty onAdd={() => {
     
      mode.transition(CREATE)
      }}/>}
     
    {mode.mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer.name}
        onDelete={onDelete}
        onEdit={onEdit}
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
    {mode.mode === CONFIRM && (
      <Confirm
      Delete={Delete}
      onCancelDelete={()=> {
        mode.transition(SHOW)
      }}
    
    />
    )}
     {mode.mode === SAVING && (
      <Status info="Saving"/>
  )}
    {mode.mode === DELETING && (
        <Status info="Deleting"/>
    )}
  {mode.mode === ERROR_DELETE && (
      <Error 
        message={"Could not delete appointment"}
        onClose={mode.back}
      />
    )}

    {mode.mode === ERROR_SAVING && (
      <Error 
        message={"Could not save appointment"}
        onClose={mode.back}
      />
    )}


  </>;
}