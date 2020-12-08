import React from "react";
import classnames from "classnames";

import "components/Button.scss";
import { action } from "@storybook/addon-actions/dist/preview";

export default function Button(props) {
   const buttonClass = classnames("button", {
      "button--confirm": props.confirm,
      "button--danger": props.danger
    });
   return <button className={buttonClass} disabled={props.disabled} onClick={props.onClick}>{props.children}</button>;
}
