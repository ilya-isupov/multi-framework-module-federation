import * as React from "react";
import {Application} from "./application";

export class MainApplicationPlugin extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("REACT 1: " + this.props.basename);
    return <Application header={this.props.header} eventBus={this.props.eventBus} globalNavigation={this.props.globalNavigation} basename={this.props.basename} />;
  }
}
