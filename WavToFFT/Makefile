SRC=src/main.cc
EXE=FFT
INCS=-I/usr/include
LIBS=-lfftw3 -lsndfile
LDIR=-L/usr/local/lib/libfftw3.a -L/usr/lib/x86_64-linux-gnu/libsndfile.so.1.0.25
CFLAGS=-g -Wall -std=c++0x
CC=g++
LOGS=log/data.temp log/filedata.out

all: $(EXE)

$(EXE): $(SRC)
	$(CC) ${CFLAGS} $(SRC) -o $(EXE) $(INCS) ${LDIR} ${LIBS}

clean:
	rm -f $(EXE) $(LOGS)