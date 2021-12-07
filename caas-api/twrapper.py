#gets root
from flask import Flask
import pathlib
import os, sys, getopt
from os import walk
from urllib.parse import urljoin
from bs4 import BeautifulSoup
import argparse
import pytest

import webbrowser

## rootpath
## what u want to do

args = '-r -o'.split()
parser = argparse.ArgumentParser()
parser.add_argument('-o','--option') #1 = local
parser.add_argument('-r','--rootdest')
args = parser.parse_args()

rootpath = os.path.abspath(os.getcwd())
#rootpath = "https://caas-website.wl.r.appspot.com/"
localpath = "http://localhost:5000"

def getarg(self,args):
	#newarr = []
	x = 0
	if len(args)>1:
		while x <len(args):
			if x==0 :
				rootpath = args[x]
			elif x == 1:
				options = args[x]
			else :
				break
			x=x+1
			#newarr.append(args[newarr.len])

#get a file
def getFiles(r,ftype):
	f = []
	for fname in os.listdir(r):
		if ftype in fname:
		#	print(fname)
			return fname
		
#def getEndpoints(self):		
def getDecorator(filename, strtest):
	f = open(filename, 'r')
	#f = BeautifulSoup(open(filename, 'r'))
	l = f.readlines()
	arr = []
	
	for line in l:
		if strtest in line:
			#print(str(line) + "\n")
			#strtest.split("/")				
				arr.append(strtest)			

if __name__=='__main__':
	#webbrowser.open(rootpath)
	#print(getApiEndpoints)

	gf = getFiles(rootpath,"api.py")
	getDecorator(gf, "@")


	print(args)
