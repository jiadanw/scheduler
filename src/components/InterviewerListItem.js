import React from "react";

import "components/InterviewerListItem.scss";

import classnames from "classnames";

export default function InterviewerListItem(props) {
  const interviewers__item = classnames('interviewers__item',{
    'interviewers__item--selected':props.selected

  })
  return(
  <li className={interviewers__item}>
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt={props.id}
    onClick={ ()=> props.setInterviewer(props.id)
      }
  />
  {props.selected && props.name}
</li>)
}




