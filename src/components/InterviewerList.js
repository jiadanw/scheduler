import React from "react";
import PropTypes from 'prop-types';

import "components/InterviewerList.scss";

import InterviewerListItem from "components/InterviewerListItem"

InterviewerList.propTypes = {
  interviewer: PropTypes.number,
  setInterviewer: PropTypes.func.isRequired
};

export default function InterviewerList(props){
  return(
<section className="interviewers">
     <h4 className="interviewers__header text--light">Interviewer</h4>
     <ul className="interviewers__list">
       {props.interviewers.map((person) => {
         return <InterviewerListItem
                 key={person.id}
                 avatar={person.avatar}
                 name={person.name}
                 setInterviewer={() => props.setInterviewer(person.id)}
                 selected={person.id===props.interviewer}/>
       })}
     </ul>
   </section>
  )
}
