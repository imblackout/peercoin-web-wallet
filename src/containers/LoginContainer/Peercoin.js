import axios from "axios";

class Peercoin {

    /*
    * Will show debug as console.info
    */
    debugMode = true

    // RPC Command Host
    remoteHost;

    // RPC Command result for getblockchaininfo
    blockchaininfo = null;

    // RPC Command result for getbalance
    balance = null;

    errorStatus = null;

    mints = null;

    constructor() {
      // TO REFACTOR HERE
      this.remoteHost = "http://192.168.0.120:9902";
      }

    // Refactor every functions to use rpc.queryMethod()

    /*
    * Retrieve result of RPC Command "listminting"
    *
    * As JSON
    * return this.mints property
    */
   listminting() {

    // Refactor this to a function so we can call like
    // rpc.queryMethod("getbalance") 
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Basic YmxhY2tvdXQ6MTIzNA=='
    }
    var data = '{"jsonrpc": "1.0", "id":"curltest", "method": "listminting", "params": [] }';

    axios.post(this.remoteHost, data)
    .then((response) => {
      this.mints = response.data.result;
      if ( this.debugMode ) {
        console.info('----------- debug mode ---------');
        console.info('----------- listminting ---------');
        console.info(this.mints);
      }
      return this.mints;
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


      
    /*
    * Retrieve result of RPC Command "listtransactions"
    *
    * As JSON
    * return this.balance property
    */
    listaccounts() {

      // Refactor this to a function so we can call like
      // rpc.queryMethod("getbalance") 
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Basic YmxhY2tvdXQ6MTIzNA=='
      }
      var data = '{"jsonrpc": "1.0", "id":"curltest", "method": "listaccounts", "params": [] }';
  
      axios.post(this.remoteHost, data)
      .then((response) => {
        this.listaccounts = response.data.result;
        if ( this.debugMode ) {
          console.info('----------- debug mode ---------');
          console.info('----------- listaccounts ---------');
          console.info(this.listaccounts);
        }
        return this.balance;
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


  
    /*
    * Retrieve result of RPC Command "getbalance"
    *
    * As JSON
    * return this.balance property
    */
    getbalance() {

      // Refactor this to a function so we can call like
      // rpc.queryMethod("getbalance") 
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Basic YmxhY2tvdXQ6MTIzNA=='
      }
      var data = '{"jsonrpc": "1.0", "id":"curltest", "method": "getbalance", "params": [] }';
  
      axios.post(this.remoteHost, data)
      .then((response) => {
        this.balance = response.data.result;
        if ( this.debugMode ) {
          console.info('----------- debug mode ---------');
          console.info('----------- getbalance ---------');
          console.info(this.balance);
        }
        return this.balance;
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

    /*
    * Retrieve result of RPC Command "getblockchaininfo"
    *
    * As JSON
    * return this.blockchaininfo property
    */
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
              console.info('----------- getblockchaininfo ---------');
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
