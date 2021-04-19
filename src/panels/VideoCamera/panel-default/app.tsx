import React from "react";
import { HashRouter ,Route, Redirect, Switch, useHistory } from "react-router-dom";
import { useDeviceInfo } from "@hooks/useDeviceInfo";
import { CameraPanel } from "./CameraPanel";
import { entryWrap } from "@src/entryWrap";
import { EventDetail } from "./EventDetail";
function App() {
  const [{ offline, powerOff, deviceInfo }] = useDeviceInfo();

  return (
    <HashRouter>
      <Switch>
        <Redirect exact from="/" to="/list"></Redirect>
        <Route
          path="/list"
          render={() => (
            <CameraPanel offline={offline} powerOff={powerOff}></CameraPanel>
          )}
        ></Route>
        <Route
          path="/detail"
          render={(item) => (
            <EventDetail
              item={item}
              deviceInfo={deviceInfo}
              ></EventDetail>
          )}
        ></Route>
      </Switch>
    </HashRouter>
  );
}

entryWrap(App);