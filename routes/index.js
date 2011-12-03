(function() {
  exports.index = function(req, res) {
    return request("http://geekli.st/harisamin/cards.json", function(error, response, body) {
      console.log("come here!!!");
      return res.render("index", {
        title: "Geek vs. Geek",
        bar: body
      });
    });
  };
}).call(this);
