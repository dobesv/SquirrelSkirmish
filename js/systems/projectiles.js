ProjectileSystem = pc.systems.EntitySystem.extend('ProjectileSystem', {}, {

  init: function()
  {
    this._super(['projectile']);
  },

  onEntityAdded:function(ent) {
    var projectile = ent.getComponent('projectile');
    var physics = ent.getComponent('physics');
    if(physics && projectile.activateTime && projectile.activateTime > pc.device.lastFrame) {
      physics.setCollisionMask(INACTIVE_PROJECTILE_COLLISION_MASK);
    }
  },

  process: function(ent) {
    var projectile = ent.getComponent('projectile');
    if (!projectile.active) return;

    var physics = ent.getComponent('physics');
    if(physics && projectile.activateTime && projectile.activateTime < pc.device.lastFrame) {
      physics.setCollisionMask(PROJECTILE_COLLISION_MASK);
      projectile.activateTime = 0;
    }

  }
});