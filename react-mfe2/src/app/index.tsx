import * as React from 'react';
import {hot} from 'react-hot-loader';
import './index.less';
import {MainApp} from 'app/containers/main-container/main-container';

export const App = hot(module)(() => {
    return (
      <div>
        <MainApp/>
      </div>
    );
  })
;
