import {BrowserRouter} from "react-router-dom";
import {App} from "app/index";
import * as React from "react";

export class MainApplicationPlugin extends React.Component {
  store;
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <BrowserRouter>
        <App />
        </BrowserRouter>
      </div>
    )

  }
}
