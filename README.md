# Partition generator

PFEE (Projet de Fin d'Étude en Entreprise / Project Graduation) of partition generation in partnership with JellyNote.
Created by :
- Julien GONZALEZ
- Matthieu DE CAMY
- Quentin CAVALIÉ
- Matthieu DUMONT

## Requirements

An UNIX machine

- emscripten : Converts C++ into ASM interpretable by asm.js
- coffee : Converts coffeescript files into js ones.
- google-chrome

## Project presentation

This project is meant to be executed on the client-side.
So the code is in JavaScript, and in C++ which is then generated in JS
with the help of emscripten.

We needed a server to be able to use Flash.
So we came up with a small nodejs server that serves static files.

This is how you must compile the different parts of this project:
- Compiling and running the main program:
    - $ make && ./run.sh
    - access http://localhost:3000/ on a web browser
- Creating and viewing the documentation:
    - $ make doc 
    - either open index.html inside doc/html/ or run $ make in doc/latex/ and open the pdf.
- To run the test suite:
    - $ cd test/
    - $ python tester.py <files or directories>
    there are already three directories for notes in the low, mid or high octaves, located inside the test/ directory.

To clean the project:
    make clean on any of the makefiles.



