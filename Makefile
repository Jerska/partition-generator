CXX=em++
COFFEE=coffee

CXX_FLAGS=-std=c++11 -Wall -Wextra -Werror

CXX_SRC=

CXX_EXPORTED_FUNCTIONS=add sub

COFFEE_FOLDER=src/coffee
CXX_FOLDER=src/cpp
OUT_FOLDER=js

CXX_OUT=$(foreach file, $(CXX_SRC), $(OUT_FOLDER)/$(file:.cc=.js))
CXX_EXPORTED="[$(foreach func, $(CXX_EXPORTED_FUNCTIONS),'_$(func)',)]"

all: coffee cxx
.PHONY: all

coffee:
	$(COFFEE) -o $(OUT_FOLDER) -c $(COFFEE_FOLDER)
.PHONY: coffee

cxx: $(CXX_OUT)
.PHONY: cxx

$(OUT_FOLDER)/%.js: $(CXX_FOLDER)/%.cc
	mkdir -p `dirname $@`
	$(CXX) $(CXX_FLAGS) $< -o $@ -s EXPORTED_FUNCTIONS=$(CXX_EXPORTED)

clean:
	rm -rf $(OUT_FOLDER)
.PHONY: clean
