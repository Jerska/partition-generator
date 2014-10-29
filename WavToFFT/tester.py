import sys
import os
import subprocess

class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'

def main():

	dir_files = "notes/piano/"

	testsfiles = os.listdir(dir_files)

	truc = ""
	counter = 0
	nb_good = 0

	print

	is_fft = False 
	files = [f for f in os.listdir('.') if os.path.isfile(f)]
	for each in files:
		if each == "FFT":
			is_fft = True
	if not is_fft:
		call(["make"])

	for each in testsfiles:
		counter += 1
		namefile = dir_files + each
		truc = subprocess.Popen(["./FFT", namefile], stdout = subprocess.PIPE).communicate()[0]
		print bcolors.HEADER + "TESTING " + each[0] + each[1] + " note" + bcolors.ENDC
		words = truc.split()
		for i in range(0, len(words)):
			if words[i] == "note":
				if len(words) == i+2:
					print bcolors.FAIL +"	KO, le programme n'a rien trouve" + bcolors.ENDC
					break
				elif words[i+2][0] == each[0] or words[i+2][2] == each[1]:
					if words[i+2][0] != each[0]:
						print bcolors.WARNING + "	KO, L'octave est bonne mais pas la note" + bcolors.ENDC
						print bcolors.WARNING + "	On trouve " + words[i+2][0] + words[i+2][2] + bcolors.ENDC
					elif words[i+2][2] != each[1]:
						print bcolors.WARNING + "	KO, C'est la bonne note mais pas le bon octave" + bcolors.ENDC
						print bcolors.WARNING + "	On trouve " + words[i+2][0] + words[i+2][2] + bcolors.ENDC
					else:
						print bcolors.OKGREEN + "	OK, c'est la bonne note" + bcolors.ENDC
						nb_good += 1
				else:
					print bcolors.FAIL + "	KO, completement a cote : mauvais note et mauvais octave" + bcolors.ENDC
					print bcolors.FAIL + "	On trouve " + words[i+2][0] + words[i+2][2] + bcolors.ENDC
		print
				
	print "On passe ", nb_good, " tests sur ", counter
	print "Soit ", nb_good*100/counter, "%"

if __name__ == "__main__":
    main()
