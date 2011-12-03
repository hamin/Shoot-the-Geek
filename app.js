(function() {
  var app, express, routes;
  express = require("express");
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
  app.get("/", routes.index);
  if (!module.parent) {
    app.listen(3000);
    console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
  }
}).call(this);