#!/usr/bin/python

import re, random, sys

def readFile(f):
	with open(f, "r") as file:
		return file.read()
def writeFile(f, content):
	with open(f, "w") as file:
		file.write(content)

for arg in sys.argv[1:]:
	writeFile(arg, readFile(arg).replace("vtag", str(random.randint(0,999))))
##	writeFile(arg, re.sub('(<script[^>]*src=)"([^"\\\\]*(?:\\\\.[^"\\\\]*)*)"', '\\1"\\2?'+str(random.randint(0,999))+'"', readFile(arg)))


