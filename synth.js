var context = new AudioContext(),
  volume = context.createGain(),
  oscillators = {};

  volume.gain.value = 0.5;

  volume.connect(context.destination);

  //osc.stop(context.currentTime + 1);
  //osc.start(context.currentTime); 

var keyboard = new QwertyHancock({
  id: 'keyboard',
  octaves: 2
});

keyboard.keyDown = function (note, frequency) {
  var osc = context.createOscillator();

  oscillators[note] = osc;

  osc.connect(volume);
  osc.frequency.value = frequency;
  osc.start(context.currentTime);
};

keyboard.keyUp = function (note, frequency) {
  oscillators[note].stop(context.currentTime);
  oscillators[note].disconnect();
};
