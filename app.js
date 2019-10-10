$(document).ready(function() {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "localhost:9902",
        "method": "POST",
        "headers": {
          "Authorization": "Basic YmxhY2tvdXQ6MTIzNA==",
        },
        "data": "{\"jsonrpc\": \"1.0\", \"id\":\"curltest\", \"method\": \"listminting\", \"params\": [] }"
      }
      
      $.ajax(settings).done(function (response) {
        console.log(response);
      });
});
