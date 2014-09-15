#include <stdlib.h>
#include <iostream>
#include <fftw3.h>
#include <math.h>
#include "SignalProcessor.h"

#define REAL 0
#define IMAG 1
#define SAMPLE_RATE 44100
#define NUM_COMMANDS 4
#define _USE_MATH_DEFINES

SignalProcessor::SignalProcessor()
:max_freq_error(0), fundamental(0), lowbound(0), highbound(0)
{

}

SignalProcessor::~SignalProcessor()
{

}

void
SignalProcessor::setFrequencyRange(unsigned int lowbound, unsigned int highbound)
{
	this->lowbound = lowbound;
	this->highbound = highbound;
}

void
SignalProcessor::setParams(int rate, float max_freq_error, int window_ms_size, int shift_ms_size, int signal_lentgh)
{
	this->rate = rate;
	this->max_freq_error = max_freq_error;
	this->window_ms_size = window_ms_size;
	this->shift_ms_size = shift_ms_size;
	this->signal_lentgh = signal_lentgh;

	window_size = (window_ms_size * rate) / 1000;
	shift_size = (shift_ms_size * rate) / 1000;
}

fftw_complex *
SignalProcessor::getFFTComplex()
{
	return fft;
}

int
SignalProcessor::getFFTSize()
{
	return fft_size;
}

void
SignalProcessor::hamming(int windowLength, double *buffer)
{
	for (int i = 0; i < windowLength; i++)
		buffer[i] =  0.53836 - (0.46164 * cos(2.0 * M_PI * (i / double(windowLength - 1))));
}


void
SignalProcessor::computeFFTSize()
{
	fftBufferSize = round(rate / max_freq_error);
    fftBufferSize = pow(2.0, ceil(log2(fftBufferSize)));
    max_freq_error = (float)rate / (float)fftBufferSize;

    fft_size = (fftBufferSize / 2) + 1;
    shift_size = (fftBufferSize / 2) + 1;

    fftInit();
}

void
SignalProcessor::fftInit()
{
	fft = new fftw_complex[fft_size];
	fftMag = new double[fft_size];
	spectrum = new float[fft_size];
	hps = new float[fft_size];

	for (int i = 0; i < fft_size; i++)
	{
		fftMag[i] = 0;
		spectrum[i] = 0.0; 
		hps[i] = 0.0;
	}
}

void
SignalProcessor::computeMagnitude()
{
	FILE *temp = fopen("log/data.temp", "w");

    for (int i = 0; i < fft_size; i++)
    {
    	fftMag[i] = sqrt(fft[i][REAL] * fft[i][REAL] + fft[i][IMAG] * fft[i][IMAG]);

    	if ((i * SAMPLE_RATE) / fftBufferSize  <= (int)highbound)
    		fprintf(temp, "%i %g \n", (i * SAMPLE_RATE) / fftBufferSize, fftMag[i]);
    }
}

void
SignalProcessor::STFT(double *data)
{
	int windowPosition = 0;
	int windowNum = 0;
	int readIndex = 0;
	int bStop = 0;
	int isEven = true;
	double *window = new double[fftBufferSize];

	fftw_complex *dataWindow = new fftw_complex[fftBufferSize];
	fftw_complex *fft_result = new fftw_complex[fft_size];

	fftw_plan plan_forward = fftw_plan_dft_1d(fftBufferSize, dataWindow, fft_result, FFTW_FORWARD, FFTW_ESTIMATE);

	hamming(fftBufferSize, window);

	while (windowPosition < signal_lentgh && !bStop)
	{
		for (int i = 0; i < window_size; i++)
		{
			readIndex = windowPosition + i;

			if (readIndex < signal_lentgh) 
			{
				dataWindow[i][REAL] = data[readIndex] * window[i];
				dataWindow[i][IMAG] = 0;
			}

			else
			{
				dataWindow[i][REAL] = 0;
				dataWindow[i][IMAG] = 0;
				bStop = 1;
			}
		}

		fftw_execute(plan_forward);

		for (int i = 0; i < fft_size; i++)
		{
			fft[i][REAL] += fft_result[i][REAL];
			fft[i][IMAG] += fft_result[i][IMAG];
		}
		
		windowPosition += shift_size;

		if (isEven)
		{
			windowNum++;
			isEven = false;
		}

		else
			isEven = true;
	}

	for (int i = 0; i < fft_size; i++)
	{
			fft[i][REAL] /= windowNum;
			fft[i][IMAG] /= windowNum;
	}

	delete[] window;
	fftw_destroy_plan(plan_forward);
	fftw_free(dataWindow);
	fftw_free(fft_result);
}

void
SignalProcessor::computeSpectrum()
{
	// Might be unnecessary

	int i;

	for (i = 0; i < fft_size; i++)
		spectrum[i] = fftMag[i];

	for (i = 0; i < (int)lowbound; ++i)
		spectrum[i] = 0.0;

    for (i = highbound + 1; i < fft_size; ++i)
    	spectrum[i] = 0.0;

 	for (i = lowbound; i < fft_size; ++i)
    	spectrum[i] *= -1 * log((float)(fft_size - i) / (float)(2 * fft_size)) * (float)(2 * fft_size);
    
   
	FILE *temp = fopen("log/data3.temp", "w");

    for (int i = 0; (i * SAMPLE_RATE) / fftBufferSize <= (int)highbound; i++)
    {
    	fprintf(temp, "%i %g \n", (i * SAMPLE_RATE) / fftBufferSize, spectrum[i]);
    }
}

void
SignalProcessor::computeHPS(int harmonics)
{
// NAIVE HPS

	for (int i = 0; i < fft_size; i++)
		hps[i] = spectrum[i];

	for (int h = 1; h <= harmonics; h++)
	{
		for (int i = 0; i < fft_size / h; i++)
		{
			hps[i] *= spectrum[i * h];
		}
	}

    FILE *temp = fopen("log/data2.temp", "w");

    for (int i = 0; (i * SAMPLE_RATE) / fftBufferSize <= (int)highbound; i++)
    {
    	fprintf(temp, "%i %g \n", (i * SAMPLE_RATE) / fftBufferSize, hps[i]);
    }
}

float
SignalProcessor::findFundamental()
{
	int maxFreq = 0;

	computeHPS(3);

	// Find Max Frequency
	for (int i = 0; i <= fft_size; i++)
	{
		if (hps[maxFreq] < hps[i] && i != 0)
			maxFreq = i;
	}

   	int max2 = 0;
   	int maxsearch = maxFreq * 3 / 4;

   	for (int i = 1; i < maxsearch; i++)
   	{
    	if (hps[i] > hps[max2])
        	max2 = i;
   	}

   	if (abs(max2 * 2 - maxFreq) < 4)
   	{
      	if (hps[max2]/hps[maxFreq] > 0.2)
        	maxFreq = max2;
    }

	fundamental = ((float)maxFreq * SAMPLE_RATE) / fftBufferSize;

	return fundamental;
}

void
SignalProcessor::printSignal()
{
	std::string commandsForGnuplot[] = {"set title \"MagFFT\"",
									"set xlabel \"Frequency (Hz)\"",
									"set ylabel \"Magnitude\"",
									"plot 'log/data.temp' with lines"};

	std::string commandsForGnuplot2[] = {"set title \"HPS\"",
									"set xlabel \"Frequency (Hz)\"",
									"set ylabel \"Magnitude\"",
									"plot 'log/data2.temp' with lines"};

	std::string commandsForGnuplot3[] = {"set title \"SPECTRUM\"",
									"set xlabel \"Frequency (Hz)\"",
									"set ylabel \"Magnitude\"",
									"plot 'log/data3.temp' with lines"};


	FILE *gnuplotPipe = popen("gnuplot -persistent", "w");
	FILE *gnuplotPipe2 = popen("gnuplot -persistent", "w");
	FILE *gnuplotPipe3 = popen("gnuplot -persistent", "w");

	for (int i = 0; i < NUM_COMMANDS; i++)
	{
	  	fprintf(gnuplotPipe, "%s \n", commandsForGnuplot[i].c_str());
	  	fprintf(gnuplotPipe2, "%s \n", commandsForGnuplot2[i].c_str());
	  	fprintf(gnuplotPipe3, "%s \n", commandsForGnuplot3[i].c_str());
    }
}