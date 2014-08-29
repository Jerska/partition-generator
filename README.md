# Partition generator

PFEE (Projet de Fin d'Étude en Entreprise / Project Graduation) of partition generation in partnership with JellyNote.
Created by :
- Julien GONZALEZ
- Antoine DELANNOY
- Matthieu DE CAMY
- Quentin CAVALIÉ
- Matthieu DUMONT

## Programs needed

- `emscripten` : Converts C++ into ASM interpretable by `asm.js`
- `coffee` : Converts coffeescript files into js ones.

## Project presentation

This project is meant to be executed on the client-side.
So the code is in JavaScript, and in C++ which is then generated in JS
with the help of `emscripten`.

We needed a server to be able to use Flash.
So we came up with a small nodejs server that serves static files.

We bundled it with make in this simple command :

`npm start`

This not only starts the server, but also restarts it when a file is
changed.
To use it, you will need the `watch` command.


To use the Makefile :
- `make` compiles all `js` files
- `make cxx` compiles only C++ files
- `make coffee` compiles only coffee files
- `make clean` removes the js folder in root

The project presentation (in French) can be found under `doc/presentation`
The Makefile has three rules:
- `make` : Generate the pdf (Run twice if you want the table of contents)
- `make read` : To open the PDF with evince
- `make clean` : To clear all temporary files

## Useful links

Real-time FFT :
http://stackoverflow.com/questions/6663222/doing-fft-in-realtime

FFmpeg documentation on input devices : 
https://www.ffmpeg.org/ffmpeg-devices.html#Input-Devices

Visualizing sound :
http://www.codeproject.com/Articles/488655/Visualizing-Sound

FFMPEG Tutorial :
http://dranger.com/ffmpeg/
