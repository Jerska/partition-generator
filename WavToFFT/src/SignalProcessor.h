#ifndef SIGNAL_PROCESSOR_HH
#define SIGNAL_PROCESSOR_HH

#define REAL 0
#define IMAG 1

class SignalProcessor
{
    public:
        static SignalProcessor& getInstance()
        {
            static SignalProcessor instance;

            return instance;
        }

        ~SignalProcessor();

    private:
    	void fftInit();
    	void computeFFT();
    	void computeHPS();
    	void getMagnitude(fftw_complex* result, int nc);

    	// attributes
        int harmonics;
        float max_freq_error;
        float *fftin;
        float *spectrum;
};

#endif /* SIGNAL_PROCESSOR_HH */