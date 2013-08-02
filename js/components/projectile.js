ProjectileComponent = pc.components.Component.extend('ProjectileComponent',
    {
      create:function (options)
      {
        var c = this._super();
        c.config(options);
        return  c;
      }
    },
    {
      activateTime: 0,

      init: function(options) {
        this._super('projectile');
        if(pc.valid(options))
          this.config(options);
      },

      /**
       *
       * @param object options
       * @param number [options.collisionDelayMs=0]
       */
      config:function(options) {
        this.activateTime = pc.device.lastFrame + pc.checked(options.activateDelayMs, 0)
      },

      onCollisionStart: function(otherEnt) {
        playSound('knock');
      }


    });

