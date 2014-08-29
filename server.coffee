ACCEPTED_EXTENSIONS = ['html', 'js', 'swf', 'css']

http    = require 'http'
path    = require 'path'
url     = require 'url'
fs      = require 'fs'
port    = parseInt process.env.port || '3000', 10
cwd     = process.cwd()

sendError = (res, code, text) ->
    res.writeHead code, 'Content-type': 'text/plain'
    res.write "#{code}: #{text}"
    res.end()


app = http.createServer (req, res) ->
    uri         = url.parse(req.url).pathname
    filename    = path.join cwd, uri

    if (filename.indexOf(cwd) isnt 0)
        return sendError res, 400, 'Directory traversal attack detected'

    fs.exists filename, (exists) ->
        return sendError res, 404, 'File Not Found' unless exists
        filename = path.join filename, 'index.html' if fs.statSync(filename).isDirectory()
        fs.exists filename, (exists) ->
            return sendError res, 404, 'File Not Found' unless exists
            ext = filename.split('.').pop()
            return sendError res, 400, 'Unallowed extension' if ACCEPTED_EXTENSIONS.indexOf(ext) is -1
            fs.readFile filename, 'utf-8', (err, file) ->
                return sendError res, 500, err if err
                res.writeHead 200
                res.charset = 'utf-8'
                res.write file
                res.end()

app.listen port
console.log "Server running on port #{port}"
console.log "Ctrl + C to shutdown"
