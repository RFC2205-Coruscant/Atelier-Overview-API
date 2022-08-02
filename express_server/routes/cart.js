var express = require('express');
var {getCart, postCart} = require('../db/index.js');
var router = express.Router();

/* GET home page. */
router.get('/:user_session', async function(req, res, next) {
  var cart = await getCart(req.params.user_session)
  res.status(200).send(cart)
});



router.post('/', async function(req, res, next) {


  const result = await postCart(req.body.sku_id, req.body.user_token);
  res.status(201).send(result)
})

module.exports = router;
