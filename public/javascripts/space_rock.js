(function() {
  (function(window) {
    var SpaceRock;
    SpaceRock = function(size) {
      return this.initialize(size);
    };
    SpaceRock.prototype = new Shape();
    SpaceRock.LRG_ROCK = 40;
    SpaceRock.MED_ROCK = 20;
    SpaceRock.SML_ROCK = 10;
    SpaceRock.prototype.bounds = 0;
    SpaceRock.prototype.hit = 0;
    SpaceRock.prototype.size = 0;
    SpaceRock.prototype.spin = 0;
    SpaceRock.prototype.score = 0;
    SpaceRock.prototype.vX = 0;
    SpaceRock.prototype.vY = 0;
    SpaceRock.prototype.active = false;
    SpaceRock.prototype.Shape_initialize = SpaceRock.prototype.initialize;
    SpaceRock.prototype.initialize = function(size) {
      this.Shape_initialize();
      return this.activate(size);
    };
    SpaceRock.prototype.getShape = function(size) {
      var angle, radius;
      angle = 0;
      radius = size;
      this.size = size;
      this.hit = size;
      this.bounds = 0;
      this.graphics.clear();
      this.graphics.beginStroke("#FFFFFF");
      this.graphics.moveTo(0, size);
      while (angle < (Math.PI * 2 - .5)) {
        angle += .25 + (Math.random() * 100) / 500;
        radius = size + (size / 2 * Math.random());
        this.graphics.lineTo(Math.sin(angle) * radius, Math.cos(angle) * radius);
        if (radius > this.bounds) {
          this.bounds = radius;
        }
        this.hit = (this.hit + radius) / 2;
      }
      this.graphics.closePath();
      return this.hit *= 1.1;
    };
    SpaceRock.prototype.activate = function(size) {
      var angle;
      this.getShape(size);
      angle = Math.random() * (Math.PI * 2);
      this.vX = Math.sin(angle) * (5 - size / 10);
      this.vY = Math.cos(angle) * (5 - size / 10);
      this.spin = (Math.random() + 0.2) * this.vX;
      this.score = (5 - size / 10) * 100;
      return this.active = true;
    };
    SpaceRock.prototype.tick = function() {
      this.rotation += this.spin;
      this.x += this.vX;
      return this.y += this.vY;
    };
    SpaceRock.prototype.floatOnScreen = function(width, height) {
      if (Math.random() * (width + height) > width) {
        if (this.vX > 0) {
          this.x = -2 * this.bounds;
        } else {
          this.x = 2 * this.bounds + width;
        }
        if (this.vY > 0) {
          return this.y = Math.random() * height * 0.5;
        } else {
          return this.y = Math.random() * height * 0.5 + 0.5 * height;
        }
      } else {
        if (this.vY > 0) {
          this.y = -2 * this.bounds;
        } else {
          this.y = 2 * this.bounds + height;
        }
        if (this.vX > 0) {
          return this.x = Math.random() * width * 0.5;
        } else {
          return this.x = Math.random() * width * 0.5 + 0.5 * width;
        }
      }
    };
    SpaceRock.prototype.hitPoint = function(tX, tY) {
      return this.hitRadius(tX, tY, 0);
    };
    SpaceRock.prototype.hitRadius = function(tX, tY, tHit) {
      if (tX - tHit > this.x + this.hit) {
        return;
      }
      if (tX + tHit < this.x - this.hit) {
        return;
      }
      if (tY - tHit > this.y + this.hit) {
        return;
      }
      if (tY + tHit < this.y - this.hit) {
        return;
      }
      return this.hit + tHit > Math.sqrt(Math.pow(Math.abs(this.x - tX), 2) + Math.pow(Math.abs(this.y - tY), 2));
    };
    return window.SpaceRock = SpaceRock;
  })(window);
}).call(this);
