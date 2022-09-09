/**
 * @jest-environment jsdom
 */

import React from "react";
import "./matchMedia";
// import renderer from 'react-test-renderer'
import TransValue from "../Components/TransValue";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";

global.IS_REACT_ACT_ENVIRONMENT = true;

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // unmountComponentAtNode(container);
  // container.remove();
  container = null;
});

it("test TransValue value", () => {
  act(() => {
    const root = createRoot(container);
    root.render(<TransValue value="500000" />);
  });
  expect(container.textContent).toBe("0.00500000 BTC");
});

it("test TransValue change flag", () => {
  act(() => {
    const root = createRoot(container);
    root.render(<TransValue flag value="500000" />);
  });
  expect(container.textContent).toBe("$96.24");
});
