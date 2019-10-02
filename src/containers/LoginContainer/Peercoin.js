import axios from "axios";

class Peercoin {

    /*
    * Will show debug as console.info
    */
    debugMode = true

    // RPC Command Host
    remoteHost = "http://192.168.0.120:9902";

    // RPC Command result for getblockchaininfo
    blockchaininfo = null;

    errorStatus = null;

    constructor(remoteHost) {
      this.remoteHost = remoteHost;
    }

    getblockchaininfo() {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Basic YmxhY2tvdXQ6MTIzNA=='
          }
          var data = '{"jsonrpc": "1.0", "id":"curltest", "method": "getblockchaininfo", "params": [] }';
      
          axios.post(this.remoteHost, data)
          .then((response) => {
            this.blockchaininfo = response.data.result;
            if ( this.debugMode ) {
              console.info('----------- debug mode ---------');
              console.info(this.blockchaininfo);
            }
          })
          .catch(error => {
            if (!error.response) {
                // network error
                this.errorStatus = 'Error: Network Error';
                if ( this.debugMode ) {
                  console.info('----------- debug mode ---------');
                  console.info(this.errorStatus);
                }
            } else {
                this.errorStatus = error.response.data.message;
            }
          })
    }
}
export default Peercoin;
