SRC=src/main.cc src/WavParser.cc src/SignalPrinter.cc src/SignalProcessor.cc
EXE=FFT
INCS=-I/usr/include
LIBS=-lfftw3 -lsndfile
LDIR=-L/usr/local/lib/libfftw3.a -I $HOME/local/include -L $HOME/local/lib -lsndfile
CFLAGS=-g -Wall -pedantic -std=c++0x
CC=g++
LOGS=log/data.temp log/filedata.out

all: $(EXE)

$(EXE): $(SRC)
	$(CC) ${CFLAGS} $(SRC) -o $(EXE) $(INCS) ${LDIR} ${LIBS}

clean:
	rm -f $(EXE) $(LOGS)