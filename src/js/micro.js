/**
 * \file micro.js
 * Contains the handling logic of the microphone
 */

/**
 * Transforms a character in base 64 to a 6 bit char
 */
function b64ToUint6 (nChr) {

    return nChr > 64 && nChr < 91 ?
        nChr - 65
        : nChr > 96 && nChr < 123 ?
        nChr - 71
        : nChr > 47 && nChr < 58 ?
        nChr + 4
        : nChr === 43 ?
        62
        : nChr === 47 ?
        63
        :
        0;
}

/**
 * Transforms a base 64 array to an acctual array
 */
function base64DecToArr (sBase64, nBlocksSize) {
    var
        sB64Enc = sBase64.replace(/[^A-Za-z0-9\+\/]/g, ""), nInLen = sB64Enc.length,
        nOutLen = nBlocksSize ? Math.ceil((nInLen * 3 + 1 >> 2) / nBlocksSize) * nBlocksSize : nInLen * 3 + 1 >> 2, taBytes = new Uint8Array(nOutLen);

    for (var nMod3, nMod4, nUint24 = 0, nOutIdx = 0, nInIdx = 0; nInIdx < nInLen; nInIdx++) {
        nMod4 = nInIdx & 3;
        nUint24 |= b64ToUint6(sB64Enc.charCodeAt(nInIdx)) << 18 - 6 * nMod4;
        if (nMod4 === 3 || nInLen - nInIdx === 1) {
            for (nMod3 = 0; nMod3 < 3 && nOutIdx < nOutLen; nMod3++, nOutIdx++) {
                taBytes[nOutIdx] = nUint24 >>> (16 >>> nMod3 & 24) & 255;
            }
            nUint24 = 0;

        }
    }
    return taBytes;
}

window.lastNote = 0;       //! Stores the last note to compare with the current one (To know if it's still the same)
window.lastNoteLength = 0; //! Stores the actual note length
window.time = 0;           //! How long have we been playing ?

var sound_visualizer = document.getElementById('sound_visualizer').getContext('2d');
sound_visualizer.lineWidth = 1;
sound_visualizer.strokeStyle = 'black'
sound_visualizer.moveTo(0, 128);

/**
 * Allows to visualize the signal over time
 */
function visualize(arr) {
    sound_visualizer.beginPath()
        sound_visualizer.clearRect(0, 0, 1024, 256)
        for (var i = 0, len = arr.length; i < len; ++i) {
            sound_visualizer.lineTo(i/2, 128 - arr[i] * 100);
        }
    sound_visualizer.stroke();
}

window.SIZEOF_SAMPLES = 4096; //! Size of a sample

window.micState = 0;          //! Are we recording ? If yes, are we recording noise ?
window.RECORDING_NOISE = 1;   //! Are we recording noise ?
window.RECORDING_SONG = 2;    //! Are we recording actual notes ?

var i = 0;
var dataarray = new Float32Array(window.SIZEOF_SAMPLES);
/**
 * The callback function returns with a custom made number.
 * The last bit tells us if it is a new note, and the remaining
 * gives us the midi note.
 */
var callback = Module.cwrap('processMicroSignal', 'number', ['number', 'number']);
var nDataBytes = window.SIZEOF_SAMPLES * dataarray.BYTES_PER_ELEMENT;
var dataPtr = Module._malloc(nDataBytes);
var dataHeap = new Uint8Array(Module.HEAPU8.buffer, dataPtr, nDataBytes);

/**
 * The main callback. It is called with each sound sample.
 */
function jellymicCallback(data) {
    var arr = base64DecToArr(data, 4);
    var dataview = new DataView(arr.buffer);
    var res, note, newNote;

    for (var j = 0, len = arr.length / 4; j < len; ++j, ++i) {
        dataarray[i] = dataview.getFloat32(j * 4);
        if (i == 4095) {
            if (window.micState) {
                dataHeap.set(new Uint8Array(dataarray.buffer));
                console.log("Before callback");
                res = callback(dataHeap.byteOffset, window.micState == window.RECORDING_NOISE);
                note = Math.floor(res / 2);
                newNote = (res % 2) == 1;
                console.log("After callback, ", "received = ", res, "newNote = ", newNote, "note = ", note, "window.lastNote = ", window.lastNote);

                if (window.micState == window.RECORDING_SONG) {
                    if (window.lastNote !== note || newNote) {
                        console.log("In if");
                        if (window.lastNote > 0) {
                            console.log("Adding note", window.lastNote, window.lastNoteLength);
                            window.score.addNote(window.time - window.lastNoteLength, window.lastNote, window.lastNoteLength)
                        }
                        window.lastNote = note;
                        window.lastNoteLength = 0;
                    }
                    window.lastNoteLength += 2;
                    window.time += 2;
                }
            }
            i = -1;
        }
    }
}

/**
 * Called at initialization
 */
function callbackname(name) {
    console.log("mic name:", name);
}

/**
 * Called when user allows microphone
 */
function callbackallow(event) {
    console.log("mic allowed", event);
    $('#flash-modal').css('visibility', 'hidden'); // Can't use modal('hide') because it sets display: none which kills the flash container
}

/**
 * Called when the microphone is closed
 */
function callbackclose() {
    console.log("mic closed");
}

var swfid="jellymic";

var jellymic = document.getElementById(swfid);
if (jellymic) {
    var interval = window.setInterval(function(){
        if((typeof jellymic.startMicrophone) !== "undefined"){
            console.log("start mic !!!!");
            jellymic.startMicrophone("jellymicCallback", "callbackname", "callbackallow", "callbackclose", 5);
            clearInterval(interval);
        }
    }, 100);
}
