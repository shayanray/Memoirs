var getBase64Image = function() {
    var dataURL = document.getElementsByClassName('imagePreview')[0].getElementsByTagName('img')[0].src;
    return dataURL.replace(/^data:image\/(png|jpeg);base64,/, "");
};

var text2speech = function(text) {
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
      loadAudio(text);
  };
  request.open("POST", postUrl, !0);
  request.send(JSON.stringify(data));
};

var readImg = function(){
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
      text2speech(JSON.parse(request.responseText).responses[0].labelAnnotations[0].description);
  };
  request.open("POST", postUrl, !0);
  request.send(JSON.stringify(data));
  //e.preventDefault();
  //var elm = e.target;
  /*var audio = document.getElementById('audioTag');

  var source = document.getElementById('audioSource');
  source.src = "./output/mpeg/product"//elm.getAttribute('data-value');

  audio.load(); //call this to just preload the audio without playing
  audio.play(); //call this to play the song right away*/
};

var loadAudio = function(name){

  //e.preventDefault();
  //var elm = e.target;
  var audio = document.getElementById('audioTag');

  var source = document.getElementById('audioSource');
  source.src = "./output/mpeg/" + name; //elm.getAttribute('data-value');

  audio.load(); //call this to just preload the audio without playing
  audio.play(); //call this to play the song right away
};