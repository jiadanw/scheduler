import React from "react";

// import "components/DayListItem.scss";
import DayListItem from "components/DayListItem";

export default function DayList(props) {

 return (
  props.days.map((day) => {
    return  <DayListItem key={day.id} name={day.name} setDay={props.setDay} spots={day.spots} selected={day.name === props.day} />
  })
)
}