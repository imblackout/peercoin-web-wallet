import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class PrivateRoute extends Component {
  render() {
    const { wallet, ...props } = this.props;
    if (wallet.address) {
      return (
        <Route {...props} />
      );
    }

    return (
      <Route {...props} />
    );
  }
}
const mapStateToProps = ({ wallet }) => ({
  wallet,
});
export default connect(mapStateToProps, {})(PrivateRoute);
