#ifndef PARTITION_GENERATOR_HH
#define PARTITION_GENERATOR_HH

#include <iostream>
#include <fstream>
#include <string>
#include <stdlib.h>
#include <map>
#include <vector>

/**
 * \class PartitionGenerator
 * \brief This class is used to generate the lilypond code
 * used to generate the partition
 */

class PartitionGenerator
{
 public:

  /**
   * The constructor
   * @filename is the name of the lilypond file, without the .ly extension
   * When calling the constructor, the programm will create a matrix called gamme which stores
   * all the notes and their octaves (ie, gamme[0][0] = c,,, and gamme[1][3] = d)
   */

  PartitionGenerator(std::string filename);

  /**
   * The destructor
   */

  ~PartitionGenerator();

  /**
   * /fn This fontion adds a note to the lilypond file.
   * @note is the note added
   * @octave is its octave  
   */

  void addNote (std::string note, int octave);

  /**
   * /fn This function creates all the files needed.
   * Those files are the lilypond file and the png file which is the partition itself 
   * Then, it calls the system to create the png (ie, lilypond --png filename.ly)
   * and to open the png file (ie, eog filename.png)
   */

  void CreateFiles();

 private:

  /**
   * \var This var is the lilypond which will be opened
   */

  std::ofstream file;

  /**
   * \var This var stores the name of the file opened
   */

  std::string filename;

  /**
   * \var This var stores all the possible notes, allowing the \fn addNote function 
   * to serach and add more efficiently.
   */

  std::map<std::string, std::vector<std::string> > gamme;
};

#endif /* PARTITION_GENERATOR_HH */
