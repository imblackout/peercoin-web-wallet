import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Layout } from 'antd';
import Button from '@material-ui/core/Button';

import SimpleCard from './SimpleCard.js';
import FolderList from './FolderList.js';
import ListItem from './ListItem.js';
import Dashboard from './Dashboard.js';

// Change this namespace
import Peercoin from 'containers/LoginContainer/Peercoin';

import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import 'react-awesome-slider/dist/styles.css';

const { Content } = Layout;

const MAX_SET_INTERVAL = 1000;

class WalletContainer extends PureComponent {

  peercoin = null

  constructor(props) {
    super(props);
    this.state = {
      wallet: {
          balance: 0
      },
      transactions: []
    };

    // Put this host in config file
    this.peercoin = new Peercoin("http://192.168.0.120:9902");

    // Call RPC commands at MAX_SET_INTERVAL
    this.interval = setInterval(() => this.update(), MAX_SET_INTERVAL);
  }

  componentDidMount() {
    this.update();
  }

  update = () => {
    this.peercoin.getwalletinfo().then(result => {
        this.setState({ wallet: result });
    });

    this.peercoin.listtransactions().then(result => {
        this.setState({ transactions: result });
    });

  }

  
  render() {

    this.transactions = this.state.transactions.map((transaction, key) =>
        <React.Fragment>
          <FolderList transaction={transaction}></FolderList>
        </React.Fragment>
    );

    return (
        <Dashboard transactions={this.transactions}></Dashboard>
    );
  }
}

WalletContainer.propTypes = {
  history: PropTypes.object,
};

WalletContainer.defaultProps = {
  history: PropTypes.object,
};

export default WalletContainer;
