#include <stdlib.h>
#include <iostream>
#include <vector>
#include <map>
#include "SignalPrinter.h"

/*!
	\file SignalPrinter.cc
	Print at different stages the processed signal.
*/

#define NUM_COMMANDS 4

SignalPrinter::SignalPrinter()
{
}

SignalPrinter::~SignalPrinter()
{
}

void
SignalPrinter::init(unsigned int lowbound, unsigned highbound, float factor)
{
	this->lowbound = lowbound;
	this->highbound = highbound;
	this->factor = factor;
}

void
SignalPrinter::writeSignal(std::string file, float *data, int data_length)
{
	FILE *temp = fopen(file.c_str(), "w+");

	for (int i = 0; i < data_length && (i * factor) <= (int)highbound; i++)
		fprintf(temp, "%f %g \n", i * factor, data[i]);

	fclose(temp);
}

void
SignalPrinter::addSignal(std::string title, float *data, int data_length)
{
	int numSignal = files.size() + 1;

	std::string file = "./log/data" + std::to_string(numSignal) + ".temp";

	std::vector<std::string> command = {"set title \"" + title + "\"",
								"set xlabel \"Frequency (Hz)\"",
								"set ylabel \"Magnitude\"",
								"plot '" + file + "' with lines"};

	FILE *pipe = new FILE;

	files.push_back(file);
	commands.push_back(command);
	pipes.push_back(pipe);

	writeSignal(file, data, data_length);
}

void
SignalPrinter::printSignals()
{
	std::cout << files.size() << std::endl;

	for (int i = 0; i < (int)files.size(); i++)
	{
		pipes[i] = popen("gnuplot -persistent", "w");

		for (int j = 0; j < NUM_COMMANDS; j++)
			fprintf(pipes[i], "%s \n", commands[i][j].c_str());
	}
}
