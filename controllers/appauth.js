
  var express = require('express')
  , router = express.Router()

const dotenv = require('dotenv').config();
//const express = require('express');
const app = express();
const nonce = require('nonce')();
const querystring = require('querystring');
var shopifyAPI = require('shopify-node-api');
const request = require('request-promise');
const bodyParser = require('body-parser');
var non = nonce();
const forwardingAddress = "https://technologic.ngrok.io";
const shopName = 'straydogdesigns.myshopify.com';
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true,
}));
const config ={
  shopify_api_key: process.env.SHOPIFY_API_KEY, // Your API key
  shopify_shared_secret: process.env.SHOPIFY_API_SECRET, // Your Shared Secret
  access_token: process.env.SHOPIFY_API_TOKEN, //permanent token
  verbose: false
}
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true,
}));
 /**
 * Shopify Auth Section
 *  */

router.get('/', (req, res) => {
console.log("router get /")

  const shop = req.query.shop;
  if (shop) {
    
      var Shopify = new shopifyAPI({
        shop: shop, 
        shopify_api_key: process.env.SHOPIFY_API_KEY, // Your API key
        shopify_shared_secret: process.env.SHOPIFY_API_KEY, // Your Shared Secret
        shopify_scope: 'read_customers,write_customers',
        redirect_uri: forwardingAddress,
        nonce:non.toString() // you must provide a randomly selected value unique for each authorization request
      });
  
  var auth_url = Shopify.buildAuthURL();
  // Assuming you are using the express framework
  // you can redirect the user automatically like so
  res.redirect(auth_url);   

  } 
  else {
    return res.status(400).send('Missing shop parameter. Please add ?shop=your-development-shop.myshopify.com to your request');
  }


});


module.exports = router