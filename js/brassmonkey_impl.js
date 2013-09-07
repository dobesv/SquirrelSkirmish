(function() {
  bm.init({
    name: "Squirrel Skirmish",
    bmMaxPlayers: 4,
    bmAppId: "62e822bc0e6b9f22fc158763591845be",
    logging: true,
    swfURL: "swf/brassmonkey.swf",
    design: {
      orientation: "landscape",
      touchEnabled: false,
      accelerometerEnabled: false,
      images:[
        "images/bm-controller-background.png",
        "images/button-left-up.png",
        "images/button-left-down.png",
        "images/button-right-up.png",
        "images/button-right-down.png",
        "images/button-jump-up.png",
        "images/button-jump-down.png",
        "images/button-fire-up.png",
        "images/button-fire-down.png"
      ],
      layout:[{
        type:   "image",
        image:  0,
        x:      0,
        y:      0,
        width:  480,
        height: 320
      },
        {
        type: "button",
        handler: "left",
        imageUp: 1,
        imageDown: 2,
        x:          37,
        y:          200,
        width:      80,
        height:     80
      },
        {
          type: "button",
          handler: "right",
          imageUp: 3,
          imageDown: 4,
          x:          117,
          y:          200,
          width:      80,
          height:     80
        },
        {
          type: "button",
          handler: "jump",
          imageUp: 5,
          imageDown: 6,
          x:          277,
          y:          200,
          width:      80,
          height:     80
        },
        {
          type: "button",
          handler: "fire",
          imageUp: 7,
          imageDown: 8,
          x:          357,
          y:          200,
          width:      80,
          height:     80
        }]
    }
  });

  bm.onShowSlot(function(color) {
    // document.getElementById('slot-color').style.background = color;
    console.log('Slot color: '+color);
  });

  bm.buttonState = {};
  var devices = [null, null, null, null];
  bm.onInvocation(function(invoke, deviceId) {
    /** @type string */ invoke.methodName;
    /** @type array */ invoke.parameters;
    /** @type string */ invoke.parameters[0].Value;

    var deviceNum;
    for(deviceNum = 0; deviceNum < devices.length; deviceNum++) {
      var device = devices[deviceNum];
      if(device && device.deviceId == deviceId) {
        break;
      }
    }
    if(deviceNum >= devices.length)
      return;
    //console.log('Invokation:', invoke);
    var buttonDown = invoke.parameters[0].Value == 'down';
    device.buttonState[invoke.methodName] = buttonDown;
  });

  bm.isPressed = function(deviceNum, buttonName) {
    var dev = devices[deviceNum];
    if(!dev || !('buttonState' in dev)) return false;
    return dev.buttonState[buttonName];
  };
  bm.onDeviceConnected(function(device){
    //document.getElementById('log').innerHTML += '<p>A Device Connected: "'+device.deviceName+'" | "'+device.deviceId+'"</p>';
    console.log('A Device Connected: "'+device.deviceName+'" | "'+device.deviceId+'"', device);
    for(var n=0; n < devices.length; n++) {
      if(! devices[n]) {
        devices[n] = device;
        device.buttonState = {};
        break;
      }
    }
  });

  bm.onDeviceDisconnected(function(device){
    //document.getElementById('log').innerHTML += '<p>A Device Disconnected: "'+device.deviceName+'" | "'+device.deviceId+'"</p>';
    console.log('A Device Disconnected: "'+device.deviceName+'" | "'+device.deviceId+'"', device);
    for(var n=0; n < devices.length; n++) {
      if(devices[n].deviceId == device.deviceId) {
        devices[n] = null;
        break;
      }
    }
  });

  console.log("Did BM init");
})();
