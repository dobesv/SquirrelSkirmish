
UILayer = pc.Layer.extend('UILayer', {}, {

  digits:[],

  init:function(zIndex) {
    this._super('ui layer', 100);

    for(var i=0; i < 10; i++)
    {
      this.digits.push(getImage('digits/'+i+'.png'));
    }
    pc.device.input.bindAction(this, 'click', 'MOUSE_BUTTON_LEFT_DOWN');
    pc.device.input.bindAction(this, 'click', 'TOUCH');
  },
  onAction:function(actionName, event, pos) {
    console.log('action!')
    if(actionName == 'click') {
      var x = pos.x;
      var y = pos.y;
      if(this.showFailure) {
      }
    }
  },
  hitButton:function(but, x, y) {
    console.log('Check hit '+x+','+y+' against '+but.x+','+but.y+' '+but.width+'x'+but.height);
    var dx = x - but.x;
    if(dx < 0 || dx > but.width)
      return false;
    var dy = y - but.y;
    if(dy <0 || dy > but.height)
      return false;
    return true;
  },
  process:function() {
//    var player = pc.device.game.getPlayer();
//    var playerControl = player.getComponent('player');
//    if(playerControl.dead) {
//      // Show "you're dead!"
//      if(!this.showFailure) {
//        this.showFailure = true;
//        this.failureMenuPos = pc.device.canvasHeight*2;
//      }
//      this.energyLevel = 0;
//    } else {
//      this.showFailure = false;
//      this.energyLevel = Math.max(0, Math.min(1, playerControl.energy/100));
//    }
//    if(pc.device.game.gameScene.levelComplete) {
//      if(!this.showLevelComplete) {
//        this.showLevelComplete = true;
//        this.levelCompletePos = pc.device.canvasHeight;
//      }
//      this.energyLevel = 100;
//    } else {
//      this.showLevelComplete = false;
//    }
//
//
//    if(this.showLevelComplete) {
//      if(this.levelCompletePos > 0) {
//        this.levelCompletePos = Math.max(0, this.levelCompletePos - pc.device.elapsed);
//      }
//    } else if(this.showFailure) {
//      if(this.failureMenuPos > 0) {
//        this.failureMenuPos = Math.max(0, this.failureMenuPos - pc.device.elapsed);
//      }
//    }

  },
  wobble:function(image,x) {
    var wobbleAngle = (Date.now() + x)*0.005;
    var wobbleX = 1+0.01*Math.sin(wobbleAngle);
    var wobbleY = 1+0.01*Math.sin(wobbleAngle + Math.PI);
    image.setScale(wobbleX, wobbleY);
  },
  drawNumber: function(x,y,n,align,hideZero)
  {
    align = pc.checked(align,'left');
    hideZero = pc.checked(hideZero, false);

    var ims = [];
    var totalWidth = 0;
    while(n > 0)
    {
      var digit = this.digits[n % 10];
      ims.push(digit);
      n = Math.floor(n / 10);
      totalWidth = digit.width;
    }
    ims.reverse();

    if(ims.length == 0)
    {
      if(hideZero) return;
      ims.push(this.digits[0]);
    }

    switch(align)
    {
      case 'center': x -= totalWidth/2; break;
      case 'right': x -= totalWidth; break;
      case 'left': break;
    }

    ims.forEach(function(im) {
      im.draw(pc.device.ctx, x,y);
      x += im.width;
    });
  },
  draw:function()
  {
//    this.drawNumber(10, 10, pc.device.game.gameScene.player.getComponent('player').orbsCollected);
  }

});

