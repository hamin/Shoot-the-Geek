express = require("express")
request = require("request")
routes = require("./routes")

app = module.exports = express.createServer()

app.configure ->
  app.set "views", __dirname + "/views"
  app.set "view engine", "ejs"
  app.use express.bodyParser()
  app.use express.methodOverride()
  app.use app.router
  app.use express.compiler( src: __dirname + '/public', dest: __dirname + '/public', enable: ['coffeescript'] )
  app.use express.static("#{__dirname}/public")

app.configure "development", ->
  app.use express.errorHandler(
    dumpExceptions: true
    showStack: true
  )

app.configure "production", ->
  app.use express.errorHandler()
    
# Routes
# app.get "/", routes.index
app.get '/', (req,res) ->
  username = if req.body.username then req.body.username else "harisamin"
  
  request.get url: "http://geekli.st/users/#{username}.json", json: true, (error, response, body) ->
    userInfo = body  
    request.get url: "http://geekli.st/#{username}/cards.json", json: true, (error2, response2, body2) ->
      cards = body2.cards
      res.render "index", title: "Geek vs. Geek", userInfo: userInfo, cards: cards

if !module.parent
  app.listen 3000
  console.log "Express server listening on port %d in %s mode", app.address().port, app.settings.env