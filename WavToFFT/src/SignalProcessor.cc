#include <stdlib.h>
#include <iostream>
#include <fftw3.h>
#include <math.h>
#include "SignalProcessor.h"

/*!
	\file SignalProcessor.cc
	Contains all processing functions and algorithms of the input Signal.
*/

#define REAL 0
#define IMAG 1
#define SAMPLE_RATE 44100
#define _USE_MATH_DEFINES

SignalProcessor::SignalProcessor()
:max_freq_error(0), fundamental(0), lowbound(0), highbound(0)
{
	sPrinter = SignalPrinter();
	m = Misc();
}

SignalProcessor::~SignalProcessor()
{
}

void
SignalProcessor::initPrinter(unsigned int lowbound, unsigned highbound, float factor)
{
	sPrinter.init(lowbound, highbound, factor);
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

SignalPrinter
SignalProcessor::getPrinter()
{
	return sPrinter;
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

void SignalProcessor::blackmanHarris(int windowLength, double *buffer)
{
	const float a0 = 0.35875;
	const float a1 = 0.48829;
	const float a2 = 0.14128;
	const float a3 = 0.01168;


	for (int i = 0; i < windowLength; ++i)
	{
		buffer[i] = a0 - (a1 * cos((2 * M_PI * i) / (windowLength - 1))) +
						 (a2 * cos((4 * M_PI * i) / (windowLength - 1))) -
						 (a3 * cos((6 * M_PI * i) / (windowLength - 1)));
	}
}

void
SignalProcessor::computeFFTSize()
{
	fftBufferSize = round(rate / max_freq_error);
    fftBufferSize = pow(2.0, ceil(log2(fftBufferSize)));
    max_freq_error = (float)rate / (float)fftBufferSize;

    fft_size = (fftBufferSize / 2) + 1;
    shift_size = (fftBufferSize / 2) + 1;

    initPrinter(lowbound, highbound, ((float)SAMPLE_RATE / (float)fftBufferSize));
    fftInit();
}

void
SignalProcessor::fftInit()
{
	fft = new fftw_complex[fft_size];
	fftMag = new float[fft_size];
	spectrum = new float[fft_size];
	hps = new float[fft_size];

	for (int i = 0; i < fft_size; i++)
	{
		fftMag[i] = 0;
		spectrum[i] = 0.0; 
		hps[i] = 0.0;
		fft[i][REAL] = 0;
		fft[i][IMAG] = 0;
	}
}

void
SignalProcessor::computeMagnitude()
{
    for (int i = 0; i < fft_size; i++)
    	fftMag[i] = sqrt(fft[i][REAL] * fft[i][REAL] + fft[i][IMAG] * fft[i][IMAG]);

    //sPrinter.addSignal("MAGNITUDE", fftMag, fft_size);
}
void
SignalProcessor::processSignal(float *data)
{
	float f = 0;
	int *windowPosition = new int;
	int windowNum = 0;
	bool *bStop = new bool;
	int isEven = true;
	int shift = 0;
	std::string note;

	int depth = 2;
	float threshold = 15;

	double *window = new double[fftBufferSize];
	double *dataWindow = new double[fftBufferSize];
	fftw_complex *fft_result = new fftw_complex[fft_size];

	fftw_plan plan_forward = fftw_plan_dft_r2c_1d(fftBufferSize, dataWindow, fft_result, FFTW_ESTIMATE);

	*bStop = false;
	*windowPosition = 0;

	blackmanHarris(fftBufferSize, window);

	while (*windowPosition < signal_lentgh && !(*bStop))
	{
		std::cout << *bStop << std::endl;
		fft = STFT(data, &plan_forward, fft_result, dataWindow, window, windowPosition, bStop);
		computeMagnitude();
		computeSpectrum();
		f = findFundamental();
		note = m.frequencyToNote(f);
		addNote(note, f);

		if ((int)notes.size() > depth)
			detectOnset(depth, threshold);

		*windowPosition += fftBufferSize / 2;

		if (isEven)
		{
			windowNum++;
			isEven = false;
		}

		else
			isEven = true;

		shift++;
	}
}

fftw_complex *
SignalProcessor::STFT(float *data, fftw_plan *plan_forward, fftw_complex *fft_result, double *dataWindow, double *window, int *windowPosition, bool *bStop)
{
	int readIndex = 0;

	for (int i = 0; i < fftBufferSize; i++)
	{
		readIndex = *windowPosition + i;

		if (readIndex < signal_lentgh) 
		{
			dataWindow[i] = data[readIndex] * window[i];
		}

		else
		{
			dataWindow[i] = 0;
			*bStop = true;
		}
	}

	fftw_execute(*plan_forward);

	return fft_result;
}

void
SignalProcessor::computeSpectrum()
{
	// Might be unnecessary

	int i;

	for (i = 0; i < fft_size; i++)
		spectrum[i] = fftMag[i];

	for (i = 0; (i * SAMPLE_RATE) / fftBufferSize < (int)lowbound; ++i)
		spectrum[i] = 0.0;

    for (i = ((highbound + 1) * fftBufferSize) / SAMPLE_RATE; i < fft_size; ++i)
    	spectrum[i] = 0.0;

 	 for (i = ((lowbound) * fftBufferSize) / SAMPLE_RATE; i < fft_size; ++i)
     	spectrum[i] *=  -1 * log((float)(fft_size - i) / (float)(2 * fft_size)) * (float)(2 * fft_size);

    sPrinter.addSignal("SPECTROGRAMME", spectrum, fft_size);
}

void
SignalProcessor::computeHPS(int harmonics)
{
	// NAIVE HPS

	for (int i = 0; i < fft_size; i++)
		hps[i] = spectrum[i];

	for (int h = 2; h <= harmonics; h++)
	{
		for (int i = 0; i < fft_size; i++)
		{
			if ((i * h) < fft_size)
				hps[i] *= spectrum[i * h];
		}
	}

    sPrinter.addSignal("HPS", hps, fft_size);
}

float
SignalProcessor::findFundamental()
{
	int maxFreq = 0;

	computeHPS(2);

	// Find Max Frequency
	for (int i = 0; i < fft_size; i++)
	{
		if (hps[maxFreq] < hps[i] && i != 0)
			maxFreq = i;
	}

	// //Correction for too high octave errors.
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
SignalProcessor::addNote(std::string note, float amp)
{
	notes.push_back(std::pair<std::string, float>(note, amp));
}

std::vector<std::pair<std::string, float> >
SignalProcessor::getNotes()
{
	return notes;
}

std::vector<std::string>
SignalProcessor::getOnSetNotes()
{
	return onSetNotes;
}

void
SignalProcessor::detectOnset(int depth, float threshold)
{
	std::string note = "";
	std::vector<std::pair<std::string, float> >::iterator it = notes.begin();
	int depth_counter = 1;
	bool prev = false;

	for (int i = 0; i < (int)notes.size() - 1; i++, it++)
	{
		if (it->first.compare(std::next(it)->first) == 0 &&
			((std::next(it)->second - it->second) / it->second) * 100 >= threshold)
		{
			if (prev || depth_counter == 1)
				depth_counter++;

			prev = true;
		}
		else
		{
			prev = false;
			depth_counter = 1;
		}

		if (depth_counter == depth)
		{
			onSetNotes.push_back(it->first);
			depth_counter = 1;
			prev = false;
		}
	}
}