import React from 'react';

export class PropsComponent extends React.Component<Record<string, unknown>> {
  render() {
    return (
      <div>
        COUNT FROM PROPS: {this.props.count ?? 'Click the button above'}
      </div>
    );
  }
}
