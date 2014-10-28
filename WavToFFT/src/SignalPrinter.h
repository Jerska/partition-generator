#ifndef SIGNAL_PRINTER_HH
#define SIGNAL_PRINTER_HH

#include <vector>
#include <map>

/*!
	\file SignalPrinter.h
	Print at different stages the processed signal.
*/

/*! \brief SignalPrinter class

	SignalPrinter is in charge of printing all the signals it is being sent using the graphing utility gnuplot.

    \date September 2014
*/

class SignalPrinter
{
	public:
		/*! Constructor.
        */
		SignalPrinter();

		//! Destructor.
		~SignalPrinter();

		/*! Sets the values for #lowbound, #highbound and #factor.

			\param lowbound The minimum value (in Hertz) from which the signal will be reprenseted on each graph.
			\param highbound The maximum value (in Hertz) until which the signal will be reprenseted on each graph.
			\param factor The factor to be multiplied to the index stored in each file so it can be converted into Hertz.
        */
		void init(unsigned int lowbound, unsigned highbound, float factor);

		/*! Writes all the values of the signal to a new file.

			\param file The path of the file in which all the values of signal are to be stored.
			\param data The array containing the signal.
			\param data_length The length of the array containing the signal.
        */
		void writeSignal(std::string file, float *data, int data_length);

		/*! Add a signal to #SignalPrinter so its graph can later be generated.
			Creates the file storing the values of the signal.
			Adds a new pipe to #pipes, a new command to #commands, and a new file to #files.
			Calls #writeSignal with the appropriate parameters.

			\param title The title of the graph corresponding to the signal.
			\param data The array containing the signal.
			\param data_length The length of the array containing the signal.
        */
		void addSignal(std::string title, float *data, int data_length);

		/*! Creates all the graphs of all the signals that have been stored into #SignalPrinter.
        */
		void printSignals();

	private:

		/*! The minimum value (in Hertz) to which the signal will be reprenseted on each graph.
        */
		unsigned int lowbound;

		/*! The maximum value (in Hertz) to which the signal will be reprenseted on each graph.
        */
		unsigned int highbound;

		/*! The factor to be multiplied to the index stored in each file so it can be converted into Hertz.
        */
		float factor;

		/*! The list of all the files. Each file holds all the values of their corresponding signal, following the gnuplot format.
        */
		std::vector<std::string> files;

		/*! The list of all the commands. Each command is to be passed to gnuplot
			in order to create its corresponding graph of its signal.
        */
		std::vector<std::vector<std::string>> commands;

		/*! The list of all the file pipes. Each pipe is used to pass its corresponding commands to gnuplot.
			There is one pipe for each signal to be printed.
        */
		std::vector<FILE *> pipes;
};

#endif /* SIGNAL_PRINTER_HH */