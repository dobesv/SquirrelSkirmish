PlayerComponent = pc.components.Component.extend('PlayerComponent',
    {
      create:function (options)
      {
        var c = this._super();
        c.config(options);
        return  c;
      }
    },
    {
      energy:100,
      orbsCollected:0,
      resting:false,
      dead:false,
      onGround:0,
      controls:null,
      animsName:'player1',
      nextAttackTime: 0,
      hits: 0, // number of times hit
      spawnPoint: null,

      init: function(options) {
        this._super('player');
        if(pc.valid(options))
          this.config(options);
      },

      config:function(options) {
        this.energy = pc.checked(options.energy, 100);
        this.dead = false;
        this.controls = pc.checked(options.controls, controlSchemes.WASD);
        this.animsName = pc.checked(options.animsName, 'player1');
        this.spawnPoint = options.spawnPoint;
      },

      die:function() {
        this.dead = true;
        this.respawnTime = pc.device.lastFrame + Parameters.respawnDelayMs;

      },

      respawn:function() {
        this.dead = false;
        this.teleport(this.spawnPoint);
      },

      teleport:function(where) {
        playerEnt = this.getEntity();
        playerSpatial = playerEnt.getComponent('spatial');
        playerSpatial.pos.x = where.x;
        playerSpatial.pos.y = where.y;
      },

      spawnNut:function(gameLayer, playerCenter, playerVelocity, horizontalDirection) {
        this.nextAttackTime = pc.device.lastFrame + Parameters.minMsBetweenThrowAndNextAttack;

        var nut = pc.Entity.create(gameLayer);
        var nutAnim = getAnim('nut');

        var startVelocity = pc.Dim.create(Parameters.nutBaseSpeed*horizontalDirection,Parameters.nutThrowUpSpeed);
        if(playerVelocity) {
          startVelocity.x += playerVelocity.x;
          //startVelocity.y += playerVelocity.y;
        }
        var nutSpatial;
        nut.addComponent(pc.components.Sprite.create({
          spriteSheet: nutAnim,
          animationStart: 'fly'
        }));
        nut.addComponent(nutSpatial = pc.components.Spatial.create({
          x: playerCenter.x + 20*horizontalDirection,
          y: playerCenter.y + 10,
          w: nutAnim.getFrameWidth(),
          h: nutAnim.getFrameHeight()
        }));
        var nutPhysics;
        nut.addComponent(nutPhysics = pc.components.Physics.create({
          gravity:pc.Dim.create(0,Parameters.gravity),
          mass:Parameters.nutMass,
          bounce:Parameters.nutBounce,
          shapes:getAnimShapes('nut'),
          collisionGroup:COLLIDE_PLAYER,
          collisionCategory:COLLIDE_PLAYER,
          collisionMask:COLLIDE_PLAYER|COLLIDE_FLOOR|COLLIDE_WALL,
          linearVelocity: startVelocity
        }));
        nut.addComponent(pc.components.Expiry.create({lifetime:Parameters.nutLifetimeMs}));
        nut.addTag('nut');
        nut.minHitTime = pc.device.lastFrame + 100;
      },

      hitByNut: function(nut) {
        if(pc.device.lastFrame < nut.minHitTime)
          return;
        nut.remove();
        this.die();
        this.respawn();
        this.hits ++ ;
      },

      onPickupEnergy:function(amount) {
        this.energy += amount;
        this.orbsCollected += 1;
        this.resting = false;
      }
    });

