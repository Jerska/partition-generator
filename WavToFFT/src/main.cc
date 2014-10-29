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

	std::vector<std::pair<std::string, float> > notes;
	std::vector<std::string> onSetNotes;

	int file_pos = 1;

	if (argc == 3)
		file_pos = 2;

	if ((argc < 2 || argc > 3 ) || (argc == 3 && ((std::string)argv[1]).compare("--test") != 0))
		print_usage();

	// Wav Parsing
	wp.getInfos(argv[file_pos]);
	wp.parse(argv[file_pos]);

	// FFT Initialization
 	sp.setParams(4000, 0.2, 200, 100, wp.getDataSize());
 	sp.setFrequencyRange(32,5000);
 	sp.computeFFTSize();

	//FFT Computation
  	sp.processSignal(wp.getData());

  	notes = sp.getNotes();
  	onSetNotes = sp.getOnSetNotes();

  	std::cout << "notes : ";
  	for (auto it = notes.begin(); it != notes.end(); ++it)
  	{
  		std::cout << it->first << " | ";
  	}
  	std::cout << std::endl;

  	std::cout << "onSet notes : ";
  	for (auto it = onSetNotes.begin(); it != onSetNotes.end(); ++it)
  	{
  		std::cout << *it << " | ";
  	}
  	std::cout << std::endl;

	return 0;
}