((window) ->
  Ship = ->
    @initialize()
  Ship:: = new Container()
  
  # public properties:
  Ship.TOGGLE = 60
  Ship.MAX_THRUST = 2
  Ship.MAX_VELOCITY = 5
  
  # public properties:
  Ship::shipFlame = null
  Ship::shipBody = null
  
  Ship::timeout = 0
  Ship::thrust = 0
  
  Ship::vX = 0
  Ship::vY = 0
  
  Ship::bounds = 0
  Ship::hit = 0
  
  # constructor
  Ship::Container_initialize = Ship::initialize
  
  Ship::initialize = ->
    @Container_initialize()
    @shipFlame = new Shape()
    @shipBody = new Shape()
    @addChild @shipFlame
    @addChild @shipBody
    @makeShape()
    @timeout = 0
    @thrust = 0
    @vX = 0
    @vY = 0
  
  # public metods
  Ship::makeShape = ->
    g = @shipBody.graphics
    g.clear()
    g.beginStroke "#FFFFFF"
    g.moveTo 0, 10
    g.lineTo 5, -6
    g.lineTo 0, -2
    g.lineTo -5, -6
    g.closePath()
    o = @shipFlame
    o.scaleX = 0.5
    o.scaleY = 0.5
    o.y = -5
    g = o.graphics
    g.clear()
    g.beginStroke "#FFFFFF"
    g.moveTo 2, 0
    g.lineTo 4, -3
    g.lineTo 2, -2
    g.lineTo 0, -5
    g.lineTo -2, -2
    g.lineTo -4, -3
    g.lineTo -2, -0
    @bounds = 10
    @hit = @bounds
  
  Ship::tick = ->
    @x += @vX
    @y += @vY
    if @thrust > 0
      @timeout++
      @shipFlame.alpha = 1
      if @timeout > Ship.TOGGLE
        @timeout = 0
        if @shipFlame.scaleX == 1
          @shipFlame.scaleX = 0.5
          @shipFlame.scaleY = 0.5
        else
          @shipFlame.scaleX = 1
          @shipFlame.scaleY = 1
      @thrust -= 0.5
    else
      @shipFlame.alpha = 0
      @thrust = 0
  
  Ship::accelerate = ->
    @thrust += @thrust + 0.6
    @thrust = Ship.MAX_THRUST  if @thrust >= Ship.MAX_THRUST
    @vX += Math.sin(@rotation * (Math.PI / -180)) * @thrust
    @vY += Math.cos(@rotation * (Math.PI / -180)) * @thrust
    @vX = Math.min(Ship.MAX_VELOCITY, Math.max(-Ship.MAX_VELOCITY, @vX))
    @vY = Math.min(Ship.MAX_VELOCITY, Math.max(-Ship.MAX_VELOCITY, @vY))
  
  window.Ship = Ship
) window
