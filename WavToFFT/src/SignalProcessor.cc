#include <stdlib.h>
#include <fftw3.h>
#include <math.h>
#include "SignalProcessor.h"

#define REAL 0
#define IMAG 1

SignalProcessor::SignalProcessor()
:max_freq_error(0), harmonics(0), lowbound(0), highbound(0)
{

}

void
SignalProcessor::setParams(int harmonics, unsigned int lowbound, unsigned int highbound, float max_freq_error)
{
	this->harmonics = harmonics;
	this->lowbound = lowbound;
	this->highbound = highbound;
	this->max_freq_error = max_freq_error;
}

void
SignalProcessor::fftInit()
{
	fftin = new float[(highbound - lowbound)];
}

void
SignalProcessor::computeMagnitude(fftw_complex* result, int fft_size)
{
	FILE *temp = fopen("log/data.temp", "w");

	if (fft_size > (int)highbound)
		fft_size = highbound + 1;

    for (int i = 0; i < fft_size; i++)
    {
    	fftin[i] = sqrt(result[i][REAL] * result[i][REAL] + result[i][IMAG] * result[i][IMAG]);

    	fprintf(temp, "%i %g \n", i, fftin[i]); //Write the data to a temporary file
    }
}

void
SignalProcessor::computeFFT(double *data, int data_size)
{
	int nc = (data_size / 2) + 1;

	fftw_complex *result = reinterpret_cast<fftw_complex*>(fftw_malloc(sizeof(fftw_complex) * nc));

  	fftw_plan plan_forward = fftw_plan_dft_r2c_1d(data_size, data, result, FFTW_ESTIMATE);
	fftw_execute(plan_forward);
}

void
SignalProcessor::computeHPS()
{

}