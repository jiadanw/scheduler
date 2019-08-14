import React from "react";

import { render, cleanup } from "@testing-library/react";

import Application from "components/Application";

import {waitForElement, fireEvent} from "@testing-library/react";

afterEach(cleanup);

it("defaults to Monday and changes the schedule when a new day is selected", () => {
  const { getByText, debug } = render(<Application />);

  return waitForElement(() => getByText("Monday")).then(() => {
    fireEvent.click(getByText("Tuesday"));

    debug();
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
});
// it("changes the schedule when a new day is selected", async () => {
//   const { getByText } = render(<Application />);

//   await waitForElement(() => getByText("Monday"));

//   fireEvent.click(getByText("Tuesday"));

//   expect(getByText("Leopold Silvers")).toBeInTheDocument();
// });



