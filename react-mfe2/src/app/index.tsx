import * as React from 'react';
import {hot} from 'react-hot-loader';
import './index.less';
import {MainApp} from 'app/containers/main-container/main-container';

export const App = hot(module)((props: Record<string, unknown>) => {
    console.dir(props);
    return (
      <div>
        COUNT: {props.count}
        <MainApp/>
      </div>
    );
  })
;
