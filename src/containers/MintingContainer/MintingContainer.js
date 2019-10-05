import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Layout } from 'antd';

// Change this namespace
import Peercoin from 'containers/LoginContainer/Peercoin';
import ApexCharts from 'apexcharts'


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

    // Make this *** loop over mints
    const elements = []
    const items = []

    console.log("what is mintsDisplay");
    console.log(this.state.mintsDisplay);

    this.mints = this.state.mintsDisplay.map((mint, key) =>
      <CircularProgressbarWithChildren
      value={mint['age-in-day'] * 100 / 30} // age in day maxed out to 30 days
      text={`${mint['amount'] / 1000000} PPC , ${mint['age-in-day']} ${mint['attempts']}`}
      strokeWidth={1}
      radioCircle={0.9}
      styles={buildStyles({
        // Rotation of path and trail, in number of turns (0-1)
        rotation: 0.25,
     
        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
        strokeLinecap: 'round',
     
        // Text size
        textSize: '10px',
     
        // How long animation takes to go from one percentage to another, in seconds
        pathTransitionDuration: 300,
     
        // Can specify path transition in more detail, or remove it entirely
        // pathTransition: 'none',
     
        // Colors
        pathColor: `rgba(0, 152, 0, ${mint['age-in-day'] * 100 / 30})`,
        textColor: '#7ae072',
        trailColor: '#7ae072',
        backgroundColor: '#7ae072',
      })}
    >
    </CircularProgressbarWithChildren>
  );

    return (
      <div className="block">
        <Layout>
          <Content className="main">
            <div className="pulse"></div>
            <Row className="wallet_btn_area">
              <Col className="wallet_label center" sm={{ span: 12, offset: 6 }}>
                {this.mints}
              </Col>
            </Row>
          </Content>
        </Layout>
      </div>
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
