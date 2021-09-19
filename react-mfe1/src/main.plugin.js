import * as React from "react";
import {Application} from "./application";

export class MainApplicationPlugin extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Application header={this.props.header} eventBus={this.props.eventBus} basename={this.props.basename} />;
  }
}
