#ifndef SIGNAL_PROCESSOR_HH
#define SIGNAL_PROCESSOR_HH

#include "SignalPrinter.h"
#include <fftw3.h>

class SignalProcessor
{
    public:
    	SignalProcessor();
        ~SignalProcessor();

        void initPrinter(unsigned int lowbound, unsigned highbound, float factor);
        void setParams(int rate, float max_freq_error, int window_size, int window_ms_size, int signal_lentgh);
        void fftInit();
        void hamming(int windowLength, double *buffer);
        void setFrequencyRange(unsigned int lowbound, unsigned int highbound);
        void computeFFTSize();
    	void STFT(double *data);
    	void computeMagnitude();
    	void computeSpectrum();
    	void computeHPS(int harmonics);
    	float findFundamental();
    	fftw_complex *getFFTComplex();
    	int getFFTSize();
        SignalPrinter getPrinter();



    private:
    	// attributes
        float max_freq_error;
        float fundamental;
        int fft_size;
        int rate;
        int window_ms_size;
        int shift_ms_size;
        int window_size;
        int shift_size;
        int signal_lentgh;
        int fftBufferSize;
        unsigned int lowbound;
        unsigned int highbound;
        float *fftMag;
        float *spectrum;
        float *hps;
        fftw_complex *fft;

        SignalPrinter sPrinter;
};

#endif /* SIGNAL_PROCESSOR_HH */