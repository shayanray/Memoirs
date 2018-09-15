memoirNS = {};
memoirNS.filename = '';
memoirNS.imgName = '';

var getBase64Image = function() {
    var fullPath = document.getElementById('fileinput').value;
    var dataURL = document.getElementsByClassName('imagePreview')[0].getElementsByTagName('img')[0].src;
    console.log("image dataurl >> " + fullPath.substring(fullPath.lastIndexOf("\\") + 1));
    memoirNS.imgName = fullPath.substring(fullPath.lastIndexOf("\\") + 1);
    return dataURL.replace(/^data:image\/(png|jpeg);base64,/, "");
};

var text2speech = function(mergeToVideo, text) {
  var usefulText = "I see a "+  text + ". ";
  var pause = "... ";
  var mynotes = document.getElementById('storyText').value;//"this is my notes";
  var postUrl = "/makeAudio";
  var data = {
    'text': usefulText + pause + mynotes,
    'filename': text      
  }
  var request = new XMLHttpRequest;
  request.onload = function() {
      //console.log(JSON.parse(request.responseText));
      loadAudio(mergeToVideo, text);
  };
  request.open("POST", postUrl, !0);
  request.send(JSON.stringify(data));
};

var genAudio = function(mergeToVideo){
var image = getBase64Image();
  var postUrl = "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBGQXawOyPqrJZSza-OCMwAe4oEn3xD0DM";
  var data = {
      requests: [
        {
         "image": {
          "content": image
         },
         "features": [
          {
           "maxResults": 5,
           "type": "LABEL_DETECTION"
          },
          {
          "type":"FACE_DETECTION",
          "maxResults":10
          },
          {
          "type":"LOGO_DETECTION",
          "maxResults":2
          }
         ]
        }
      ]
  }

  var request = new XMLHttpRequest;
  request.onload = function() {
      console.log(JSON.parse(request.responseText));
      text2speech(mergeToVideo, JSON.parse(request.responseText).responses[0].labelAnnotations[0].description);
  };
  request.open("POST", postUrl, !0);
  request.send(JSON.stringify(data));
  
};

var loadAudio = function(mergeToVideo, name){

  memoirNS.filename = name;
  //e.preventDefault();
  //var elm = e.target;
  var audio = document.getElementById('audioTag');

  var source = document.getElementById('audioSource');
  source.src = "./output/audio/" + name; //elm.getAttribute('data-value');

  audio.load(); //call this to just preload the audio without playing
  audio.play(); //call this to play the song right away

  
  if(mergeToVideo){
    mergeVideo();
  }
};

var genVideo = function() {
  genAudio(true);
};

var mergeVideo = function() {
  var postUrl = "/makeVideo";
  var data = {
     'imgFile': memoirNS.imgName,
     'audioFile': memoirNS.filename,
     'videoFile': memoirNS.filename
  }
  var request = new XMLHttpRequest;
  request.onload = function() {
      //console.log(JSON.parse(request.responseText));
      loadVideo();
  };
  request.open("POST", postUrl, !0);
  request.send(JSON.stringify(data));
};

var loadVideo = function(){

  console.log("memoirNS.filename >> " + memoirNS.filename);
  //e.preventDefault();
  //var elm = e.target;
  var video = document.getElementById('videoTag');
  var source = document.getElementById('videoSource');
  source.src = "./output/video/" + memoirNS.filename; //elm.getAttribute('data-value');

  video.load(); //call this to just preload the audio without playing
  video.play(); //call this to play the song right away
};