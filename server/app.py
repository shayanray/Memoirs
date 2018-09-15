import bson
import datetime
from flask import Flask, jsonify, render_template, request, Response
import logging
import os
import requests

# App
from configure import app

# add the mlpred folder
import sys
sys.path.insert(0, './tts')
import tts


sys.path.insert(0, './genVideo2')
import genVideo2

# Log
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
log_formatter = logging.Formatter('%(asctime)s:%(name)s:%(message)s')
file_handler = logging.FileHandler('logs/server.log')
file_handler.setFormatter(log_formatter)
logger.addHandler(file_handler)


@app.route('/')
def homePage():
    return render_template('index.html')


@app.route('/makeAudio', methods=['POST'])
def makeAudio():
    jsonReq = request.get_json(force=True)
    inputText = jsonReq['text']
    filename = jsonReq['filename']
    tts.generateAudioFile('./output/'+filename, inputText)

    res = {
        "filename": filename
    }
    return jsonify(res)

@app.route('/makeVideo', methods=['POST'])
def makeVideo():
    jsonReq = request.get_json(force=True)
    imgFile = jsonReq['imgFile']
    audioFile = jsonReq['audioFile']
    videoFile = jsonReq['videoFile']

    genVideo2.generateVideoFile(imgFile, audioFile, videoFile)

    res = {
        "filename": videoFile
    }
    return jsonify(res)


@app.route("/output/audio/<filename>")
def streamAudio(filename):
    def generate():
        with open("./output/" + filename + ".mp3", "rb") as fmpeg:
            data = fmpeg.read(1024)
            while data:
                yield data
                data = fmpeg.read(1024)
    return Response(generate(), mimetype="audio/mpeg3")


@app.route("/output/video/<filename>")
def streamVideo(filename):
    def generate():
        with open("./output/" + filename + ".mp4", "rb") as fmpeg:
            data = fmpeg.read(1024)
            while data:
                yield data
                data = fmpeg.read(1024)
    return Response(generate(), mimetype="video/mp4")


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=int("8080"), debug=True)
