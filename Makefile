CXX=em++
COFFEE=coffee

CXX_FLAGS=-std=c++11 -Wall -Wextra -Werror

CXX_SRC= \
	SignalProcessor.cc \
	Misc.cc
CXX_LIBS=libs/libfftw3.a
CXX_OUTFILE=cpp_app.js

CXX_EXPORTED_FUNCTIONS=processMicroSignal

CXX_FOLDER=src/cpp
STATIC_FOLDERS=src/js src/css src/swf
OUT_FOLDER=js
OBJ_FOLDER=obj
STATIC_FOLDER=public
DOC_FOLDER=doc/

CXX_OUT=$(foreach file, $(CXX_SRC), $(OBJ_FOLDER)/$(file:.cc=.bc))
CXX_EXPORTED="[$(foreach func, $(CXX_EXPORTED_FUNCTIONS),'_$(func)',)]"
CXX_OUTFILE_=$(OUT_FOLDER)/$(CXX_OUTFILE)

all: static $(CXX_OUTFILE_)
.PHONY: all

$(CXX_OUTFILE_): $(CXX_OUT)
	mkdir -p `dirname $@`
	$(CXX) $(CXX_FLAGS) $^ $(CXX_LIBS) -o $@ -s EXPORTED_FUNCTIONS=$(CXX_EXPORTED) -s TOTAL_MEMORY=268435456
.PHONY: cxx

static:
	mkdir -p $(STATIC_FOLDER)
	cp -rf $(STATIC_FOLDERS) $(STATIC_FOLDER)/
.PHONY: static

$(OBJ_FOLDER)/%.bc: $(CXX_FOLDER)/%.cc
	mkdir -p `dirname $@`
	$(CXX) $(CXX_FLAGS) -I./$(CXX_FOLDER) $< -o $@ -s EXPORTED_FUNCTIONS=$(CXX_EXPORTED) -s TOTAL_MEMORY=268435456

clean:
	rm -rf $(OUT_FOLDER) $(OBJ_FOLDER) $(STATIC_FOLDER) $(DOC_FOLDER)/{html,latex}
.PHONY: clean

doc:
	doxygen doxygen-file
.PHONY: doc
