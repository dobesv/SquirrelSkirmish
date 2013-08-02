/**
 * A sample game.js for you to work from
 */

TheGame = pc.Game.extend('TheGame',
    { },
    {
      gameScene:null,
      menuScene:null,
      activePlayers:[true,true,true,true],

      onReady:function ()
      {
        this._super();

        // disable caching when developing
        if(pc.device.devMode)
          pc.device.loader.setDisableCache();

        // no resources are loaded in this template, so this is all commented out
        ['map1.jpg',
         'title_screen.jpg',
         'squirrel_1_black_menu.png',
         'squirrel_2_black_menu.png',
         'but-start-up.png',
         'but-start-down.png',
         'but-start-hover.png'].forEach(loadImage);
        for(var i=0; i < 10; i++) { loadImage('digits/'+i+'.png')}
        setupAnims();

        ['applause'].forEach(loadSound);

        ['orb_pickup', 'bounce', 'jump', 'land', 'die', 'knock', 'ouch'].forEach(function(s) { loadSound(s, 5); });

        // fire up the loader
        pc.device.loader.start(this.onLoading.bind(this), this.onLoaded.bind(this));
      },

      onLoading:function (percentageComplete)
      {
        // display progress, such as a loading bar
        var ctx = pc.device.ctx;
        ctx.clearRect(0, 0, pc.device.canvasWidth, pc.device.canvasHeight);
        ctx.font = "normal 50px Verdana";
        ctx.fillStyle = "#8f8";
        ctx.fillText('Squirrel Skirmish', 40, (pc.device.canvasHeight / 2) - 50);
        ctx.font = "normal 18px Verdana";
        ctx.fillStyle = "#777";

        ctx.fillText('Loading: ' + percentageComplete + '%', 40, pc.device.canvasHeight / 2);
      },

      onLoaded:function () {
        // Erase loading screen
        var ctx = pc.device.ctx;
        ctx.clearRect(0, 0, pc.device.canvasWidth, pc.device.canvasHeight);

        // create the menu scene (but don't make it active)
        this.menuScene = new MenuScene();
        this.addScene(this.menuScene);
//
//        playSound('rain1', 1, true);
//        playSound('music1', 1, true);

        //pc.device.input.bindAction(this, 'pause', 'P');
        pc.device.input.bindAction(this, 'pause', 'PAUSE');
        pc.device.input.bindAction(this, 'restart', 'R');
        //pc.device.input.bindAction(this, 'toggleDebug', 'D');
      },

      onAction:function(actionName) {
        console.log('Game action', actionName);
        switch(actionName) {
          case 'pause':
            if(this.gameScene.paused)
              this.gameScene.resume();
            else
              this.gameScene.pause();
            break;
          case 'startGame':
          case 'restart':
            this.deactivateScene(this.menuScene);
            if(this.gameScene) {
              this.deactivateScene(this.gameScene);
              console.log('old scene: '+this.gameScene+"  ... "+this.gameScene.gameLayer+"   "+this.gameScene.player);
            }
            this.addScene(this.gameScene = new GameScene());
            console.log('new scene: '+this.gameScene+"  ... "+this.gameScene.gameLayer+"   "+this.gameScene.player);
            break;
          case 'toggleDebug':
            this.gameScene.physics.setDebug(this.toggleHashState('debug'));
            break;
        }
      },

      activateMenu:function()
      {
        this.deactivateScene(this.gameScene);
        this.activateScene(this.menuScene);
      },

      deactivateMenu:function()
      {
        this.deactivateScene(this.menuScene);
        this.activateScene(this.gameScene);
      },

      getPlayer:function() {
        return this.gameScene.player;
      },

      setHashState:HashState.set.bind(HashState),
      clearHashState:HashState.clear.bind(HashState),
      getHashState:HashState.get.bind(HashState),
      hasHashState:HashState.has.bind(HashState),
      toggleHashState:HashState.toggle.bind(HashState)

    });


