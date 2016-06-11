// create web audio api context
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
window.addEventListener('touchstart', function() {

	// create empty buffer
	var buffer = audioCtx.createBuffer(1, 1, 22050);
	var source = audioCtx.createBufferSource();
	source.buffer = buffer;

	// connect to output (your speakers)
	source.connect(audioCtx.destination);

	// play the file
	source.noteOn(0);

}, false);
// create Oscillator and gain node
var oscillator = audioCtx.createOscillator();
var osc2 = audioCtx.createOscillator();
var gainNode = audioCtx.createGain();
var gain2 = audioCtx.createGain();
// connect oscillator to gain node to speakers

oscillator.connect(gainNode);
osc2.connect(gain2);
gainNode.connect(audioCtx.destination);
gain2.connect(audioCtx.destination);

// create initial theremin frequency and volumn values

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var maxFreq = 6000;
var maxVol = 0.02;

var initialFreq = 3000;
var initialVol = 0.001;

// set options for the oscillator

oscillator.type = 'square';
oscillator.frequency.value = initialFreq; // value in hertz
oscillator.detune.value = 100; // value in cents
oscillator.start(0);

osc2.type = 'sine';
osc2.frequency.value = 3*initialFreq; // value in hertz
osc2.detune.value = 100; // value in cents
osc2.start(0);

oscillator.onended = function() {
  console.log('Your tone has now stopped playing!');
}

gainNode.gain.value = initialVol;
gain2.gain.value = initialVol;
// Mouse pointer coordinates
var curX;
var curY;
var curZ;

// Get new mouse pointer coordinates when mouse is moved
// then set new gain and pitch values

document.onmousemove = updatePage;

function updatePage(event) {
    curX = event.beta;
    curY = event.gamma;
    curZ = event.alpha;

    console.log(event);
    oscillator.frequency.value = (Math.round(10*((curX+180) / 360))/10)* maxFreq;
    osc2.frequency.value = (Math.round(10*((curZ+180) / 360))/10)* maxFreq/3;
    gainNode.gain.value = ((curY + 90) / 180) * maxVol;
    gain2.gain.value = ((curY + 90) / 180) * maxVol;
    console.log(gainNode.gain.value);
    canvasDraw();
}


//canvas visualization

function canvasDraw() {
    var red = Math.floor((curX + 180) % 255);
    var green = Math.floor((curZ + 180) % 255);
    var blue = Math.floor((curY + 90) % 255);
    var rgb = "rgb("+red+","+green+","+blue+")";
    document.body.style.backgroundColor = rgb;
    console.log(rgb);
}


window.addEventListener('deviceorientation', updatePage);
