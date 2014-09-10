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
            printf("number of frames = %d\n", num_frames);

        printf("\n");
	}
}

void
WavParser::parse(char *wavFile)
{
	FILE *out;
	SNDFILE *sf;
	SF_INFO info;

	int *buf;
    int i,j;

	info.format = 0;
    sf = sf_open(wavFile,SFM_READ,&info);
   
    if (sf == NULL)
    {
        printf("Failed to open the file.\n");    	
    }

    buf = (int *)malloc(num_frames * sizeof(int));
    data_size = sf_read_int(sf, buf, num_frames);

    sf_close(sf);

    out = fopen("log/filedata.out","w");
   	data = (double *)fftw_malloc(sizeof(double) * data_size);
   	
    for (i = 0; i < data_size; i += c)
    {
        for (j = 0; j < c; ++j)
            fprintf(out,"%d ",buf[i+j]);

        data[i + j] = buf[i+j];
        fprintf(out,"\n");
    }

    fclose(out);
}