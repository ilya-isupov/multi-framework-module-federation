import * as React from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import { FirstRoute } from 'app/containers/second-component/contacts-container';
import { SecondRoute } from 'app/containers/first-route/about-container';

export namespace MainApp {
  export interface Props {
  }

  export interface State {
  }
}

export class MainApp extends React.Component<MainApp.Props, MainApp.State> {
  constructor(props: MainApp.Props, context?: any) {
    super(props, context);
  }

  render() {
    return (
      <div className='fastener-application'>
        <div className='fastener-application__menu'>
          <Link className='fastener-application__link' to='/first'>
            This is First Route
          </Link>
          <Link className='fastener-application__link' to='/second'>
            This is Second Route
          </Link>
          <Link className='fastener-application__link' to='/third'>
            This is Third Route
          </Link>
        </div>
        <Switch>
          <Route path={'/first'} component={FirstRoute} />
          <Route path={'/second'} component={SecondRoute} />
          <Route path={'/third'}>
            <div className='contacts-container'>This is Third Route</div>
          </Route>
          <Redirect from={'/'} to={'/first'} />
        </Switch>
      </div>
    );
  }
}
