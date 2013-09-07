animConfigs = {
  player1:{
    anims:{
      // Starts with the animation mode - 'fly', 'float', 'die', etc..
      // frameCount is the number of frames of animation
      // frameX/frameY specify the starting frame location on the grid (default 0 if not specified)
      // frameRate: frames per second
      stand:{
        frameRate:30,
        offsetX: 34.4,
        offsetY: 78,
        imagePath: "squirrel-stand-p1.png",
        frames:[[2,2,72,78,0,34.4,73.45]]
      },
      run:{
        frameRate:30,
        offsetX: 34.4,
        offsetY: 78,
        imagePath: "squirrel-run-p1.png",
        frames:[[2,2,72,78,0,34.4,73.45],[76,2,72,78,0,34.4,73.45],[150,2,72,78,0,34.4,73.45],[2,82,72,78,0,34.4,73.45],[76,82,72,78,0,34.4,73.45],[150,82,72,78,0,34.4,73.45]]
      },
      jump:{
        frameRate:30,
        offsetX: 34.4,
        offsetY: 84,
        loops: 1,
        holdOnEnd: true,
        imagePath: "squirrel-jump-p1.png",
        frames:[[2,2,111,84,0,51.3,70.55],[115,2,111,84,0,51.3,70.55],[228,2,111,84,0,51.3,70.55],[341,2,111,84,0,51.3,70.55],[2,88,111,84,0,51.3,70.55],[115,88,111,84,0,51.3,70.55],[228,88,111,84,0,51.3,70.55],[341,88,111,84,0,51.3,70.55],[2,174,111,84,0,51.3,70.55],[115,174,111,84,0,51.3,70.55],[228,174,111,84,0,51.3,70.55],[341,174,111,84,0,51.3,70.55],[2,260,111,84,0,51.3,70.55],[115,260,111,84,0,51.3,70.55],[228,260,111,84,0,51.3,70.55],[341,260,111,84,0,51.3,70.55]]
      },
      spit:{
        frameRate:30,
        offsetX: 39.3,
        offsetY: 78,
        loops: 1,
        holdOnEnd: true,
        imagePath: "squirrel-spit-p1.png",
        frames:[[2,2,81,86,0,39.3,76.45],[85,2,81,86,0,39.3,76.45],[168,2,81,86,0,39.3,76.45],[251,2,81,86,0,39.3,76.45],[334,2,81,86,0,39.3,76.45],[417,2,81,86,0,39.3,76.45],[2,90,81,86,0,39.3,76.45],[85,90,81,86,0,39.3,76.45],[168,90,81,86,0,39.3,76.45],[251,90,81,86,0,39.3,76.45],[334,90,81,86,0,39.3,76.45],[417,90,81,86,0,39.3,76.45]]
      }
    },
    shapes:[
      {shape:pc.CollisionShape.RECT, offset:{w:-5, h:-5}}
    ]
  },
  player2:{
    anims:{
      // Starts with the animation mode - 'fly', 'float', 'die', etc..
      // frameCount is the number of frames of animation
      // frameX/frameY specify the starting frame location on the grid (default 0 if not specified)
      // frameRate: frames per second
      stand:{
        frameRate:30,
        offsetX: 34.4,
        offsetY: 78,
        imagePath: "squirrel-stand-p2.png",
        frames:[[2,2,72,78,0,34.4,73.45]]
      },
      run:{
        frameRate:30,
        offsetX: 34.4,
        offsetY: 78,
        imagePath: "squirrel-run-p2.png",
        frames:[[2,2,72,78,0,34.4,73.45],[76,2,72,78,0,34.4,73.45],[150,2,72,78,0,34.4,73.45],[2,82,72,78,0,34.4,73.45],[76,82,72,78,0,34.4,73.45],[150,82,72,78,0,34.4,73.45]]
      },
      jump:{
        frameRate:30,
        offsetX: 34.4,
        offsetY: 84,
        loops: 1,
        holdOnEnd: true,
        imagePath: "squirrel-jump-p2.png",
        frames:[[2,2,111,84,0,51.3,70.55],[115,2,111,84,0,51.3,70.55],[228,2,111,84,0,51.3,70.55],[341,2,111,84,0,51.3,70.55],[2,88,111,84,0,51.3,70.55],[115,88,111,84,0,51.3,70.55],[228,88,111,84,0,51.3,70.55],[341,88,111,84,0,51.3,70.55],[2,174,111,84,0,51.3,70.55],[115,174,111,84,0,51.3,70.55],[228,174,111,84,0,51.3,70.55],[341,174,111,84,0,51.3,70.55],[2,260,111,84,0,51.3,70.55],[115,260,111,84,0,51.3,70.55],[228,260,111,84,0,51.3,70.55],[341,260,111,84,0,51.3,70.55]]
      },
      spit:{
        frameRate:30,
        offsetX: 39.3,
        offsetY: 78,
        loops: 1,
        holdOnEnd: true,
        imagePath: "squirrel-spit-p2.png",
        frames:[[2,2,81,86,0,39.3,76.45],[85,2,81,86,0,39.3,76.45],[168,2,81,86,0,39.3,76.45],[251,2,81,86,0,39.3,76.45],[334,2,81,86,0,39.3,76.45],[417,2,81,86,0,39.3,76.45],[2,90,81,86,0,39.3,76.45],[85,90,81,86,0,39.3,76.45],[168,90,81,86,0,39.3,76.45],[251,90,81,86,0,39.3,76.45],[334,90,81,86,0,39.3,76.45],[417,90,81,86,0,39.3,76.45]]
      }
    },
    shapes:[
      {shape:pc.CollisionShape.RECT, offset:{w:-5, h:-5}}
    ]
  },
  player3:{
    anims:{
      // Starts with the animation mode - 'fly', 'float', 'die', etc..
      // frameCount is the number of frames of animation
      // frameX/frameY specify the starting frame location on the grid (default 0 if not specified)
      // frameRate: frames per second
      stand:{
        frameRate:30,
        offsetX: 34.4,
        offsetY: 78,
        imagePath: "squirrel-stand-p3.png",
        frames:[[2,2,72,78,0,34.4,73.45]]
      },
      run:{
        frameRate:30,
        offsetX: 34.4,
        offsetY: 78,
        imagePath: "squirrel-run-p3.png",
        frames:[[2,2,72,78,0,34.4,73.45],[76,2,72,78,0,34.4,73.45],[150,2,72,78,0,34.4,73.45],[2,82,72,78,0,34.4,73.45],[76,82,72,78,0,34.4,73.45],[150,82,72,78,0,34.4,73.45]]
      },
      jump:{
        frameRate:30,
        offsetX: 34.4,
        offsetY: 84,
        loops: 1,
        holdOnEnd: true,
        imagePath: "squirrel-jump-p3.png",
        frames:[[2,2,111,84,0,51.3,70.55],[115,2,111,84,0,51.3,70.55],[228,2,111,84,0,51.3,70.55],[341,2,111,84,0,51.3,70.55],[2,88,111,84,0,51.3,70.55],[115,88,111,84,0,51.3,70.55],[228,88,111,84,0,51.3,70.55],[341,88,111,84,0,51.3,70.55],[2,174,111,84,0,51.3,70.55],[115,174,111,84,0,51.3,70.55],[228,174,111,84,0,51.3,70.55],[341,174,111,84,0,51.3,70.55],[2,260,111,84,0,51.3,70.55],[115,260,111,84,0,51.3,70.55],[228,260,111,84,0,51.3,70.55],[341,260,111,84,0,51.3,70.55]]
      },
      spit:{
        frameRate:30,
        offsetX: 39.3,
        offsetY: 78,
        loops: 1,
        holdOnEnd: true,
        imagePath: "squirrel-spit-p3.png",
        frames:[[2,2,81,86,0,39.3,76.45],[85,2,81,86,0,39.3,76.45],[168,2,81,86,0,39.3,76.45],[251,2,81,86,0,39.3,76.45],[334,2,81,86,0,39.3,76.45],[417,2,81,86,0,39.3,76.45],[2,90,81,86,0,39.3,76.45],[85,90,81,86,0,39.3,76.45],[168,90,81,86,0,39.3,76.45],[251,90,81,86,0,39.3,76.45],[334,90,81,86,0,39.3,76.45],[417,90,81,86,0,39.3,76.45]]
      }
    },
    shapes:[
      {shape:pc.CollisionShape.RECT, offset:{w:-5, h:-5}}
    ]
  },
  player4:{
    anims:{
      // Starts with the animation mode - 'fly', 'float', 'die', etc..
      // frameCount is the number of frames of animation
      // frameX/frameY specify the starting frame location on the grid (default 0 if not specified)
      // frameRate: frames per second
      stand:{
        frameRate:24,
        offsetX: 34.4,
        offsetY: 78,
        imagePath: "squirrel-stand-p4.png",
        frames:[[2,2,72,78,0,34.4,73.45]]
      },
      run:{
        frameRate:24,
        offsetX: 34.4,
        offsetY: 78,
        imagePath: "squirrel-run-p4.png",
        frames:[[2,2,72,78,0,34.4,73.45],[76,2,72,78,0,34.4,73.45],[150,2,72,78,0,34.4,73.45],[2,82,72,78,0,34.4,73.45],[76,82,72,78,0,34.4,73.45],[150,82,72,78,0,34.4,73.45]]
      },
      jump:{
        frameRate:24,
        offsetX: 34.4,
        offsetY: 84,
        loops: 1,
        holdOnEnd: true,
        imagePath: "squirrel-jump-p4.png",
        frames:[[2,2,111,84,0,51.3,70.55],[115,2,111,84,0,51.3,70.55],[228,2,111,84,0,51.3,70.55],[341,2,111,84,0,51.3,70.55],[2,88,111,84,0,51.3,70.55],[115,88,111,84,0,51.3,70.55],[228,88,111,84,0,51.3,70.55],[341,88,111,84,0,51.3,70.55],[2,174,111,84,0,51.3,70.55],[115,174,111,84,0,51.3,70.55],[228,174,111,84,0,51.3,70.55],[341,174,111,84,0,51.3,70.55],[2,260,111,84,0,51.3,70.55],[115,260,111,84,0,51.3,70.55],[228,260,111,84,0,51.3,70.55],[341,260,111,84,0,51.3,70.55]]
      },
      spit:{
        frameRate:24,
        offsetX: 39.3,
        offsetY: 78,
        loops: 1,
        holdOnEnd: true,
        imagePath: "squirrel-spit-p4.png",
        frames:[[2,2,81,86,0,39.3,76.45],[85,2,81,86,0,39.3,76.45],[168,2,81,86,0,39.3,76.45],[251,2,81,86,0,39.3,76.45],[334,2,81,86,0,39.3,76.45],[417,2,81,86,0,39.3,76.45],[2,90,81,86,0,39.3,76.45],[85,90,81,86,0,39.3,76.45],[168,90,81,86,0,39.3,76.45],[251,90,81,86,0,39.3,76.45],[334,90,81,86,0,39.3,76.45],[417,90,81,86,0,39.3,76.45]]
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