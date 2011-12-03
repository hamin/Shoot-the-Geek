exports.index = (req, res) ->
  request "http://geekli.st/harisamin/cards.json", (error, response, body) ->
    console.log "come here!!!"
    res.render "index", title: "Geek vs. Geek", bar: body
    # if not error and response.statusCode is 200
    #   foo = JSON.stringify(data)