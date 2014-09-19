#ifndef MISC_HH
#define MISC_HH

#include <map>
#include <string>

class Misc
{
	public:
		Misc();
		~Misc();

		std::string frequencyToNote(float frequency);
	private:
		std::map<float, std::pair<int, std::string>> notes;
		float max_error;
};

#endif /* MISC_HH */