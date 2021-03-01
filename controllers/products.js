
  var express = require('express')
  , router = express.Router();

  const dotenv = require('dotenv').config();
//const express = require('express');
const app = express();
const nonce = require('nonce')();
const querystring = require('querystring');
var shopifyAPI = require('shopify-node-api');
const request = require('request-promise');
const bodyParser = require('body-parser');
var non = nonce();
const forwardingAddress = "https://greggory.org/products";
const shopName = 'rustic-house-dummy-store.myshopify.com';
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true,
}));
const config ={
  shop: shopName, // MYSHOP.myshopify.com
  shopify_api_key: process.env.SHOPIFY_API_KEY, // Your API key
  shopify_shared_secret: process.env.SHOPIFY_API_SECRET, // Your Shared Secret
  access_token: process.env.SHOPIFY_API_TOKEN, //permanent token
}
router.get('/', (req, res) => {
    console.log('products runnign')

  
  var Shopify = new shopifyAPI({
    shop: shopName, // MYSHOP.myshopify.com
    shopify_api_key: process.env.SHOPIFY_API_KEY, // Your API key
    shopify_shared_secret: process.env.SHOPIFY_API_SECRET, // Your Shared Secret
      shopify_scope: 'read_products, write_products,read_customers,write_customers,read_inventory,write_inventory',
    redirect_uri:  forwardingAddress + '/finish_auth',
    nonce: non.toString() // you must provide a randomly selected value unique for each authorization request
  });
  var auth_url = Shopify.buildAuthURL();
  // Assuming you are using the express framework
  // you can redirect the user automatically like so
  res.redirect(auth_url);
});
router.get('/finish_auth', function(req, res){
    console.log('finish auth')
  var Shopify = new shopifyAPI({
    shop: shopName, // MYSHOP.myshopify.com
    shopify_api_key: process.env.SHOPIFY_API_KEY, // Your API key
    shopify_shared_secret: process.env.SHOPIFY_API_SECRET, // Your Shared Secret
      shopify_scope: 'read_products, write_products,read_customers,write_customers,read_inventory,write_inventory',
    nonce:non.toString()
  }), 
    query_params = req.query;
  Shopify.exchange_temporary_token(query_params, function(err, data){
    // This will return successful if the request was authentic from Shopify
    // Otherwise err will be non-null.
    // The module will automatically update your config with the new access token
    // It is also available here as data['access_token']
    console.log(data);
    console.log(data['access_token']);
    console.log(err);
  });
});

/*******************
 * 
 * 
 * Store Authroization Complete*******
 *
 ********************/


//Ads Prospect 2 Tag after customer submission. 
router.get('/get_all_products', (req, res) => {
    console.log("/get_all_products")


function getCustomerTags(callback){

      var Shopify = new shopifyAPI(config);
      
    Shopify.get('/admin/api/2021-01/products' + '.json', function(err, data, headers){
       if(err){
         console.log(err);
         return;}
       else{
        products = data.products;
           callback(products);}
      });
    }
    function logProduct(products) {
        console.log(products)


    }

    getCustomerTags( logProduct);
 
   
});  



  module.exports = router