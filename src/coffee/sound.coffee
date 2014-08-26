WAVEHEIGHT  = 256
FFTSIZE     = 2048

context     = null
analyser    = null
canvas      = null
buf         = null
buflen      = 0

window.save = {}

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

run = () ->
    analyser.getByteFrequencyData buf

    canvas.clearRect 0, 0, buflen, WAVEHEIGHT
    canvas.strokeStyle = 'red'
    canvas.beginPath()
    for i in [0..buflen] by 128
        canvas.moveTo i + 0.5, 0.5
        canvas.lineTo i + 0.5, WAVEHEIGHT + 0.5
    canvas.stroke()
    canvas.strokeStyle = 'black'
    canvas.beginPath()
    for i in [0..buflen]
        canvas.moveTo i + 0.5, WAVEHEIGHT + 0.5
        canvas.lineTo i + 0.5, WAVEHEIGHT - buf[i] + 0.5
    canvas.stroke()

init = ->
    canvasCont = document.getElementById('waveform')
    canvasCont.height = WAVEHEIGHT
    canvas = canvasCont.getContext '2d'
    canvas.strokeStyle = 'black'
    canvas.lineWidth = 1

    window.requestAnimationFrame ||= window.webkitRequestAnimationFrame

    checkFunctionnality 'AudioContext', ->
        AudioContext = window.AudioContext || window.webkitAudioContext
        context = new AudioContext()

    userMediaRetrieve (stream) ->
        window.save.mediaStreamSource = context.createMediaStreamSource(stream)
        analyser = context.createAnalyser()
        analyser.fftSize = FFTSIZE
        window.save.mediaStreamSource.connect analyser
        buflen = analyser.frequencyBinCount
        buf = new Uint8Array buflen
        canvasCont.width = buflen
        javascriptNode = context.createScriptProcessor FFTSIZE, 1, 1
        analyser.connect javascriptNode
        javascriptNode.connect context.destination
        javascriptNode.onaudioprocess = run

init()
