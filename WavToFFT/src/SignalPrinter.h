#ifndef SIGNAL_PRINTER_HH
#define SIGNAL_PRINTER_HH

#include <vector>

class SignalPrinter
{
	public:
		SignalPrinter();
		~SignalPrinter();

		void init(unsigned int lowbound, unsigned highbound, float factor);
		void writeSignal(std::string file, float *data, int data_length);
		void addSignal(std::string title, float *data, int data_length);
		void printSignals();

	private:
		unsigned int lowbound;
		unsigned int highbound;
		float factor;
		std::vector<std::string> files;
		std::vector<std::vector<std::string>> commands;
		std::vector<FILE *> pipes;
};

#endif /* SIGNAL_PRINTER_HH */