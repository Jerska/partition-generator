ACCEPTED_EXTENSIONS = {
  html: 'text/html',
  css: 'text/css',
  js: 'application/x-javascript',
  swf: 'application/x-shockwave-flash'
}

http    = require 'http'
path    = require 'path'
url     = require 'url'
fs      = require 'fs'
port    = process.env.PORT || 3000
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
            return sendError res, 400, 'Unallowed extension' if Object.keys(ACCEPTED_EXTENSIONS).indexOf(ext) is -1
            fs.readFile filename, (err, file) ->
                return sendError res, 500, err if err
                res.writeHead 200, 'Content-Type': ACCEPTED_EXTENSIONS[ext]
                res.write file
                res.end()

app.listen port, ->
  console.log "Server running on port #{port}"
  console.log "Ctrl + C to shutdown"
