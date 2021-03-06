import * as React from 'react';
import { hot } from 'react-hot-loader';
import './index.less';
import 'semantic-ui-css/semantic.min.css';
import {NotesList} from "app/components/notes-list";
import {ApplicationProps} from "../application";
import 'semantic-ui-css/semantic.min.css'
import {Switch, Route, Redirect} from "react-router-dom";

export const App = hot(module)((props: ApplicationProps) => {
    return (
      <div>
        <h1>{props.header}</h1>
        <Switch>
          <Route path="/adminPanel">
            <NotesList />
          </Route>
          <Redirect from="/" to="/adminPanel" />
        </Switch>
      </div>
    );
  })
;
