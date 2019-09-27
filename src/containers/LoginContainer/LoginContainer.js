import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Layout } from 'antd';

import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const { Content } = Layout;

const MAX_PERCENTAGE = 100;

class LoginContainer extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      percent: 50,
      leaf_size: 200,
      data: null,
      minting: null,
      wallet: null
    };

    this.timeout = 1000;
    this.timer = setInterval(() => this.refresh() , this.timeout);
  }

  refresh = () => {
    fetch('http://localhost:8080/api/getblockchaininfo/')
    .then(response => response.json())
    .then(data => this.setState({ data }));

    fetch('http://localhost:8080/api/minting')
    .then(response => response.json())
    .then(minting => this.setState({ minting }));

    fetch('http://localhost:8080/api/getwalletinfo')
    .then(response => response.json())
    .then(wallet => this.setState({ wallet }));

    fetch('http://localhost:8080/api/listaddressgroupings')
    .then(response => response.json())
    .then(addresses => this.setState({ addresses }));

    if ( this.state.data != null ) {
      this.state.percent = this.state.data.verificationprogress;
      this.state.percent = this.state.percent * 100;
    }

    console.log(this.state);
  }

  showWalletConfirm = () => {
    this.props.history.push('/create');
  }

  showWalletUnlock = () => {
    this.props.history.push('/unlock');
  }

  getPercent = () => {
    return this.state.percent;
  }

  increase = () => {

    const percent = this.state.percent;
    var increment = this.state.percent + 0.5;

    if ( percent == MAX_PERCENTAGE ) {
      return percent;
    }

    this.setState({
      percent: increment
    });
  }

  render() {
    return (
      <div className="block">
        <Layout>
          <Content className="main">
            <div className="pulse"></div>
            <CircularProgressbarWithChildren value={this.getPercent()}
                    strokeWidth={0.3}
                    styles={buildStyles({
                      textColor: 'black',
                      pathColor: 'white',
                      trailColor: '#3cb054',
                    })}
                  >
                    {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}
                    <img
                      style={{ width: this.state.leaf_size , marginTop: -5 }}
                      src="https://www.peercoin.net/img/logos/icononly/outsidecircle/Transparent/WhiteLeaf/peercoin-leaf-white-transparent.svg"
                      alt="peercoin"
                    />
            </CircularProgressbarWithChildren>

            <Row className="wallet_btn_area">
              <Col className="wallet_label center" sm={{ span: 12, offset: 6 }}>
                <span>Updating blockchain</span>
                <button onClick={this.increase}></button>
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
