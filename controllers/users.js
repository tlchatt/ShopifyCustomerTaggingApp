
  var express = require('express')
, router = express.Router()

  const dotenv = require('dotenv').config();
  //const express = require('express');
  //const app = express();
  const nonce = require('nonce')();
  const querystring = require('querystring');
  var shopifyAPI = require('shopify-node-api');
  const request = require('request-promise');
  const bodyParser = require('body-parser');
  const axios = require('axios');
  var non = nonce();
  const forwardingAddress = "https://strapi.ngrok.io";
  const shopName = 'straydogdesigns.myshopify.com';
  const config ={
    shop: shopName, // MYSHOP.myshopify.com
    shopify_api_key: process.env.SHOPIFY_API_KEY2, // Your API key
    shopify_shared_secret: process.env.SHOPIFY_API_SECRET2, // Your Shared Secret
    access_token: process.env.SHOPIFY_API_TOKEN2, //permanent token
    verbose: false
  }
  router.use(bodyParser.json());
  router.use(bodyParser.urlencoded({
    extended: true,
  }));

  
// Object.keys(query_params).forEach(e => console.log(`key=${e}  value=${query_params[e]}`));

  router.get('/addUser', (req, res) => {
      //var shopifyAPI = require('shopify-node-api');
      var Shopify = new shopifyAPI(config);
      query_params = req.query.id;
      console.log('Add user request for user id ' + query_params)
   
  
    Shopify.get('/admin/customers/' + query_params + '.json', function(err, data, headers,){
      //console.log(data.customer.id); // Data contains product json information
      //console.log(headers); // Headers returned from request 802422063215
      
      let externalCustomer = {     
        shopifyCustomerID: "",
        firstName: "",
        lastName : "",
        email: "",
        phone: "",
        defaultAddress:"",
        tags:""     
      };
      externalCustomer.shopifyCustomerID = data.customer.id;
      externalCustomer.firstName = data.customer.first_name;
      externalCustomer.lastName = data.customer.last_name;
      externalCustomer.email = data.customer.email;
      externalCustomer.phone = data.customer.id;
      externalCustomer.phone = data.customer.phone;
      externalCustomer.defaultAddress = data.customer.defaultAddress;
      externalCustomer.tags = data.customer.tags;
      //console.log('get succesfully from ' + data.customer)
      Object.keys(externalCustomer).forEach(e => console.log(`key=${e}  value=${externalCustomer[e]}`));
      getToken(getCustomersCount,externalCustomer);
    });
  
    function getToken(callback,externalCustomer){
      axios
      .post('http://localhost:1337/auth/local', {
          identifier: process.env.STRAPIUN,
          password: process.env.STRAPIPW
      })
      .then(response => {
        // Handle success.
        console.log('Strapi authenticated succesfully ! ');
        //console.log('User profile', response.data.user);
        token=response.data.jwt;
        callback(token,getCustomers,externalCustomer); //function after callback on the end. 
        })
      .catch(error => {
        // Handle error.
        console.log('An error occurred:', error);
      });
    }

    function getCustomersCount(token,callback,externalCustomer) {
      axios
      .get('http://localhost:1337/shopifyUsers/count', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        // Handle success.
      //  console.log('Data: ', response.data);
      console.log('Total ShopifyUsers ', response.data);
      callback(token,response.data,checkCustomerExists,externalCustomer);//function after callback on the end. 
      }) 
      .catch(error => {
        // Handle error.
        console.log('An error occurred:', error);
      });
      
    }
      
    function getCustomers(token,limit,callback,externalCustomer) {
      axios
      .get(`http://localhost:1337/shopifyusers?_limit=${limit}?_sort=shopifyCustomerID:ASC`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        // Handle success.
      //  console.log('Data: ', response.data);
      callback(token,response.data,externalCustomer,postOrNah);
      }) 
      .catch(error => {
        // Handle error.
        console.log('An error occurred:', error);
      });
    
    }
  
    function checkCustomerExists(token,customerData,externalCustomer,callback){
    var totalNumberOnFile = customerData.length;
    var numberOfMatches = 0;
    var customerDataString = JSON.stringify(externalCustomer.id);
    var isDuplicate = false;
     //console.log('external customer id ' + customerDataString);
    
      // basic model, JSON.stringify(obj1) === JSON.stringify(obj2) 
      for(var i = totalNumberOnFile -1; i >= 0 ; i--){
        var internalCustomerDataString = JSON.stringify(customerData[i].shopifyCustomerID);
        //console.log('internal customer' + internalCustomerData);
        if(internalCustomerDataString === customerDataString ){
          var localMatch = customerData[i].shopifyCustomerID;
          console.log(`duplicate found local id ${localMatch}`)
          numberOfMatches ++;
          isDuplicate = true;
        }
      }
      console.log (`matches found ${numberOfMatches}`);
      console.log (`is Duplicate ${isDuplicate}`);
      callback(token,isDuplicate,externalCustomer,localMatch);
    }

    function postOrNah(token,value,externalCustomer,internalCustomer){
      if (value === true){
        console.log('internal customer' + internalCustomer)
        //send to existing customer page.
        redirectURL = 'https://straydogdesigns.com/pages/submit-to-our-gallery';
        console.log('redirecting to' +  redirectURL)
        res.redirect(redirectURL);
      }else{
        console.log('will create new customers')
        postCustomer(token,externalCustomer)
      }
    }
    
    function postCustomer(token,externalCustomer){
      axios
      .post(`http://localhost:1337/shopifyusers/`, {
        shopifyCustomerID: externalCustomer.shopifyCustomerID,
        firstName: externalCustomer.firstName,
        lastName : externalCustomer.lastName,
        email: externalCustomer.email,
        phone:externalCustomer.phone,
        defaultAddress:externalCustomer.defaultAddress,
        tags:externalCustomer.tags
  
      })
      .then(response => {
        // Handle success.
        console.log(
          'Well done, your post has been successfully created: ',
          response.data
        );
        newInternalID = response.data.id;
        redirectURL = 'https://straydogdesigns.com/pages/after_designer_portal_signup';
        res.redirect(redirectURL);
        window.top.location.href(redirectURL);
      })
      .catch(error => {
        // Handle error.
        console.log('An error occurred:', error);
      });
      
    }
  
})
  module.exports = router