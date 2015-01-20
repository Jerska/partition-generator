#ifndef MISC_HH
#define MISC_HH

#include <map>
#include <string>

/*!
	\file Misc.h
	Contains all miscellaneous features of the project.
*/

/*! \brief Misc class

	Contains all miscellaneous features of the project.
	Including :
		-	Convertion of frequencies to notes following the American standard.

    \date September 2014
*/

class Misc
{
	public:
		/*! Constructor.
            Sets #max_error to 1.
            Creates the #notes structure that will hold the mapping of notes/octaves to its "absolute" frequencies.
        */
		Misc();

		//! Destructor.
		~Misc();

		/*! Looks for the octave and note corresponding to a given frequency.
			The frequency has to be within range of the "absolute" frequency mapped in #notes.
			This range is computed from #max_error and the detected octave of the given frequency :
			the higher the octave, the higher the range.

			\param frequency The frequency to be mapped.

			\return The corresponding note and octave.
    	*/
		std::string frequencyToNote(float frequency);
	private:

		/*! Structure that holds the mapping of notes and octaves to their absolute and theorically perfect frequencies.
    	*/
		std::map<float, std::pair<int, std::string>> notes;

		/*! The inital delta range error whithin which frequencies are recognized as notes
			if they are close enough to their absolute value.
			this delta is based on the power of two of the detected octave.
			Exemple :
				-	octave 1 : delta = 1.
				-	octave 2 : delta = 2.
				-	octave 3 : delta = 4.
				-	octave 4 : delta = 8.
				-	etc.
		*/
		float max_error;
};

#endif /* MISC_HH */