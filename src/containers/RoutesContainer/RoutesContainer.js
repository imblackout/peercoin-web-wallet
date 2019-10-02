import React, { PureComponent } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import LoginContainer from 'containers/LoginContainer/LoginContainer';
import MintingContainer from 'containers/MintingContainer/MintingContainer';
import MainWalletContainer from 'containers/MainWalletContainer/MainWalletContainer';

class RoutesContainer extends PureComponent {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={LoginContainer} />
        <Route exact path="/mints" component={MintingContainer} />
        <Route exact path="/wallet" component={MainWalletContainer} />
        <Redirect to="/404" />
      </Switch>
    );
  }
}

export default RoutesContainer;
