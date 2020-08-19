import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//router components
import CampaignPage from "views/CampaignPage.js";
import Influence from "views/InfluencePage.js";

import 'assets/css/main.css';

window.$host_url = 'https://famefactory2backend.infikick.com/api/v1/';

const BasicRouters = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Influence} />
      <Route path="/influence" component={CampaignPage} />
    </Switch>
  </Router>
);

render(<BasicRouters />, document.getElementById("root"));
