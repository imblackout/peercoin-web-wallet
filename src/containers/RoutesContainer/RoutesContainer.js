import React, { PureComponent } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import LoginContainer from 'containers/LoginContainer/LoginContainer';
import MintingContainer from 'containers/MintingContainer/MintingContainer';
import WalletContainer from 'containers/WalletContainer/WalletContainer';

class RoutesContainer extends PureComponent {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={LoginContainer} />
        <Route exact path="/mints" component={MintingContainer} />
        <Route exact path="/wallet" component={WalletContainer} />
        <Redirect to="/404" />
      </Switch>
    );
  }
}

export default RoutesContainer;
