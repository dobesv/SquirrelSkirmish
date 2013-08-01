
PickupSystem = pc.systems.EntitySystem.extend('PickupSystem',
    {},
    {
      init: function()
      {
        this._super(['pickup']);
      },

      onEntityAdded: function(pickup)
      {
        pickup.getComponent('sprite').sprite.setAnimation('pulse');
      },

      process: function(pickup)
      {

      },

      onTouch:function(player, pickup) {
        var c = pickup.getComponent('pickup');
        if(!c.active)
          return;
        c.active = false;
        pickup.getComponent('sprite').sprite.setAnimation('pop');
        pickup.addComponent(pc.components.Expiry.create({lifetime:1000}));
        var physics = pickup.getComponent('physics');
        physics.setCollisionMask(0);
        physics.active = false;

        player.getComponent('player').onPickupEnergy(c.energyValue);

        if(c.pickupSound)
          playSound(c.pickupSound);
      }

    });