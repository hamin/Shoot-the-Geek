(function() {
  var app, express, request, routes;
  express = require("express");
  request = require("request");
  routes = require("./routes");
  app = module.exports = express.createServer();
  app.configure(function() {
    app.set("views", __dirname + "/views");
    app.set("view engine", "ejs");
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.compiler({
      src: __dirname + '/public',
      dest: __dirname + '/public',
      enable: ['coffeescript']
    }));
    return app.use(express.static("" + __dirname + "/public"));
  });
  app.configure("development", function() {
    return app.use(express.errorHandler({
      dumpExceptions: true,
      showStack: true
    }));
  });
  app.configure("production", function() {
    return app.use(express.errorHandler());
  });
  app.get('/', function(req, res) {
    var username;
    username = req.query.username ? req.query.username : "harisamin";
    return request.get({
      url: "http://geekli.st/users/" + username + ".json",
      json: true
    }, function(error, response, body) {
      var userInfo;
      userInfo = body;
      return request.get({
        url: "http://geekli.st/" + username + "/cards.json",
        json: true
      }, function(error2, response2, body2) {
        var card, cards, sortByScore, sortedCards, _i, _len;
        cards = body2.cards;
        sortByScore = function(a, b) {
          return a.score - b.score;
        };
        for (_i = 0, _len = cards.length; _i < _len; _i++) {
          card = cards[_i];
          card.score = card.num_of_views + card.num_of_contributors + card.num_of_highfives;
        }
        sortedCards = cards.sort(sortByScore);
        console.log("THESE ARE CARDS: " + (JSON.stringify(cards)));
        console.log("THESE ARE SORTED CARDS: " + (JSON.stringify(sortedCards)));
        return res.render("index", {
          title: "Shoot the Geek!",
          userInfo: userInfo,
          cards: sortedCards,
          userString: "" + (JSON.stringify(userInfo))
        });
      });
    });
  });
  if (!module.parent) {
    app.listen(3000);
    console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
  }
}).call(this);
