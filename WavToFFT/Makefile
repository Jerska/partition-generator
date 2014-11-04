SRC=src/main.cc src/WavParser.cc src/SignalPrinter.cc src/SignalProcessor.cc src/Misc.cc
EXE=FFT
INCS=-I/usr/include -I/usr/local/include
LIBS=-lfftw3 -lsndfile -L/usr/local/lib
LDIR=-I $HOME/local/include
CFLAGS=-g -Wall -std=c++0x
CC=g++
LOGS=log/data*.temp log/filedata.out

all: $(EXE)

$(EXE): $(SRC)
	$(CC) ${CFLAGS} $(SRC) -o $(EXE) $(INCS) ${LDIR} ${LIBS}

clean:
	rm -f $(EXE) $(LOGS)
