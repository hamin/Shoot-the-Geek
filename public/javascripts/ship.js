(function() {
  (function(window) {
    var Ship;
    Ship = function() {
      return this.initialize();
    };
    Ship.prototype = new Container();
    Ship.TOGGLE = 60;
    Ship.MAX_THRUST = 2;
    Ship.MAX_VELOCITY = 5;
    Ship.prototype.shipFlame = null;
    Ship.prototype.shipBody = null;
    Ship.prototype.timeout = 0;
    Ship.prototype.thrust = 0;
    Ship.prototype.vX = 0;
    Ship.prototype.vY = 0;
    Ship.prototype.bounds = 0;
    Ship.prototype.hit = 0;
    Ship.prototype.Container_initialize = Ship.prototype.initialize;
    Ship.prototype.initialize = function() {
      this.Container_initialize();
      this.shipFlame = new Shape();
      this.shipBody = new Shape();
      this.addChild(this.shipFlame);
      this.addChild(this.shipBody);
      this.makeShape();
      this.timeout = 0;
      this.thrust = 0;
      this.vX = 0;
      return this.vY = 0;
    };
    Ship.prototype.makeShape = function() {
      var g, o;
      g = this.shipBody.graphics;
      g.clear();
      g.beginStroke("#FFFFFF");
      g.moveTo(0, 10);
      g.lineTo(5, -6);
      g.lineTo(0, -2);
      g.lineTo(-5, -6);
      g.closePath();
      o = this.shipFlame;
      o.scaleX = 0.5;
      o.scaleY = 0.5;
      o.y = -5;
      g = o.graphics;
      g.clear();
      g.beginStroke("#FFFFFF");
      g.moveTo(2, 0);
      g.lineTo(4, -3);
      g.lineTo(2, -2);
      g.lineTo(0, -5);
      g.lineTo(-2, -2);
      g.lineTo(-4, -3);
      g.lineTo(-2, -0);
      this.bounds = 10;
      return this.hit = this.bounds;
    };
    Ship.prototype.tick = function() {
      this.x += this.vX;
      this.y += this.vY;
      if (this.thrust > 0) {
        this.timeout++;
        this.shipFlame.alpha = 1;
        if (this.timeout > Ship.TOGGLE) {
          this.timeout = 0;
          if (this.shipFlame.scaleX === 1) {
            this.shipFlame.scaleX = 0.5;
            this.shipFlame.scaleY = 0.5;
          } else {
            this.shipFlame.scaleX = 1;
            this.shipFlame.scaleY = 1;
          }
        }
        return this.thrust -= 0.5;
      } else {
        this.shipFlame.alpha = 0;
        return this.thrust = 0;
      }
    };
    Ship.prototype.accelerate = function() {
      this.thrust += this.thrust + 0.6;
      if (this.thrust >= Ship.MAX_THRUST) {
        this.thrust = Ship.MAX_THRUST;
      }
      this.vX += Math.sin(this.rotation * (Math.PI / -180)) * this.thrust;
      this.vY += Math.cos(this.rotation * (Math.PI / -180)) * this.thrust;
      this.vX = Math.min(Ship.MAX_VELOCITY, Math.max(-Ship.MAX_VELOCITY, this.vX));
      return this.vY = Math.min(Ship.MAX_VELOCITY, Math.max(-Ship.MAX_VELOCITY, this.vY));
    };
    return window.Ship = Ship;
  })(window);
}).call(this);
