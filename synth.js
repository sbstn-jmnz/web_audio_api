var context = new AudioContext(),
  volume = context.createGain(),
  sqareOscillators = {},
  sawtoothOscillators = {},
  analyser = context.createAnalyser(),
  waveData = new Uint8Array(analyser.frequencyBinCount),
  canvas = document.querySelector('#oscilloscope'),
  canvasConntext = canvas.getContext('2d'),
  canvasHeight = 150,
  canvasWidth = 587;


  volume.gain.value = 0.5;

  volume.connect(analyser);
  volume.connect(context.destination);

var keyboard = new QwertyHancock({
  id: 'keyboard',
  octaves: 2
});

keyboard.keyDown = function (note, frequency) {
  var squareOsc = context.createOscillator(),
      sawtoothOsc = context.createOscillator();

  sqareOscillators[note] = squareOsc;
  sawtoothOscillators[note] = sawtoothOsc;

  squareOsc.connect(volume);
  sawtoothOsc.connect(volume);

  squareOsc.frequency.value = frequency;
  sawtoothOsc.frequency.value = frequency;

  squareOsc.detune.value = -10;
  sawtoothOsc.detune.value = 10;

  squareOsc.type = 'square';
  sawtoothOsc.type = 'sawtooth';

  squareOsc.start(context.currentTime);
  sawtoothOsc.start(context.currentTime);
};

keyboard.keyUp = function (note, frequency) {
  sqareOscillators[note].stop(context.currentTime);
  sawtoothOscillators[note].stop(context.currentTime);
  sqareOscillators[note].disconnect();
  sawtoothOscillators[note].disconnect();
};

var xWidth = canvasWidth / analyser.frequencyBinCount;

var draw = function () {
  requestAnimationFrame(function () {
    canvas.width = canvasWidth;
    analyser.getByteTimeDomainData(waveData);

    for (var i = 0; i < waveData.length; i++) {
      var yPosition = waveData[i] / 256,
          xPosition = i * xWidth;

      yPosition = yPosition * canvasHeight;
      canvasConntext.lineTo(xPosition, yPosition);
    }
    canvasConntext.strokeStyle = 'yellow';
    canvasConntext.stroke();
    draw();
  });
};

draw();
