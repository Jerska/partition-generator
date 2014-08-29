#include <stdint.h>
#include <stdio.h>
#include "PartitionGenerator.h"

extern "C" void fftCallback (uint8_t* fft, size_t len, float frame_size) {
    (void) fft;
    (void) len;
    (void) frame_size;

	PartitionGenerator::getInstance().detectNote(fft, len, frame_size);
}

extern "C" void startRecording() {
    //PartitionGenerator::getInstance().setRecording(true);
}