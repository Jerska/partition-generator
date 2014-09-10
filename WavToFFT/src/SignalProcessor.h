#ifndef SIGNAL_PROCESSOR_HH
#define SIGNAL_PROCESSOR_HH

#include <fftw3.h>

class SignalProcessor
{
    public:
    	SignalProcessor();
        ~SignalProcessor();

        void setParams(float max_freq_error, int harmonics, unsigned int lowbound, unsigned int highbound);
    	void computeFFT(double *data, int data_size);
    	void computeHPS();
    	void computeMagnitude(fftw_complex* result);

    	fftw_complex *getFFTComplex();

    private:
    	// attributes

        float max_freq_error;
        int harmonics;
        int fft_size;
        unsigned int lowbound;
        unsigned int highbound;
        double *fftMag;
        float *spectrum;
        fftw_complex *fftComplex;
};

#endif /* SIGNAL_PROCESSOR_HH */