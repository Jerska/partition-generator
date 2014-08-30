#include "PartitionGenerator.h"
#include <stdlib.h>
#include <iostream>

PartitionGenerator::PartitionGenerator()
:recording(false), nbNoiseIterations(30)
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
PartitionGenerator::detectNote(uint8_t* fft, size_t len, float frame_size)
{
    this->nbFreqs = len;
    //add to noise table
    if (!recording)
    {
        this->noise.push(fft);
        if (this->noise.size() > this->nbNoiseIterations)
        {
            this->noise.pop();
        }
    }
    //Process fft
    else
    {
        frame_size = 0; //-Wall
    }
}

void
PartitionGenerator::cancelNoise(size_t len)
{
    this->finalNoise = (uint8_t *)malloc(len * sizeof(uint8_t));
    int nbIters = this->noise.size();

    for (size_t i = 0; i < this->nbFreqs; ++i)
    {
        this->finalNoise[i] = 0;
    }

    while(!this->noise.empty())
    {
        uint8_t *noiseIter = this->noise.back();

        for (size_t i = 0; i < this->nbFreqs; ++i)
        {
            this->finalNoise[i] += noiseIter[i];
        }

        this->noise.pop();
    }

    for (size_t i = 0; i < len; ++i)
    {
        this->finalNoise[i] /= nbIters;
    }
}

PartitionGenerator::~PartitionGenerator()
{
    free(this->finalNoise);
    this->finalNoise = 0;
}
