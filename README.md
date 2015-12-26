# Web Audio API

### Basics of Web Audio API taken form tuts plus

```javascript
//Create a new audio context
var context = new AudioContext();
var osc = context.createOscillator();
var volume = context.createGain();

volume.gain.value = 0.5;

osc.connect(volume);

volume.connect(context.destination);
//Start the oscillator
osc.start()

osc.stop()


```
