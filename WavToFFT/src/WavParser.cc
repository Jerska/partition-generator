#include <sndfile.h>
#include <stdio.h>
#include <stdlib.h>
#include <fftw3.h>
#include "WavParser.h"

WavParser::WavParser()
:f(-1), c(-1), sr(-1), num_frames(-1)
{

}

WavParser::~WavParser()
{

}

double *
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

        printf("wav length = %d Hz\n", window_size);

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

    data = new double[f * c];

    sf_read_double(sf, data, info.frames);

    sf_close(sf);
}
