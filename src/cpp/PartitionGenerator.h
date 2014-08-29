#ifndef PARTITION_GENERATOR_HH
#define PARTITION_GENERATOR_HH

#include <stdint.h>
#include <stdio.h>
#include <queue>

class PartitionGenerator
{
    public:
        static PartitionGenerator& getInstance()
        {
            static PartitionGenerator instance;

            return instance;
        }

        ~PartitionGenerator();
        void setRecording(bool recording);
        void detectNote(uint8_t* fft, size_t len, float frame_size);

    private:
        PartitionGenerator();
        PartitionGenerator(PartitionGenerator const&);
        void operator=(PartitionGenerator const&);

        //Methods
        void cancelNoise(size_t len);

        bool recording;
        //We keep noise for the last 30 iterations (~3s)
        std::queue<uint8_t*> noise;
        uint8_t* finalNoise;
        size_t nbNoiseIterations;
        size_t nbFreqs;
};

#endif /* PARTITION_GENERATOR_HH */
