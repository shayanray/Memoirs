memoirNS = {};
memoirNS.filename = '';
memoirNS.imgName = '';
memoirNS.progressCount = 0;

var openModal = function() {
        document.getElementById('modal').style.display = 'block';
        document.getElementById('fade').style.display = 'block';
}

var closeModal = function() {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('fade').style.display = 'none';
}

var getOCRDetect = function(ocrJSON){
    var baseOCRDetectStr = "";
    if(ocrJSON.textAnnotations && ocrJSON.textAnnotations[0].description)
      baseOCRDetectStr = "I see "+ ocrJSON.textAnnotations[0].description +".";
    
    return baseOCRDetectStr;
}

var getFaceDetect = function(faceJSON){
    var baseFaceDetectStr = "I see a ";
    if (faceJSON.faceAnnotations && faceJSON.faceAnnotations[0].joyLikelihood == "VERY_LIKELY")
      return baseFaceDetectStr + "happy face !!";
    else if (faceJSON.faceAnnotations && faceJSON.faceAnnotations[0].sorrowLikelihood == "VERY_LIKELY")
      return baseFaceDetectStr + "sad face !!";
    else if (faceJSON.faceAnnotations && faceJSON.faceAnnotations[0].angerLikelihood == "VERY_LIKELY")
      return baseFaceDetectStr + "angry face !!";
    else if (faceJSON.faceAnnotations && faceJSON.faceAnnotations[0].surpriseLikelihood == "VERY_LIKELY")
      return baseFaceDetectStr + "surprised face !!";
    else
      return "";
}

var getLandmarkDetect = function(landmarkJSON){
    var baseLandmarkDetectStr = "";
    if(landmarkJSON.landmarkAnnotations && landmarkJSON.landmarkAnnotations[0].description)
      baseLandmarkDetectStr = "I see "+ landmarkJSON.landmarkAnnotations[0].description +".";
    
    return baseLandmarkDetectStr;
}

var getLogoDetect = function(logoJSON){
    var baseLogoDetectStr = "";
    if(logoJSON.logoAnnotations && logoJSON.logoAnnotations[0].description)
      baseLogoDetectStr = "I see "+ logoJSON.logoAnnotations[0].description +".";
    return baseLogoDetectStr;
}

var getLabelDetect = function(labelJSON){
    var baseLabelDetectStr = "";
    if(labelJSON.labelAnnotations && labelJSON.labelAnnotations[0].description)
      baseLabelDetectStr = "I see "+ labelJSON.labelAnnotations[0].description +".";
    return baseLabelDetectStr;
}

var getBase64Image = function() {
    var fullPath = document.getElementById('fileinput').value;
    var dataURL = document.getElementsByClassName('imagePreview')[0].getElementsByTagName('img')[0].src;
    console.log("image dataurl >> " + fullPath.substring(fullPath.lastIndexOf("\\") + 1));
    memoirNS.imgName = fullPath.substring(fullPath.lastIndexOf("\\") + 1);
    return dataURL.replace(/^data:image\/(png|jpeg);base64,/, "");
};

var text2speech = function(mergeToVideo, filename, json) {
  memoirNS.filename = filename;
  var usefulText = "";

  // get a little smarter with google cloud vision api
  if(json){
    labelStr = getLabelDetect(json);
    ocrStr = getOCRDetect(json);
    faceStr = getFaceDetect(json);
    landmarkStr = getLandmarkDetect(json);
    logoStr = getLogoDetect(json);
    
    
    usefulText  = labelStr + ocrStr + faceStr + landmarkStr + logoStr ;
     //"I see a "+  text + ". ";
  }

  var mynotes = document.getElementById('storyText').value;//"this is my notes";
  var voiceChoice = document.getElementById('voiceChoice').value;

  console.log("voiceChoice >> " + voiceChoice);
  var postUrl = "/makeAudio";
  var data = {
    'text': usefulText + mynotes,
    'filename': filename,
    'voiceChoice':  voiceChoice     
  }
  var request = new XMLHttpRequest;
  request.onload = function() {
      //console.log(JSON.parse(request.responseText));
      loadAudio(mergeToVideo, filename);
  };
  request.open("POST", postUrl, !0);
  request.send(JSON.stringify(data));
};

var genAudio = function(mergeToVideo){
var useGoogleVision = document.getElementById('useGoogleVision').value;
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
          "type":"FACE_DETECTION",
          "maxResults":10
          },
          {
          "type":"LOGO_DETECTION",
          "maxResults":2
          },
          {
             "type": "LANDMARK_DETECTION"
          },

          {
            "type":"TEXT_DETECTION"
          },
          {
           "maxResults": 5,
           "type": "LABEL_DETECTION"
          }
         ]
        }
      ]
  }

  var request = new XMLHttpRequest;
  request.onload = function() {
      console.log(JSON.parse(request.responseText));
      if(useGoogleVision == "false")
        text2speech(mergeToVideo, new Date().getTime()+"", "");
      else
        text2speech(mergeToVideo, new Date().getTime()+"", JSON.parse(request.responseText).responses[0]); //.labelAnnotations[0].description
  };
  request.open("POST", postUrl, !0);
  request.send(JSON.stringify(data));
  
};

var loadAudio = function(mergeToVideo, name){

  
  //e.preventDefault();
  //var elm = e.target;
  var audio = document.getElementById('audioTag');

  var source = document.getElementById('audioSource');
  source.src = "./output/audio/" + memoirNS.filename; //elm.getAttribute('data-value');

  audio.load(); //call this to just preload the audio without playing
  if(mergeToVideo == undefined || !mergeToVideo)
    audio.play(); //call this to play the song right away // default only playing audio

  
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
     'videoFile': memoirNS.filename,
     'voiceChoice':  voiceChoice     
  }
  var request = new XMLHttpRequest;
  request.onload = function() {
      //console.log(JSON.parse(request.responseText));
      loadVideo();
  };
  openModal();
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
  closeModal();
  video.play(); //call this to play the song right away
};