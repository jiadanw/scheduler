import React from "react";

import "components/DayListItem.scss";

import classnames from "classnames";
export default function DayListItem(props) {
 const dayListClass = classnames('day-list__item', {
   'day-list__item--selected' : props.selected,
   'day-list__item--full' : (props.spots === 0)
 })
 return (
   <div
     className={dayListClass}
     onClick={ () => props.setDay(props.name)}
   >
     <h1>{props.name}</h1>
     <p>{props.spots} spots remaining</p>
   </div>)
}