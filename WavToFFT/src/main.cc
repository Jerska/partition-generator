#include <fftw3.h>
#include <stdlib.h>
#include <stdio.h>
#include <iostream>
#include <string>
#include "SignalProcessor.h"
#include "WavParser.h"


int main(int argc, char *argv[]) {

	WavParser wp = WavParser();
	SignalProcessor sp = SignalProcessor();

	if (argc != 2)
	{
		printf("\nUSAGE :");
		printf("\t./FFT [FILE.wav]\n\n");
		exit(-1);
	}

	// Wav Parsing
	wp.getInfos(argv[1]);
	wp.printInfos();
	wp.parse(argv[1]);

	// FFT Initialization
 	sp.setParams(8000, 0.2, 200, 100, wp.getDataSize());
 	sp.setFrequencyRange(0,5000);
 	sp.computeFFTSize();

	//FFT Computation
  	sp.STFT(wp.getData());
  	sp.computeMagnitude();
   	sp.computeSpectrum();

	//Find Fundamental
 	float f = 0;
	f = sp.findFundamental();

 	std::cout << "Fundamental : " << f << " Hz" << std::endl;

 	// Print Signals
	sp.printSignal();

	return 0;
}