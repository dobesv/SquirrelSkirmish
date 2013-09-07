var controlSchemes = {
  WASD:{
    up:'W', left:'A', down:'S', right:'D', jump:'W',
    punch:'C', kick:'V', throw:'B'
  },
  IJKL:{
    up:'I', left:'J', down:'K', right:'L', jump:'I',
    punch:'n', kick:'m', throw:','
  },
  'ARROWS':{
    up:'UP', left:'LEFT', down:'DOWN', right:'RIGHT', jump:'UP',
    punch:'[', kick:']', throw:'\\'
  },
  'NUMPAD':{
    up:'NUM_8', left:'NUM_4', down:'NUM_5', right:'NUM_6', jump:'NUM_8',
    punch:'NUM_1', kick:'NUM_2', throw:'NUM_3'
  }
};


controlSchemeNames = [];
for(k in controlSchemes) {
  controlSchemeNames.push(k);
}
PlayerControlSystem = pc.systems.EntitySystem.extend('PlayerControlSystem',
    {
    },
    {
      input:null,

      init: function()
      {
        this._super(['player']);
      },


      onEntityAdded:function(player) {
        var c = player.getComponent('player');
        var input = pc.components.Input.create({
          states: [
            ['left', [c.controls.left]],
            ['right', [c.controls.right]],
            ['up', [c.controls.up]],
            ['down', [c.controls.down]],
            ['jump', [c.controls.jump]],
            ['throw', [c.controls.throw]]

          ]
        });

        var spatial = player.getComponent('spatial');
        player.addComponent(input);
        player.addComponent(pc.components.Physics.create({
          gravity:{x:0,y:Parameters.gravity},
          linearDamping:Parameters.playerLinearDamping,
          mass:Parameters.playerMass,
          faceVel:false,
          fixedRotation:true,
          bounce:Parameters.playerBounce,
          shapes:getAnimShapes(c.animsName),
          collisionGroup:COLLIDE_PLAYER,
          collisionCategory:COLLIDE_PLAYER,
          collisionMask:PLAYER_COLLISION_MASK
        }));
        player.addComponent(NoiseMaker.create({}));
      },

      onAction: function(actionName) {
      },

      getPlayer: function() {
        return this.entities.first ? this.entities.first.obj : null;
      },

      onTouchPlayer: function(player, what) {
        if(what.hasTag('predator')) {
          // Touched a predator
          if(!this.godmode) {
            player.getComponent('player').die();
          }
        }
        if(what.hasTag('floor')) {
          player.getComponent('player').onGround++;
          if(!pc.device.game.gameScene.playingCutscene && player.getComponent('physics').getSpeed() > 10)
            playSound('land');
        }
        if(what.hasTag('nut')) {
          player.getComponent('player').hitByNut(what);
        }
      },

      onTouchPlayerEnd:function(player, what) {
        if(what.hasTag('floor')) {
          player.getComponent('player').onGround--;
        }
      },

      process: function(player) {
        var c = player.getComponent('player');
        if (!c.active) return;

        var playerSpatial = player.getComponent('spatial');
        var playerPhysics = player.getComponent('physics');
        var playerPos = playerSpatial.getPos();

        if(c.dead) {
          if(pc.device.lastFrame >= c.respawnTime) {
            c.respawn();
          }
          return;
        }
        if(pc.device.game.gameScene.levelComplete) {
          c.active = false;
          playerPhysics.setCollisionMask(0);
          if(playerSpatial.pos.x < player.layer.worldSize.x) {
            playerPhysics.applyForce(1,0);
          }
          return;
        }

        var isOn = function isOn(s, cs) {
          return this.input.isInputState(player, s) || bm.isPressed(c.playerNum, cs || s);
        }.bind(this);


        var sprite = player.getComponent('sprite').sprite;
        if(pc.device.game.gameScene.playingCutscene)
        {
          sprite.setAnimation('stand', 0, false);
          if(isOn('jump')) pc.device.game.gameScene.playingCutscene = null;
        }
        else
        {
          var moveX = 0;
          var moveY = 0;
          var topSpeed = Parameters.playerTopSpeed;
          var topForce = Parameters.playerTopForce;
          var linearVelocity = playerPhysics.getLinearVelocity();
          if(isOn('jump') && c.onGround && linearVelocity.y > -Parameters.jump)
          {
            playerPhysics.applyImpulse(Parameters.jump, -90);
            playSound('jump');
          }
          if(isOn('left')) { moveX = -topSpeed;  };
          if(isOn('right')) { moveX = topSpeed;  };

          if(c.onGround || moveX != 0)
            playerPhysics.applyForce(Math.max(-topForce, Math.min(topForce, moveX-linearVelocity.x)), 0);

          sprite.setAnimation(c.onGround ? moveX != 0 ? 'run' : 'stand' : 'jump', 0, false);
          if(moveX < 0) sprite.scaleX = Math.abs(sprite.scaleX);
          else if(moveX > 0) sprite.scaleX = -Math.abs(sprite.scaleX);

          playerPhysics.setCollisionMask(
              (linearVelocity.x != 0 || moveX != 0 ? COLLIDE_WALL : 0) |
              (linearVelocity.y >= -1 ? COLLIDE_FLOOR|COLLIDE_MUSHROOM : 0) |
              COLLIDE_ENEMY|COLLIDE_PICKUP|COLLIDE_CUTSCENE
          );

          if(c.nextAttackTime < pc.device.lastFrame) {
            if(isOn('throw', 'fire')) {
              c.spawnNut(player.layer, playerSpatial.getCenterPos(), linearVelocity, sprite.scaleX > 0 ? 1 : -1);
            }

          }

        }

        var text = player.getComponent('text');
        if(this.godmode) {
          if(pc.valid(text)) {
            text.text = "GOD";
            text.active = true;
          } else {
            text = pc.components.Text.create({
              color:'#000000',
              offset:{x:-20,y:-50},
              fontHeight:10,
              font:'sans-serif'
            });
            player.addComponent(text);
          }
        } else {
          if(pc.valid(text)) text.active = false;
        }
      }
    });