import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Layout } from 'antd';
import axios from "axios";
import Peercoin from './Peercoin';

import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const { Content } = Layout;

const MAX_SET_INTERVAL = 1000;

class LoginContainer extends PureComponent {

  peercoin = null

  constructor(props) {
    super(props);
    this.state = {

      // Show percentage on circular display
      // Default at 0
      percentage: 0,
      
      // In px
      leaf_size: 100,

      // API's result from RPC command line
      blockchaininfo:null,
      blocks:0,

      // Peercoin's API error message
      errorMessage:null,
      errorStatus:null
    };

    this.peercoin = new Peercoin("http://192.168.0.120:9902");
    this.peercoin.getblockchaininfo();

    // Call RPC commands at MAX_SET_INTERVAL
    this.interval = setInterval(() => this.getblockchaininfo(), MAX_SET_INTERVAL);
  }

  // Put this inside Peercoin component too
  handleError = (error) => {

    if ( error.code = -28 ) {
      this.errorMessage = error.message;
    }
  }

  // make an external component for it called (PeercoinComponent with more usefuls methods)
  getblockchaininfo = () => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Basic YmxhY2tvdXQ6MTIzNA=='
    }

    var data = '{"jsonrpc": "1.0", "id":"curltest", "method": "getblockchaininfo", "params": [] }';

    axios.post('http://192.168.0.120:9902', data)
    .then((response) => {

      this.blockchaininfo = response.data.result;
      this.setState({ blocks: this.blockchaininfo.blocks });
      this.updatePercentage(this.blockchaininfo.verificationprogress);
    })
    .catch(error => {
      if (!error.response) {
          // network error
          this.state.errorStatus = 'Error: Network Error';
      } else {
          this.state.errorStatus = error.response.data.message;
      }
    })
  }


  updatePercentage(progress) {
    console.log(this.state.percentage);
    this.setState({ percentage : progress * 100 });
  }
  
  listminting = () => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Basic YmxhY2tvdXQ6MTIzNA=='
    }
    var data = '{"jsonrpc": "1.0", "id":"curltest", "method": "listminting", "params": [] }';

    axios.post('http://192.168.0.120:9902', data)
    .then((response) => {
      console.log(response);
    }, (error) => {
      this.state.error = error;
      this.state.hasError = true;
      this.handleError(error);
    });
  }

  increase = () => {

    this.getblockchaininfo();
  }

  render() {
    return (
      <div className="block">
        <Layout>
          <Content className="main">
            {this.state.hasError}
            <CircularProgressbarWithChildren value={this.state.percentage}
                    strokeWidth={0.5}
                    styles={buildStyles({
                      textColor: 'black',
                      pathColor: 'white',
                      trailColor: '#3cb054',
                      pathTransitionDuration: 1
                    })}
                  >
                    {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}
                    <img
                      style={{ width: this.state.leaf_size , marginTop: -5 }}
                      src="https://www.peercoin.net/img/logos/icononly/outsidecircle/Transparent/WhiteLeaf/peercoin-leaf-white-transparent.svg"
                      alt="peercoin"
                    />
            </CircularProgressbarWithChildren>

            <Row>
              <Col className="center" sm={{ span: 12, offset: 6 }}>
                <span>{this.state.percentage.toFixed(0) }</span><br></br>
              </Col>
            </Row>
          </Content>
        </Layout>
      </div>
    );
  }
}

LoginContainer.propTypes = {
  history: PropTypes.object,
};

LoginContainer.defaultProps = {
  history: PropTypes.object,
};

export default LoginContainer;
