((window) ->
  SpaceRock = (size) ->
    @initialize size
  SpaceRock:: = new Shape()
  
  # static properties:
  SpaceRock.LRG_ROCK = 40
  SpaceRock.MED_ROCK = 20
  SpaceRock.SML_ROCK = 10
  
  # public properties:
  SpaceRock::bounds = 0
  SpaceRock::hit = 0
  
  SpaceRock::size = 0
  SpaceRock::spin = 0
  SpaceRock::score = 0
  
  SpaceRock::vX = 0
  SpaceRock::vY = 0
  
  SpaceRock::active = false
  
  # constructor:
  SpaceRock::Shape_initialize = SpaceRock::initialize
  SpaceRock::initialize = (size) ->
    @Shape_initialize()
    @activate size
  
  # public methods:
  SpaceRock::getShape = (size) ->
    angle = 0
    radius = size
    @size = size
    @hit = size
    @bounds = 0
    @graphics.clear()
    @graphics.beginStroke "#FFFFFF"
    @graphics.moveTo 0, size
    while angle < (Math.PI * 2 - .5)
      angle += .25 + (Math.random() * 100) / 500
      radius = size + (size / 2 * Math.random())
      @graphics.lineTo Math.sin(angle) * radius, Math.cos(angle) * radius
      @bounds = radius  if radius > @bounds
      @hit = (@hit + radius) / 2
    @graphics.closePath()
    @hit *= 1.1
  
  SpaceRock::activate = (size) ->
    @getShape size
    angle = Math.random() * (Math.PI * 2)
    @vX = Math.sin(angle) * (5 - size / 10)
    @vY = Math.cos(angle) * (5 - size / 10)
    @spin = (Math.random() + 0.2) * @vX
    @score = (5 - size / 10) * 100
    @active = true
  
  SpaceRock::tick = ->
    @rotation += @spin
    @x += @vX
    @y += @vY
  
  SpaceRock::floatOnScreen = (width, height) ->
    if Math.random() * (width + height) > width
      if @vX > 0
        @x = -2 * @bounds
      else
        @x = 2 * @bounds + width
      if @vY > 0
        @y = Math.random() * height * 0.5
      else
        @y = Math.random() * height * 0.5 + 0.5 * height
    else
      if @vY > 0
        @y = -2 * @bounds
      else
        @y = 2 * @bounds + height
      if @vX > 0
        @x = Math.random() * width * 0.5
      else
        @x = Math.random() * width * 0.5 + 0.5 * width
  
  SpaceRock::hitPoint = (tX, tY) ->
    @hitRadius tX, tY, 0
  
  SpaceRock::hitRadius = (tX, tY, tHit) ->
    return  if tX - tHit > @x + @hit
    return  if tX + tHit < @x - @hit
    return  if tY - tHit > @y + @hit
    return  if tY + tHit < @y - @hit
    @hit + tHit > Math.sqrt(Math.pow(Math.abs(@x - tX), 2) + Math.pow(Math.abs(@y - tY), 2))
  
  window.SpaceRock = SpaceRock
) window
