import subprocess

def generateVideoFile(imgFile, audioFile, videoFile):
	cmd = 'ffmpeg -loop 1 -i ./samples/'+ imgFile +' -i \"./output/'+ audioFile +'.mp3\" -c:a copy -c:v libx264 -shortest \"./output/' + videoFile + '.mp4\"'
	subprocess.call(cmd, shell=True)                                     # "Muxing Done
	print('Video ' + videoFile + 'successfully generated from audio and image .... ')