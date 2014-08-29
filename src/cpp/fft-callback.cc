#include <stdint.h>
#include <stdio.h>

extern "C" void fftCallback (uint8_t* fft, size_t len, float frame_size) {
    (void) fft;
    (void) len;
    (void) frame_size;
    for (size_t i = 0; i < 10; ++i)
        printf ("%u: %u - ", i, fft[i]);
    printf ("\n");
    printf ("frame_size: %f\n", frame_size);
}

