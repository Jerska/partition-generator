WAVEHEIGHT  = 256
FFTSIZE     = 2048
MAXFREQ     = 44100
SMOOTH      = 0.1

BINS        = FFTSIZE / 2
FRAME       = MAXFREQ / BINS

NOTES       = {
    'do': 4186,
    'do#': 4435,
    'ré': 4698,
    'ré#': 4978,
    'mi': 5274,
    'fa': 5588,
    'fa#': 5920,
    'sol': 6272,
    'sol#': 6645,
    'la': 7040,
    'la#': 7459,
    'si': 7902
}

notes = []
for i in [0..8]
    notes.push {}
    for note, freq of NOTES
        notes[i][note] = freq / Math.pow(2, i)

console.log notes

app = angular.module 'partition-generator'

app.controller 'SoundController', ['$scope', ($scope) ->
    noise               = new Uint32Array BINS
    context             = null
    analyser            = null
    javascript_node     = null
    mediaStreamSource   = null
    canvas              = null
    in_run              = false
    fftCallback         = Module.cwrap 'fftCallback', 'void', ['number', 'number', 'number']
    startRecording      = Module.cwrap 'startRecording', 'void'

    checkFunctionnality = (name, to_check) ->
        try
            to_check()
        catch error
            alert "Your navigator doesn't support #{name}\nSee the console for more details"
            console.log "#{name} error", error

    userMediaRetrieve = (cb) ->
        checkFunctionnality 'UserMedia', ->
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia
            navigator.getUserMedia audio: true, cb, (-> alert 'Stream generation failed')

    run = ->
        return if in_run
        in_run = true
        analyser.getByteFrequencyData $scope.buf

        bufSize = $scope.buf.length * $scope.buf.BYTES_PER_ELEMENT
        bufPtr  = Module._malloc bufSize
        bufHeap = new Uint8Array Module.HEAPU8.buffer, bufPtr, bufSize
        bufHeap.set $scope.buf

        fftCallback bufHeap.byteOffset, BINS, FRAME

        Module._free bufHeap.byteOffset

        $scope.$apply ->
            ++$scope.iter

        if $scope.register_noise
            for i in [0..BINS]
                noise[i] = (noise[i] || 0) + $scope.buf[i]
                undefined
        else
            for i in [0..BINS]
                $scope.buf[i] = if $scope.buf[i] > noise[i] then $scope.buf[i] - noise[i] else 0
                undefined

        for i in [0..BINS]
            moy = 0
            bot = if i < 5 then 0 else i - 5
            top = if i > (BINS - 5) then BINS else i + 5
            for j in [bot..top]
                if i != j
                    moy += $scope.buf[j]
            $scope.newbuf[i] = if $scope.buf[i] > ((moy / (top - bot)) * 1.1) then $scope.buf[i] else 0
            undefined

        canvas.clearRect 0, 0, BINS, WAVEHEIGHT
        canvas.strokeStyle = 'red'
        canvas.beginPath()
        for i in [0..BINS] by 128
            canvas.moveTo i + 0.5, 0.5
            canvas.lineTo i + 0.5, WAVEHEIGHT + 0.5
            undefined
        canvas.stroke()
        canvas.strokeStyle = 'black'
        canvas.beginPath()
        for i in [0..BINS]
            canvas.moveTo i + 0.5, WAVEHEIGHT + 0.5
            canvas.lineTo i + 0.5, WAVEHEIGHT - $scope.newbuf[i] + 0.5
            undefined
        canvas.stroke()

        res = []
        for _notes, octave in notes
            for note, freq of _notes
                i = 1
                while $scope.newbuf[Math.floor(freq * i / FRAME)] > 15
                    i += 2
                if i > (octave * 2 + 7)
                    res.push "#{note} [#{octave}]"
        $scope.$apply ->
            $scope.current_notes = res
        in_run = false



    $scope.init = ->
        $scope.buf = new Uint8Array BINS
        $scope.newbuf = new Uint8Array BINS

        canvas = document.getElementById('waveform').getContext '2d'
        canvas.lineWidth = 1

        $scope.dims = {width: BINS, height: WAVEHEIGHT}

        $scope.register_noise = true
        $scope.iter = 1
        $scope.current_notes = []

        window.requestAnimationFrame ||= window.webkitRequestAnimationFrame

        checkFunctionnality 'AudioContext', ->
            window.AudioContext ||= window.webkitAudioContext
            context = new AudioContext()

        userMediaRetrieve (stream) ->
            mediaStreamSource = context.createMediaStreamSource(stream)
            analyser = context.createAnalyser()
            analyser.fftSize = FFTSIZE
            analyser.smoothingTimeConstant = SMOOTH
            mediaStreamSource.connect analyser
            javascript_node = context.createScriptProcessor FFTSIZE, 1, 1
            analyser.connect javascript_node
            javascript_node.connect context.destination
            javascript_node.onaudioprocess = run

    $scope.start = ->
        $scope.register_noise = false
        startRecording()
        console.log noise
        for i in [0..BINS]
            noise[i] /= $scope.iter
            undefined
        in_run = false
]
