const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const nonce = require('nonce')();
const querystring = require('querystring');
var shopifyAPI = require('shopify-node-api');
const request = require('request-promise');
const bodyParser = require('body-parser');
const axios = require('axios');
var non = nonce();
const forwardingAddress = "https://technologic.ga/tag";
const shopName = 'straydogdesigns.myshopify.com';
const config ={
  shopify_api_key: process.env.SHOPIFY_API_KEY, // Your API key
  shopify_shared_secret: process.env.SHOPIFY_API_SECRET, // Your Shared Secret
  access_token: process.env.SHOPIFY_API_TOKEN, //permanent token
  verbose: false
}


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
var shopifyAPI = require('shopify-node-api');
 /**
 * Shopify Auth Section
 *  */

app.get('/auth', (req, res) => {


  const shop = req.query.shop;
  if (shop) {
    
  
var Shopify = new shopifyAPI({
  shop: shop, 
  shopify_api_key: process.env.SHOPIFY_API_KEY, // Your API key
  shopify_shared_secret: process.env.SHOPIFY_API_KEY, // Your Shared Secret
  shopify_scope: 'read_customers,write_customers,read_content, write_content',
  redirect_uri: forwardingAddress + '/finish_auth',
  nonce:non.toString() // you must provide a randomly selected value unique for each authorization request
});
  
  var auth_url = Shopify.buildAuthURL();
  // Assuming you are using the express framework
  // you can redirect the user automatically like so
  res.redirect(auth_url);   

  } else {
    return res.status(400).send('Missing shop parameter. Please add ?shop=your-development-shop.myshopify.com to your request');
  }


});
app.get('/tag/finish_auth', function(req, res){

/**
  const shop = req.query.shop;
  if (shop) {
    var Shopify = new shopifyAPI({
      shop: shop, // MYSHOP.myshopify.com
      shopify_api_key: process.env.SHOPIFY_API_KEY2, // Your API key
      shopify_shared_secret: process.env.SHOPIFY_API_SECRET2, // Your Shared Secret
      shopify_scope: 'read_customers,write_customers',
      nonce:non.toString()
    }), 
  **/
    query_params = req.query;
    console.log(query_params);
    Shopify.exchange_temporary_token(query_params, function(err, data){
      // This will return successful if the request was authentic from Shopify
      // Otherwise err will be non-null.
      // The module will automatically update your config with the new access token
      // It is also available here as data['access_token']
      console.log(data);
      console.log(err);
    });
    /** 
  } else {
    return res.status(400).send('Missing shop parameter second time. Please add ?shop=your-development-shop.myshopify.com to your request');
  }
*/
  });


app.listen(3004, () => {
  console.log('Example app listening on port 3004!');
});



module.exports = router