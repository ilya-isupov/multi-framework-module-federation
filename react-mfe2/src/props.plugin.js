import {App} from 'app/index';
import * as React from 'react';
import {PropsComponent} from "app/components/props-plugin/props.component";

export class PluginApplication extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <PropsComponent count={this.props.count} />
      </div>
    )
  }
}
