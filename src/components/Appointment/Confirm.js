import React from "react";
import Button from "components/Button";


export default function Confirm(props){

  return (
    <main class="appointment__card appointment__card--confirm">
      <h1 class="text--semi-bold">Delete the appointment?</h1>
      <section class="appointment__actions">
     <Button danger >Cancel</Button>
    <Button danger onClick={props.Delete}>Confirm</Button>
  </section>
</main>
  );
}