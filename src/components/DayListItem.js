import React from "react";
import classnames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {

  const dayClass = classnames("day-list", {
    "day-list__item": props.name,
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  const formatSpots = function(spots) {

    if (spots === 0) {
      return "no spots remaining";
    }
    if (spots === 1 ) {
      return `${spots} spot remaining`;
    }
    return `${spots} spots remaining`;
  };
  
  return (
    <li className={dayClass} selected={props.selected} onClick={() => props.setDay(props.name)} data-testid="day">
      <h2>{props.name}</h2>
      <h3>{formatSpots(props.spots)}</h3>
    </li>
  );
}