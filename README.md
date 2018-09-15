# Memoirs

## Inspiration
A Picture is worth a thousand words but often times its these words that make a picture perfect!

## What it does
You can upload your photo, let google vision api add its own observations. Also add your story and customize your homemade video and audio only.
Download and share them with your loved ones and let them live your story.

It can add a personal touch to your favorite photos and can be shared on whatsapp, facebook (and other social media). It can also be used to customize e-cards and personalize greetings!

More-over for people who are differently able (and vision impaired). It is a great way to tell them the story behind your favorite photos.

Parents can make short bedtime stories for their kids too.. 


## How I built it
I used HTML5, CSS3, Bootstrap, GCP Vision API, GCP Text to Speech API, FFMPEG to finish this task.
I extract the uploaded image information, sent it to GCP Cloud Vision to do some initial machine learning and extract image prediction.
then I converted the text to speech using GCP cloud text-to-speech API. 
finally I merged the audio and image to convert into a video. (and only audio). Both of these creations can be downloaded and shared.
 

## Challenges I ran into
I ran into some obstacles with the merging to audio and image to a video on the fly. Finally I got that working thanks to ffmpeg command line tools.

## Accomplishments that I'm proud of
This is a product which I know I will use to create heart-warming surprises for families and friends. These picture stories will bring joy especially  to the visually impaired and to the little children. 

## What I learned
GCP Vision API and GCP Text-to-Speech API, FFMPEG services.

## What's next for Memoirs
Translation to different languages
Create an album of photos and annotate an entire story around it.


## Requirements

Python 3.6 +, GCP API License, ffmpeg

## How to start


1. Run Server

```
setup.bat / setup.sh
python app.py
http://<server:port>/
```

