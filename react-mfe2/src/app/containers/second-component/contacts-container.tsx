import * as React from 'react';

export namespace FirstRoute {
  export interface Props {
  }
}

export class FirstRoute extends React.Component<FirstRoute.Props> {

  constructor(props: FirstRoute.Props, context?: any) {
    super(props, context);
  }

  render() {

    return (
      <div className='contacts-container'>
        This is first react route inside Angular app
      </div>
    );
  }
}
