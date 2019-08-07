import React from "react";

import "components/InterviewerList.scss";

import InterviewerListItem from "components/InterviewerListItem"

export default function InterviewerList(props){
  return(
    props.interviewers.map((interviewer) => {
      return <InterviewerListItem
       name={interviewer.name}
       avatar={interviewer.avatar}
       setInterviewer={() => props.setInterviewer(interviewer.id)}
      selected={props.interviewer === interviewer.id}
      />
    })

  )
}


