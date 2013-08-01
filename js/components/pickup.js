PickupComponent = pc.components.Component.extend('PickupComponent',
    {
    },
    {
      energyValue: 0,
      pickupSound: 'orb_pickup',

      init: function()
      {
        this._super('pickup');
        this.energyValue = Parameters.smallOrbEnergyValue;
      }

    });
