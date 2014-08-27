CXX=em++
COFFEE=coffee

CXX_FLAGS=-std=c++11 -Wall -Wextra -Werror

CXX_SRC=

CXX_EXPORTED_FUNCTIONS=

COFFEE_FOLDER=src/coffee
CXX_FOLDER=src/cpp
STATIC_FOLDERS=src/js src/css
OUT_FOLDER=js
STATIC_FOLDER=public

CXX_OUT=$(foreach file, $(CXX_SRC), $(OUT_FOLDER)/$(file:.cc=.js))
CXX_EXPORTED="[$(foreach func, $(CXX_EXPORTED_FUNCTIONS),'_$(func)',)]"

all: coffee cxx static
.PHONY: all

coffee:
	$(COFFEE) -o $(OUT_FOLDER) -c $(COFFEE_FOLDER)
.PHONY: coffee

cxx: $(CXX_OUT)
.PHONY: cxx

static:
	mkdir -p $(STATIC_FOLDER)
	cp -rf $(STATIC_FOLDERS) $(STATIC_FOLDER)/
.PHONY: static

$(OUT_FOLDER)/%.js: $(CXX_FOLDER)/%.cc
	mkdir -p `dirname $@`
	$(CXX) $(CXX_FLAGS) $< -o $@ -s EXPORTED_FUNCTIONS=$(CXX_EXPORTED)

clean:
	rm -rf $(OUT_FOLDER) $(STATIC_FOLDER)
.PHONY: clean
