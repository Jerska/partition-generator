/* Start reading here */
#include <fftw3.h>
#include <stdlib.h>
#include <stdio.h>
#include <string>
#include "SignalProcessor.h"
#include "WavParser.h"

#define NUM_COMMANDS 4

void printSignal()
{
	std::string commandsForGnuplot[] = {"set title \"DFT\"",
									"set xlabel \"Frequency (Hz)\"",
									"set ylabel \"Amplitude (dB)\"",
									"plot 'log/data.temp' with lines"};

	FILE *gnuplotPipe = popen("gnuplot -persistent", "w");

	

	for (int i = 0; i < NUM_COMMANDS; i++)
	{
	  	fprintf(gnuplotPipe, "%s \n", commandsForGnuplot[i].c_str());
    }
}

/* Resume reading here */
int main(int argc, char *argv[]) {

	WavParser wp = WavParser();
	SignalProcessor sp = SignalProcessor();

	if (argc != 2)
	{
		printf("\nUSAGE :");
		printf("\t./FFT [FILE.wav]\n\n");
		exit(-1);
	}

	wp.getInfos(argv[1]);
	wp.printInfos();

	wp.parse(argv[1]);

	sp.setParams(2, 3, 0, 5000);
	sp.computeFFT(wp.getData(), wp.getDataSize());
	sp.computeMagnitude(sp.getFFTComplex());

	printSignal();

	return 0;
}