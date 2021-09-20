import { BrowserRouter } from 'react-router-dom';
import { App } from 'app/index';
import * as React from 'react';

export class MainApplicationPlugin extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("REACT 2: " + this.props.basename);
    return (
      <div>
        <React.StrictMode>
            <BrowserRouter basename={this.props.basename}>
              <App/>
            </BrowserRouter>
          </React.StrictMode>
      </div>
    )
  }
}
