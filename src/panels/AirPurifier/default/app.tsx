import {
  HashRouter,
  Route,
  Switch,
} from 'react-router-dom';

import { AirPurifierPanel } from './AirPurifierPanel';
import { FilterReset } from './FilterReset';
import React from 'react';
import { StatusTip } from '@components/StatusTip';
import { entryWrap } from '@src/entryWrap';
import { useDeviceInfo } from '@hooks/useDeviceInfo';

function App() {
  const [{
    deviceInfo,
    deviceData,
    productInfo,
    templateMap,
    offline,
    powerOff,
    statusTip,
  }, { doControlDeviceData }] = useDeviceInfo();

  return (
    statusTip ? <StatusTip {...statusTip} fillContainer/> : (
      <HashRouter>
        <div>
          <Switch>
            <Route
              path="/filter-reset"
            >
              <FilterReset
                doControlDeviceData={doControlDeviceData}
              />
            </Route>
            <Route path="/">
              <AirPurifierPanel
                deviceInfo={deviceInfo}
                productInfo={productInfo}
                templateMap={templateMap}
                deviceData={deviceData}
                offline={offline}
                powerOff={powerOff}
                doControlDeviceData={doControlDeviceData}
              />
            </Route>
          </Switch>
        </div>
      </HashRouter>
    )
  );
}

entryWrap(App);
