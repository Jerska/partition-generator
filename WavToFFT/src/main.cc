#include <fftw3.h>
#include <stdlib.h>
#include <stdio.h>
#include <iostream>
#include <vector>
#include <string>
#include "SignalProcessor.h"
#include "WavParser.h"
#include "Misc.h"

/*!
	\file main.cc
	Entry point of the program.
*/

void print_usage()
{
	printf("\nUSAGE :");
	printf("\t./FFT [--test] FILE.wav\n\n");
	exit(-1);
}

int main(int argc, char *argv[]) {

	WavParser wp = WavParser();
	SignalProcessor sp = SignalProcessor();
	Misc m = Misc();

	int file_pos = 1;

	if (argc == 3)
	{
		file_pos = 2;
	}

	if ((argc < 2 || argc > 3 ) || (argc == 3 && ((std::string)argv[1]).compare("--test") != 0))
		print_usage();

	// Wav Parsing
	// wp.getInfos(argv[file_pos]);
	// wp.parse(argv[file_pos]);

	// // FFT Initialization
 // 	sp.setParams(4000, 0.2, 200, 100, wp.getDataSize());
 // 	sp.setFrequencyRange(32,5000);
 // 	sp.computeFFTSize();

	// //FFT Computation
 //  	sp.STFT(wp.getData());
 //  	sp.computeMagnitude();
 //   	sp.computeSpectrum();

	// //Find Fundamental
 // 	float f = 0;
	// f = sp.findFundamental();

 	

 // 	// Print Signals
 	

 // 	std::string note = m.frequencyToNote(f);

	// if (argc == 2)
	// {
	// 	wp.printInfos();
	// 	sp.getPrinter().printSignals();
 // 		std::cout << "Fundamental : " << f << " Hz" << std::endl;
	// }

	std::string note;

	sp.addNote("G", 10);
	sp.addNote("F", 10);
	sp.addNote("K", 100);
	sp.addNote("K", 115);
	sp.addNote("K", 200);
	sp.addNote("K", 300);
	sp.addNote("N", 12);
	sp.addNote("C", 12);
	sp.addNote("Z", 12);
	sp.addNote("L", 12);


	std::vector<std::pair<std::string, float> > map = sp.getNotes();

	for (std::vector<std::pair<std::string, float> >::iterator it = map.begin(); it != map.end(); ++it)
	{
		std::cout << it->first << " : " << it->second << std::endl;	
	}
	

	note = sp.detectOnset(2, 15);

	//quit
	std::cout << note << std::endl;
 
	return 0;
}