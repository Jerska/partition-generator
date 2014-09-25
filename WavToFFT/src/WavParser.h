#ifndef WAV_PARSER_HH
#define WAV_PARSER_HH

/*!
    \file WavParser.h
    Parse the .wav files and gather its properties.
*/

/*! \brief WavParser class

    Implementation of a .wav file parser that gathers its signal and properties
    so it can later be appropriately processed by #SignalProcessor.
    
    \date September 2014
*/

class WavParser
{
    public:
        /*! Constructor.
            Sets the .wav proprerties (sample rate, number of frames and number of channels) to -1.
        */
        WavParser();

        //! Destructor.
        ~WavParser();

        /*! Retrieves all the properties of .wav file.
            \param wavFile The path to the .wav file.
        */
        void getInfos(char *wavFile);

        /*! Print all the properties of the .wav file gathered by the parser.
        */
        void printInfos();

        /*! Parse the .wav file and fills #data with its content.
            \param wavFile The path to the .wav file to be parsed.
        */
        void parse(char *wavFile);

        /*! Returns #data.
            \return The orignal signal of the .wav file once it has been parsed.
        */
        double *getData();

        /*! Returns #data_size.
            \return The size of the signal once it has been parsed.
        */
        int getDataSize();

        /*! Returns #window_ms_size.
            \return The size of the signal's window in milliseconds.
        */
        int getWindowMSSize();

        /*! Returns #window_size.
            \return The size of the signal's window in Hertz.
        */
        int getWindowSize();

    private:
        //attributes

        /*! The number of frames in the parsed signal.
        */
        int f;

        /*! The number of channels in the .wav file.
            -   mono = 1
            -   stereo = 2
        */
        int c;

        /*! The sample rate of the signal. Usually equals to 44100 Hertz.
        */
        int sr;

        /*! The total number of frames in the signal #data.
            Corresponds to the number of frames times the number of channels (#f * #c).
        */
        int num_frames;

        /*! The size of each frame in milliseconds.
        */
        int window_ms_size;

        /*! The size of each frame in Hertz.
        */
        int window_size;

        /*! The lentgh of the signal.
        */
        int data_size;

        /*! Holds the original time-based signal from the .wav file
        */
        double *data;
};

#endif /* WAV_PARSER_HH */
