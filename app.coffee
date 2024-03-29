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
  username = if req.query.username then req.query.username else "harisamin"

  request.get url: "http://geekli.st/users/#{username}.json", json: true, (error, response, body) ->
    userInfo = body  
    request.get url: "http://geekli.st/#{username}/cards.json", json: true, (error2, response2, body2) ->
      cards = body2.cards
      # Incrementing order
      sortByScore = (a,b) -> a.score - b.score
      for card in cards
        card.score = card.num_of_views + card.num_of_contributors + card.num_of_highfives
      sortedCards = cards.sort(sortByScore)
      
      console.log "THESE ARE CARDS: #{JSON.stringify cards}"
      console.log "THESE ARE SORTED CARDS: #{JSON.stringify sortedCards}"
      res.render "index", title: "Shoot the Geek!", userInfo: userInfo, cards: sortedCards, userString: "#{JSON.stringify(userInfo)}"

if !module.parent
  app.listen 3000
  console.log "Express server listening on port %d in %s mode", app.address().port, app.settings.env