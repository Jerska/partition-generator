#include <stdlib.h>
#include <iostream>
#include <fftw3.h>
#include <math.h>
#include "SignalProcessor.h"

#define REAL 0
#define IMAG 1

SignalProcessor::SignalProcessor()
:max_freq_error(0), harmonics(0), lowbound(0), highbound(0)
{

}

SignalProcessor::~SignalProcessor()
{

}

void
SignalProcessor::setParams(float max_freq_error, int harmonics, unsigned int lowbound, unsigned int highbound)
{
	this->harmonics = harmonics;
	this->lowbound = lowbound;
	this->highbound = highbound;
	this->max_freq_error = max_freq_error;
}

fftw_complex *
SignalProcessor::getFFTComplex()
{
	return fftComplex;
}

void
SignalProcessor::computeMagnitude(fftw_complex* result)
{
	FILE *temp = fopen("log/data.temp", "w");


    for (int i = 0; i < (int)highbound; i++)
    {
    	double mag;
    	mag = sqrt(result[i][REAL] * result[i][REAL] + result[i][IMAG] * result[i][IMAG]);
    	//std::cout << i << "--" << mag << std::endl;
    	fprintf(temp, "%i %g \n", i, mag); //Write the data to a temporary file
    	//fftMag[i] = mag;
    }
}

void
SignalProcessor::computeFFT(double *data, int data_size)
{
	fft_size = (data_size / 2) + 1;

	fftComplex = reinterpret_cast<fftw_complex*>(fftw_malloc(sizeof(fftw_complex) * fft_size));

  	fftw_plan plan_forward = fftw_plan_dft_r2c_1d(data_size, data, fftComplex, FFTW_ESTIMATE);
	fftw_execute(plan_forward);
}

void
SignalProcessor::computeHPS()
{

}