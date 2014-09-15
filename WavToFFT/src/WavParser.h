#ifndef WAV_PARSER_HH
#define WAV_PARSER_HH

class WavParser
{
    public:
        WavParser();
        ~WavParser();

        void getInfos(char *wavFile);
        void printInfos();
        void parse(char *wavFile);
        double *getData();
        int getDataSize();
        int getWindowMSSize();
        int getWindowSize();

    private:
        //attributes
        int f;
        int c;
        int sr;
        int num_frames;
        int window_ms_size;
        int window_size;
        int data_size;
        double *data;
};

#endif /* WAV_PARSER_HH */
