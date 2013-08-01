
NoiseSystem = pc.systems.EntitySystem.extend('NoiseSystem',
    {},
    {
      targetPt:new pc.Point(),

      init: function()
      {
        this._super(['noise']);
      },


      process: function(entity)
      {
        var c = entity.getComponent('noise');

        c.cleanup();
        if (!c.active) {
          c.stop();
          return;
        }
        var spatial = entity.getComponent('spatial');
        var center = spatial.getCenterPos();
        var sX = entity.layer.screenX(center.x);
        var sY = entity.layer.screenY(center.y);
        var volume;
        if(sX > 0 && sX < pc.device.canvasWidth &&
           sY > 0 && sY < pc.device.canvasHeight) {
          volume = 1;
        } else {
          var dX = sX < 0 ? -sX : sX - pc.device.canvasWidth;
          var dsq = dX;
          volume = Math.max(0.005, Math.min(1, 1 / dsq));
        }
        c.setVolume(volume);
      }
    });