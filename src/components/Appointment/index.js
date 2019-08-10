import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header"
import {useVisualMode} from "hooks/userVisualMode"
import Empty from "components/Appointment/Empty"
import Show from "components/Appointment/Show"
import Form from "components/Appointment/Form"
import Confirm from "components/Appointment/Confirm"
import { func } from "prop-types";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFRIM";
  const ERROR_DELETE = "ERROR_DELETE";
  const ERROR_SAVING = "ERROR_SAVING";


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

  const Delete = function (){
    mode.transision(SAVING)
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

      {console.log("---------props",props.interview.interviewer)}
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
      // message={"Are you sure you would like to delete?"}
      Delete={Delete}
      onCancelDelete={()=> {
        mode.transition(SHOW)
      }}
    
    />
    )}

  </>;
}