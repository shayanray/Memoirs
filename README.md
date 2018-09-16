# Memoirs

## Inspiration
A Picture is worth a thousand words but often times its these words that make a picture perfect!

## What it does
Create your personalized Video from your favorite photos. Use it for personalized greetings, jokes, educational notes or to create memories for the vison impaired!

Upload your photo, let google vision api add its own observations. Weave your story into the image with the help of Memoirs platform and create your personalized video( and audio).
Download and share them with your loved ones and let them live your story.

### Personal:
It can add a personal touch to your favorite photos and can be shared on whatsapp, facebook (and other social media). It can also be used to customize e-cards and personalize greetings!

### Social:
More-over for people who are differently able (and vision impaired), it is a great way to tell them the story behind the favorite photos. The best thing is they can hear it again and again whenever they want to and live every moment of it.

### Educational:
It can be used for educational purposes too. For example: There are some esoteric diagrams/images that generally require a lot of detailed explaination. These are worth saving up with additional audio notes for later reference. A very handy revision utility for students.
On a similar note, parents can make quick bedtime stories or educational audio-visuals for their kids and play it on their favorite device!

### Humour:
Obviously a funny story is always in the game with this creation. Pictures can convey so many emotions, humour is definitely one of the most wanted ones. This platform provides the capability to now weave in a funny story within a picture full of fun, making this an absolute essential for the jovial!


```
This platform is able to detect:

Faces

Landmarks

Logos

Labels

OCR (Optical Character Recognition)
```

It then converts the most confident findings to text and then to speech. It merges the image, google findings, story keyed in by the user all into one homemade video. The user can choose to opt out of google's findings and just make it about the personal story. Male or Female generated voice types are available.


## How I built it
I used HTML5, CSS3, Bootstrap, GCP Vision API, GCP Text to Speech API, FFMPEG to finish this task.

The uploaded image was sent to the GCP Cloud Vision aPI to gather various annotations from the image in text form. The text was converted to audio using the GCP cloud text-to-speech API. 
Finally, the audio and image were merged into a .mp4 video. (and a /mp3 audio). Both of these video and audio creations can be downloaded and shared.
 

## Challenges I ran into
I ran into some obstacles with the merging to audio and image to a video on the fly. Finally I got that working thanks to ffmpeg tools.

## Accomplishments that I'm proud of
This is a product which I know I will use to create heart-warming surprises for loved ones, for various social, educational and jovial reasons. These memoirs will hopefully bring joy especially to the visually impaired and little children. 

## What I learned
GCP Vision API and GCP Text-to-Speech API, FFMPEG services.

## What's next for Memoirs
Translation to different languages
Create an album of photos and annotate an entire story around it.


## Requirements

Python 3.6+, GCP API License, ffmpeg

## How to start

1. Run Server

```
setup.bat / setup.sh
python app.py
http://<server:port>/
```

