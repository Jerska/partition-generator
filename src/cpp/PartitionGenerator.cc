#include "PartitionGenerator.h"
#include <stdlib.h>
#include <math.h>
#include <iostream>

PartitionGenerator::PartitionGenerator()
:recording(false), testPrints(true), nbNoiseIterations(30)
{

}

void
PartitionGenerator::setRecording(bool recording)
{
    if (recording && !this->recording)
    {
        this->cancelNoise(this->nbFreqs);
    }

    this->recording = recording;
}

void
PartitionGenerator::processSound(uint8_t* fft, size_t len, float frame_size)
{
    this->nbFreqs = len;

    //add to noise table
    if (!recording)
    {
        uint8_t *pushedFft;
        pushedFft = (uint8_t *)malloc(len * sizeof(uint8_t));
        memcpy(pushedFft, fft, len * sizeof(uint8_t));
        this->noise.push(pushedFft);

        if (this->noise.size() > this->nbNoiseIterations)
        {
            this->noise.pop();
        }
    }
    //Process fft
    else
    {
        //Substract noise
        /*
        for (size_t i = 0; i < len; ++i)
        {   
            (fft[i] > this->finalNoise[i]) ? fft[i] -= this->finalNoise[i] : fft[i] = 0;
        }
        */
        this->detectNote(fft, len, frame_size);
    }

    if (testPrints)
    {
    	std::cout << "------ TEST PRINTS -------" << std::endl;
    	std::cout << "FRAME SIZE : " << frame_size << std::endl;
    	std::cout << "LENGTH : " << len << std::endl;
    	testPrints = false;

    }
}

void
PartitionGenerator::detectNote(uint8_t* fft, size_t len, float frame_size)
{
	int fundamental = hps(fft, len, frame_size, 3);
	
	fundamental++;
}

int
PartitionGenerator::hps(uint8_t* fft, size_t len, float frame_size, int harmonics)
{
	int maxHarmonicIndex = frame_size / harmonics;
	int maxLocation = 0;

	if ((int)len < maxHarmonicIndex)
		maxHarmonicIndex = len;

	// generate the Harmonic Product Spectrum values and keep track of the
	// maximum amplitude value to assign to a pitch.

	for (int j = 0; j <= maxHarmonicIndex; j++)
	{
		for (int i = 2; i <= harmonics; i++) // i=1 : double the fundamental
			fft[j] *= fft[j*i];

		if (fft[j] > fft[maxLocation])
			maxLocation = j;
	}

	// Correct for octave too high errors.  If the maximum subharmonic
   	// of the measured maximum is approximately 1/2 of the maximum
   	// measured frequency, AND if the ratio of the sub-harmonic
   	// to the total maximum is greater than 0.2, THEN the pitch value
   	// is assigned to the subharmonic.

	int max2 = 0;
   	int maxsearch = maxLocation * 3 / 4;

   	for (int i = 0; i < maxsearch; i++) {
    	if (fft[i] > fft[max2]) {
        	max2 = i;
      	}
   	}

   	if (abs(max2 * 2 - maxLocation) < 4) {
    	if (fft[max2]/fft[maxLocation] > 0.2) {
        	maxLocation = max2;
      	}
   	}

   	if (fft[maxLocation] == 255 && maxLocation != 0)
	{
		std::cout << "fundamental " << maxLocation * (43) << std::endl;
		//std::cout << "fft " << fft[maxLocation] << std::endl;
	}

	return maxLocation;
}

void
PartitionGenerator::cancelNoise(size_t len)
{
    int *tempFinalNoise = (int *)malloc(len * sizeof(int));
    this->finalNoise = (uint8_t *)malloc(len * sizeof(uint8_t));
    int nbIters = this->noise.size();

    for (size_t i = 0; i < len; ++i)
    {
        tempFinalNoise[i] = 0;
    }

    while(!this->noise.empty())
    {
        for (size_t i = 0; i < len; ++i)
        {
            tempFinalNoise[i] += (int)this->noise.front()[i];
        }
        this->noise.pop();
    }

    for (size_t i = 0; i < len; ++i)
    {
        this->finalNoise[i] = (uint8_t)(tempFinalNoise[i] / nbIters);
    }
}

PartitionGenerator::~PartitionGenerator()
{
    free(this->finalNoise);
    this->finalNoise = 0;
}
