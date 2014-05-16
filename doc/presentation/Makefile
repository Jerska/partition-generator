SOURCE=presentation.tex
COMPILER=pdflatex
PDF=$(SOURCE:.tex=.pdf)
CLEAN=*.toc *.aux *.log

all:
	$(COMPILER) $(SOURCE)

clean:
	rm -f $(CLEAN)

read:
	evince $(PDF)
