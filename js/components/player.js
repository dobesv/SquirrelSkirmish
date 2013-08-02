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
        var ent = this.getEntity();
        //ent.getComponent('sprite').active = false;
        //ent.getComponent('physics').active = false;
        var physics = ent.getComponent('physics');
        physics.setCollisionMask(0);
        physics.applyImpulse(Parameters.jump*2, -90);
      },

      respawn:function() {
        var ent = this.getEntity();
        //ent.getComponent('sprite').active = true;
        //ent.getComponent('physics').active = true;
        ent.getComponent('physics').setCollisionMask(PLAYER_COLLISION_MASK);
        this.teleport(this.spawnPoint);
        this.dead = false;
        this.hits = 0;
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

        var startVelocity = pc.Dim.create(Parameters.nutBaseSpeed*horizontalDirection,-Parameters.nutThrowUpSpeed);
        if(playerVelocity) {
          startVelocity.x += playerVelocity.x;
          startVelocity.y += playerVelocity.y;
        }
        var nutSpatial;
        nut.addComponent(pc.components.Sprite.create({
          spriteSheet: nutAnim,
          animationStart: 'fly'
        }));
        nut.addComponent(nutSpatial = pc.components.Spatial.create({
          x: playerCenter.x + 20*horizontalDirection,
          y: playerCenter.y - 10,
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
        nut.addComponent(ProjectileComponent.create({activateDelayMs:50}));
        nut.addComponent(pc.components.Expiry.create({lifetime:Parameters.nutLifetimeMs}));
        nut.addTag('nut');
      },

      hitByNut: function(nut) {
        if(pc.device.lastFrame < nut.getComponent('projectile').activateTime)
          return;
        nut.remove();
        this.hits ++ ;
        if(this.hits == 3) {
          playSound('die');
          this.die();
        } else {
          playSound('ouch');
        }
      },

      onPickupEnergy:function(amount) {
        this.energy += amount;
        this.orbsCollected += 1;
        this.resting = false;
      }
    });

