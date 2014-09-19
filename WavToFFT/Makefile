SRC=src/main.cc src/WavParser.cc src/SignalPrinter.cc src/SignalProcessor.cc
EXE=FFT
INCS=-I/usr/include
LIBS=-lfftw3 -lsndfile
LDIR=-I $HOME/local/include
CFLAGS=-g -Wall -pedantic -std=c++0x
CC=g++
LOGS=log/data.temp log/filedata.out

all: $(EXE)

$(EXE): $(SRC)
	$(CC) ${CFLAGS} $(SRC) -o $(EXE) $(INCS) ${LDIR} ${LIBS}

clean:
	rm -f $(EXE) $(LOGS)