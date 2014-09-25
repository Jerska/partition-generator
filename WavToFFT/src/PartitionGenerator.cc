/**
 * \file Description of the PartitionGenerator.cc file
 */

#include "PartitionGenerator.h"

#define NB_OCTAVES 8

PartitionGenerator::PartitionGenerator(std::string _filename)
  : file (_filename + ".ly"), filename (_filename)
{
  std::string notes[12] = {"c", "cis", "d", "dis", "ei", "f", "fa", "g", "gis", "a", "ais", "b"};
  for (auto note : notes) {
    gamme[note] = std::vector<std::string> ();
    for (unsigned char i = 0; i < NB_OCTAVES; ++i) {
      char to_add = (i < 3) ? ',' : '\'';
      signed char j = i - 3;
      std::string tmp = note;
      while (j) {
	tmp = tmp + to_add;
	j += (j < 0) ? 1 : -1;
      }
      gamme[note].push_back(tmp + " ");
    }
  }

  if (file)
    {
      //Writting in file
      file << "\\version  \"2.18.2\"" << std::endl;
      
      file << "{ " << std::endl;
    }
}

PartitionGenerator::~PartitionGenerator()
{
}

void
PartitionGenerator::addNote (std::string note, int octave)
{
  file << gamme[note][octave];
}

void
PartitionGenerator::CreateFiles ()
{
  if (file)
    {
      file << std::endl << "}" << std::endl;
      
      //Exec shell commands : lilypond
      system(("lilypond --png " + filename + ".ly").c_str());
      
      //Exec shell commands : evince
      system(("eog " + filename + ".png &").c_str());
      
      file.close();
    }
}
