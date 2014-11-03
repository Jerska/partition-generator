#ifndef SIGNAL_PROCESSOR_HH
#define SIGNAL_PROCESSOR_HH

//#include "SignalPrinter.h"
#include <vector>
#include "Misc.h"
#include <fftw3.h>

/*!
    \file SignalProcessor.h
    Contains all processing functions and algorithms of the input Signal.
*/

/*! \brief SignalProcessor class

    SignalProcessor is processing the signal gathered by #WavParser
    using multiple methods and algorithms specifically developped for pitch dectection.

    \date September 2014
*/

class SignalProcessor
{
    public:
    /*! Constructor.
        Sets the frequency, frenquency error, frequency lowbound and frequency highbound to 0.
        Instantiate its own #SignalPrinter.
    */
    	SignalProcessor();

    //! Destructor.
        ~SignalProcessor();

    /*! Initiates the signal printer #sPrinter and sets its parameters.
        \param lowbound The minimum value (in Hertz) from which the signal will be reprenseted on each graph.
        \param highbound The maximum value (in Hertz) until which the signal will be reprenseted on each graph.
        \param factor The factor to be multiplied to the index stored in each file so it can be converted into Hertz.
    */
        //void initPrinter(unsigned int lowbound, unsigned highbound, float factor);

    /*! Sets the paramaters necessary to calibrate the FFT algorithm.
        \param rate The rate to which the signal must be read. It is used to compute the size #window_size of each portions of signal
            that are then processed by the FFT one after an other until all the signal has been read.
        \param max_freq_error This is the maximum error we accept in the input frequency.
        \param window_size This variable is the effective size of the portion of the signal to be processed at a given time.
        \param window_ms_size This variable is the size (in milliseconds) of the shift between windows.
        \param signal_lentgh This variable is the length of the signal.
    */
        void setParams(int rate, float max_freq_error, int window_size, int window_ms_size, int signal_lentgh);

    /*! Instantiates the different arrays meant to hold the different stages of the signals through its processing.
    */
        void fftInit();

    /*! Apply a hamming window to the given array in order to smooth the signal before the FFT.
        \param windowLength The length of the array to which the hamming window is applied.
        \param buffer The array to which the hamming window is applied.
    */
        void hamming(int windowLength, double *buffer);

    /*! Apply, before the FFT, a Blackman Harris window to the given array in order to reduce high-frequency noise in the signal.
        \param windowLength The length of the array to which the hamming window is applied.
        \param buffer The array to which the hamming window is applied.
    */
        void blackmanHarris(int windowLength, double *buffer);

    /*! Sets the frequency range between which the signal is to be processed.
        \param Represents the frequency from which we decide to process the signal.
                Before that the signal is set to 0 and not taken into account.
        \param Represents the frequency from which we decide to stop processing the signal.
                After that the signal is set to 0 and not taken into account.
    */
        void setFrequencyRange(unsigned int lowbound, unsigned int highbound);

    /*! Computes the size of each window that are processed by the FFT, and the size of the resulting arrays.
    */
        void computeFFTSize();

    /*! Apply Blackman Harris window and multiple FFTs to portions of the signal until it has been read in its entirety.
        \param data the signal to which the Blackman Harris window and the FFTs are applied.
    */

        void processSignal(float *data);

    	fftw_complex *STFT(float *data, fftw_plan *plan_forward, fftw_complex *fft_result, double *dataWindow, double *window, int *windowPosition, bool *bStop);

    /*! Computes the magnitude of the signal over the frequency range from the data resulting of the FFT #fftw_complex.
    */
    	void computeMagnitude();

    /*! Computes the spectrum of the signal from its magnitude array #fftMag.
    */
    	void computeSpectrum();

    /*! Computes the harmonic product spectrum from the #spectrum of the signal at the given order.
        \param harmonics The order to which the harmonic product spectrum must be computed.
    */
    	void computeHPS(int harmonics);


    /*! Add a note to the mmap notes for the onset detection.
        \param note The actual note in the American standard format to add.
        \param amp The famplitude of the note to add.

    */
        std::vector<std::pair<std::string, float> > getNotes();
        std::vector<std::pair<std::string, float> > getNotesTests();
        std::vector<std::string> getOnSetNotes();

        void addNote(std::string note, float amp);


    /*! Detect the biggest slope of the detected notes.
    */
        void
        detectBiggestSlope();
    /*! Detect the onset of a note.
    */
        void detectOnset(int depth, float threshold);

    /*! Finds the fundamental frequency by finding the maximum of the #hps array.
    */
    	std::pair<float, float> findFundamental();

    /*! Returns #fftw_complex.
        \return fftw_complex 
    */
    	fftw_complex *getFFTComplex();

    /*! Returns #fft_size
        \return fft_size
    */
    	int getFFTSize();

    /*! Returns the signal printer #sPrinter
    * \return sPrinter 
    */
      //  SignalPrinter getPrinter();

    private:
    	// attributes
	/**
	 * \var max_freq_error
	 * This is the maximum error we accept in the input frequency.
	 */
        float max_freq_error;

	/**
	 * \var fundamental
	 * This variable is the frequency of the fundamental detected in the file.
	 */
        float fundamental;

	/**
	 * \var fft_size
	 * This variable stores the size of the data once it has been processed by the fft.
	 */
        int fft_size;

    /**
     * \var rate
     * The rate to which the signal must be read. It is used to compute the size #window_size of each portions of signal
     * that are then processed by the FFT one after an other until all the signal has been read.
     */
        int rate;

    /**
     * \var window_ms_size
     * This variable is the size (in milliseconds) of the portion of the signal to be processed at a given time.
     */
        int window_ms_size;

    /**
     * \var shift_ms_size
     * This variable is the size (in milliseconds) of the shift between windows.
     */
        int shift_ms_size;

	/**
	 * \var window_size
	 * This variable is the effective size of the portion of the signal to be processed at a given time.
	 */
        int window_size;

	/**
	 * \var shift_size
	 * This variable is the effective size of the shift between windows.
	 */
        int shift_size;

	/**
	 * \var signal_lentgh
	 * This variable is the length of the signal.
	 */
        int signal_lentgh;

	/**
	 * \var fftBuffersize
	 * This variable stores the size of the data given to the fft.
	 */
        int fftBufferSize;

	/**
	 * \var lowbound
	 * This variable is the low bound frequency of the input.
     * It represents the frequency from which we decide to process the signal.
     * Before that the signal is set to 0 and not taken into account.
	 */
        unsigned int lowbound;

	/**
	 * \var highbound
	 * This variable is the high bound frequency of the input.
     * It represents the frequency from which we decide to stop processing the signal.
     * After that the signal is set to 0 and not taken into account.
	 */
        unsigned int highbound;

    /**
     * \var fftMag
     * The array containing the new representation of the signal (Magnitude over frequency) computed from #fftw_complex.
     */
        float *fftMag;

    /**
     * \var spectrum
     * The array containing the spectrum of the signal computed from #fftMag.
     */
        float *spectrum;

    /**
     * \var hps
     * The array cointaining the harmonic product spectrum of the signal computed from #spectrum.
     */
        float *hps;

    /**
     * \var fftw_complex
     * The array containing the signal once it has been processed by the FFT.
     */
        fftw_complex *fft;

        std::vector<std::pair<std::string, float>> notes;
        std::vector<std::pair<std::string, float>> notes_tests;
        std::vector<std::string> onSetNotes;

    /**
     * \var sPrinter
     * The class built to store all the different stages of the signal and produce their associated graphs.
     */
        //SignalPrinter sPrinter;

    /**
     * \var m
     * The class used to handle all sort of stuff, ya know like shit 'n all.
     */
        Misc m;
};

#endif /* SIGNAL_PROCESSOR_HH */
