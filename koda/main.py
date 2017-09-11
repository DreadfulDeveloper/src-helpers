import os
import sys
from mutagen.easyid3 import EasyID3

def listDirectory(directory):
    "get list of file info objects for files of particular extensions"
    workdir = os.path.join(os.path.dirname(os.path.realpath(__file__)), directory)
    fileList = [os.path.normcase(f) for f in os.listdir(workdir)]

    return [EasyID3(os.path.join(workdir, f)) for f in fileList]



def main():
    print listDirectory("unprocessed")

if __name__== "__main__":
  main()
