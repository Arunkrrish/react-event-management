var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var bodyParser = require('body-parser');
var cors = require('cors');

/* GET users listing. */
router.get('/:id', function (req, res, next) {
  // Comment out this line:
  //res.send('respond with a resource');

  // And insert something like this instead:
  //   res.json([{
  //   	id: 1,
  //   	username: "samsepi0l"
  //   }, {
  //   	id: 2,
  //   	username: "D0loresH4ze"
  //   }]);

  var url = 'http://127.0.0.1:5984/reduxstore/_all_docs?include_docs=true';
  fetch(url)
    .then(function (httpResponse) {
      console.log('Request success: ', httpResponse.body);
      return httpResponse.json();
    })
    .then(function (showlistdetail) {
      console.log('Request success: ', showlistdetail);
      res.send(showlistdetail.rows)
    })
    .catch(function (error) {
      console.log('Request failure: ', error);
    });
});

router.post('/', function (req, res, next) {
  console.log(req.body)
  var url = 'http://127.0.0.1:5984/reduxstore/';
  fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body)
    })
    .then(function (httpResponse) {
      console.log('Request success: ', httpResponse.body);
      return httpResponse.json();
    })
    .then(function (data) {
      console.log('Request success: ', data);
      res.send({
        success: data
      })
    })
    .catch(function (error) {
      console.log('Request failure: ', error);
    });


});

module.exports = router;
