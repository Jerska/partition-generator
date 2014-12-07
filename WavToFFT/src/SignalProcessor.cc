#include <stdlib.h>
#include <iostream>
#include <fftw3.h>
#include <math.h>
#include <utility>
#include "SignalProcessor.h"
// #include "SignalPrinter.h"

/*!
	\file SignalProcessor.cc
	Contains all processing functions and algorithms of the input Signal.
*/

#define REAL 0
#define IMAG 1
#define SAMPLE_RATE 44100
#define _USE_MATH_DEFINES


extern "C" int
processMicroSignal(float *buff)
{
  /*std::cout << "First and last 10 of buff = ";
  for (unsigned int i = 0; i < 10; ++i)
    std::cout << buff[i] << ((i == 9) ? "" : ", ");
  std::cout << " | ";
  for (unsigned int i = 246; i < 256; ++i)
    std::cout << buff[i] << ((i == 255) ? "" : ", ");
  std::cout << std::endl;*/

	static SignalProcessor *sp = new SignalProcessor();
	//sp->setFFTSize(129);
	sp->computeFFTSize();
	//sp->fftInit();
	/* code */

	

	float freq = 0;
	double *window = new double[sp->fftBufferSize];
	double *dataWindow = new double[sp->fftBufferSize];
	fftw_complex *fft_result = new fftw_complex[sp->fft_size];

	fftw_plan plan_forward = fftw_plan_dft_r2c_1d(sp->fftBufferSize, dataWindow, fft_result, FFTW_ESTIMATE);

	sp->blackmanHarris(sp->fftBufferSize, window);

	float somme  = 0;
	for (int i = 0; i < sp->fftBufferSize; ++i){
		dataWindow[i] = buff[i] * window[i];
		somme += buff[i];
	}
	//std::cout << "(buff 0 = )" << buff[0] << std::endl;
	//std::cout << "moy = " << somme / sp->fftBufferSize << std::endl;

	fftw_execute(plan_forward);

	sp->setFFT(fft_result);

	sp->computeMagnitude();

	sp->computeMicroSpectrum();

	std::cout << "(spec = )" << sp->spectrum[0] << std::endl;

	freq = sp->getFundamental();
	
	int midiNote = 65; //Sol
	if (freq == freq) // Check if not nan
  	{
    	std::cout << "Freq = " << freq << std::endl;
  		midiNote = sp->freqToMidi(freq);
    	std::cout << "Midi note = " << midiNote << std::endl;
  	}

	return midiNote;
}

int
SignalProcessor::freqToMidi(float freq)
{
  int index = 0;
  float diff = abs(midiForFreq[0] - freq);
  float newDiff = 0;

  for (index = 1; index < 128; ++index)
  {
    newDiff = abs(midiForFreq[index] - freq);
    if (newDiff > diff)
      break;
    diff = newDiff;
  }

  return index + 6 - 24;
}

// SIGNAL PROCESSOR METHODS

SignalProcessor::SignalProcessor()
:max_freq_error(0), fundamental(0), lowbound(0), highbound(0)
{
	// sPrinter = SignalPrinter();
	m = Misc();

	midiForFreq[0] = 8.1757989156;
	midiForFreq[1] = 8.6619572180;
	midiForFreq[2] = 9.1770239974;
	midiForFreq[3] = 9.7227182413;
	midiForFreq[4] = 10.3008611535;
	midiForFreq[5] = 10.9133822323;
	midiForFreq[6] = 11.5623257097;
	midiForFreq[7] = 12.2498573744;
	midiForFreq[8] = 12.9782717994;
	midiForFreq[9] = 13.7500000000;
	midiForFreq[10] = 14.5676175474;
	midiForFreq[11] = 15.4338531643;

	for (int i = 12; i < 128; ++i)
	{
		midiForFreq[i] = 2 * midiForFreq[i - 12];
	}
}

SignalProcessor::~SignalProcessor()
{
}

// void
// SignalProcessor::initPrinter(unsigned int lowbound, unsigned highbound, float factor)
// {
// 	sPrinter.init(lowbound, highbound, factor);
// }

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

void
SignalProcessor::setFFT(fftw_complex *data)
{
	fft = data;
}

void
SignalProcessor::setFFTSize(int size)
{
	fft_size = size;
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
 // fftBufferSize = 32768;
   	fftBufferSize = 4096;
    max_freq_error = (float)rate / (float)fftBufferSize;

    fft_size = (fftBufferSize / 2) + 1;
    shift_size = (fftBufferSize / 2) + 1;

   	//initPrinter(lowbound, 5000, ((float)SAMPLE_RATE / (float)fftBufferSize));
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
SignalProcessor::processSignal(float *left, float *right)
{
	int *windowPosition = new int;
	int windowNum = 0;
	bool *bStop = new bool;
	int isEven = true;
	int shift = 0;
	std::string noteString;
	std::pair<float, float> note;

//	int depth = 2;
//	float threshold = 1000;
 	// initPrinter(0, signal_lentgh, 1);//((float)SAMPLE_RATE / (float)fftBufferSize));
	// sPrinter.addSignal("SIGNAL", left, signal_lentgh);
	// std::cout << "lentgh" << 256 << std::endl;

	// sPrinter.printSignals();

	double *window = new double[fftBufferSize];
	double *dataWindowLeft = new double[fftBufferSize];
	double *dataWindowRight = new double[fftBufferSize];
	fftw_complex *fft_result_left = new fftw_complex[fft_size];
	fftw_complex *fft_result_right = new fftw_complex[fft_size];

	fftw_plan plan_forward_left = fftw_plan_dft_r2c_1d(fftBufferSize, dataWindowLeft, fft_result_left, FFTW_ESTIMATE);
	fftw_plan plan_forward_right = fftw_plan_dft_r2c_1d(fftBufferSize, dataWindowRight, fft_result_right, FFTW_ESTIMATE);

	*bStop = false;
	*windowPosition = 0;
	int it = 0;

	blackmanHarris(fftBufferSize, window);

	while (*windowPosition < signal_lentgh && !(*bStop))
	{
		it++;
		STFT(left, right, &plan_forward_left, &plan_forward_right, fft_result_left,
			fft_result_right, dataWindowLeft, dataWindowRight, window, windowPosition, bStop);

		computeMagnitude();
		computeSpectrum();
		note = findFundamental();
		noteString = m.frequencyToNote(std::get<0>(note));
		addNote(noteString, std::get<1>(note));

		// if (it == 30)
		// {
		// 	sPrinter.addSignal("HPS", hps, fft_size);
		// 	sPrinter.addSignal("SPECTROGRAMME", spectrum, fft_size);
		// 	sPrinter.printSignals();

		// }

		//if ((int)notes.size() >= depth)
			//detectOnset(depth, threshold);
		//	detectBiggestSlope();

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

	detectBiggestSlope();
}

void
SignalProcessor::STFT(float *left, float *right, fftw_plan *plan_forward_left, fftw_plan *plan_forward_right,
						fftw_complex *fft_result_left, fftw_complex *fft_result_right,
						double *dataWindowLeft, double *dataWindowRight, double *window, int *windowPosition, bool *bStop)
{
	int readIndex = 0;

	for (int i = 0; i < fftBufferSize; i++)
	{
		readIndex = *windowPosition + i;

		if (readIndex < signal_lentgh) {
			dataWindowLeft[i] = left[readIndex] * window[i];

			if (right != nullptr)
				dataWindowRight[i] = right[readIndex] * window[i];
		}

		else
		{
			dataWindowLeft[i] = 0;
			dataWindowRight[i] = 0;
			*bStop = true;
		}
	}

	fftw_execute(*plan_forward_left);

	if (right != nullptr)
		fftw_execute(*plan_forward_right);

	if (right != nullptr)
	{
		for (int i = 0; i < fft_size; ++i)
		{
			fft[i][REAL] = (fft_result_left[i][REAL] + fft_result_right[i][REAL]) / 2;
			fft[i][IMAG] = (fft_result_left[i][IMAG] + fft_result_right[i][IMAG]) / 2;
		}
	}
	else
	{
		for (int i = 0; i < fft_size; ++i)
		{
			fft[i][REAL] = fft_result_left[i][REAL];
			fft[i][IMAG] = fft_result_left[i][IMAG];
		}
	}
}

void
SignalProcessor::computeMicroSpectrum()
{
	int i;

	for (i = 0; i < fft_size; i++)
		spectrum[i] = fftMag[i];

	for (i = 0; i < fft_size; i++)
		spectrum[i] *= -1 * log((fft_size - i) / (float)(2 * fft_size)) * (float)(2 * fft_size);
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

    
}

float
SignalProcessor::getFundamental()
{
	int maxFreq = 0;

	computeHPS(2);

	// Find Max Frequency
	for (int i = 0; i < fft_size; i++)
	{
		if (hps[maxFreq] < hps[i])
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


std::pair<float, float>
SignalProcessor::findFundamental()
{
	int maxFreq = 0;
	float amp = 0;

	std::pair<float, float> note;

	computeHPS(2);

	// Find Max Frequency
	for (int i = 0; i < fft_size; i++)
	{
		if (hps[maxFreq] < hps[i])
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
	amp = hps[maxFreq];
	//std::cout << fundamental << " - "; 
	note = std::make_pair(fundamental, amp);

	return note;
}

void
SignalProcessor::addNote(std::string note, float amp)
{
	notes.push_back(std::pair<std::string, float>(note, amp));
	notes_tests.push_back(std::pair<std::string, float>(note, amp));
}

std::vector<std::pair<std::string, float> >
SignalProcessor::getNotes()
{
	return notes;
}

std::vector<std::pair<std::string, float> >
SignalProcessor::getNotesTests()
{
	return notes_tests;
}

std::vector<std::string>
SignalProcessor::getOnSetNotes()
{
	return onSetNotes;
}

void
SignalProcessor::detectBiggestSlope()
{
	//onSetNotes.clear();

	std::pair<std::string, float> note;
	std::vector<std::pair<std::string, float> >::iterator it = notes.begin();
	std::vector<std::pair<std::string, float> >::iterator lastSlope = notes.begin();
	float maxSlope = 0;
	bool isSlope = false;
	bool getNext = false;

	for (int i = 0; i < (int)notes.size() - 1; ++i, ++it)
	{
		if (it->first.compare("X[X]") != 0){
			lastSlope = it;
			if (getNext){
				onSetNotes.push_back(it->first);
				getNext = false;
			}
		}


		if (isSlope && std::next(it)->second / it->second < 1)
		{
			isSlope = false;

			if (it->first.compare("X[X]") != 0)
				onSetNotes.push_back(it->first);
			else
				getNext = true;
		}

		if (maxSlope == 0 && it->first.compare("X[X]") != 0)
		{
			maxSlope = it->second;
			note = *it;

			if (maxSlope > 20)
			{
				isSlope = true;

				if (std::next(it)->second / it->second < 1)
				{
					isSlope = false;
					getNext = true;
					onSetNotes.push_back(it->first);	
				}
			}
		}
		else if (std::next(it)->first.compare("X[X]") != 0)
		{
			maxSlope = std::next(it)->second / lastSlope->second;

			if (maxSlope > 20)
				isSlope = true;
		}
	}
}

void
SignalProcessor::detectOnset(int depth, float threshold)
{
	std::string note = "";
	std::vector<std::pair<std::string, float> >::iterator it = notes.begin();
	int depth_counter = 1;
	bool prev = false;

	//std::cout << "caca" << std::endl;

	for (int i = 0; i <= (int)notes.size() - depth; i++, it++)
	{
	//	std::cout << it->first << std::endl;

		if (it->first.compare(std::next(it)->first) == 0
			&& ((std::next(it)->second - it->second) / it->second) * 100 >= threshold)
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
			notes.clear();
			break;
		}
	}
}
