import * as React from "react";
import { Link, Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import {MainApp} from 'app/containers/main-container/main-container';

export namespace SecondRoute {
  export interface Props extends RouteComponentProps<void> {
  }
}

export class SecondRoute extends React.Component<SecondRoute.Props> {

  constructor(props: SecondRoute.Props, context?: any) {
    super(props, context);
  }

  componentDidMount(): void {
    console.log("DID MOUNT");
  }

  componentDidUpdate(prevProps: Readonly<MainApp.Props>, prevState: Readonly<MainApp.State>, snapshot?: any): void {
    console.log("DID UPDATE");
  }

  componentWillUnmount(): void {
    console.log("WILL UNMOUNT");
  }


  render() {
    const { location } = this.props;

    return (
      <div className='third-route'>
        <div className='third-route__text'>This is Second Route</div>
        <div className='contacts-container__submenu'>
          <Link className='fastener-application__link' to='/second/first'>
            This is second level First Route inside Second route
          </Link>
          <Link className='fastener-application__link' to='/second/second'>
            This is second level Second Route inside Second route
          </Link>
          <Link className='fastener-application__link' to='/second/third'>
            This is second level Third Route inside Second route
          </Link>
        </div>
        <Switch location={location}>
          <Route path={'/second/first'}>
            <div className='third-route__subtext'>Really this second level react router inside Angular app</div>
          </Route>
          <Route path={'/second/second'}>
            <div className='third-route__subtext'>OMG It works... O_o</div>
          </Route>
          <Route path={'/second/third'}>
            <div className='third-route__subtext'>Really, It`s awesome...</div>
          </Route>
          <Redirect from={'/second'} to={'/second/first'} />
        </Switch>
      </div>
    );
  }
}
