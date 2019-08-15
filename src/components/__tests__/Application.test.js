import React from "react";

import { render, cleanup, getAllByTestId, getByPlaceholderText, queryByText,getByAltText, getByText } from "@testing-library/react";

import Application from "components/Application";

import {waitForElement, fireEvent} from "@testing-library/react";

afterEach(cleanup);
describe("Application",()=> {


it("defaults to Monday and changes the schedule when a new day is selected", () => {
  const { getByText } = render(<Application />);

  return waitForElement(() => getByText("Monday")).then(() => {
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
});

it("after booking, remaining spot is reduced by 1", async ()=> {
  const {container} = render(<Application />);
  await waitForElement(()=> {
    return getByText(container, 'Archie Cohen')
  })
  const appointment = getAllByTestId(container, "appointment")[0];
  fireEvent.click(getByAltText(appointment,"Add"));
  fireEvent.change(getByPlaceholderText(appointment, /student name/i), 
      {target:{value:"Lydia Miller-Jones"}
    })
  fireEvent.click(getByText(appointment, "Save"));
  expect(getByAltText(appointment,"Processing")).toBeInTheDocument();
  await waitForElement(()=> 
  queryByText(appointment, "Lydia Miller-Hones"));
  getAllByTestId(container, "Archie Cohen");

  })
})
