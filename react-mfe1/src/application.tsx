import {BrowserRouter} from "react-router-dom";
import {App} from "app/index";
import * as React from "react";

export interface ApplicationProps {
  header?: string;
}

export const Application = (props: ApplicationProps) => {
  return (
    <BrowserRouter>
      <App header={props.header} />
    </BrowserRouter>
  );
}
