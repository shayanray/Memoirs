import subprocess

def generateVideoFile(imgFile, audioFile, videoFile):
	cmd = 'ffmpeg -y -loop 1 -i ./samples/'+ imgFile +' -i \"./output/'+ audioFile +'.mp3\" -c:a copy -c:v libx264 -shortest -vf \"scale=trunc(iw/2)*2:trunc(ih/2)*2\" \"./output/' + videoFile + '.mp4\"'
	#cmd = 'ffmpeg -y -loop 1 -i ./samples/'+ imgFile +' -i \"./output/'+ audioFile +'.mp3\" -c:a copy -c:v libx264 -shortest  \"./output/' + videoFile + '.mp4 '
	subprocess.call(cmd, shell=True)                                     # "Muxing Done -vf \\"scale=trunc(iw/2)*2:trunc(ih/2)*2\\" 
	print('Video ' + videoFile + 'successfully generated from audio and image .... ')