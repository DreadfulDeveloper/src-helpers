import subprocess
import wave
import struct
import numpy
import csv
import sys
import os
import pydub
import matplotlib.pyplot as plt

def moments(x):
    mean = x.mean()
    std = x.var()**0.5
    skewness = ((x - mean)**3).mean() / std**3
    kurtosis = ((x - mean)**4).mean() / std**4
    return [mean, std, skewness, kurtosis]

def fftfeatures(wavdata):
    f = numpy.fft.fft(wavdata)
    f = f[2:(f.size / 2 + 1)]
    f = abs(f)
    total_power = f.sum()
    f = numpy.array_split(f, 10)
    return [e.sum() / total_power for e in f]

def features(x):
    x = numpy.array(x)
    f = []

    xs = x
    diff = xs[1:] - xs[:-1]
    f.extend(moments(xs))
    f.extend(moments(diff))

    xs = x.reshape(-1, 10).mean(1)
    diff = xs[1:] - xs[:-1]
    f.extend(moments(xs))
    f.extend(moments(diff))

    xs = x.reshape(-1, 100).mean(1)
    diff = xs[1:] - xs[:-1]
    f.extend(moments(xs))
    f.extend(moments(diff))

    xs = x.reshape(-1, 1000).mean(1)
    diff = xs[1:] - xs[:-1]
    f.extend(moments(xs))
    f.extend(moments(diff))

    f.extend(fftfeatures(x))
    return f

def read_wav(wav_file):
    """Returns two chunks of sound data from wave file."""
    try:
        w = wave.open(wav_file)

        n = 60 * 10000
        fmt = "%di" % n

        if w.getnframes() < n * 2:
            raise ValueError('Wave file too short')

        frames = w.readframes(n)
        wav_data1 = struct.unpack(fmt, frames)
        frames = w.readframes(n)
        wav_data2 = struct.unpack(fmt, frames)

    except Exception as e: print(e)
    return wav_data1, wav_data2

def compute_chunk_features(mp3_file):
    """Return feature vectors for two chunks of an MP3 file."""
    # Extract MP3 file to a mono, 10kHz WAV file
    out_file = "temp.wav"
    mp3_to_convert = pydub.AudioSegment.from_mp3(mp3_file)
    mp3_to_convert.export(out_file, format="wav")

    # Read in chunks of data from WAV file
    wav_data1, wav_data2 = read_wav(out_file)
    return features(wav_data1), features(wav_data2)

# Main script starts here
# =======================

def main():
    x1 = []
    x2 = []
    labels = []
    analysis = []

    for path, dirs, files in os.walk('C:/Users/jkrogman/Downloads/scdl'):
        for f in files:
            if not f.endswith('.mp3'):
                # Skip any non-MP3 files
                continue
            mp3_file = os.path.join(path, f)
            # Extract the track name (i.e. the file name) plus the names
            # of the two preceding directories. This will be useful
            # later for plotting.
            tail, track = os.path.split(mp3_file)
            tail, dir1 = os.path.split(tail)
            tail, dir2 = os.path.split(tail)
            # Compute features. feature_vec1 and feature_vec2 are lists of floating
            # point numbers representing the statistical features we have extracted
            # from the raw sound data.
            try:
                feature_vec1, feature_vec2 = compute_chunk_features(mp3_file)
                x1.append(feature_vec1[9])
                x2.append(feature_vec2[10])
                labels.append(track)

            except:
                continue


    # x, y = zip(*analysis)

    print [x1, x2]
    print labels
    print '\n'
    #print x2
if __name__ == '__main__':
    print 'starting'
    main()
