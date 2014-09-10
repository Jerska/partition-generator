#ifndef WAV_PARSER_HH
#define WAV_PARSER_HH

class WavParser
{
    public:
        static WavParser& getInstance()
        {
            static WavParser instance;

            return instance;
        }

        ~WavParser();


    private:
    	
    	
};

#endif /* WAV_PARSER_HH */
