import React from "react";
import Home from "./front/Home";

import { Switch, Route } from "react-router-dom";
import history from "./History";
import {ConnectedRouter} from "connected-react-router";

const Routes = () => (
    <ConnectedRouter history = {history}>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="*" exact component={<label>error</label>} status = {404}/>
        </Switch>
    </ConnectedRouter>
)

export default Routes;