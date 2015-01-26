
#include "Misc.h"
#include <iostream>
#include <utility>
#include <stdlib.h>
#include <math.h>

/*!
	\file Misc.cc
	Contains all miscellaneous features of the project.
*/

Misc::Misc()
:max_error(1.45)
{
	for (int i = 0; i <= 7; ++i)
	{
		notes[pow(2, i) * 32.70] = std::make_pair(i, "C");
		notes[pow(2, i) * 34.65] = std::make_pair(i, "C#");
		notes[pow(2, i) * 36.71] = std::make_pair(i, "D");
		notes[pow(2, i) * 38.89] = std::make_pair(i, "D#");
		notes[pow(2, i) * 41.20] = std::make_pair(i, "E");
		notes[pow(2, i) * 43.65] = std::make_pair(i, "F");
		notes[pow(2, i) * 46.25] = std::make_pair(i, "F#");
		notes[pow(2, i) * 49.00] = std::make_pair(i, "G");
		notes[pow(2, i) * 51.91] = std::make_pair(i, "G#");
		notes[pow(2, i) * 55.00] = std::make_pair(i, "A");
		notes[pow(2, i) * 58.27] = std::make_pair(i, "A#");
		notes[pow(2, i) * 61.74] = std::make_pair(i, "B");
	}
}

Misc::~Misc()
{

}

std::string
Misc::frequencyToNote(float frequency)
{
	std::string note = "X[X]";

	float sup = 0;
	float inf = 0;
	for (auto it = notes.cbegin(); it != notes.cend(); ++it)
	{
		inf = (*it).first - (max_error * pow(2, std::get<0>((*it).second)));
		sup = (*it).first + (max_error * pow(2, std::get<0>((*it).second)));
		if (sup <= 200 && inf >= 0){
		std::cout << "inf limit = " << inf << std::endl;
		std::cout << "sup limit = " << sup << std::endl;
		}
		if (frequency > (*it).first - (max_error * pow(2, std::get<0>((*it).second))) &&
			frequency < (*it).first + (max_error * pow(2, std::get<0>((*it).second)))){
			note = std::get<1>((*it).second) + std::string("[") + std::to_string(std::get<0>((*it).second) + 1) + std::string("]");
			break;


		}
	}

	return note;
}

