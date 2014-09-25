#include <fftw3.h>
#include <stdlib.h>
#include <stdio.h>
#include <iostream>
#include <string>
#include "SignalProcessor.h"
#include "WavParser.h"
#include "Misc.h"

/*!
	\file main.cc
	Entry point of the program.
*/

int main(int argc, char *argv[]) {

	WavParser wp = WavParser();
	SignalProcessor sp = SignalProcessor();
	Misc m = Misc();

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
 	sp.setParams(4000, 0.2, 200, 100, wp.getDataSize());
 	sp.setFrequencyRange(32,5000);
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
 	sp.getPrinter().printSignals();

 	std::string note = m.frequencyToNote(f);

 	std::cout << "note : " << note << std::endl;

	return 0;
}