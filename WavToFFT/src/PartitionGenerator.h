#ifndef PARTITION_GENERATOR_HH
#define PARTITION_GENERATOR_HH

#include <iostream>
#include <fstream>
#include <string>
#include <stdlib.h>
#include <map>
#include <vector>

class PartitionGenerator
{
 public:
  PartitionGenerator(std::string filename);
  ~PartitionGenerator();

  void addNote (std::string note, int octave);
  void CreateFiles();

 private:
  std::ofstream file;
  std::string filename;
  std::map<std::string, std::vector<std::string> > gamme;
};

#endif /* PARTITION_GENERATOR_HH */
