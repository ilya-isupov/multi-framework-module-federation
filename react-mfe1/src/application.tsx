import {BrowserRouter} from "react-router-dom";
import {App} from "app/index";
import * as React from "react";
import {ApplicationService} from "./application.service";
import {EventBusService} from "app/models/event-bus.model";

export interface ApplicationProps {
  header?: string;
  eventBus?: EventBusService;
}

export class Application extends React.Component<ApplicationProps> {
  private applicationService: ApplicationService = ApplicationService.getInstance();

  constructor(props: ApplicationProps) {
    super(props);
    console.log(props);
    this.applicationService.setEventBus(this.props.eventBus);

  }

  render(): React.ReactNode {
    return (
      <BrowserRouter>
        <App header={this.props.header}/>
      </BrowserRouter>
    );
  }
}
