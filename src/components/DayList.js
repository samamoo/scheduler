import React from "react";
import classnames from "classnames";
import "components/DayListItem.scss";
import DayListItem from "components/DayListItem.js";

export default function DayList(props) {

  // props.days = days

  return <ul>
    { props.days.map(day => {
      return <DayListItem
      key={day.id}
      name={day.name} 
      spots={day.spots} 
      selected={day.name === props.day}
      setDay={props.setDay}
      />
    })
  }
  </ul>
};