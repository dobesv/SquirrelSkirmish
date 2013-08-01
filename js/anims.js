animConfigs = {
  player1:{
    imagePath: 'squirrel_1.png',
    anims:{
      // Starts with the animation mode - 'fly', 'float', 'die', etc..
      // frameCount is the number of frames of animation
      // frameX/frameY specify the starting frame location on the grid (default 0 if not specified)
      // frameRate: frames per second
      stand:{
        frameRate:30,
        offsetX: 0,
        offsetY: 0,
        frames:[[0,0,47,51,0,0,0]]
      },
      run:{
        frameRate:30,
        offsetX: 0,
        offsetY: 0,
        frames:[[0,0,47,51,0,0,0]]
      }
    },
    shapes:[
      {shape:pc.CollisionShape.RECT, offset:{w:-5, h:-5}}
    ]
  },
  player2:{
    imagePath: 'squirrel_2.png',
    anims:{
      // Starts with the animation mode - 'fly', 'float', 'die', etc..
      // frameCount is the number of frames of animation
      // frameX/frameY specify the starting frame location on the grid (default 0 if not specified)
      // frameRate: frames per second
      stand:{
        frameRate:30,
        offsetX: 0,
        offsetY: 0,
        frames:[[0,0,51,63,0,0,0]]
      },
      run:{
        frameRate:30,
        offsetX: 0,
        offsetY: 0,
        frames:[[0,0,51,63,0,0,0]]
      }
    },
    shapes:[
      {shape:pc.CollisionShape.RECT, offset:{w:-5, h:-5}}
    ]
  },
  player3:{
    imagePath: 'squirrel_3.png',
    anims:{
      // Starts with the animation mode - 'fly', 'float', 'die', etc..
      // frameCount is the number of frames of animation
      // frameX/frameY specify the starting frame location on the grid (default 0 if not specified)
      // frameRate: frames per second
      stand:{
        frameRate:30,
        offsetX: 0,
        offsetY: 0,
        frames:[[0,0,47,51,0,0,0]]
      },
      run:{
        frameRate:30,
        offsetX: 0,
        offsetY: 0,
        frames:[[0,0,47,51,0,0,0]]
      }
    },
    shapes:[
      {shape:pc.CollisionShape.RECT, offset:{w:-5, h:-5}}
    ]
  },
  player4:{
    imagePath: 'squirrel_4.png',
    anims:{
      // Starts with the animation mode - 'fly', 'float', 'die', etc..
      // frameCount is the number of frames of animation
      // frameX/frameY specify the starting frame location on the grid (default 0 if not specified)
      // frameRate: frames per second
      stand:{
        frameRate:30,
        offsetX: 0,
        offsetY: 0,
        frames:[[0,0,51,63,0,0,0]]
      },
      run:{
        frameRate:30,
        offsetX: 0,
        offsetY: 0,
        frames:[[0,0,51,63,0,0,0]]
      }
    },
    shapes:[
      {shape:pc.CollisionShape.RECT, offset:{w:-5, h:-5}}
    ]
  },
  nut:{
    imagePath: 'nut_small.png',
    anims:{
      // Starts with the animation mode - 'fly', 'float', 'die', etc..
      // frameCount is the number of frames of animation
      // frameX/frameY specify the starting frame location on the grid (default 0 if not specified)
      // frameRate: frames per second
      fly:{
        frameRate:1,
        frames:[[0,0,16,16,0,0,0]]
      }
    },
    shapes:[
      {shape:pc.CollisionShape.CIRCLE}
    ]
  }


};

anims = {};

function setupAnims() {
  for(var k in animConfigs) {
    if(animConfigs.hasOwnProperty(k) && !(k in anims)) {
      var config = animConfigs[k];
      if('imagePath' in config)
        config.image = loadImage(config.imagePath);
      var frames = config.frames = [];
      var ss = anims[k] = new pc.SpriteSheet(config);
      var animDefs = config.anims;
      for(var animName in  animDefs) {
        if(animDefs.hasOwnProperty(animName)) {
          var anim = animDefs[animName];
          anim.name = animName;
          if('imagePath' in anim)
            anim.image = loadImage(anim.imagePath);
          if('frames' in anim) {
            var image = anim.image || config.image;
            if(!image) console.log('No image for animation '+animName+' for entity '+k);
            anim.frames.forEach(function(frame, n) {
              anim.frames[n] = [frames.length, 0]
              frame[4] = image;
              frames.push(frame);
            });
          }
        }
      }
      for(var animName in  animDefs) {
        if(animDefs.hasOwnProperty(animName)) {
          ss.addAnimation(animDefs[animName]);
        }
      }
    }
  }
}
function getAnim(k) {
  if(anims.hasOwnProperty(k))
    return anims[k];
  throw new Error("No animation '"+k+"'");
}
function getAnimShapes(k) {
  if(animConfigs.hasOwnProperty(k)) {
    return animConfigs[k].shapes;
  }
  throw new Error("No animation '"+k+"'");
}