import os
import sys
from glob import glob
from mutagen.easyid3 import EasyID3
import shutil

UNPROCESSED_FOLEDER = "unprocessed"
PROCESSED_FOLDER = "processed"

CAMELOT_FOLDERS = ["1A - 1B", "2A - 2B", "3A - 3B", "4A - 4B", "5A - 5B", "6A - 6B", "7A - 7B", "8A - 8B", "9A - 9B", "10A - 10B", "11A - 11B", "12A - 12B"]

def createOutputDirs():
    outputdir = "processed"
    workdir = os.path.join(os.path.dirname(os.path.realpath(__file__)), outputdir)
    for f in CAMELOT_FOLDERS:
        if not os.path.exists(os.path.join(workdir, f)):
            os.makedirs(os.path.join(workdir, f))

def getDirContents(directory):
    "get list of file info objects for files of particular extensions"
    workdir = os.path.join(os.path.dirname(os.path.realpath(__file__)), directory)
    return [y for x in os.walk(workdir) for y in glob(os.path.join(x[0], '*.mp3'))]

def copyFileToFolder(src, dest):
    tags = EasyID3(src)

    #filename = '{} - {} - {}.mp3'.format(tags['bpm'][0].encode("utf-8"), tags['title'][0].encode("utf-8"), tags['artist'][0].encode("utf-8"))
    #destFile = os.path.join(os.path.dirname(os.path.realpath(__file__)), "processed", dest, filename)
    destFile = os.path.join(os.path.dirname(os.path.realpath(__file__)), PROCESSED_FOLER, dest)
    print destFile
    shutil.copy2(src, destFile)

def copyFilesToKeyFolders():
    createOutputDirs()

    [copyFileToFolder(f, CAMELOT_FOLDERS[i]) for f in getDirContents(UNPROCESSED_FOLER) for y in f.split(' - ') for i in range(len(CAMELOT_FOLDERS)) for key in CAMELOT_FOLDERS[i].split(' - ') if key in y]

def main():

    copyFilesToKeyFolders()

if __name__== "__main__":
  main()
