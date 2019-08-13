import React from "react";
import { tsPropertySignature } from "@babel/types";

export default function Status(props){
  return (
    <main className="appointment__card appointment__card--status">
  <img
    className="appointment__status-image"
    src="images/status.png"
    alt="Loading"
  />
  <h1 class="text--semi-bold">{props.info}</h1>
</main>
  );
}