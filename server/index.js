'use strict'

var util = require('util')
var path = require('path')
var envvar = require('envvar')
var express = require('express')
var bodyParser = require('body-parser')
var moment = require('moment')
var plaid = require('plaid')
var cors = require('cors')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: path.join(__dirname, '..', '.env') })
}

var APP_PORT = 8000
var PLAID_CLIENT_ID = envvar.string('PLAID_CLIENT_ID')
var PLAID_SECRET = envvar.string('PLAID_SECRET')
var PLAID_ENV = envvar.string('PLAID_ENV', 'sandbox')
var PLAID_PRODUCTS = envvar.string('PLAID_PRODUCTS', 'transactions').split(',')

var PLAID_COUNTRY_CODES = envvar.string('PLAID_COUNTRY_CODES', 'US').split(',')

var PLAID_REDIRECT_URI = envvar.string('PLAID_REDIRECT_URI', '')

var ACCESS_TOKEN = null
var PUBLIC_TOKEN = null
var ITEM_ID = null

// Initialize the Plaid client
var client = new plaid.Client({
  clientID: PLAID_CLIENT_ID,
  secret: PLAID_SECRET,
  env: plaid.environments[PLAID_ENV],
  options: {
    version: '2019-05-29'
  }
})

var app = express()
app.use(express.static('dist'))
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
app.use(cors())

if (process.env.NODE_ENV !== 'production') {
  app.use(cors())
}

app.get('/', function (request, response, next) {
  response.sendFile('../dist/index.html', { root: __dirname })
})

app.post('/api/create_link_token', function (request, response, next) {
  const configs = {
    user: {
      client_user_id: 'random-di'
    },
    client_name: 'Caracas Demo',
    products: PLAID_PRODUCTS,
    country_codes: PLAID_COUNTRY_CODES,
    language: 'en'
  }

  if (PLAID_REDIRECT_URI !== '') {
    configs.redirect_uri = PLAID_REDIRECT_URI
  }

  client.createLinkToken(configs, function (error, createTokenResponse) {
    if (error != null) {
      prettyPrintResponse(error)
      return response.json({
        error: error
      })
    }
    response.json(createTokenResponse)
  })
})

app.post('/api/set_access_token', function (request, response, next) {
  PUBLIC_TOKEN = request.body.public_token
  client.exchangePublicToken(PUBLIC_TOKEN, function (error, tokenResponse) {
    if (error != null) {
      prettyPrintResponse(error)
      return response.json({
        error: error
      })
    }
    ACCESS_TOKEN = tokenResponse.access_token
    ITEM_ID = tokenResponse.item_id
    prettyPrintResponse(tokenResponse)
    response.json({
      access_token: ACCESS_TOKEN,
      item_id: ITEM_ID,
      error: null
    })
  })
})

app.get('/api/transactions', function (request, response, next) {
  // Pull transactions for the Item for the last 30 days
  var startDate = moment().subtract(30, 'days').format('YYYY-MM-DD')
  var endDate = moment().format('YYYY-MM-DD')
  client.getTransactions(ACCESS_TOKEN, startDate, endDate, {
    count: 250,
    offset: 0
  }, function (error, transactionsResponse) {
    if (error != null) {
      prettyPrintResponse(error)
      return response.json({
        error: error
      })
    } else {
      prettyPrintResponse(transactionsResponse)
      response.json(transactionsResponse)
    }
  })
})

var prettyPrintResponse = response => {
  console.log(util.inspect(response, { colors: true, depth: 4 }))
}

app.listen(APP_PORT, () => {
  console.log('server listening on port ' + APP_PORT)
})
