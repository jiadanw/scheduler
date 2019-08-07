import React from "react";
import { tsPropertySignature } from "@babel/types";

export default function Error(props){
  return (
    <main class="appointment__card appointment__card--error">
  <section className="appointment__error-message">
    <h1 className="text--semi-bold">Error</h1>
    <h3 className="text--light">Could not delete appointment</h3>
  </section>
  <img
    class="appointment__error-close" onClick={props.onClose}
    src="images/close.png"
    alt="Close"
  />
</main>
  );
}