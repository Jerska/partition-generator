#ifndef SIGNAL_PROCESSOR_HH
#define SIGNAL_PROCESSOR_HH

#include "SignalPrinter.h"
#include <fftw3.h>

/*!
    \file Compiler.cpp
    Compiler
*/

class SignalProcessor
{
    public:
    	SignalProcessor();
        ~SignalProcessor();

        void initPrinter(unsigned int lowbound, unsigned highbound, float factor);
        void setParams(int rate, float max_freq_error, int window_size, int window_ms_size, int signal_lentgh);
        void fftInit();
        void hamming(int windowLength, double *buffer);
        void blackmanHarris(int windowLength, double *buffer);
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
	/**
	 * \var max_freq_error
	 * This is the maximum error we accept in the input frequency
	 */
        float max_freq_error;

	/**
	 * \var fundamental
	 * This variable is the frequency of the fundamental detected in the file
	 */
        float fundamental;

	/**
	 * \var fft_size
	 * This variable stores the size of the array given to the fft
	 */
        int fft_size;
        int rate;
        int window_ms_size;
        int shift_ms_size;

	/**
	 * \var window_size
	 * This variable is the size (in milliseconds) of the window used to parse the file 
	 */
        int window_size;

	/**
	 * \var shift_size
	 * This variable is the size (in milliseconds) of the shift between windows
	 */
        int shift_size;

	/**
	 * \var signal_lentgh
	 * This variable is the length of the signal
	 */
        int signal_lentgh;

	/**
	 * \var fftBuffersize
	 * This variable stores the size of the array given by the fft
	 * which is the half of the original input
	 */
        int fftBufferSize;

	/**
	 * \var lowbound
	 * This variable is the low bound frequency of the input
	 */
        unsigned int lowbound;

	/**
	 * \var highbound
	 * This variable is the high bound frequency of the input
	 */
        unsigned int highbound;
        float *fftMag;
        float *spectrum;
        float *hps;
        fftw_complex *fft;

        SignalPrinter sPrinter;
};

#endif /* SIGNAL_PROCESSOR_HH */
