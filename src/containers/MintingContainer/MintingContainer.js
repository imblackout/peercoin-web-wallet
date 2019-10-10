import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Layout } from 'antd';

// Change this namespace
import Peercoin from 'containers/LoginContainer/Peercoin';
import ApexCharts from 'apexcharts'
import MintingView from '../WalletContainer/MintingView.js';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { ListItemSecondaryAction } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

// Radial separators
import RadialSeparators from 'containers/MintingContainer/RadialSeparators';
import SimpleSlider from './SimpleSlider';

const { Content } = Layout;

const MAX_SET_INTERVAL = 1000;

class MintingContainer extends PureComponent {

  peercoin = null

  constructor(props) {
    super(props);
    this.state = {
      mints: [
        {
          address:"1234"
        }
      ],
      result:[],
      mintsDisplay:[
        {
          "account": "",
          "address": "PXbgh6DtoYazDa1HW83AQuTJrpqsgoLZXy",
          "age-in-day": "18",
          "amount": "400359000",
          "attempts": 0,
          "coin-day-weight": "0",
          "input-txid": "00522750c5b8cef43913b751bfd6a154776a77ce19743e5174ad31b252b7f523",
          "minting-probability-10min": 0,
          "minting-probability-24h": 0,
          "minting-probability-30d": 0.1882962362346187,
          "minting-probability-90d": 0.9794815281721343,
          "proof-of-stake-difficulty": 5.905860146560868,
          "search-interval-in-sec": 0,
          "status": "immature",
          "time": "1568601003",
        }
      ]
    };

    // Put this host in config file
    this.peercoin = new Peercoin("http://192.168.0.120:9902");

    // Call RPC commands at MAX_SET_INTERVAL
    this.interval = setInterval(() => this.updateMints(), MAX_SET_INTERVAL);
  }

  componentDidMount() {
    this.updateMints();
  }

  updateMints = () => {
    console.log('updatemints');
    let mints = this.peercoin.listminting();

    // After promise call
    // Store result variable into the state
    // for future display
    mints.then(result => {
        this.setState({mintsDisplay: result});
    }, function(err) {
      // Error: "It broke"
      console.log(err); 
    });
  }

  
  render() {

    this.mints = this.state.mintsDisplay.map((mint, key) =>
        <React.Fragment>
          <List>
              <ListItem>
                <ListItemText primary="APR" secondary='18' />
                <ListItemText primary={mint.address} secondary={mint.category} />
                <ListItemText primary={mint['age-in-day']} />
                <ListItemSecondaryAction>
                    <ListItemText primary={mint.attempts} />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider variant="inset" component="li" />
            </List>
        </React.Fragment>
    );

    return (
      <MintingView mints={this.mints}></MintingView>
    );
  }
}

MintingContainer.propTypes = {
  history: PropTypes.object,
};

MintingContainer.defaultProps = {
  history: PropTypes.object,
};

export default MintingContainer;
