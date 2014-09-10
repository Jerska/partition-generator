#ifndef SIGNAL_PROCESSOR_HH
#define SIGNAL_PROCESSOR_HH

#include <fftw3.h>

class SignalProcessor
{
    public:
    	SignalProcessor();
        ~SignalProcessor();

    private:
    	void setParams(int harmonics, unsigned int lowbound, unsigned int highbound, float max_freq_error);
    	void fftInit();
    	void computeFFT(double *data, int data_size);
    	void computeHPS();
    	void computeMagnitude(fftw_complex* result, int fft_size);

    	// attributes

        float max_freq_error;
        int harmonics;
        unsigned int lowbound;
        unsigned int highbound;
        float *fftin;
        float *spectrum;
};

#endif /* SIGNAL_PROCESSOR_HH */