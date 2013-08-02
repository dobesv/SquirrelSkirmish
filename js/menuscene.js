/**
 * MenuScene
 * A template menu scene
 */

SquirrelToggles = {
  left: 306,
  top: 206,
  height: 100,
  width: 100,
  hSpace: 5,
  images: [
    {id:'squirrel_1_black_menu', x:24, y:15},
    {id:'squirrel_2_black_menu', x:26, y:2},
    {id:'squirrel_1_black_menu', x:21, y:15},
    {id:'squirrel_2_black_menu', x:27, y:2}
  ]
};

MenuScene = pc.Scene.extend('MenuScene',
    { },
    {
      menuLayer:null,
      menuItems:null,
      currentButtonDown:null,
      titleButtons:[
        {
          action:'startGame',
          x:800, y:600, w:null, h:null,
          imageId:'but-start-',
          images:{up:null, down:null, hover:null},
          entity:null,
          spriteSheet:null
        }
      ],
      squirrelToggles:null,

      init:function ()
      {
        this._super();

        this.menuItems = [];
        this.currentMenuSelection = 0;

        var bgLayer= this.bgLayer = this.addLayer(new pc.ImageLayer('menu bg', getImage('title_screen'), 0));
        bgLayer.fitTo(pc.device.canvasWidth, pc.device.canvasHeight);
        bgLayer.setZIndex(1);

        //-----------------------------------------------------------------------------
        // menu layer
        //-----------------------------------------------------------------------------
        var menuLayer = this.menuLayer = this.addLayer(new pc.EntityLayer('menu'));
        menuLayer.setZIndex(10);

        // render system to draw text etc
        this.menuLayer.addSystem(new pc.systems.Render());
        this.menuLayer.addSystem(new pc.systems.Input());

        this.titleButtons.forEach(function(but) {
          var ent = but.entity = pc.Entity.create(menuLayer);
          ['up', 'down', 'hover'].forEach(function(state) {
            but.images[state] = getImage(but.imageId+state);
          });
          var img = but.images.up;
          but.w = img.width;
          but.h = img.height;
          ent.addComponent(pc.components.Spatial.create(but));
          ent.addComponent(pc.components.Input.create({
            actions: [[but.action, ['MOUSE_BUTTON_LEFT_DOWN', 'TOUCH'], true]],
            target: this
          }));
          var ss = but.spriteSheet = new pc.SpriteSheet({image:img});
          var sprite;
          ent.addComponent(sprite = pc.components.Sprite.create({spriteSheet:ss}));
          //ent.addComponent(pc.components.Rect.create({color:[255,255,0]}));
        }, this);
        var toggles = this.squirrelToggles = [];
        SquirrelToggles.images.forEach(function(image, n) {
          var ent = pc.Entity.create(menuLayer);
          toggles.push(ent);
          ent.addComponent(pc.components.Spatial.create({
            x: SquirrelToggles.left + n * (SquirrelToggles.width + SquirrelToggles.hSpace),
            y: SquirrelToggles.top,
            w: SquirrelToggles.width,
            h: SquirrelToggles.height
          }));
          var ss = new pc.SpriteSheet({ image: getImage(image.id) });
          var sprite;
          ent.addComponent(sprite = pc.components.Sprite.create({
            spriteSheet: ss,
            offset: { x: image.x, y: image.y }
          }));
          sprite.active = !pc.device.game.activePlayers[n];
          //ent.addComponent(pc.components.Rect.create({color:[255,255,0]}));
        }, this);
        pc.device.input.bindAction(this, 'up', 'MOUSE_BUTTON_LEFT_UP');
        pc.device.input.bindAction(this, 'down', 'MOUSE_BUTTON_LEFT_DOWN');
      },

      changeMenuSelection: function(newSelection)
      {
      },

      onMouseDown:function(pos) {
        if(this.currentButtonDown != null) {
          this.onMouseUp();
        }
        this.titleButtons.forEach(function(but) {
          var sp = but.entity.getComponent('spatial');
          if(sp.getScreenRect().containsPoint(pos)) {
            sp.pos.x += 2;
            sp.pos.y += 2;
            but.spriteSheet.image = but.images.down;
            this.currentButtonDown = but;
          }
        }, this);
        this.squirrelToggles.forEach(function(entity, n) {
          var sp = entity.getComponent('spatial');
          if(sp.getScreenRect().containsPoint(pos)) {
            var sprite = entity.getComponent('sprite');
            var disable = !sprite.active
            sprite.active = disable;
            pc.device.game.activePlayers[n] = !disable;
          }
        }, this);
      },

      onMouseUp:function(pos) {
        if(this.currentButtonDown) {
          this.currentButtonDown.spriteSheet.image = this.currentButtonDown.images.up;
          var sp = this.currentButtonDown.entity.getComponent('spatial');
          sp.pos.x = this.currentButtonDown.x;
          sp.pos.y = this.currentButtonDown.y;
          if(pos && sp.getScreenRect().containsPoint(pos)) {
            var action = this.currentButtonDown.action;
            setTimeout(function() {
              pc.device.game.onAction(action);
            }, 150);
          }
        }
      },

      // handle menu actions
      onAction:function (actionName, event, pos, uiTarget)
      {
        switch(actionName) {
          case 'down':
            this.onMouseDown(pos);
            break;
          case 'up':
            this.onMouseUp(pos);
            break;
        }
      }
    });
