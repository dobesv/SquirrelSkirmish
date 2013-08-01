//
// Play a sound - alter the volume based on the position of the entity relative to the screen
//
NoiseMaker = pc.components.Component.extend('NoiseMaker',
    {
      create:function (opts)
      {
        var c = this._super();
        c.config(opts);
        return  c;
      }
    },
    {
      sounds: [],
      queue: [],
      loops: [],
      volume: 0,

      init: function()
      {
        this._super('noise');
      },

      config:function(opts) {
        this.loops.length = 0;
        this.sounds.length = 0;
        this.queue.length = 0;
        this.volume = pc.checked(opts.volume, 1);
        if(opts.drone) {
          this.play(opts.drone, true);
        }
        if(opts.play) {
          this.play(opts.play, false);
        }
      },

      toSound:function(x) {
        if(typeof x === 'string') return pc.device.loader.get(x).resource;
        return x;
      },

      play:function(sound,loop) {
        if (!pc.device.soundEnabled) return;
        sound = this.toSound(sound);
        if(loop) {
          // Don't play the same loop multiple times per entity ...
          for(var i=0; i < this.loops.length; i++) {
            if(this.loops[i] == sound)
              return;
          }
          this.loops.push(sound);
        }
        if(this.volume < 0.01) {
          // Don't start sounds that are too quiet to hear
          return;
        }
        this.queue.push({sound:sound, loop:loop||false})
      },

      stop:function() {
        this.sounds.forEach(function(s) {
          s.pause();
        });
        this.sounds.length = 0;
        this.loops.length = 0;
      },

      /**
       * Update volume of all playing sounds for this entity
       * @param vol New volume level (0.0-1.0)
       */
      setVolume:function(vol) {
        var notSilent = vol >= 0.01;
        this.queue.forEach(function(x) {
          var s = x.sound.play(x.loop);
          if(s) {
            s.volume = this.volume;
            this.sounds.push(s);
          }
          return s;
        }, this);
        this.queue.length = 0;
        if(vol != this.volume) {
          // If the volume is increased from silence, restart any loops
          var restartLoops = this.volume < 0.01 && notSilent;
          this.volume = vol;
          if(restartLoops) {
            this.loops.forEach(function(loop) {
              var s = loop.play(true);
              if(s) {
                s.volume = vol;
                this.sounds.push(s);
              }
            }, this);
          }
          this.sounds.forEach(function(s) {
            // If the volume is super low, just stop playing the sound
            if(!s.ended && !s.paused) {
              s.volume = vol;
              if(vol < 0.01)
                s.pause();
            }
          });
        }
      },

      onBeforeRemoved:function() {
        this.stop();
      },

      /**
       * Remove any sounds that have finished playing from our list of sounds
       */
      cleanup:function() {
        for(var i=0; i < this.sounds.length; i++) {
          if(this.sounds[i].ended) {
            this.sounds.splice(i,1);
            i--;
          }
        }
      }

    });

