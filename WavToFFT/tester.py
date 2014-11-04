import sys
import os
import subprocess
from subprocess import call

class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'


def check_make():

	is_fft = False 
	files = [f for f in os.listdir('.') if os.path.isfile(f)]
	for each in files:
		if each == "FFT":
			is_fft = True
	if not is_fft:
		call(["make"])


def run_test(index):

	if sys.argv[index][-1] != "/":
		dir_files = sys.argv[index] + "/"
	else:
		dir_files = sys.argv[index]

	testsfiles = os.listdir(dir_files)

	truc = ""
	counter = 0
	almost = 0
	nb_good = 0
	nb_files = 0

	print

	print bcolors.OKBLUE + "-------- Testing files in ", dir_files, "--------" + bcolors.ENDC

	for each in testsfiles:

		counter += 1
		namefile = dir_files + each
		truc = subprocess.Popen(["./FFT", namefile], stdout = subprocess.PIPE).communicate()[0]

		print bcolors.HEADER + "TESTING " + each[0] + each[1] + " note" + bcolors.ENDC

		words = truc.split()
		for i in range(0, len(words)):
			if words[i] == "onSet":
				foundNote = False
				foundOctave = False

				if len(words) == i+3:
					print bcolors.FAIL + "	KO, le programme n'a rien trouve" + bcolors.ENDC
					break
					
				for j in range(i+3, len(words), 2):
					if words[j][0] == each[0]:
						foundNote = True 
						if words[j][2] == each[1]:
							foundOctave = True
							break
					if j+2 == len(words):
						break

				if foundNote == True:
					if foundOctave == False:
						print bcolors.WARNING + "	KO, C'est la bonne note mais pas le bon octave" + bcolors.ENDC
						almost +=1
					else:
						print bcolors.OKGREEN + "	OK, c'est la bonne note" + bcolors.ENDC
						nb_good += 1
				else:
					print bcolors.FAIL + "	KO, mauvaise note" + bcolors.ENDC
						
		print

	print bcolors.OKBLUE + "-------- End testing files in ", dir_files, "--------" + bcolors.ENDC
	print				
	print "On passe ", nb_good, " tests sur ", counter
	print "Soit ", nb_good*100/counter, "%"

	if nb_good != counter:
		if almost == 1 or almost == 0:
			print "Sur les ", counter - nb_good, " faux, ", almost, " est pas loin"	
		else:
			print "Sur les ", counter - nb_good, " faux, ", almost, " sont pas loin"
		if counter - nb_good - almost == 1 or counter - nb_good - almost == 0:
			print "Il y a donc ", counter - nb_good - almost, " test vraiment faux"	
		else:
			print "Il y a donc ", counter - nb_good - almost, " tests vraiment faux"
		print "Soit ", (nb_good+almost)*100/counter, "% de reussite, au sens large"
	print


def main():

	if len(sys.argv) < 2:
		print "Usage : python tester.py <folder> <folder2> ..."
		sys.exit(-1)	

	check_make()

	for i in range(1, len(sys.argv)):
		run_test(i)
		if i != len(sys.argv) - 1:
			print
			print bcolors.OKBLUE + "-------------------------------------" + bcolors.ENDC
			print bcolors.OKBLUE + "-----------CHANGING FOLDER-----------" + bcolors.ENDC
			print bcolors.OKBLUE + "-------------------------------------" + bcolors.ENDC
			print
	
if __name__ == "__main__":
    main()
