
#include <iostream>
#include <sndfile.h>
#include <stdio.h>
#include <stdlib.h>
#include <fftw3.h>
#include "WavParser.h"

/*!
    \file WavParser.cc
    Parse the .wav files and gather its properties.
*/

WavParser::WavParser()
:f(-1), c(-1), sr(-1), num_frames(-1)
{

}

WavParser::~WavParser()
{

}

float *
WavParser::getData()
{
    return data;
}

int
WavParser::getDataSize()
{
    return data_size;
}

int 
WavParser::getWindowMSSize()
{
    return window_ms_size;
}
int
WavParser::getWindowSize()
{
    return window_size;
}

unsigned char *WavParser::readFileBytes(const char *fileName, size_t *length)  
{  
    std::ifstream fl(fileName);  
    fl.seekg(0, std::ios::end);  
    *length = fl.tellg();  
    char *ret = new char[*length];
    unsigned char *out = new unsigned char[*length];
    fl.seekg(0, std::ios::beg);   
    fl.read(ret, *length);  
    fl.close();  

    for (int i = 0; i < (int)*length; ++i)
        out[i] = ret[i];

    return out;
} 

// convert two bytes to one double in the range -1 to 1
double 
WavParser::bytesToDouble(byte firstByte, byte secondByte) {
    // convert two bytes to one short (little endian)
    short s = (secondByte << 8) | firstByte;
    // convert to range from -1 to (just below) 1
    return s / 32768.0;
}

// Returns left and right double arrays. 'right' will be null if sound is mono.
void
WavParser::openWav(char *filename)
{
    size_t *length = new size_t;
    byte *wav = readFileBytes(filename, length);

    // Determine if mono or stereo
    int channels = wav[22];     // Forget byte 23 as 99.999% of WAVs are 1 or 2 channels

    // Get past all the other sub chunks to get to the data subchunk:
    int pos = 12;   // First Subchunk ID from 12 to 16
    int bytesPerSample = wav[34];
    std::cout << "bytes per sample : " << bytesPerSample << std::endl;
    std::cout << "channels : " << channels << std::endl;

    // Keep iterating until we find the data chunk (i.e. 64 61 74 61 ...... (i.e. 100 97 116 97 in decimal))
    while(!(wav[pos]==100 && wav[pos+1]==97 && wav[pos+2]==116 && wav[pos+3]==97)) {
        pos += 4;
        int chunkSize = wav[pos] + wav[pos + 1] * 256 + wav[pos + 2] * 65536 + wav[pos + 3] * 16777216;
        pos += 4 + chunkSize;
    }
    pos += 8;

    // Pos is now positioned to start of actual sound data.
    int samples = (*length - pos)/2;     // 2 bytes per sample (16 bit sound mono)
    if (channels == 2) samples /= 2;        // 4 bytes per sample (16 bit stereo)

    // Allocate memory (right will be null if only mono sound)
    data = new float[samples];
    double *right;
    double *left = new double[samples];
    if (channels == 2) right = new double[samples];
    else right = nullptr;

    // Write to double array/s:
    int i=0;
    while (pos < (int)*length) {
        left[i] = bytesToDouble(wav[pos], wav[pos + 1]);
        pos += 2;
        if (channels == 2) {
            right[i] = bytesToDouble(wav[pos], wav[pos + 1]);
            pos += 2;
        }
        i++;
    }

    if (right != nullptr)
    {
        for (int j = 0; j < samples; j++)
            data[j] = (left[j] + right[j]) / 2;
    }
    else
    {
        for (int j = 0; j < samples; ++j)
            data[j] = left[j];
    }

    data_size = samples;
}

void
WavParser::getInfos(char *wavFile)
{
	SNDFILE *sf;
	SF_INFO info;

	info.format = 0;
    sf = sf_open(wavFile, SFM_READ, &info);
   
    if (sf == NULL)
    {
        printf("Failed to open the file.\n");
    }

    f = info.frames;
    sr = info.samplerate;
    c = info.channels;

   	num_frames = f*c;

    window_size = num_frames / sr; 
    window_ms_size = (1000 / window_size);

   	sf_close(sf);
}

void
WavParser::printInfos()
{
	if (f == -1 && sr == -1 && c == -1 && num_frames == -1)
		printf("File Informations Incomplete\n");

	else
	{       
		printf("\n----FILE INFOS----\n\n");

		if (f != -1)
			printf("frames = %d\n",f);

		if (sr !=-1)
    		printf("sample rate = %d\n",sr);

    	if (sr != -1)
    		printf("channels = %d\n",c);

        if (num_frames != - 1)
            printf("total frames = %d\n", num_frames);

        printf("wav length = %d sec\n", window_size);

        printf("window size = %d ms\n", window_ms_size);
	}
}

void
WavParser::parse(char *wavFile)
{
    SNDFILE *sf;
    SF_INFO info;

    data_size = f * c;

    info.format = 0;
    sf = sf_open(wavFile, SFM_READ, &info);
   
    if (sf == NULL)
        printf("Failed to open the file.\n");    	

    data = new float[f * c];

    sf_readf_float(sf, data, info.frames);

  //  float sum = 0;

	// for (int i = 0; i < f * c; ++i)
	// {
 //   	 	/* code */
 //   	 	//std::cout << data[i] << std::endl;
 //   		sum += data[i];
	// }

//	std::cout << "sum = " << sum << std::endl;

    sf_close(sf);
}
