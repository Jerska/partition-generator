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
        for (size_t i = 0; i < len; ++i)
        {   
            std::cout << (int)fft[i] << " ";
            (fft[i] > this->finalNoise[i]) ? fft[i] -= this->finalNoise[i] : fft[i] = 0;
        }
        std::cout << std::endl;
        this->detectNote(fft, len, frame_size);
    }
}

void
PartitionGenerator::detectNote(uint8_t* fft, size_t len, float frame_size)
{
            for (size_t i = 0; i < len; ++i)
        {   
            std::cout << (int)fft[i] << " ";
        }
        std::cout << std::endl;

    fft = 0;
    len = 0;
    frame_size = 0;
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
